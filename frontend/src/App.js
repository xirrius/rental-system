import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login";
import AddItem from "./components/AddItem/AddItem";
import Profile from "./components/Profile/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import EditProfile from "./components/EditProfile/EditProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
          <Route
            exact
            path="/"
            element={
              <>
              <Navbar/>
                <Products />
              </>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <>
              <Navbar/>
                <Profile />
              </>
            }
          />
          <Route
            exact
            path="/profile/:id"
            element={
              <>
              <Navbar/>
                <Profile />
              </>
            }
          />
          <Route exact path="/add-item" element={<AddItem />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
