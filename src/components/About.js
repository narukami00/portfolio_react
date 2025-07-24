import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import profilePic from "../img/profile_pic.jpg";
import "./About.css";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
    hidden: {},
  };

  const textVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 40 },
  };

  const imageVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -40 },
  };

  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Left Side Image */}
        <motion.div
          className="about-image-container"
          variants={imageVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="glow-wrapper">
            <img src={profilePic} alt="Rafsan" className="about-image" />
          </div>
        </motion.div>

        {/* Right Side Text */}
        <motion.div className="about-text-content" variants={containerVariants}>
          <motion.h2
            className="about-heading"
            variants={textVariants}
            transition={{ duration: 0.5 }}
          >
            <span className="gradient-text">About Me</span>
          </motion.h2>

          {[
            `Greetings! I'm Rafsan Riasat from Chattogram, Bangladesh.`,
            `With a foundation in Computer Science & Engineering from KUET, I specialize in Android app development using Flutter and frontend development with React.`,
            `Driven by a passion for creating clean, user-focused digital experiences, I continuously expand my skills in machine learning and backend development.`,
            `Outside of coding, I enjoy exploring emerging technologies, developing side projects, and deepening my understanding of complex systems.`,
            `I approach challenges with curiosity and a commitment to delivering effective, scalable solutions.`,
          ].map((text, i) => (
            <motion.p
              key={i}
              className="about-paragraph"
              variants={textVariants}
              transition={{ duration: 0.5 }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
