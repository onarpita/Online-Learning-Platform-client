import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Bell, Shield, Moon, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const UserSettings = () => {
  const { signOutUser } = use(AuthContext);
  const [notifications, setNotifications] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(true);

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8" data-aos="fade-down">
        Settings
      </h1>

      <div className="space-y-6">
        {/* Notification Settings */}
        <div
          className="bg-base-100 rounded-lg shadow p-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="text-primary" size={24} />
              <div>
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-sm text-gray-600">
                  Receive course updates and messages
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </div>
        </div>

        {/* Email Updates */}
        <div
          className="bg-base-100 rounded-lg shadow p-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="text-secondary" size={24} />
              <div>
                <h3 className="text-lg font-semibold">Email Updates</h3>
                <p className="text-sm text-gray-600">
                  Get weekly digest of course activities
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              checked={emailUpdates}
              onChange={(e) => setEmailUpdates(e.target.checked)}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div
          className="bg-base-100 rounded-lg shadow p-6"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="text-warning" size={24} />
              <div>
                <h3 className="text-lg font-semibold">Privacy Settings</h3>
                <p className="text-sm text-gray-600">
                  Control who can see your profile
                </p>
              </div>
            </div>
            <button className="btn btn-sm btn-outline">Manage</button>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className="bg-red-50 dark:bg-red-900/20 rounded-lg shadow p-6 border border-red-200"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Danger Zone
          </h3>
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-error w-full sm:w-auto"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;