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

  return (
    <motion.div
      ref={ref}
      className="project-card glass-card"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
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
          <li key={i} className="project-card__bullet">
            <span className="project-card__bullet-marker">▹</span>
            {bullet}
          </li>
        ))}
      </ul>

      <div className="project-card__footer">
        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-card__tech-tag">
              {t}
            </span>
          ))}
        </div>
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
