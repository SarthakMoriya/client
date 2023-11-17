import React from "react";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("is_verified");
    navigate("http://localhost:3000/login");
  };
  return (
    <>
      {!location.pathname.includes("pdf") && (
        <nav className="bg-white border-gray-200  border-b-4 border-b-primary fixed w-full z-10">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-8 mr-3" alt="WebCooks" />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                WebCooks
              </span> */}
            </Link>
            {/* LOGGEDIN NAVBAR */}
            {user !== null && (
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700 text-blue">
                  {/* CREATE RECORD */}
                  <li>
                    <Link
                      to="/create"
                      className="block py-2 pl-3 pr-4 rounded "
                      aria-current="page"
                    >
                      Create
                    </Link>
                  </li>
                  {/* MY PANEL */}
                  {user?.role !== "admin" && (
                    <li>
                      <Link
                        to="/mypanel"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded "
                      >
                        MyPanel
                      </Link>
                    </li>
                  )}

                  {/* ADMIN PANEL */}
                  {user?.role === "admin" && (
                    <li>
                      <Link
                        to="/admin/panel"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded "
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}

                  {/* LOGOUT */}
                  <li>
                    <Link
                      href="#"
                      onClick={handleLogout}
                      className="block py-2 pl-3 pr-4 text-gray-900 bg-secondary rounded  "
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* NAVBAR WITHOUT LOGIN */}
            {user === null && (
              <>
                <div
                  className="hidden w-full md:block md:w-auto"
                  id="navbar-default"
                >
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white   dark:border-gray-700">
                    <li>
                      <Link
                        to="/login"
                        className=" block  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 px-2 py-2"
                        aria-current="page"
                      >
                        Signin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="bg-secondary block  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:hover:text-blue-700 px-2 py-2 hover:border-secondary hover:border-2 border-2"
                      >
                        SignUp
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
