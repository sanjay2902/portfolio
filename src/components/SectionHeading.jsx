import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './SectionHeading.css';

const SectionHeading = ({ title, subtitle, number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className="section-heading"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {number && (
        <motion.span
          className="section-heading__number"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {number}
        </motion.span>
      )}
      <motion.h2
        className="section-heading__title"
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-heading__accent">//</span> {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-heading__subtitle"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="section-heading__line"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

export default SectionHeading;
