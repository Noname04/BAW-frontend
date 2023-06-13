import React, { useState, useEffect } from "react";

export default function Profile() {
  const [userData, setUserData] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleChangePassword = async() => {

    if(confirmPassword === newPassword && newPassword !== oldPassword){
    const requestOptions = {
      method: "PUT",
      mode:"cors",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      body: JSON.stringify({oldPassword ,newPassword }),
    };
    const response = await fetch(
      "http://localhost:3000/api/users/password",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 200) {
    }
    else {
    setChangePassword(false)
}

    }
  }

  const handleUserData = async () => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    const response = await fetch(
      "http://localhost:3000/api/users/profile",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 200) {
    }
    setUserData(data);
  };
  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
        <div className="flex flex-col justify-center items-center pt-32">
          <div className="flex px-4">
            <h1 className=" text-2xl mr-4">Username:</h1>
            <p className="text-xl pt-1">{userData.username}</p>
          </div>
          <div className="flex px-4">
            <h1 className=" text-2xl mr-4">Email:</h1>
            <p className="text-xl pt-1">{userData.email}</p>
          </div>
          <div className="flex px-4 pt-4">
          </div>
          <div className="px-4 py-4">
            {changePassword ? (
                <>
            <div className="py-1">
              <input
                type="password"
                className="px-1 rounded-md"
                placeholder="Enter old password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div >
            <div className="py-1">
              <input
                type="password"
                className="px-1 rounded-md"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="py-1">
              <input
                type="password"
                className="px-1 rounded-md"
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            </>
            ): null }
          </div>
          <button
              className="bg-blue-900 hover:bg-slate-700 py-2 mx-4 px-4 rounded-md"
              onClick={() =>{ if (changePassword) {
                handleChangePassword();
              } setChangePassword(true)}
            }
            >
              change password
            </button>
            </div>
            <div className="">
                <h1 className=""></h1>

            </div>
        </div>
        
      ) : null}
    </div>
  );
}
