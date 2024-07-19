// import "./signup.css";

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userInfo } from "../services/DataStore";

export default function Login() {
  const navigate = useNavigate();

  // CONTROLLED FORM INPUTS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UNCONTROLLED FORM INPUTS
  // const refEmail = useRef(null)
  // const refPassword = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "" || email === "") {
      console.log(`All fields are required.`);
    }
    try {
      const res = await fetch(`http://localhost:8000/user/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json()
      if (res.status === 200) {
        userInfo.email = email;
        userInfo.password = password;
        userInfo.token = data.token
        userInfo.user = data.user
        navigate("/");
      }
      console.log(data);
      console.log(userInfo)
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  //controlled
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  //uncontrolled
                  //ref={refEmail}
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  //controlled
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  //uncontrolled
                  //ref={refPassword}
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
              <button
                onClick={(e) => handleSubmit(e)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
            <div className="text-sm">
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Create An Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
