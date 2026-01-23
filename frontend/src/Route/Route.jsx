import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

// Shared layout
import SharedLayout from "../components/Sharedlayouts/sharedLayouts";

// Public pages
import Home from "../pages/Home";
import Login from "../pages/LoginPage";
import Register from "../pages/Registrationform";
import Ourstory from "../pages/Ourstory";
import DonatePage from "../pages/DonatePage";
import Contact from "../pages/Contact";
import Aboutautisim from "../pages/Aboutautisim";
import Privacy from "../pages/Privacy";
import About from "../pages/about";
import Features from '../pages/Features';

// Admin pages
import AdminPage from "../pages/afterLogin/Adminpage";
import Dashboard from "../components/admincomponents/Dashboard";
import ManageUsers from "../components/admincomponents/ManageUser";
import AccessControl from "../components/admincomponents/AccessControl";
import Setting from "../components/admincomponents/Setting";

// Manager pages
import Manager from "../pages/afterLogin/GeneralManagerDashboard";
import Man_Dashboard from "../components/managercomponent/Managerdashboard";
import ParentRequest from "../components/managercomponent/Parentrequest";
import StudentsPage from "../components/managercomponent/Student";
import TherapistsPage from "../components/managercomponent/Therapist";
import ReportsPage from "../components/managercomponent/Report";
import SchedulePage from "../components/managercomponent/Schedule";
import NotificationsPage from "../components/managercomponent/Notifications";
import AccountSettings from "../components/managercomponent/AccountSettings";
import ManagerLogout from "../components/managercomponent/ManagerLogout";

// Therapist page
import TherapistDashboard from "../pages/afterLogin/TherapistDashboard";

// Parent pages (will be outside SharedLayout)
import Parent from "../pages/afterLogin/Parentdashboard";
import ParentDashboard from "../components/Parentcomponent/Dashboardtab";
import ChatPage from "../components/Parentcomponent/ChatTab";
import TasksPage from "../components/Parentcomponent/Taskcard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes inside SharedLayout */}
      <Route path="/" element={<SharedLayout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Register />} />
        <Route path="ourstory" element={<Ourstory />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about-autism" element={<Aboutautisim />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="about" element={<About />} />
        <Route path="/features" element={<Features />} />

        {/* Admin routes */}
        <Route path="admin" element={<AdminPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="access-control" element={<AccessControl />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Manager routes */}
        <Route path="manager" element={<Manager />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Man_Dashboard />} />
          <Route path="requests" element={<ParentRequest />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="therapists" element={<TherapistsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="logout" element={<ManagerLogout />} />
        </Route>

        {/* Therapist route */}
        <Route path="therapist" element={<TherapistDashboard />} />

        {/* Optional fallback route */}
        <Route path="*" element={<h1 className="p-10 text-center">404 - Page Not Found</h1>} />
      </Route>

      {/* Parent routes OUTSIDE SharedLayout */}
      <Route path="parent" element={<Parent />}>
        <Route index element={<ParentDashboard />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="tasks" element={<TasksPage />} />
      </Route>
    </>
  )
);

export default router;
