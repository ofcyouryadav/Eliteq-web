// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Developer from './pages/Developer';
import Premium from './pages/Premium';
import CustomBot from './pages/CustomBot';
import Support from './pages/Support';
import Payment from './pages/Payment';
import CreatePt from './pages/CreatePt';
import Login from './pages/Login';
import Soon from './pages/Soon';
import Profile from './pages/Profile';
import Terms from './privacy/Terms';
import Contact from './privacy/Contact';
import Privacy from './privacy/Privacy';
import PaymentSuccess from './pages/PaymentSuccess';

// Dashboard components
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Organizations from './pages/dashboard/Organizations';
import Teams from './pages/dashboard/Teams';
import ViewPointTables from './pages/dashboard/ViewPointTables';
import MergePointTables from './pages/dashboard/MergePointTables';
import PointTableDetails from './pages/dashboard/PointTableDetails';

export default function App() {  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <div className="dashboard-hide-when-active">
            <Header />
          </div>
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/soon" element={<Soon />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>                <Route index element={<Dashboard />} />
                <Route path="organizations" element={<Organizations />} />
                <Route path="teams" element={<Teams />} />
                <Route path="create-table" element={<CreatePt activeTabProp="create" />} />
                <Route path="merge-tables" element={<MergePointTables />} />
                <Route path="view-tables" element={<ViewPointTables />} />
                <Route path="view-tables/:id" element={<PointTableDetails />} />
              </Route>
              
              {/* Protected routes */}
              <Route path="/premium" element={
                <ProtectedRoute>
                  <Premium />
                </ProtectedRoute>
              } />
              <Route path="/custom-bot" element={
                <ProtectedRoute>
                  <CustomBot />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } />              <Route path="/create-pt" element={
                <ProtectedRoute>
                  <CreatePt activeTabProp="create" />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              {/* Add more routes as needed */}            </Routes>
          </main>
          <div className="dashboard-hide-when-active">
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}
