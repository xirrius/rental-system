import React, { useEffect, useState } from "react";
import "./navbar.css";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { userInfo } from "../../services/DataStore";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const [trigger, setTrigger] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (userInfo.email) {
      console.log(userInfo, "in navbar");
      setIsLogin(true);
    }
  }, []);

  const searchItem = async () => {
    try {
      const res = await fetch(
        `https://rental-system.onrender.com/search-product?query=${searchValue}`
      );
      const data = await res.json()
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="bg-indigo-500 py-4 w-full flex justify-between">
        <span>Rental System</span>
        <Search>
          {/* <SearchIconWrapper> */}
          {/* /</SearchIconWrapper> */}
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
            <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon onClick={searchItem} />
            </IconButton>
        </Search>
        <li>
          <Link to="/">Home</Link>
          {/* <Link to="/">Product</Link> */}
          {!isLogin && <Link to="/login">Login</Link>}
          {isLogin && (
            <div className="profile">
              <Avatar
                className="cursor-pointer"
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                onClick={() => setTrigger(!trigger)}
              >
                R
              </Avatar>
              {trigger ? <Dropdown /> : ""}
            </div>
          )}
        </li>
      </nav>
    </>
  );
};
export default Navbar;
