import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }



  const handleSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(
      "http://localhost:3000/api/login",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 200) {
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate('/')
      window.location.reload(false);
    }
  };

  /*  const handleSubmit = () => {
    if (validateForm()) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    fetch("http://localhost:3000/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
      });
      navigate('/')
    console.log(localStorage.getItem("token"));
  }
  };
*/
  return (
    <div className="flex flex-col justify-center items-center pt-32">
      <h1 className="text-4xl pb-5">Log In</h1>
      <div className="flex flex-col justify-center items-center bg-zinc-600 w-1/4 rounded-md ">
        <div className="grid my-4">
          <label>Email address</label>
          <input
            type="email"
            className="px-1"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid my-4">
          <label>Password</label>
          <input
            type="password"
            className="px-1"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="pb-5">
          <button
            className="bg-blue-900 hover:bg-slate-700 py-2 px-4 rounded-md"
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
