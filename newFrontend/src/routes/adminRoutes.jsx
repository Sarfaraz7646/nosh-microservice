import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminOrders from "../pages/admin/Orders";
import AdminRestaurants from "../pages/admin/Restaurants";
import AdminDeliveryPartners from "../pages/admin/DeliveryPartners";
import AdminAnalytics from "../pages/admin/Analytics";

export const adminRoutes = {
  path: "/admin",
  element: <DashboardLayout role="Admin" />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: "users", element: <AdminUsers /> },
    { path: "restaurants", element: <AdminRestaurants /> },
    { path: "orders", element: <AdminOrders /> },
    { path: "delivery-partners", element: <AdminDeliveryPartners /> },
    { path: "analytics", element: <AdminAnalytics /> },
  ],
};
