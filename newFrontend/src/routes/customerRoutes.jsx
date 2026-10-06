import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import Restaurants from "../pages/customer/Restaurants";
import RestaurantDetails from "../pages/customer/RestaurantDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/Orders";
import OrderTracking from "../pages/customer/OrderTracking";

export const customerRoutes = {
  path: "/",
  element: <CustomerLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "restaurants", element: <Restaurants /> },
    { path: "restaurants/:id", element: <RestaurantDetails /> },
    { path: "cart", element: <Cart /> },
    { path: "checkout", element: <Checkout /> },
    { path: "orders", element: <Orders /> },
    { path: "orders/:id", element: <OrderTracking /> },
  ],
};
