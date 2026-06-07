# EliteQ Bot Website

This project contains both the frontend website and backend payment API for the EliteQ Discord bot.

## Project Structure

- `src/` - Frontend React application
- `backend/` - Node.js backend API for payment processing and other features
- `docs/` - Documentation files

## Setup Instructions

### Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:3001
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with appropriate values:
   ```
   PORT=3001
   NODE_ENV=development
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=quotient_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   CASHFREE_APP_ID=your_cashfree_app_id
   CASHFREE_SECRET_KEY=your_cashfree_secret_key
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

## Database Setup

The application requires PostgreSQL database. The backend will automatically create the necessary tables on startup if they don't exist.

### Required Tables

- `premium_plans` - Contains information about available premium plans
- `premium_txns` - Stores payment transaction information
- `guild_data` - Keeps track of premium status for Discord servers

## Payment Flow

1. User selects a premium plan on the frontend
2. User enters their Discord server ID
3. Frontend sends a request to the backend to create a payment transaction
4. Backend creates a transaction in the database and requests a payment link from Cashfree
5. User is redirected to the Cashfree payment page
6. After payment, user is redirected back to the application
7. Backend verifies the payment status and updates the server's premium status

## Development

- Frontend is built with React, Vite, and Tailwind CSS
- Backend is built with Express.js and PostgreSQL
- Payment processing is handled by Cashfree API

## Features

### Point Table Maker

The Point Table Maker is an advanced tool for creating tournament point tables from screenshots:

1. **Installation**: Run `node setup-pointtable-maker.js` to install and set up
2. **Features**:
   - Secure backend processing
   - OCR integration for image processing
   - Step-by-step guided workflow
   - Multiple export formats (CSV, Image)
   - Advanced visualization
   
3. **Usage**: Navigate to Dashboard → Advanced Point Tables

For detailed documentation, see [Point Table Maker docs](docs/pointtable-maker.md)
