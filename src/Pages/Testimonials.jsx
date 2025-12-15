import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Master's Student, Germany",
    photo:
      "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
    message:
      "ScholarStream helped me secure a scholarship at my dream university. The process was smooth and the guidance invaluable!",
  },
  {
    name: "John Smith",
    role: "Undergraduate Student, USA",
    photo:
      "https://img.freepik.com/premium-photo/beautiful-woman-profile-picture_1013690-85.jpg?w=2000",
    message:
      "I never thought applying for scholarships could be this easy. Thanks to ScholarStream, I got a full scholarship!",
  },
  {
    name: "Priya Sharma",
    role: "PhD Candidate, UK",
    photo:
      "https://static.vecteezy.com/system/resources/previews/039/334/804/non_2x/ai-generated-indian-female-student-free-photo.jpg",
    message:
      "The platform is very intuitive and provides up-to-date scholarship information. Highly recommend it to every student!",
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#e0f2f1] to-[#ffffff] py-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#1b4636]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#276B51]/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b4636] mb-4">
          🌟 Success Stories
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Hear from our students who achieved their dreams with ScholarStream.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto relative z-10">
        {testimonials.map((testi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative bg-gradient-to-br from-white to-[#e0f7f4] 
                       p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 
                       flex flex-col items-center text-center hover:shadow-3xl transition-all"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1b4636]/20 rounded-full blur-2xl"></div>
            <img
              src={testi.photo}
              alt={testi.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4 border-4 border-green-700 shadow-lg"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-[#1b4636]">
              {testi.name}
            </h3>
            <p className="text-[#276B51] text-sm sm:text-base font-medium mb-4">
              {testi.role}
            </p>
            <p className="text-gray-700 italic text-sm sm:text-base">{`"${testi.message}"`}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
