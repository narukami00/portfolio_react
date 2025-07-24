import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const contactLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/rafsan.riasat.5",
    icon: <i className="fab fa-facebook-f"></i>,
    color: "bg-blue-600",
    hover: "hover-bg-blue-800",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rafsan-riasat-215689370",
    icon: <i className="fab fa-linkedin-in"></i>,
    color: "bg-blue-700",
    hover: "hover-bg-blue-900",
  },
  {
    name: "GitHub",
    href: "https://github.com/narukami00",
    icon: <i className="fab fa-github"></i>,
    color: "bg-gray-800",
    hover: "hover-bg-gray-900",
  },
];

const Contact = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
  const [form, setForm] = useState({ email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const [refLeft, inViewLeft] = useInView({ threshold: 0.3 });
  const [refRight, inViewRight] = useInView({ threshold: 0.3 });

  React.useEffect(() => {
    inViewLeft ? controlsLeft.start("visible") : controlsLeft.start("hidden");
  }, [controlsLeft, inViewLeft]);

  React.useEffect(() => {
    inViewRight
      ? controlsRight.start("visible")
      : controlsRight.start("hidden");
  }, [controlsRight, inViewRight]);

  const handleMouseOver = (e, link) => {
    setTooltip({
      visible: true,
      content: link.name,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e) => {
    if (tooltip.visible) {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_3gut4zt",
        "template_lxvr1bz",
        {
          user_email: form.email,
          message: form.message,
        },
        "yaRDP3iCtqNVN2YPR"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted(true);
          setForm({ email: "", message: "" });
          setTimeout(() => setSubmitted(false), 5000);
        },
        (error) => {
          console.error(error.text);
          alert("Something went wrong. Try again!");
        }
      );
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeOut", duration: 0.6 },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeOut", duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="contact-section">
      {tooltip.visible && (
        <div
          className="contact-tooltip"
          style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
        >
          {tooltip.content}
        </div>
      )}

      <motion.div
        className="contact-left"
        ref={refLeft}
        initial="hidden"
        animate={controlsLeft}
      >
        <motion.h2
          className="contact-heading gradient-text"
          variants={leftItemVariants}
        >
          Contact Me
        </motion.h2>
        <motion.p className="contact-description" variants={leftItemVariants}>
          I’m always open to new ideas, collaborations, or just a good
          conversation — feel free to reach out!
        </motion.p>
      </motion.div>

      <motion.div
        className="contact-right"
        ref={refRight}
        initial="hidden"
        animate={controlsRight}
      >
        <motion.div
          className="contact-links-container"
          variants={rightItemVariants}
        >
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-link ${link.color} ${link.hover}`}
              onMouseOver={(e) => handleMouseOver(e, link)}
              onMouseMove={handleMouseMove}
              onMouseOut={handleMouseOut}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          variants={rightItemVariants}
          autoComplete="off"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Your email address"
            className="contact-input"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            required
            placeholder="Your message"
            className="contact-textarea"
            rows={4}
            value={form.message}
            onChange={handleChange}
          />
          <button type="submit" className="contact-submit">
            Send Message
          </button>
          {submitted && (
            <div className="contact-success">
              Message sent! Thank you for reaching out.
            </div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
