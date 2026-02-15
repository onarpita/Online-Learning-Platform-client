import React, { use, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { RxAvatar } from "react-icons/rx";
import {
  Settings,
  Users,
  FolderPlus,
  BarChart3,
  Home,
  LogOut,
  Menu,
  X,
  UserCircle,
  ExternalLink,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Title } from "react-head";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user, signOutUser } = use(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => setSidebarOpen(false);

  // Synchronized logout logic from Navbar
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Log Out Successfully");
        navigate("/"); // Redirect to home after logout
      })
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed");
      });
  };

  return (
    <div className="flex h-screen bg-base-300 overflow-hidden relative">
      <Title>Admin Panel | TURITOR</Title>

      {/* --- Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        ></div>
      )}

      {/* --- Admin Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-bold text-primary border-b border-slate-800 flex justify-between items-center">
          <div>
            TURITOR{" "}
            <span className="text-xs block text-white opacity-50 font-normal">
              ADMIN CONSOLE
            </span>
          </div>
          <button className="lg:hidden text-white" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard/admin"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-primary text-slate-900 font-bold"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <BarChart3 size={20} /> Overview
          </NavLink>
          <NavLink
            to="/dashboard/admin/manage-user"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-primary text-slate-900 font-bold"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <Users size={20} /> Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/add-courses"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-primary text-slate-900 font-bold"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <FolderPlus size={20} /> Add Course
          </NavLink>
          <NavLink
            to="/dashboard/admin/site-setting"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-primary text-slate-900 font-bold"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <Settings size={20} /> Site Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition w-full"
          >
            <Home size={16} /> Return to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition w-full"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* --- Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-base-100 shadow-sm flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden btn btn-ghost btn-sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="badge badge-primary font-bold p-3 uppercase hidden sm:flex">
              Administrative Access
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* --- Integrated Profile Dropdown --- */}
            <div className="dropdown dropdown-end border-l pl-4">
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer flex items-center gap-2"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full border border-primary object-cover"
                    alt="Admin Avatar"
                  />
                ) : (
                  <RxAvatar className="w-10 h-10 text-base-content/70" />
                )}
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu z-[60] bg-base-100 rounded-box w-64 p-2 shadow-xl border border-base-300 mt-2"
              >
                <li className="px-4 py-3 border-b border-base-200 mb-2">
                  <p className="font-bold text-base-content">
                    {user?.displayName || "Administrator"}
                  </p>
                  <p className="text-xs text-base-content/60 truncate">
                    {user?.email}
                  </p>
                </li>
                <li>
                  <Link to="/user-profile" className="flex items-center gap-2">
                    <UserCircle size={18} /> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center gap-2">
                    <ExternalLink size={18} /> View Website
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-base-200/50">
          {/* Dynamic components render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;