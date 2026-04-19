import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiCalendar } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { projects } from '../data/portfolioData';
import './Projects.css';

const Projects = () => {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <SectionHeading title="Projects" subtitle="Things I've built" />

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardRef = useRef(null);

  // Mouse tilt effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const techVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: 0.3 },
    },
  };

  const techTagVariant = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card glass-card gradient-border ${inView ? 'is-visible' : ''}`}
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="project-card__content" style={{ transform: 'translateZ(40px)' }}>
        <div ref={ref}>
          {/* Project Image Header */}
          <div className="project-card__image-container">
            <img src={project.image} alt={project.title} className="project-card__image" />
            <div className="project-card__image-overlay" />
            <span className="project-card__number">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="project-card__info">
            <div className="project-card__header">
              <div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__subtitle">{project.subtitle}</p>
              </div>
              <span className="project-card__date">
                <FiCalendar />
                {project.date}
              </span>
            </div>

            <ul className="project-card__bullets">
              {project.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  className="project-card__bullet"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <span className="project-card__bullet-marker">▹</span>
                  {bullet}
                </motion.li>
              ))}
            </ul>

            <div className="project-card__footer">
              <motion.div
                className="project-card__tech"
                variants={techVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {project.tech.map((t) => (
                  <motion.span
                    key={t}
                    className="project-card__tech-tag"
                    variants={techTagVariant}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>
              <div className="project-card__links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                    aria-label="GitHub"
                  >
                    <FiGithub />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                    aria-label="Live Demo"
                  >
                    <FiExternalLink />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
