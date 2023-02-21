import "./App.css";
import NavBar from "./common/NavBar";
import HomePage from "./Home/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import BuyerLoginPage from "./auth/Buyer/BuyerLoginPage";
import CartPage from "./Cart/CartPage";
import BuyerRegisterPage from "./auth/Buyer/BuyerRegisterPage";
import AccountPage from "./auth/Account/AccountPage";
import CheckoutPage from "./Checkout/CheckoutPage";
import ShoppingPage from "./Shopping/ShoppingPage";
import ProductPage from "./Shopping/ProductPage";
import SellerRegisterPage from "./auth/Seller/SellerRegisterPage";
import SellerLoginPage from "./auth/Seller/SellerLoginPage";
import SellerHomePage from "./Seller/SellerHomePage";
import SellerAddProductPage from "./Seller/SellerProducts/SellerAddProductPage";
import SellerEditProductPage from "./Seller/SellerProducts/SellerEditProductPage";
import SellerProductsPage from "./Seller/SellerProducts/SellerProductsPage";
import SellerDrawer from "./Seller/SellerDrawer";
import SellerOrdersPage from "./Seller/SellerOrders/SellerOrdersPage";
import SellerProfilePage from "./Seller/SellerProfilePage";
import SellerCouponsPage from "./Seller/SellerCoupons/SellerCouponsPage";
import SellerAddCouponPage from "./Seller/SellerCoupons/SellerAddCouponPage";

import { Box } from "@mui/material";

function App() {
  const location = useLocation();
  function BuyerMode() {
    return (
      <Box>
        <NavBar />
        <Box
          sx={{
            marginTop: 10,
          }}
        >
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/buyer/login" element={<BuyerLoginPage />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route
              exact
              path="/buyer/register"
              element={<BuyerRegisterPage />}
            />
            <Route exact path="/account" element={<AccountPage />} />
            <Route exact path="/checkout" element={<CheckoutPage />} />
            <Route exact path="/shop" element={<ShoppingPage />} />
            <Route exact path="/products" element={<ProductPage />} />
          </Routes>
        </Box>
      </Box>
    );
  }
  function SellerMode() {
    return (
      <Box sx={{ display: "flex" }}>
        {location.pathname.includes("register") ||
        location.pathname.includes("login") ? (
          <></>
        ) : (
          <SellerDrawer location={location} />
        )}
        <Box
          px={5}
          flexGrow={1}
          bgcolor="#f5f5f5"
          height="100vh"
          overflow="auto"
        >
          <Routes>
            <Route
              exact
              path="/seller/register"
              element={<SellerRegisterPage />}
            />
            <Route exact path="/seller/login" element={<SellerLoginPage />} />
            <Route exact path="/seller/home" element={<SellerHomePage />} />
            <Route
              exact
              path="/seller/products"
              element={<SellerProductsPage />}
            />
            <Route
              exact
              path="/seller/products/add"
              element={<SellerAddProductPage />}
            />
            <Route
              exact
              path="/seller/products/edit"
              element={<SellerEditProductPage />}
            />
            <Route exact path="/seller/orders" element={<SellerOrdersPage />} />
            <Route
              exact
              path="/seller/profile"
              element={<SellerProfilePage />}
            />
            <Route
              exact
              path="/seller/coupons"
              element={<SellerCouponsPage />}
            />
            <Route
              exact
              path="/seller/coupons/add"
              element={<SellerAddCouponPage />}
            />
          </Routes>
        </Box>
      </Box>
    );
  }
  return (
    <>{!location.pathname.includes("seller") ? BuyerMode() : SellerMode()}</>
  );
}

export default App;
