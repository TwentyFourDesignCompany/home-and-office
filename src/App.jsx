
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.scss";
import "./login.scss";
import Home from "./screens/Home";
import Footer from "./components/Footer";
import NotFound from "./screens/NotFound";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import ContactUs from "./screens/ContactUs";
import Admin from "./screens/Admin";
import Dashboard from "./screens/Admin/views/Dashboard";
import Shop from "./screens/Admin/views/Shop";
import Login from "./screens/Admin/views/Login";
import Orders from "./screens/Admin/views/Orders";
import {getUser} from "./helper/user-helper";

function App() {
  const [footerOpen, setFooterOpen] = useState(true);
  const [user, setUser] = useState(getUser());

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/product-details/:id" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/login" element={<Login setUser={setUser} user={user}/>}/>
          <Route path="/admin" element={<Admin setFooterOpen={setFooterOpen} user={user}/>}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="shop" element={<Shop/>}/>
            <Route path="orders" element={<Orders/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {footerOpen && <Footer />}
    </>
  );
}

export default App;
