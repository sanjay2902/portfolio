import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { achievements, responsibility } from '../data/portfolioData';
import './Achievements.css';

const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section achievements" id="achievements">
      <div className="container">
        <SectionHeading title="Achievements" subtitle="Highlights & recognition" />

        <motion.div
          ref={ref}
          className="achievements__list"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="achievement-item glass-card"
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <span className="achievement-item__icon">{item.icon}</span>
              <p className="achievement-item__text">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Position of Responsibility */}
        <motion.div
          className="responsibility"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="responsibility__label">
            <FiAward className="responsibility__label-icon" />
            Position of Responsibility
          </h3>
          <div className="responsibility__card glass-card">
            <h4 className="responsibility__title">{responsibility.title}</h4>
            <p className="responsibility__desc">{responsibility.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
