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
    const { data } = await axios.get(
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-[#1b4636] mb-8">
        Platform Analytics
      </h1>

      {/* Top Stats Cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
          <div className="p-4 bg-green-100 text-black rounded-full">
            <FaUsers size={28} />
          </div>
          <div>
            <h3 className="text-gray-600 font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-[#1b4636] mt-2">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
          <div className="p-4 bg-green-200 text-black rounded-full">
            <FaDollarSign size={28} />
          </div>
          <div>
            <h3 className="text-gray-600 font-medium">Total Fees Collected</h3>
            <p className="text-3xl font-bold text-[#1b4636] mt-2">
              ${stats.totalFees}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
          <div className="p-4 bg-green-300 text-black rounded-full">
            <FaGraduationCap size={28} />
          </div>
          <div>
            <h3 className="text-gray-600 font-medium">Total Scholarships</h3>
            <p className="text-3xl font-bold text-[#1b4636] mt-2">
              {stats.totalScholarships}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
        {/* Bar Chart */}
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-4">
            Applications per University
          </h2>

          <BarChart
            lg:width={450}
            height={300}
            data={universityData}
            margin={{ bottom: 50, top: 20 }}
          >
            <XAxis
              dataKey="university"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-20}
              textAnchor="end"
            />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {universityData.map((entry, index) => {
                const values = universityData.map((u) => u.count);
                const max = Math.max(...values);
                const min = Math.min(...values);

                let color = "#1b4636"; // mid default

                if (entry.count === max) color = "Black";
                else if (entry.count === min) color = "#c1f2e3";

                return <Cell key={index} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">
            Scholarship Category Distribution
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                paddingAngle={3}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
