import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Award, Star, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router";

const MyCertificates = () => {
  const { user } = use(AuthContext);

  // Sample certificates data
  const certificates = [
    {
      id: 1,
      title: "Web Development Masterclass",
      issueDate: "2024-12-15",
      credential: "WEB-2024-12345",
      status: "Completed",
      score: 95,
    },
    {
      id: 2,
      title: "React Advanced Concepts",
      issueDate: "2024-11-20",
      credential: "REACT-2024-67890",
      status: "Completed",
      score: 88,
    },
    {
      id: 3,
      title: "JavaScript ES6+",
      issueDate: "2024-10-10",
      credential: "JS-2024-11111",
      status: "Completed",
      score: 92,
    },
  ];

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
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div
        className="bg-linear-to-r from-primary to-secondary text-white rounded-lg p-8 mb-8"
        data-aos="fade-down"
      >
        <div className="flex items-center gap-4">
          <Award size={48} />
          <div>
            <h1 className="text-3xl font-bold">My Certificates</h1>
            <p className="opacity-90">
              {certificates.length} certificate
              {certificates.length !== 1 ? "s" : ""} earned
            </p>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => (
          <div
            key={cert.id}
            className="bg-base-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            data-aos="flip-left"
            data-aos-delay={idx * 100}
          >
            {/* Certificate Card Header */}
            <div className="bg-linear-to-r from-primary/20 to-secondary/20 h-32 flex items-center justify-center relative">
              <Award className="text-primary" size={48} opacity={0.3} />
              <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                <CheckCircle size={20} />
              </div>
            </div>

            {/* Certificate Details */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star size={16} className="text-yellow-500" />
                  <span>Score: {cert.score}%</span>
                </div>
                <div className="bg-base-200 p-2 rounded text-xs">
                  <p className="font-semibold text-gray-600">Credential ID:</p>
                  <p className="font-mono">{cert.credential}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="btn btn-sm btn-primary flex-1">View</button>
                <button className="btn btn-sm btn-outline flex-1">Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="text-center py-12">
          <Award size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No Certificates Yet</h3>
          <p className="text-gray-600 mb-6">
            Complete courses to earn certificates
          </p>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCertificates;