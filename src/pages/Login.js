import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation , setValidation] = useState(false);
  const [sent, setSent] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if(email && password){
      console.log("wysłano");
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
      setValidation(true);
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate('/')
      window.location.reload(false);
    }
  }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-32">
      <h1 className="text-4xl pb-5">Log In</h1>
      <div className="flex flex-col  justify-center items-center bg-zinc-600 w-1/4 rounded-md ">
        <div className="grid my-4">
          <label>Email address</label>
          <input
            type="email"
            className="px-1"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setValidation(false)}
          />      
        </div>
        {sent && !email ? (<Alert className="mb-4" severity="error"> Email can't be empty. </Alert>): null}
        <div className="grid mb-2">
          <label>Password</label>
          <input
            type="password"
            className="px-1"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setValidation(false)}
          />
        </div>
        {sent && !password ? (<Alert className="mb-4" severity="error"> Password can't be empty. </Alert>): null}
        <div className="pb-5">
          <button
            className="bg-blue-900 hover:bg-slate-700 py-2 px-4 rounded-md"
            onClick={() => {
              handleSubmit();
              setSent(true);

            }}
          >
            Login
          </button>
        </div>
        {sent && validation && email && password ? (<Alert className="mb-4" severity="error"> Wrong email or password. </Alert>
          ):null}

      </div>
    </div>
  );
};

export default Login;
