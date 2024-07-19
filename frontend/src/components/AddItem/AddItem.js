import { useState } from "react";
import { userInfo } from "../../services/DataStore";
import { useNavigate } from "react-router-dom";
import "./additem.css";

const AddItem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("Unavailable");

  const handleAvailability = (e) => {
    if (e.target.checked) {
      setAvailability("available");
    } else setAvailability("Unavailable");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    console.log(name, category, description, image, price, availability);
    if (
      name === "" ||
      category === "" ||
      description === "" ||
      price === "" ||
      image === "" ||
      availability === ""
    ) {
      console.log("All fields are required.");
    } else {
      console.log(`Product is being added.`);
      try {
        const res = await fetch(
          `https://rental-system.onrender.com/product/add-item`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "token " + userInfo.token,
            },
            method: "POST",
            body: JSON.stringify({
              name,
              category,
              description,
              image_url: image,
              price_per_day: price,
              availability_status: availability,
              // ownerId: userInfo.user._id,
            }),
          }
        );
        const data = await res.json();
        console.log(`Product added successfully.`, data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="absolute left-1/4 top- w-5/12 rounded-lg bg-white shadow-lg p-4 ">
      <h2 className="text-center font-bold text-4xl">Add Your Product</h2>
      <form>
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Name
          </label>
          <div className="mt-2">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="productName"
              name="productName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Price
          </label>
          <div className="mt-2">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="productPrice"
              name="productPrice"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="productCategory"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Category
          </label>
          <div className="mt-2">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="productCategory"
              name="productCategory"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="productImage"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Image
          </label>
          <div className="mt-2">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="productImage"
              name="productImage"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="productDescription"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Description
          </label>
          <div className="mt-2">
            <textarea
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="productDescription"
              name="productDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <label
            htmlFor="productAvailability"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Available
          </label>
          <div className="mt-1">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="productAvailability"
              name="productAvailability"
              type="checkbox"
              required
              value={availability}
              onChange={(e) => handleAvailability(e)}
              className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          className="w-full py-2 my-6 bg-blue-500 text-white rounded-[999px]"
          onClick={(e) => handleSubmit(e)}
        >
          Add To Rent
        </button>
      </form>
    </div>
  );
};
export default AddItem;
