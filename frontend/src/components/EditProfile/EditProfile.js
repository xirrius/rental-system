import { useState } from "react";
import { userInfo } from "../../services/DataStore";
import {useNavigate} from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState(0)
  const [profile, setProfile] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()
  console.log(name, address, contact, profile)
  if(name === "" || address === "" || profile === "" || contact === "") {
    console.log('All fields are required.');
    return
  }
  try {
    const res = await fetch(`http://localhost:8000/edit-profile`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + userInfo.token
      },
      method: 'PATCH',
      body: JSON.stringify({
        name, address, contact, profile
      })
    })
    navigate('/profile')
  } catch (error) {
    console.log(`Error ${error}`);
  }

}


  return (
    <div className="absolute left-1/4 top- w-5/12 rounded-lg bg-white shadow-lg p-4 ">
      <h2 className="text-center font-bold text-4xl">Edit Your Profile</h2>
      <form action="" className="">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="username"
              name="username"
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
            htmlFor="mobile"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mobile No.
          </label>
          <div className="mt-2">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="mobile"
              name="mobile"
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="userImage"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            User Image
          </label>
          <div className="mt-2">
            <input
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="userImage"
              name="userImage"
              type="text"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
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
            Address
          </label>
          <div className="mt-2">
            <textarea
              //onChange={(e) => setName(e.target.value)}
              // ref={refName} UNCONTROLLED
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          className="w-full py-2 my-6 bg-blue-500 text-white rounded-[999px]"
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </button>
      </form>
    </div>
  );
}
export default EditProfile