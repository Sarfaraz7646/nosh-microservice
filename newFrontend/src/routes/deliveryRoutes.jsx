import DashboardLayout from "../layouts/DashboardLayout";
import DeliveryDashboard from "../pages/delivery/Dashboard";
import DeliveryRequests from "../pages/delivery/Requests";
import ActiveDelivery from "../pages/delivery/ActiveDelivery";
import DeliveryNavigation from "../pages/delivery/Navigation";
import Earnings from "../pages/delivery/Earnings";
import DeliveryHistory from "../pages/delivery/History";
import DeliveryOnboarding from "../pages/delivery/Onboarding";

export const deliveryRoutes = [
  { path: "/delivery/onboarding", element: <DeliveryOnboarding /> },
  {
    path: "/delivery",
    element: <DashboardLayout role="Delivery Partner" />,
    children: [
      { index: true, element: <DeliveryDashboard /> },
      { path: "requests", element: <DeliveryRequests /> },
      { path: "active", element: <ActiveDelivery /> },
      { path: "navigation", element: <DeliveryNavigation /> },
      { path: "earnings", element: <Earnings /> },
      { path: "history", element: <DeliveryHistory /> },
    ],
  },
];
