import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { skills } from '../data/portfolioData';
import './Skills.css';

const Skills = () => {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <SectionHeading title="Tech Stack" subtitle="Technologies I work with" />

        <div className="skills__grid">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <SkillCategory
              key={category}
              category={category}
              items={items}
              catIndex={catIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCategory = ({ category, items, catIndex }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: catIndex * 0.1 },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="skill-category glass-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
    >
      <h3 className="skill-category__title">{category}</h3>
      <motion.div
        className="skill-category__tags"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {items.map((skill) => (
          <motion.span
            key={skill}
            className="skill-tag"
            variants={tagVariants}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skills;
