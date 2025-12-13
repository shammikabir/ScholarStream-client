import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 text-center">
        <FaCheckCircle className="text-green-600 text-7xl mx-auto mb-6" />

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-500 mb-8">
          Your scholarship application payment has been completed successfully.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-4 rounded-2xl text-lg font-semibold text-white
            bg-[#276B51]
            hover:scale-[1.02] transition"
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
