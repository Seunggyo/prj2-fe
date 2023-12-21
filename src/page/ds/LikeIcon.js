import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";

export function LikeIcon({ type }) {
  const animateStyle = {
    animate: { scale: [0, 1], y: [20, 0] },
    transition: { type: "spring" },
  };
  if (type === "like") {
    return (
      <motion.div {...animateStyle}>
        <FontAwesomeIcon color="red" icon={fullHeart} size="xl" />
      </motion.div>
    );
  }
  return (
    <motion.div {...animateStyle}>
      <FontAwesomeIcon color="red" icon={emptyHeart} size="xl" />
    </motion.div>
  );
}
