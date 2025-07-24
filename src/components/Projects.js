import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MonAmi from "../img/MonAmi.png";
import Shoppify from "../img/Shoppify.png";
import GottaDo from "../img/GottaDo.jpg";
import TicTacToe from "../img/TicTacToe.png";
import UniConnect from "../img/uniconnect.jpg";
import DinoAi from "../img/dino.png";
import FaceRecog from "../img/face.png";
import Perpy from "../img/perpy.png";
import "./Projects.css";

const projects = [
  {
    title: "UniConnect",
    description:
      "An AI powered academic companion built with flutter, olama, gemini & firebase ",
    image: UniConnect,
    link: "https://github.com/narukami00/UniConnect",
  },
  {
    title: "MonAmi",
    description: "A chat app built using Java and Firebase Realtime Database.",
    image: MonAmi,
    link: "https://github.com/narukami00/MonAmi",
  },
  {
    title: "Shoppify",
    description:
      "A full-stack e-commerce site built with react, tailwind & firebase (work in progress). ",
    image: Shoppify,
    link: "https://github.com/narukami00/Shoppify_react",
  },
  {
    title: "DinoAI",
    description:
      "An AI model that plays the Chrome Dino game using reinforcement learning.",
    image: DinoAi,
    link: "https://github.com/narukami00/Dino-AI",
  },
  {
    title: "Face Recognition Attendance System",
    description:
      "A system that uses face recognition to mark attendance in a classroom setting built with OpenCV.",
    image: FaceRecog,
    link: "https://github.com/narukami00/Face-Recognition-Attendance",
  },
  {
    title: "Professor Perpy",
    description:
      "An AI-powered research assistant to find information across the internet & provide valid sources.",
    image: Perpy,
    link: "https://github.com/narukami00/ProfessorPerpy",
  },
  {
    title: "GottaDo",
    description: "A Java-based ToDo list app with basic task management.",
    image: GottaDo,
    link: "https://github.com/narukami00/ToDoListApp",
  },
  {
    title: "TicTacToe_JS",
    description: "A simple TicTacToe game made with HTML, CSS, and JavaScript.",
    image: TicTacToe,
    link: "https://github.com/narukami00/TicTacToe_JS",
  },
];

function getRows(arr, rowLen) {
  const rows = [];
  for (let i = 0; i < arr.length; i += rowLen) {
    rows.push(arr.slice(i, i + rowLen));
  }
  return rows;
}

const headerVariants = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const Projects = () => {
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 640px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const mobileProjects = showMore ? projects : projects.slice(0, 3);
  const desktopRows = getRows(projects, 4);

  return (
    <section id="projects" className="projects-section">
      {/* HEADER */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
        className="projects-header"
      >
        <h2 className="projects-title">
          <span className="gradient-text">Projects</span>
        </h2>
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="projects-description"
        >
          Some of the things I've worked on recently.
        </motion.p>
      </motion.div>

      <div className="projects-rows-wrapper">
        {/* DESKTOP */}
        {!isMobile &&
          desktopRows.map((row, i) => (
            <motion.div
              key={i}
              className="projects-row"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={rowVariants}
            >
              {row.map((project) => (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={project.title}
                  className="project-card"
                  tabIndex={0}
                  aria-label={project.title}
                >
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image"
                    />
                  </div>
                  <div className="project-card-content">
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">
                      {project.description}
                    </p>
                    <span className="project-link">GitHub →</span>
                  </div>
                </a>
              ))}
            </motion.div>
          ))}

        {/* MOBILE */}
        {isMobile && (
          <div className="projects-row">
            {mobileProjects.map((project) => (
              <motion.div
                key={project.title}
                className="motion-wrapper"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={rowVariants}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                  tabIndex={0}
                  aria-label={project.title}
                >
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image"
                    />
                  </div>
                  <div className="project-card-content">
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">
                      {project.description}
                    </p>
                    <span className="project-link">GitHub →</span>
                  </div>
                </a>
              </motion.div>
            ))}

            {projects.length > 3 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={rowVariants}
              >
                <button
                  className="show-more-btn"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  {showMore ? "Show Less ▲" : "Show More ▼"}
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
