import { motion } from 'framer-motion';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiChevronDown } from 'react-icons/fi';
import { SiPython, SiReact, SiNodedotjs, SiMongodb, SiJavascript } from 'react-icons/si';
import { FaJava, FaAws, FaBrain } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contactLinks = [
    { icon: <FiMail />, label: 'Email', href: `mailto:${personalInfo.email}` },
    { icon: <FiLinkedin />, label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: <FiGithub />, label: 'GitHub', href: personalInfo.github },
  ];

  const orbitIcons = [
    { Icon: SiPython, color: '#3776AB', label: 'Python' },
    { Icon: SiReact, color: '#61DAFB', label: 'React' },
    { Icon: SiNodedotjs, color: '#339933', label: 'Node.js' },
    { Icon: FaJava, color: '#ED8B00', label: 'Java' },
    { Icon: SiMongodb, color: '#47A248', label: 'MongoDB' },
    { Icon: FaBrain, color: '#8b5cf6', label: 'ML' },
    { Icon: FaAws, color: '#FF9900', label: 'AWS' },
    { Icon: SiJavascript, color: '#F7DF1E', label: 'JS' },
  ];

  return (
    <section className="hero" id="hero">
      <div className="hero__split container">
        {/* Left side — text content */}
        <motion.div
          className="hero__left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__badge" variants={itemVariants}>
            <span className="hero__badge-dot" />
            Open to Internships
          </motion.div>



          <motion.h1 className="hero__name" variants={itemVariants}>
            {personalInfo.name}
          </motion.h1>

          <motion.p className="hero__title" variants={itemVariants}>
            {personalInfo.title}
          </motion.p>

          <motion.p className="hero__subtitle" variants={itemVariants}>
            {personalInfo.subtitle}
          </motion.p>

          <motion.p className="hero__summary" variants={itemVariants}>
            I build practical AI/ML and full-stack systems, from medical image reasoning
            workflows to NLP tools and real-time web platforms.
          </motion.p>



          <motion.div className="hero__contacts" variants={itemVariants}>
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="hero__contact-pill"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.icon}
                <span>{link.label}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="hero__cta-row" variants={itemVariants}>
            <a
              href="#projects"
              className="hero__cta hero__cta--primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="hero__cta-text">View My Work</span>
            </a>
            <a
              href={personalInfo.resume}
              className="hero__cta hero__cta--outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDownload />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right side — orbital animation with parallax */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orbit-container">
            {/* Glowing center */}
            <div className="orbit-center">
              <img src="/assets/logo.png" alt="Sanjay B Logo" className="orbit-center__logo" />
              <div className="orbit-center__ring" />
            </div>

            {/* Ring 1 — inner */}
            <div className="orbit-ring orbit-ring--1">
              {orbitIcons.slice(0, 4).map((item, i) => (
                <div
                  key={item.label}
                  className="orbit-icon"
                  style={{
                    '--angle': `${i * 90}deg`,
                    '--color': item.color,
                  }}
                  title={item.label}
                >
                  <item.Icon />
                </div>
              ))}
            </div>

            {/* Ring 2 — outer */}
            <div className="orbit-ring orbit-ring--2">
              {orbitIcons.slice(4, 8).map((item, i) => (
                <div
                  key={item.label}
                  className="orbit-icon"
                  style={{
                    '--angle': `${i * 90 + 45}deg`,
                    '--color': item.color,
                  }}
                  title={item.label}
                >
                  <item.Icon />
                </div>
              ))}
            </div>

            {/* Decorative pulses */}
            <div className="orbit-pulse orbit-pulse--1" />
            <div className="orbit-pulse orbit-pulse--2" />
            <div className="orbit-pulse orbit-pulse--3" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <FiChevronDown className="hero__scroll-icon" />
      </motion.div>
    </section>
  );
};

export default Hero;
