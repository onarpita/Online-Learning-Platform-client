import logo from "../assets/logo.png";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { RxAvatar } from "react-icons/rx";

export default function Navbar() {
  const { user, signOutUser, loading } = use(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  const signOut = () => {
    console.log("clicked sign out");
    signOutUser()
      .then(() => {
        toast.success("Log Out Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav
      data-aos="fade-down"
      className="z-50 bg-base-100 sticky top-0 shadow-md"
    >
      <nav className="text-base-content px-4 md:px-0 py-3 flex items-center justify-between  max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        <ul className="hidden md:flex items-center gap-6 font-semibold">
          <NavLink to="/" className="hover:text-primary cursor-pointer">
            HOME
          </NavLink>
          <NavLink to="/courses" className="hover:text-primary cursor-pointer">
            COURSES
          </NavLink>
          <NavLink to="/pricing" className="hover:text-primary cursor-pointer">
            PRICING
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/certificates"
                className="hover:text-primary cursor-pointer"
              >
                CERTIFICATES
              </NavLink>
              <NavLink
                to="/user-profile"
                className="hover:text-primary cursor-pointer"
              >
                PROFILE
              </NavLink>
            </>
          )}
        </ul>

        {/* <div className="hidden lg:flex items-center bg-base-200 rounded-md px-2 ml-4">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none px-2 py-1 text-sm"
          />
        </div> */}

        <div className="flex items-center gap-4 ml-4">
          <ThemeToggle></ThemeToggle>

          <div className="navbar-start md:hidden">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <NavLink to="/" className="hover:text-primary cursor-pointer">
                  HOME
                </NavLink>
                <NavLink
                  to="/courses"
                  className="hover:text-primary cursor-pointer"
                >
                  COURSES
                </NavLink>
                <NavLink
                  to="/pricing"
                  className="hover:text-primary cursor-pointer"
                >
                  PRICING
                </NavLink>

                {user && (
                  <>
                    <div className="divider my-1"></div>
                    <NavLink
                      to="/dashboard"
                      className="hover:text-primary cursor-pointer"
                    >
                      DASHBOARD
                    </NavLink>
                    <NavLink
                      to="/certificates"
                      className="hover:text-primary cursor-pointer"
                    >
                      CERTIFICATES
                    </NavLink>
                    <NavLink
                      to="/user-profile"
                      className="hover:text-primary cursor-pointer"
                    >
                      PROFILE
                    </NavLink>
                  </>
                )}
              </ul>
            </div>
          </div>

          {user ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <div
                tabIndex={0}
                className="cursor-pointer m-1 flex gap-2 items-center"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <RxAvatar className="w-8 h-8" />
                )}
              </div>

              <ul
                tabIndex={-1}
                className="dropdown-content menu z-100 bg-base-100 rounded-box w-[280px] p-2 shadow-md"
              >
                <li>
                  <Link to="/user-profile" className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <RxAvatar className="w-8 h-8" />
                    )}
                    <div>
                      <p className="font-semibold">My Profile</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </Link>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <Link
                    to="/courses/my-courses"
                    className="flex items-center gap-2"
                  >
                    <span>My Courses</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/my-enrolled-courses"
                    className="flex items-center gap-2"
                  >
                    <span>My Enrolled Courses</span>
                  </Link>
                </li>
                <li>
                  {user.email == "demoadmin@turitor.com" ? (
                    <Link
                      to="/dashboard/admin"
                      className="flex items-center gap-2"
                    >
                      <span>Dashboard</span>
                    </Link>
                  ) : (
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <span>Dashboard</span>
                    </Link>
                  )}
                </li>

                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={signOut}
                    className="text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </nav>
  );
}