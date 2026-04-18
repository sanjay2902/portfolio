import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './SectionHeading.css';

const SectionHeading = ({ title, subtitle }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className="section-heading"
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="section-heading__title">
        <span className="section-heading__accent">//</span> {title}
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      <div className="section-heading__line" />
    </motion.div>
  );
};

export default SectionHeading;
