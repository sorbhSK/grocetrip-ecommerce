import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Brand from "./pages/Brand";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Users from "./pages/Users";
import Suggestion from "./pages/Suggestion";
import Store from "./pages/Store";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Product />} />
          <Route path="/users" element={<Users />} />
          <Route path="/suggestions" element={<Suggestion />} />
          <Route path="/storelocator" element={<Store />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
