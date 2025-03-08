import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function PaymentPopup({ onClose }) {
  if (!onClose) return null; // ✅ Prevents issues if onClose is missing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-96"
      >
        <div className="flex flex-col items-center p-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-xl font-semibold mt-4">Payment Successful!</h2>
          <p className="text-gray-600 mt-2">
            Your transaction has been completed.
          </p>
          <button
            onClick={onClose} // ✅ Close the popup when clicked
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
