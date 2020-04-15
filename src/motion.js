
import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      scale: 1
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1
    }
  };
  
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1
  };
  
  const pageStyle = {
    // position: "fixed",
  };

export default function Motion(props) {
    return(
        <motion.div
            style={pageStyle}
            className="row"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {props.children}
        </motion.div>
    )
}