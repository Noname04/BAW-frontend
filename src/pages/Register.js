import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {

  const [username, setusername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setusername(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  /*
      Send registration data
  */

  const handleSubmit = async() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    };
    const response = await fetch(
      "http://localhost:3000/api/users/register",
      requestOptions
    );
    
    const data = await response.json();
    if (response.status !== 200) {
      console.log(data)
    }
      navigate('/')
      window.location.reload(false);
    

  };

  return (
    <div className="flex flex-col justify-center items-center pt-32">
      <h1 className="text-4xl pb-5">Registration</h1>
      <div className=" flex flex-col justify-center items-center bg-zinc-600 w-1/4 rounded-md  ">
        <div >
          <div className="grid my-4 justify-center items-center ">
            <label className=" " htmlFor="username">
              Username{" "}
            </label>
            <input
              className="px-1"
              type="text"
              id="username"
              placeholder="username"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="grid my-4">
            <label className="" htmlFor="email">
              Email{" "}
            </label>
            <input
              className="px-1"
              type="email"
              id="email"
              placeholder="Email "
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="grid my-4">
            <label className="" htmlFor="password">
              Password{" "}
            </label>
            <input
              className="px-1"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="grid my-4">
            <label className="" htmlFor="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="px-1"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className="pb-5">
          <button
            className="bg-blue-900 hover:bg-slate-700 py-2 px-4 rounded-md"
            onClick={() => handleSubmit()}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
