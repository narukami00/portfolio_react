import React, { useState, useRef, useEffect } from "react";
import "./Skills.css";
import { motion } from "framer-motion";

const skills = [
  { name: "C", icon: "devicon-c-plain colored" },
  { name: "C++", icon: "devicon-cplusplus-plain colored" },
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "Java", icon: "devicon-java-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "Dart", icon: "devicon-flutter-plain colored" },
];

// Constants for physics
const BALL_RADIUS = 40; // pixels (diameter = 80px)
const BUCKET_RADIUS = 180; // 360px diameter bucket
const GRAVITY = 0.3; // acceleration downwards
const FRICTION = 0.95; // friction coefficient
const VELOCITY_DAMPING = 0.7; // velocity reduction on bounce

const Skills = () => {
  const orbRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  // Initialize balls positioned randomly inside bucket
  const [balls, setBalls] = useState(() => {
    return skills.map(() => {
      let x, y;
      do {
        x = (Math.random() - 0.5) * BUCKET_RADIUS * 2 * 0.8; // 80% spread
        y = (Math.random() - 0.5) * BUCKET_RADIUS * 2 * 0.8;
      } while (Math.hypot(x, y) > BUCKET_RADIUS - BALL_RADIUS);
      return { x, y, vx: 0, vy: 0, isDragging: false };
    });
  });

  const draggingIndex = useRef(null);
  const lastPointerPos = useRef({ x: 0, y: 0 });

  // Clamp position inside bucket circle
  const clampPosition = (pos) => {
    const dist = Math.hypot(pos.x, pos.y);
    if (dist > BUCKET_RADIUS - BALL_RADIUS) {
      const angle = Math.atan2(pos.y, pos.x);
      return {
        x: (BUCKET_RADIUS - BALL_RADIUS) * Math.cos(angle),
        y: (BUCKET_RADIUS - BALL_RADIUS) * Math.sin(angle),
      };
    }
    return pos;
  };

  // Collision detection and resolution between two balls
  const resolveCollision = (b1, b2) => {
    const dx = b2.x - b1.x;
    const dy = b2.y - b1.y;
    let dist = Math.hypot(dx, dy);

    if (dist === 0) dist = 0.1; // avoid zero division

    if (dist < BALL_RADIUS * 2) {
      const overlap = BALL_RADIUS * 2 - dist;
      const nx = dx / dist;
      const ny = dy / dist;

      // Limit max correction to avoid explosion
      const maxCorrection = BALL_RADIUS * 0.5;
      const correction = Math.min(overlap, maxCorrection);

      // Push balls apart equally
      b1.x -= (nx * correction) / 2;
      b1.y -= (ny * correction) / 2;
      b2.x += (nx * correction) / 2;
      b2.y += (ny * correction) / 2;

      const dvx = b2.vx - b1.vx;
      const dvy = b2.vy - b1.vy;
      const dot = dvx * nx + dvy * ny;

      if (dot > 0) return;

      const impulse = (2 * dot) / 2; // equal mass collision impulse

      b1.vx += impulse * nx * VELOCITY_DAMPING;
      b1.vy += impulse * ny * VELOCITY_DAMPING;
      b2.vx -= impulse * nx * VELOCITY_DAMPING;
      b2.vy -= impulse * ny * VELOCITY_DAMPING;

      const threshold = 0.01;
      if (Math.abs(b1.vx) < threshold) b1.vx = 0;
      if (Math.abs(b1.vy) < threshold) b1.vy = 0;
      if (Math.abs(b2.vx) < threshold) b2.vx = 0;
      if (Math.abs(b2.vy) < threshold) b2.vy = 0;
    }
  };

  // Animate ball motion
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setBalls((prevBalls) => {
        let newBalls = [...prevBalls];

        newBalls = newBalls.map((b) => {
          if (b.isDragging) {
            return { ...b, vx: 0, vy: 0 };
          }

          // Apply gravity and friction
          let newVx = b.vx * FRICTION;
          let newVy = (b.vy + GRAVITY) * FRICTION;

          const VELOCITY_STOP_THRESHOLD = 0.1;
          newVx = Math.abs(newVx) < VELOCITY_STOP_THRESHOLD ? 0 : newVx;
          newVy = Math.abs(newVy) < VELOCITY_STOP_THRESHOLD ? 0 : newVy;

          let newX = b.x + newVx;
          let newY = b.y + newVy;

          // Bounce off bucket circle
          const dist = Math.hypot(newX, newY);
          if (dist > BUCKET_RADIUS - BALL_RADIUS) {
            const nx = newX / dist;
            const ny = newY / dist;
            const dot = newVx * nx + newVy * ny;

            newVx -= 2 * dot * nx;
            newVy -= 2 * dot * ny;

            newVx *= VELOCITY_DAMPING;
            newVy *= VELOCITY_DAMPING;

            newX = nx * (BUCKET_RADIUS - BALL_RADIUS);
            newY = ny * (BUCKET_RADIUS - BALL_RADIUS);
          }

          return { ...b, x: newX, y: newY, vx: newVx, vy: newVy };
        });

        // Resolve collisions safely
        for (let i = 0; i < newBalls.length; i++) {
          for (let j = i + 1; j < newBalls.length; j++) {
            if (newBalls[i] && newBalls[j]) {
              resolveCollision(newBalls[i], newBalls[j]);
            }
          }
        }

        return newBalls;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Get relative position within orb (center origin)
  const getRelativePosition = (e) => {
    const rect = orbRef.current.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2),
      clientX,
      clientY,
    };
  };

  // Drag start
  const onPointerDown = (index) => (e) => {
    e.preventDefault();
    if (index < 0 || index >= balls.length) return;
    const pos = getRelativePosition(e);
    draggingIndex.current = index;
    lastPointerPos.current = pos;

    setBalls((oldBalls) =>
      oldBalls.map((b, i) => ({ ...b, isDragging: i === index }))
    );

    setTooltip({
      visible: true,
      content: skills[index].name,
      x: pos.clientX + 15,
      y: pos.clientY + 15,
    });
  };

  // Drag move
  const onPointerMove = (e) => {
    const index = draggingIndex.current;
    if (index === null || index < 0 || index >= balls.length) return;

    const pos = getRelativePosition(e);
    const dx = pos.x - lastPointerPos.current.x;
    const dy = pos.y - lastPointerPos.current.y;

    setBalls((oldBalls) => {
      const newBalls = [...oldBalls];
      const ball = newBalls[index];

      let newPos = {
        x: ball.x + dx,
        y: ball.y + dy,
      };
      newPos = clampPosition(newPos);

      const vx = dx;
      const vy = dy;

      newBalls[index] = {
        ...ball,
        x: newPos.x,
        y: newPos.y,
        vx,
        vy,
        isDragging: true,
      };
      return newBalls;
    });

    setTooltip({
      visible: true,
      content: skills[index].name,
      x: pos.clientX + 15,
      y: pos.clientY + 15,
    });

    lastPointerPos.current = pos;
  };

  // Drag end
  const onPointerUp = () => {
    if (draggingIndex.current === null) return;

    setBalls((oldBalls) => oldBalls.map((b) => ({ ...b, isDragging: false })));
    draggingIndex.current = null;

    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const textParagraphs = [
    "I specialize in Android app development using Flutter, delivering high-quality, performant mobile applications.",
    "Additionally, I have expertise in frontend development with React, creating responsive and user-friendly web interfaces.",
    "My experience extends to utilizing Python libraries such as OpenCV, NumPy, Matplotlib etc. for machine learning and data analysis projects.",
    "I am also proficient in C, C++, and Java, enabling me to work across a diverse range of programming environments and challenges.",
  ];

  return (
    <section id="skills" className="skills-section">
      {tooltip.visible && (
        <div
          id="skill-tooltip"
          className="skill-tooltip"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}

      <div className="skills-content">
        <div className="skills-text-container">
          <h2 className="skills-heading">
            <span className="gradient-text">Skills</span>
          </h2>
          <div>
            {textParagraphs.map((text, idx) => (
              <motion.p
                className="skills-description"
                key={idx}
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  delay: idx * 0.25,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 60,
                }}
                style={{ marginBottom: "1.3rem" }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        <div
          className="skills-orb-container"
          ref={orbRef}
          onMouseMove={onPointerMove}
          onTouchMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchEnd={onPointerUp}
          onTouchCancel={onPointerUp}
        >
          <div
            className="skills-orb"
            style={{
              position: "relative",
              width: BUCKET_RADIUS * 2,
              height: BUCKET_RADIUS * 2,
            }}
          >
            {/* Bucket edge circle */}
            <svg
              width={BUCKET_RADIUS * 2}
              height={BUCKET_RADIUS * 2}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            >
              <circle
                cx={BUCKET_RADIUS}
                cy={BUCKET_RADIUS}
                r={BUCKET_RADIUS}
                stroke="#0ea5e9"
                strokeWidth="3"
                fill="none"
              />
            </svg>

            {balls.map((ball, i) => (
              <div
                key={i}
                className="skill-item"
                style={{
                  position: "absolute",
                  width: BALL_RADIUS * 2,
                  height: BALL_RADIUS * 2,
                  borderRadius: "50%",
                  top: BUCKET_RADIUS + ball.y - BALL_RADIUS,
                  left: BUCKET_RADIUS + ball.x - BALL_RADIUS,
                  backgroundImage:
                    "linear-gradient(to bottom right, #0ea5e9, #4f46e5)",
                  boxShadow: ball.isDragging
                    ? "0 0 15px 5px rgba(14,165,233,0.8)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  cursor: "grab",
                  zIndex: ball.isDragging ? 10 : 1,
                  userSelect: "none",
                  transition: ball.isDragging ? "none" : "box-shadow 0.3s",
                }}
                onMouseDown={onPointerDown(i)}
                onTouchStart={onPointerDown(i)}
                onMouseOver={(e) => {
                  if (!balls[i].isDragging) {
                    setTooltip({
                      visible: true,
                      content: skills[i].name,
                      x: e.clientX + 15,
                      y: e.clientY + 15,
                    });
                  }
                }}
                onMouseOut={() => {
                  if (!balls[i].isDragging) {
                    setTooltip({ visible: false, content: "", x: 0, y: 0 });
                  }
                }}
              >
                <i
                  className={`${skills[i].icon} text-4xl transition-colors duration-300 ease-in-out`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
