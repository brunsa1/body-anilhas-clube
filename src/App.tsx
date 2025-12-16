import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import CouponsPage from "./pages/CouponsPage";
import MyCouponsPage from "./pages/MyCouponsPage";
import ReferralPage from "./pages/ReferralPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminClientsPage from "./pages/admin/AdminClientsPage";
import AdminCouponsPage from "./pages/admin/AdminCouponsPage";
import AdminAnilhasPage from "./pages/admin/AdminAnilhasPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthPage />} />
    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
    <Route path="/historico" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
    <Route path="/resgatar" element={<ProtectedRoute><CouponsPage /></ProtectedRoute>} />
    <Route path="/meus-cupons" element={<ProtectedRoute><MyCouponsPage /></ProtectedRoute>} />
    <Route path="/indicar" element={<ProtectedRoute><ReferralPage /></ProtectedRoute>} />
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
    <Route path="/admin/clientes" element={<AdminRoute><AdminClientsPage /></AdminRoute>} />
    <Route path="/admin/cupons" element={<AdminRoute><AdminCouponsPage /></AdminRoute>} />
    <Route path="/admin/anilhas" element={<AdminRoute><AdminAnilhasPage /></AdminRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
