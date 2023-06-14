import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);


  const {
    setSelectedTvSeries,
    handleUserList, 
    userList,
  } = useContext(DataContext);

  const navigate = useNavigate();

  /*
        go to show details
*/

  const goToShowDetails = (tvSeries) => {
    setSelectedTvSeries(tvSeries.id);
    localStorage.setItem("showId", tvSeries.id )
    let str = tvSeries.name;
    str = str.replace(/\s+/g, "-").toLowerCase();
    navigate(`/details/${str}`);
  };

  /*
    Change password function
*/

  const handleChangePassword = async () => {
    if (confirmPassword === newPassword && newPassword !== oldPassword) {
      const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      };
      const response = await fetch(
        "http://localhost:3000/api/users/password",
        requestOptions
      );
      const data = await response.json();
      if (response.status !== 200) {
      } else {
        setChangePassword(false);
      }
    }
  };

  /*
    Get user data
*/

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



  /*
    Delete show from user watched list
*/


  const deleteFromWatched = async(id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showId:id }),
    };

    const response = await fetch(
      "http://localhost:3000/api/lists",
      requestOptions
    );
    if (response.status !== 204) {
    } else {
        window.location.reload(false);     
    }


  };


  /*
    Call user list and user data function
*/

  useEffect(() => {
    handleUserData();
    handleUserList();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <div className="flex flex-col  justify-center items-center pt-32">
            <div className="flex px-4">
              <h1 className=" text-2xl mr-4">Username:</h1>
              <p className="text-xl pt-1">{userData.username}</p>
            </div>
            <div className="flex px-4">
              <h1 className=" text-2xl mr-4">Email:</h1>
              <p className="text-xl pt-1">{userData.email}</p>
            </div>
            <div className="flex px-4 pt-4"></div>
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
                  </div>
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
              ) : null}
            </div>
            <button
              className="bg-blue-900 hover:bg-slate-700 py-2 mx-4 px-4 rounded-md"
              onClick={() => {
                if (changePassword) {
                  handleChangePassword();
                }
                setChangePassword(true);
              }}
            >
              Change Password
            </button>
          </div>
          <div className="">
            <h1 className="text-3xl pt-8 px-5 font-semibold"> Watched Shows</h1>
            <div className="flex flex-wrap justify-center px-4">
            {userList ? userList.map ( (userList) => {
                  return (
                    <div
                      className="flex flex-col justify-between items-center mx-2 w-1/5 mb-10 "
                      key={userList.show.id}
                    >
                      <h1
                        className="text-xl mb-6 text-center hover:cursor-pointer hover:scale-125 ease-in duration-500"
                        onClick={() => goToShowDetails(userList.show)}
                      >
                        {userList.show.name}
                      </h1>
                      <img
                        className="flex hover:cursor-pointer hover:scale-125 ease-in duration-500"
                        alt="poster"
                        onClick={() => goToShowDetails(userList.show)}
                        src={userList.show.imagePath}
                      />
                                          <div className="py-2">
                      <button className="hover:bg-slate-700 bg-blue-900 px-2 py-2 rounded-md  first-letter"
                      onClick={() => deleteFromWatched(userList.show.id)}>
                        Not Watched
                      </button>
                    </div>
                    </div>
                  );
                })
              : null}
              </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
