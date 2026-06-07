/**
 * Development Server Runner
 * Runs both backend and frontend servers concurrently
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Console colors for better readability
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Configuration
const config = {
  backend: {
    command: 'npm',
    args: ['run', 'start'],
    dir: path.join(__dirname, 'backend'),
    name: 'BACKEND',
    color: colors.cyan
  },
  frontend: {
    command: 'npm',
    args: ['run', 'serve'],  // Changed to avoid recursive call
    dir: __dirname,        // Root directory for frontend
    name: 'FRONTEND',
    color: colors.green
  }
};

/**
 * Run a server process
 */
function runServer(serverConfig) {
  const { command, args, dir, name, color } = serverConfig;
  
  console.log(`${color}Starting ${name} server...${colors.reset}`);
  
  // Start the process
  const server = spawn(command, args, {
    cwd: dir,
    shell: true,
    stdio: 'pipe',
  });
  
  // Handle process output with prefixed logging
  server.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${color}[${name}]${colors.reset} ${line}`);
      }
    });
  });
  
  server.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${color}[${name}]${colors.red} ${line}${colors.reset}`);
      }
    });
  });
  
  // Handle process exit
  server.on('close', (code) => {
    if (code !== 0) {
      console.log(`${color}[${name}]${colors.red} Server process exited with code ${code}${colors.reset}`);
    } else {
      console.log(`${color}[${name}] Server stopped${colors.reset}`);
    }
  });
  
  return server;
}

/**
 * Main function to start all servers
 */
function startServers() {
  console.log(`${colors.bright}${colors.yellow}Starting EliteQ development servers...${colors.reset}\n`);
  
  try {
    // Start servers
    const backendServer = runServer(config.backend);
    const frontendServer = runServer(config.frontend);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log(`\n${colors.yellow}Shutting down servers...${colors.reset}`);
      
      backendServer.kill();
      frontendServer.kill();
      
      // Give processes a moment to clean up
      setTimeout(() => {
        console.log(`${colors.yellow}All servers stopped.${colors.reset}`);
        process.exit(0);
      }, 1000);
    });
    
    console.log(`\n${colors.bright}${colors.yellow}All servers started. Press Ctrl+C to stop.${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}Failed to start servers: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

startServers();