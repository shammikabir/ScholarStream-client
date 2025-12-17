import errorimg from "../assets/Fehler_404_Zeichen___Premium_Vektor-removebg-preview.png";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col
      "
    >
      <Navbar></Navbar>

      {/* Error Section */}
      <div className=" flex items-center justify-center px-4 mt-15">
        <div className="text-center max-w-md">
          <img
            src={errorimg}
            alt="Error"
            className="mx-auto mb-4 w-72 md:w-96 drop-shadow-lg"
          />

          <h2 className="md:text-4xl text-2xl font-bold mb-3">
            OOPS, PAGE NOT FOUND!
          </h2>

          <p className="text-sm md:text-base mb-6">
            The page you are looking for doesn’t exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-block bg-[#276B51] text-white  hover:bg-[#1a3c30] transition px-6 py-3 mb-15 rounded-lg text-lg font-medium shadow-md "
          >
            Go Back Home
          </Link>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
