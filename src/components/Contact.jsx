import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { personalInfo } from '../data/portfolioData';
import './Contact.css';

const Contact = () => {
  const contactLinks = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <FiPhone />,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      value: 'Sanjay B',
      href: personalInfo.linkedin,
    },
    {
      icon: <FiGithub />,
      label: 'GitHub',
      value: 'sanjay2902',
      href: personalInfo.github,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeading title="Get In Touch" subtitle="Let's connect and build something great" />

        <motion.div
          className="contact__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card glass-card gradient-border"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="contact-card__icon">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {link.icon}
                </motion.div>
              </div>
              <h4 className="contact-card__label">{link.label}</h4>
              <p className="contact-card__value">{link.value}</p>
            </motion.a>
          ))}
        </motion.div>

        <footer className="footer">
          <div className="footer__line" />
          <motion.p 
            className="footer__text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} {personalInfo.name} — Built with{' '}
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ display: 'inline-flex' }}
            >
              <FiHeart className="footer__heart" />
            </motion.span>
            {' '}and React
          </motion.p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
