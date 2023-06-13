import React from "react";

export default function Navbar() {

  return (
    <div className="flex justify-between sticky z-10 items-center top-0 bg-gradient-to-r from-slate-900 to-zinc-600 text-white">
      <div>
        <a href="/">
          <h1 className="text-4xl px-2 py-1 hover:bg-slate-700 rounded-md mx-2 my-2">
            WatchList
          </h1>
        </a>
      </div>

      <ul className=" flex space-x-6  text-xl  px-10 ">
        {localStorage.getItem("token") === null ? (
          <>
            <a href="/login">
              <li className="className=' bg-blue-900 px-4 py-2 rounded-md ' hover:bg-slate-700 ">
                Login
              </li>
            </a>
            <a href="/register">
              <li className="className=' bg-blue-900 px-4 py-2 rounded-md ' hover:bg-slate-700 ">
                Register
              </li>
            </a>
          </>
        ) : (
          <>
            <a href="/profile">
              <li className="className=' bg-blue-900 px-4 py-2 rounded-md ' hover:bg-slate-700 ">
                My profile
              </li>
            </a>
            <a href="/" onClick={ () => localStorage.clear()}>
              <li className="className=' bg-blue-900 px-4 py-2 rounded-md ' hover:bg-slate-700 ">
                Logout
              </li>
            </a>
          </>
        )}
      </ul>
    </div>
  );
}
