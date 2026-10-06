import DashboardLayout from "../layouts/DashboardLayout";
import RestaurantDashboard from "../pages/restaurant/Dashboard";
import RestaurantOrders from "../pages/restaurant/Orders";
import Menu from "../pages/restaurant/Menu";
import RestaurantOffers from "../pages/restaurant/Offers";
import RestaurantReports from "../pages/restaurant/Reports";
import RestaurantOnboarding from "../pages/restaurant/Onboarding";

export const restaurantRoutes = [
  { path: "/restaurant/onboarding", element: <RestaurantOnboarding /> },
  {
    path: "/restaurant",
    element: <DashboardLayout role="Restaurant" />,
    children: [
      { index: true, element: <RestaurantDashboard /> },
      { path: "orders", element: <RestaurantOrders /> },
      { path: "menu", element: <Menu /> },
      { path: "offers", element: <RestaurantOffers /> },
      { path: "reports", element: <RestaurantReports /> },
    ],
  },
];
