import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 text-center">
        <FaTimesCircle className="text-red-600 text-7xl mx-auto mb-6" />

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Cancelled
        </h2>

        <p className="text-gray-500 mb-8">
          Your payment was not completed. You can try again anytime.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 rounded-2xl text-lg font-semibold text-white
            bg-red-600
            hover:scale-[1.02] transition"
        >
          Try Again
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

export default PaymentCancel;
