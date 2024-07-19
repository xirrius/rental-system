import { Link } from "react-router-dom";
import { userInfo } from "../../services/DataStore";

const Dropdown = () => {

  const handleLogout = () => {
    userInfo = {}
    console.log(userInfo);
  }

  return (
    <div className="relative">
      <div className="mt-4 w-32 rounded-xl bg-white z-10 shadow-lg absolute right-1/4">
        <Link to="/profile" className="text-base m-0">
          <div className="rounded-xl py-3 cursor-pointer w-full text-center text-gray-950 border-b-2 hover:bg-indigo-400 hover:text-white box-border">
            Profile
          </div>
        </Link>
        <Link to="/add-item" className="text-base m-0">
          <div className="rounded-xl py-3 cursor-pointer w-full text-center text-gray-950 border-b-2 hover:bg-indigo-400 hover:text-white box-border">
            Add Item
          </div>
        </Link>
        <Link to="/login" className="text-base m-0" onClick={handleLogout}>
          <div className="rounded-xl py-3 cursor-pointer w-full text-center text-red-600 hover:bg-indigo-400 hover:text-white box-border">
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Dropdown;
