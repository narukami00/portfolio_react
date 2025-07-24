import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Hero.css";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Staggered container variants
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
    hidden: {},
  };

  // For headings, subtitle, paragraph (slide in from left)
  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeOut", duration: 0.6 },
    },
  };

  // For button (pop in with scale)
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 1000,
        damping: 50,
        duration: 0.3,
      },
    },
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-icons">
        <i
          className="hero-icon fab fa-html5 floatAround"
          style={{ top: "10%", left: "20%" }}
        ></i>
        <i
          className="hero-icon fab fa-css3-alt floatAround2"
          style={{ top: "20%", left: "80%" }}
        ></i>
        <i
          className="hero-icon fab fa-js-square floatAround3"
          style={{ top: "25%", left: "40%" }}
        ></i>
        <i
          className="hero-icon fab fa-python floatAround"
          style={{ top: "40%", left: "10%" }}
        ></i>
        <i
          className="hero-icon fab fa-java floatAround2"
          style={{ top: "50%", left: "70%" }}
        ></i>
        <i
          className="hero-icon fab fa-node-js floatAround3"
          style={{ top: "75%", left: "50%" }}
        ></i>
        <i
          className="hero-icon fab fa-react floatAround"
          style={{ top: "70%", left: "30%" }}
        ></i>
        <i
          className="hero-icon fab fa-git-alt floatAround2"
          style={{ top: "80%", left: "15%" }}
        ></i>
        <i
          className="hero-icon fab fa-github floatAround3"
          style={{ top: "85%", left: "45%" }}
        ></i>
        <i
          className="hero-icon fab fa-linux floatAround"
          style={{ top: "90%", left: "85%" }}
        ></i>
        <i
          className="hero-icon fab fa-docker floatAround2"
          style={{ top: "80%", left: "60%" }}
        ></i>
        <i
          className="hero-icon fas fa-code floatAround3"
          style={{ top: "15%", left: "55%" }}
        ></i>
        <i
          className="hero-icon fas fa-terminal floatAround"
          style={{ top: "45%", left: "25%" }}
        ></i>
        <i
          className="hero-icon fab fa-vuejs floatAround2"
          style={{ top: "55%", left: "35%" }}
        ></i>
        <i
          className="hero-icon fab fa-angular floatAround3"
          style={{ top: "5%", left: "65%" }}
        ></i>
        <i
          className="hero-icon fab fa-aws floatAround"
          style={{ top: "25%", left: "65%" }}
        ></i>
        <i
          className="hero-icon fab fa-js floatAround2"
          style={{ top: "70%", left: "80%" }}
        ></i>
        <i
          className="hero-icon fab fa-figma floatAround2"
          style={{ top: "25%", left: "30%" }}
        ></i>
        <i
          className="hero-icon fab fa-slack floatAround3"
          style={{ top: "70%", left: "65%" }}
        ></i>
        <i
          className="hero-icon fab fa-npm floatAround"
          style={{ top: "10%", left: "40%" }}
        ></i>
        <i
          className="hero-icon fab fa-gatsby floatAround2"
          style={{ top: "15%", left: "10%" }}
        ></i>
        <i
          className="hero-icon fab fa-bootstrap floatAround3"
          style={{ top: "55%", left: "75%" }}
        ></i>
      </div>
      <motion.div
        className="hero-content-container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="hero-text">
          <motion.h1 className="hero-title" variants={itemVariants}>
            <a href="#about" className="hero-name-link">
              Hi, I'm Rafsan
            </a>
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={itemVariants}>
            Front-End & Android App Developer
          </motion.h2>
          <motion.p className="hero-description" variants={itemVariants}>
            I specialize in developing modern, efficient applications that
            balance stunning visuals with seamless functionality. My goal is
            always to turn ambitious ideas into engaging digital products
            focused on user needs.
          </motion.p>
          <motion.a
            href="#projects"
            className="hero-button"
            variants={buttonVariants}
          >
            View Projects
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
