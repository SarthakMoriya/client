import { motion } from "framer-motion";
import React from "react";

const PrimaryButton = ({text,disabled=false,click,type='button'}) => {
  return (
    <motion.button
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 1.9, ease: "easeInOut" }}
      disabled={disabled}
      onClick={click}
      type={type}
      className="w-full text-blue bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-500"
    >
      {text}
    </motion.button>
  );
};

export default PrimaryButton;
