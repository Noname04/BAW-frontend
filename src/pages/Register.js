import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const [infoUser, setInfoUser] = useState(false);
  const [infoPassword, setInfoPassword] = useState(false);

  const [sent, setSent] = useState(false);

  const navigate = useNavigate();

  /*
      Send registration data
  */

      const emailRegex =
      new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

  /*
    Sent data to backend 
  */

  const handleSubmit = async () => {
    if (username && email && password && confirmPassword) {
      if (username.length >= 6 && password.length >= 6 && emailRegex.test(email)) {
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
        if (response.status !== 201) {
          setServerResponse(data.error);
          console.log(data);
        } else {
          navigate("/login");
          window.location.reload(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-32">
      <h1 className="text-4xl pb-5">Registration</h1>
      <div className=" flex flex-col justify-center items-center bg-zinc-600 w-1/4 rounded-md  ">
        <div className=" flex flex-col justify-center items-center">
          <div className="grid my-4 ">
            <label className=" " htmlFor="username">
              Username{" "}
            </label>
            <input
              className="px-1"
              type="text"
              id="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => {
                setInfoUser(true);
                setInfoPassword(false);
              }}
            />
          </div>
          {infoUser && username.length < 6 ? (
            <Alert className="mb-4" severity="info">
              {" "}
              Username must have at least 6 characters.{" "}
            </Alert>
          ) : null}
          <div className="grid my-4">
            <label className="" htmlFor="email">
              Email{" "}
            </label>
            <input
              className="px-1"
              type="email"
              id="email"
              placeholder="Email "
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => {
                setInfoUser(false);
                setInfoPassword(false);
              }}
            />
          </div>
          {sent && !emailRegex.test(email) && email ? (
            <Alert className="mb-4" severity="error">
              {" "}
              Incorrect email.{" "}
            </Alert>
          ) : null}
          <div className="grid my-4">
            <label className="" htmlFor="password">
              Password{" "}
            </label>
            <input
              className="px-1"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                setInfoPassword(true);
                setInfoUser(false);
              }}
            />
          </div>
          {infoPassword && password.length < 6 ? (
            <Alert className="mb-4" severity="info">
              {" "}
              Password must have at least 6 characters.{" "}
            </Alert>
          ) : null}
          <div className="grid my-4">
            <label className="" htmlFor="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="px-1"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => {
              }}
            />
          </div>
          {sent && password !== confirmPassword && password ? (
            <Alert className="mb-4" severity="error">
              {" "}
              Passwords don't match.{" "}
            </Alert>
          ) : null}
        </div>
        <div className="pb-5">
          <button
            className="bg-blue-900 hover:bg-slate-700 py-2 px-4 rounded-md"
            onClick={() => {
              handleSubmit();
              setSent(true);
              setInfoUser(false);
              setInfoPassword(false);
            }}
          >
            Register
          </button>
        </div>
        {sent && (!username || !email || !password || !confirmPassword) ? (
          <Alert className="mb-4" severity="error">
            {" "}
            No field can be empty.
          </Alert>
        ) : null}
        {sent && serverResponse ? (
          <Alert className="mb-4" severity="error">
            {" "}
            {serverResponse}
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default Register;
