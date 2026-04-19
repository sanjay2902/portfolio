import { motion } from 'framer-motion';
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

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
      ref={ref}
      className="project-card glass-card gradient-border"
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      {/* Background project number */}
      <span className="project-card__number">
        {String(index + 1).padStart(2, '0')}
      </span>

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
    </motion.div>
  );
};

export default Projects;
