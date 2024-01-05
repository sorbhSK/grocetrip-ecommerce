import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import SuperMarkets from "./pages/SuperMarkets";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Favourite from "./pages/Favourite";
import Explore from "./pages/Explore";
import ShoppingList from "./pages/ShoppingList";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import Notification from "./pages/Notification";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supermarkets" element={<SuperMarkets />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termscondition" element={<TermsCondition />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
