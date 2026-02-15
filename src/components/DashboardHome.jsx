import React, { use, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import MyEnrollment from "./MyEnrollment";
import MyCourses from "./MyCourses";
import axiosInstance from "../context/Axios";
import {
  BookOpen,
  GraduationCap,
  Trophy,
  Activity,
  Target,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const [serverCourses, setServerCourses] = useState([]);
  const [serverEnrollments, setServerEnrollments] = useState([]);
  const email = user?.email;

  useEffect(() => {
    if (!email) return;
    axiosInstance
      .get("/my-courses", { params: { email } })
      .then((res) => setServerCourses(res.data));
    axiosInstance
      .get("/my-enrollment", { params: { email } })
      .then((res) => setServerEnrollments(res.data));
  }, [email]);

  // Data for Radar Chart: Balance of Activity
  const radarData = [
    { subject: "Courses Created", A: serverCourses.length * 10, fullMark: 100 },
    { subject: "Enrolled", A: serverEnrollments.length * 10, fullMark: 100 },
    {
      subject: "Completed",
      A: serverEnrollments.filter((e) => e.completed).length * 10,
      fullMark: 100,
    },
    { subject: "Engagement", A: 80, fullMark: 100 },
    { subject: "Reviews", A: 60, fullMark: 100 },
  ];

  const completionData = useMemo(() => {
    const completed = serverEnrollments.filter((e) => e.completed).length;
    const inProgress = serverEnrollments.length - completed;
    return [
      { name: "Completed", value: completed },
      { name: "In Progress", value: inProgress },
    ];
  }, [serverEnrollments]);

  const COLORS = ["#6366f1", "#f43f5e", "#10b981"];

  return (
    <div className="p-2 md:p-6 space-y-8">
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tight">
            Hello, {user?.displayName?.split(" ")[0] || "Learner"}!
          </h1>
          <p className="mt-2 text-indigo-100 max-w-lg font-medium opacity-90">
            Your learning ecosystem is growing. You have active control over{" "}
            <span className="text-white font-bold underline decoration-wavy">
              {serverCourses.length + serverEnrollments.length}
            </span>{" "}
            educational assets.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Activity size={180} />
        </div>
      </div>

      {/* --- TRENDY STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Owned Courses",
            val: serverCourses.length,
            icon: <BookOpen />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total Enrollments",
            val: serverEnrollments.length,
            icon: <GraduationCap />,
            color: "text-rose-600",
            bg: "bg-rose-50",
          },
          {
            label: "Completion Rate",
            val: `${Math.round(
              (serverEnrollments.filter((e) => e.completed).length /
                serverEnrollments.length || 0) * 100
            )}%`,
            icon: <Trophy />,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`flex items-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} mr-4`}>
              {React.cloneElement(stat.icon, { size: 28 })}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <h4 className="text-3xl font-bold text-gray-800">{stat.val}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* --- ADVANCED CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart: Skill/Activity Balance */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Target className="text-indigo-600" /> Platform Profile
            </h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Radar
                  name="Activity"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Progress Distribution */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl mb-6">Learning Distribution</h3>
          <div className="h-72 w-full">
            {serverEnrollments.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completionData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {completionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend iconType="circle" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Activity size={48} className="mb-2 opacity-20" />
                <p>No enrollment activity yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTIONS --- */}
      <div className="space-y-12">
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
          <MyEnrollment />
        </div>

        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
          <MyCourses />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;