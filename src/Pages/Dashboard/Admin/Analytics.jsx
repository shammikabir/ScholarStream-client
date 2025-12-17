import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AuthContext } from "../../../Provider/AuthContext";
import { FaUsers, FaDollarSign, FaGraduationCap } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const GRADIENTS = [
  { start: "#1b4636", end: "#54b89a" },
  { start: "#2e7d65", end: "#8cdac0" },
  { start: "#54b89a", end: "#c1f2e3" },
  { start: "#8cdac0", end: "#146c43" },
  { start: "#c1f2e3", end: "#0f4e32" },
];

const PIE_COLORS = ["#146c43", "#2e7d65", "#54b89a", "#8cdac0", "#c1f2e3"];

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFees: 0,
    totalScholarships: 0,
  });

  const [universityData, setUniversityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const { data } = await axiosSecure.get(
      `${import.meta.env.VITE_API_URL}/analytics`
    );
    setStats({
      totalUsers: data.totalUsers,
      totalFees: data.totalFees,
      totalScholarships: data.totalScholarships,
    });
    setUniversityData(data.universityApplications);
    setCategoryData(data.categoryDistribution);
  };

  return (
    <div className="p-8 bg-gradient-to-b from-[#e9f7f3] to-[#ffffff] min-h-screen">
      <h1 className="text-4xl font-bold text-[#1b4636] mb-10 text-center">
        Platform Analytics
      </h1>

      {/* Top Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {[
          {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <FaUsers size={20} className="text-white" />,
            bg: "bg-linear-to-r from-[#1a3c30] via-[#276B51] to-[#2C6B58]",
          },
          {
            title: "Total Fees Collected",
            value: `$${stats.totalFees}`,
            icon: <FaDollarSign size={20} className="text-white" />,
            bg: "bg-gradient-to-r from-teal-600 to-teal-400",
          },
          {
            title: "Total Scholarships",
            value: stats.totalScholarships,
            icon: <FaGraduationCap size={20} className="text-white" />,
            bg: "bg-linear-to-r from-[#1a3c30] via-[#276B51] to-[#2C6B58]",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-md border border-gray-200 transition hover:shadow-xl"
          >
            <div
              className={`p-3 rounded-full ${card.bg} flex items-center justify-center`}
            >
              {card.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="text-gray-600 font-medium text-sm">
                {card.title}
              </h3>
              <p className="text-xl font-bold text-[#1b4636] mt-1">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-10 mt-12">
        {/* Applications per University - Bar Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-[#1b4636]">
            Applications per University
          </h2>
          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={universityData} margin={{ bottom: 50, top: 20 }}>
                <XAxis
                  dataKey="university"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {universityData.map((entry, index) => {
                    const values = universityData.map((u) => u.count);
                    const max = Math.max(...values);
                    const min = Math.min(...values);
                    let color = "#54b89a";
                    if (entry.count === max) color = "#1b4636";
                    else if (entry.count === min) color = "#c1f2e3";
                    return <Cell key={index} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scholarship Category Distribution - Pie Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-[#1b4636]">
            Scholarship Category Distribution
          </h2>
          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  paddingAngle={4}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, `${name}`]}
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    borderRadius: 10,
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
