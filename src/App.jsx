import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { AuthProvider }  from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Header from "./components/Header";

// Pages
// import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashBoard";
import AdminDashboard from "./pages/AdminDashBoard";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignList from "./pages/CampaignList";
import DonateForm from "./pages/DonateForm";
import AdminUserList from "./pages/AdminUserList";
import AdminEditUser from "./pages/AdminEditUser";
import AdminCampaignList from "./pages/AdminCampaignList";
import AdminCampaignView from "./pages/AdminCampaignView";
import CampaignDetail from "./pages/CreateCampaign";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaign/donate/:campaignId" element={<DonateForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetail />} />
          <Route path="/admin/users" element={<AdminUserList />} />
          <Route path="/admin/user/:id" element={<AdminEditUser />} />
          <Route path="/admin/campaigns" element={<AdminCampaignList />} />
          <Route path="/admin/campaign/:id" element={<AdminCampaignView />} />






          {/* Protected User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-campaign"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <CreateCampaign />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/edit/:userId"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminEditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/campaigns"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminCampaignList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/campaigns/view/:campaignId"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminCampaignView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
