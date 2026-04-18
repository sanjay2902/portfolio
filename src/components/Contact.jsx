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
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 },
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
              className="contact-card glass-card"
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="contact-card__icon">{link.icon}</div>
              <h4 className="contact-card__label">{link.label}</h4>
              <p className="contact-card__value">{link.value}</p>
            </motion.a>
          ))}
        </motion.div>

        <footer className="footer">
          <div className="footer__line" />
          <p className="footer__text">
            © {new Date().getFullYear()} {personalInfo.name} — Built with{' '}
            <FiHeart className="footer__heart" /> and React
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
