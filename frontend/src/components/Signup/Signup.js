import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  //CONTROLLED FORM INPUT
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRole = (e) => {
    if (e.target.checked) {
      setRole("seller");
    } else setRole("buyer");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      password === "" ||
      email === "" ||
      confirmPassword === ""
    ) {
      console.log(`All fields are required.`);
    } else if (password !== confirmPassword) {
      console.log(`Passwords should match.`);
    }

    try {
      const res = await fetch(
        `https://rental-system.onrender.com/user/register`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ name, email, password, role }),
        }
      );
      console.log(res.ok, res.status);
      if (res.status === 201) {
        navigate("/login");
      }
      console.log(res);
    } catch (error) {
      console.log(`Error: `, error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // ref={refName} UNCONTROLLED
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  //ref={refEmail} UNCONTROLLED
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // ref={refPassword} UNCONTROLLED
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  // ref={refConfirmPassword} UNCONTROLLED
                  id="confirmPassword"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center justify-start gap-6">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Seller
              </label>
              <input
                value={role}
                onChange={(e) => handleRole(e)}
                // ref={refSeller} UNCONTROLLED
                type="checkbox"
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => handleSubmit(e)}
              >
                Sign Up
              </button>
            </div>
            <div className="text-sm">
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
