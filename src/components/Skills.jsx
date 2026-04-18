import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { skills } from '../data/portfolioData';
import './Skills.css';

const categoryColors = {
  Languages: { color: '#00e5ff', dim: 'rgba(0, 229, 255, 0.12)' },
  'Web Technologies': { color: '#8b5cf6', dim: 'rgba(139, 92, 246, 0.12)' },
  'Frameworks & Tools': { color: '#fb7185', dim: 'rgba(251, 113, 133, 0.12)' },
  Coursework: { color: '#34d399', dim: 'rgba(52, 211, 153, 0.12)' },
};

const Skills = () => {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <SectionHeading title="Tech Stack" subtitle="Technologies I work with" number="02" />

        <div className="skills__grid">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <SkillCategory
              key={category}
              category={category}
              items={items}
              catIndex={catIndex}
              accent={categoryColors[category] || categoryColors.Languages}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCategory = ({ category, items, catIndex, accent }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: catIndex * 0.1 },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 18 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="skill-category glass-card gradient-border"
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: catIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--cat-color': accent.color, '--cat-dim': accent.dim }}
    >
      <h3 className="skill-category__title" style={{ color: accent.color }}>
        {category}
      </h3>
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
            whileHover={{
              scale: 1.08,
              y: -4,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              '--tag-color': accent.color,
              '--tag-dim': accent.dim,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skills;
