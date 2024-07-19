import { Link, useParams } from "react-router-dom";
import "./profile.css";
import { useEffect, useState } from "react";
import { userInfo } from "../../services/DataStore";

const ProfilePage = () => {
  const { id } = useParams();
  const [userProduct, setUserProduct] = useState([]);
  const [userData, setUserData] = useState({});
  const [rentProduct, setRentProduct] = useState([]);

  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      const query = id !== undefined ? id : "none";
      console.log("query ", query);
      console.log(
        `https://rental-system.onrender.com/user-product?query=${query}`
      );
      const res = await fetch(
        `http://localhost:8000/user-product?query=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + userInfo.token,
          },
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
      setUserProduct(data.products);
      console.log(userProduct);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRentData = async () => {
      const res = await fetch(`https://rental-system.onrender.com/user-rent`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + userInfo.token,
        },
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setRentProduct(data.rentedProducts);
      console.log(rentProduct);
    };
    fetchRentData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const query = id !== undefined ? id : "none";
      console.log("query ", query);
      const res = await fetch(
        `https://rental-system.onrender.com/user-profile?query=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + userInfo.token,
          },
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
      setUserData(data.data);
      console.log(userData);
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="bg-white text-gray-600 min-h-screen p-10">
        <div className="flex">
          <img className="mr-6" src={userData?.profile} alt="profile" />
          <div className="flex flex-col justify-center">
            {/* content  */}
            <h4 className="mt-0 mb-2 capitalize text-gray-900 font-bold tracking-widest text-2xl">
              {userData?.name}
            </h4>
            <h1 className="mt-0 mb-2 text-gray-950 text-4xl">
              {userData?.address}
            </h1>
            <p className="text-gray-600 text-sm">{userInfo.email}</p>
            <p className="text-gray-600 text-sm">Created at 1-July 2024</p>
          </div>
        </div>

        {/* action buttons */}
        <div className="mt-6 flex justify-between">
          <div className="flex">
            {!id && (
              <Link to="/edit-profile">
                <button className="mr-2 bg-blue-500 text-white-700 block py-2 px-8 rounded-full">
                  Edit
                </button>
              </Link>
            )}
          </div>
          <div className="text-gray-600 text-sm tracking-widest text-right">
            <h5 className="mb-1">Products</h5>
            <p>{userProduct.length}</p>
          </div>
        </div>

        {/* product list    */}
        <div className="mt-10">
          {/* product list header  */}
          <div className="flex text-gray-600">
            <div className="p-2 w-8 flex-shrink-0"></div>
            <div className="p-2 w-8 flex-shrink-0"></div>
            <div className="p-2 w-full">Product Name</div>
            <div className="p-2 w-full">Price</div>
            <div className="p-2 w-full">image</div>
            <div className="p-2 w-full">Category</div>
            <div className="p-2 w-12 flex-shrink-0 text-right">status</div>
          </div>

          {userProduct.map((item, idx) => (
            <div
              className="flex border-b border-gray-800 hover:bg-blue-500"
              key={idx}
            >
              <div className="p-3 w-8 flex-shrink-0">{idx}</div>
              <div className="p-3 w-8 flex-shrink-0">❤️</div>
              <div className="p-3 w-full">{item.name}</div>
              <div className="p-3 w-full">{item.price_per_day}</div>
              <div className="p-3 w-full">
                {item.image_url.toString().substr(0, 12) + `...`}
              </div>
              <div className="p-3 w-full">{item.category}</div>
              <div className="p-3 w-12 flex-shrink-0 text-right">
                {item.availability_status}
              </div>
            </div>
          ))}
        </div>

        {/*action button*/}
        {!id && (
          <div className="mt-6 flex justify-between">
            <div className="text-gray-600 text-sm tracking-widest text-right">
              <h5 className="mb-1">Rented Products</h5>
              <p>{rentProduct.length}</p>
            </div>
          </div>
        )}

        {/* product list    */}
        {!id && (
          <div className="mt-10">
            {/* product list header  */}
            <div className="flex text-gray-600">
              <div className="p-2 w-8 flex-shrink-0"></div>
              <div className="p-2 w-8 flex-shrink-0"></div>
              <div className="p-2 w-full">Product Name</div>
              <div className="p-2 w-full">Price</div>
              {/* <div className="p-2 w-full">image</div>
            <div className="p-2 w-full">Category</div> */}
              <div className="p-2 w-12 flex-shrink-0 text-right">
                Expires On
              </div>
            </div>

            {rentProduct.map((item, idx) => (
              <div
                className="flex border-b border-gray-800 hover:bg-blue-500"
                key={idx}
              >
                <div className="p-3 w-8 flex-shrink-0">{idx}</div>
                <div className="p-3 w-8 flex-shrink-0">❤️</div>
                <div className="p-3 w-full">{item.productName}</div>
                <div className="p-3 w-full">{item.totalPrice}</div>
                {/* <div className="p-3 w-full">
                {item.image_url.toString().substr(0, 12) + `...`}
              </div>
              <div className="p-3 w-full">{item.category}</div> */}
                <div className="p-3 w-12 flex-shrink-0 text-right">
                  {item.expireDate.substr(0, 10)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
