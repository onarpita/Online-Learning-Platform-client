import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router";

const UserProfile = () => {
  const { user } = use(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login First</h2>
          <Link to="/auth/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div
        className="bg-base-100 rounded-lg shadow-lg overflow-hidden"
        data-aos="fade-up"
      >
        {/* Header Background */}
        <div className="h-32 bg-linear-to-r from-primary to-secondary"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 mb-6">
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-base-100 object-cover shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-base-100 bg-primary flex items-center justify-center shadow-lg">
                  <User size={64} className="text-white" />
                </div>
              )}
              <Link
                to="/user-profile/edit"
                className="absolute bottom-0 right-0 btn btn-sm btn-primary rounded-full"
              >
                Edit
              </Link>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {user.displayName || "User"}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Mail size={18} /> {user.email}
              </p>
            </div>
          </div>

          {/* Profile Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-base-200 p-4 rounded-lg">
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <User size={16} /> Full Name
              </p>
              <p className="text-lg font-semibold">
                {user.displayName || "Not set"}
              </p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <Mail size={16} /> Email
              </p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <Calendar size={16} /> Member Since
              </p>
              <p className="text-lg font-semibold">
                {user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <MapPin size={16} /> Account Status
              </p>
              <p className="text-lg font-semibold text-green-600">
                {user.emailVerified ? "Verified" : "Unverified"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link to="/user-profile/edit" className="btn btn-primary">
              Edit Profile
            </Link>
            <Link to="/courses/my-enrolled-courses" className="btn btn-outline">
              My Courses
            </Link>
            <Link to="/user-profile/settings" className="btn btn-outline">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;