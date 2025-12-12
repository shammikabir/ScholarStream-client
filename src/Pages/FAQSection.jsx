import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import faqImage from "../assets/Unlocking Futures.png";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // SCHOLARSHIP MANAGEMENT FAQs
  const faqs = [
    {
      question: "How can I apply for a scholarship through this platform?",
      answer:
        "You can browse scholarships, check eligibility, submit applications, upload documents, and track your progress in real time from your dashboard.",
    },
    {
      question: "Can I apply for multiple scholarships at once?",
      answer:
        "Yes, you can apply to multiple scholarships as long as you meet their eligibility requirements.",
    },
    {
      question: "How long does it take to receive a scholarship decision?",
      answer:
        "Most scholarship providers take 2–6 weeks to review applications. You will receive dashboard and email notifications instantly.",
    },
    {
      question: "What documents are required for scholarship applications?",
      answer:
        "Common documents include academic transcripts, ID/passport, recommendation letter, motivation letter, and income certificate. Requirements vary by scholarship.",
    },
    {
      question: "Is my personal and academic data safe?",
      answer:
        "Yes. All data is encrypted and stored securely. We never share your information with unauthorized parties.",
    },
    {
      question: "Can I edit my application after submitting it?",
      answer:
        "You can edit application information or documents until the scholarship deadline. After the deadline, editing is disabled.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-linear-to-b from-[#e9f7f3] to-[#ffffff]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* FAQ LEFT SIDE */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-[#1b4636]"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 border-b-3 border-green-600 text-left font-medium text-lg hover:bg-gray-50 transition"
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <FiMinus className="text-xl text-black" />
                  ) : (
                    <FiPlus className="text-xl text-black" />
                  )}
                </button>

                {/* ANSWER */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-gray-700"
                    >
                      <p className="text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src={faqImage}
            alt="FAQ illustration"
            className="w-11/12 md:w-full  rounded-xl 
                       "
          />
        </motion.div>
      </div>
    </section>
  );
}
