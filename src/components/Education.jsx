import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { personalInfo, education } from '../data/portfolioData';
import './Education.css';

const Education = () => {
  return (
    <section className="section education" id="about">
      <div className="container">
        <SectionHeading title="About Me" subtitle="Get to know me" />

        <motion.p
          className="education__bio"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {personalInfo.bio}
        </motion.p>

        <h3 className="education__label">
          <span className="education__label-accent">{'>'}</span> Education
        </h3>

        <div className="education__timeline">
          {education.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="timeline-item__dot" />
      <div className="timeline-item__card glass-card">
        <h4 className="timeline-item__institution">{item.institution}</h4>
        <p className="timeline-item__degree">{item.degree}</p>
        <p className="timeline-item__score glow-text">{item.score}</p>
        {(item.period || item.location) && (
          <div className="timeline-item__meta">
            {item.period && (
              <span className="timeline-item__meta-item">
                <FiCalendar /> {item.period}
              </span>
            )}
            {item.location && (
              <span className="timeline-item__meta-item">
                <FiMapPin /> {item.location}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Education;
