import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { achievements, responsibility } from '../data/portfolioData';
import './Achievements.css';

const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section achievements" id="achievements">
      <div className="container">
        <SectionHeading title="Achievements" subtitle="Highlights & recognition" />

        <motion.div
          ref={ref}
          className="achievements__list"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ perspective: 800 }}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="achievement-item glass-card"
              variants={itemVariants}
              whileHover={{
                x: 8,
                transition: { duration: 0.2 },
              }}
            >
              <motion.span
                className="achievement-item__icon"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{
                  delay: 0.2 + index * 0.12,
                  type: 'spring',
                  stiffness: 400,
                  damping: 10,
                }}
              >
                {item.icon}
              </motion.span>
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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="responsibility__label">
            <FiAward className="responsibility__label-icon" />
            Position of Responsibility
          </h3>
          <div className="responsibility__card glass-card gradient-border">
            <h4 className="responsibility__title">{responsibility.title}</h4>
            <p className="responsibility__desc">{responsibility.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
