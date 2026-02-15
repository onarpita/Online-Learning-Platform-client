import React, { use, useState } from "react";
import { Link, NavLink, useNavigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  User as UserIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Loading from "./Loading";
import { Title } from "react-head";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user, loading, signOutUser } = use(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Loading />;

  // Admin Check
  if (user?.email === "demoadmin@turitor.com") {
    return <AdminDashboard />;
  }

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged Out Successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive
        ? "bg-primary text-primary-content shadow-md"
        : "hover:bg-base-300"
    }`;

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden relative">
      <Title>Dashboard | TURITOR</Title>

      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-base-100 border-r border-base-300 
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 border-b border-base-300 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary tracking-tighter">
            TURITOR
          </h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 ml-3 mb-2 uppercase tracking-wider">
            Main Menu
          </p>
          <NavLink
            to="/dashboard"
            end
            onClick={() => setSidebarOpen(false)}
            className={navLinkClass}
          >
            <LayoutDashboard size={20} /> Dashboard Home
          </NavLink>
          <NavLink
            to="/dashboard/mycourses"
            onClick={() => setSidebarOpen(false)}
            className={navLinkClass}
          >
            <BookOpen size={20} /> My Courses
          </NavLink>
          <NavLink
            to="/dashboard/certificates"
            onClick={() => setSidebarOpen(false)}
            className={navLinkClass}
          >
            <GraduationCap size={20} /> Certificates
          </NavLink>
          <NavLink
            to="/dashboard/add-courses"
            onClick={() => setSidebarOpen(false)}
            className={navLinkClass}
          >
            <BookOpen size={20} /> Add Courses
          </NavLink>
        </nav>

        <div className="p-4 border-t border-base-300">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-error hover:bg-error/10 rounded-lg transition font-semibold"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* --- Header --- */}
        <header className="h-16 bg-base-100 shadow-sm flex items-center justify-between px-4 lg:px-8 z-20 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 hover:bg-base-200 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold hidden sm:block">
              {user?.displayName
                ? `${user.displayName}'s Panel`
                : "Student Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer flex items-center gap-2"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                    alt="User"
                  />
                ) : (
                  <RxAvatar className="w-10 h-10 text-primary" />
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 border border-base-300"
              >
                <li className="menu-title text-center pb-2 border-b border-base-200 truncate">
                  {user?.email}
                </li>
                <li>
                  <Link to="/user-profile">
                    <UserIcon size={16} /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <LayoutDashboard size={16} /> Back to Home
                  </Link>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-semibold"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* --- Dynamic Content Area --- */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;