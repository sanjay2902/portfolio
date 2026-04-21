import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiGitBranch, FiStar, FiActivity } from 'react-icons/fi';
import './GitHubStats.css';

const GitHubStats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { label: 'Public repos', value: '15+', icon: <FiGitBranch />, color: 'var(--accent-primary)' },
    { label: 'Total Stars', value: '20+', icon: <FiStar />, color: '#fbbf24' },
    { label: 'Contributions', value: '500+', icon: <FiActivity />, color: '#34d399' },
  ];

  return (
    <motion.div
      ref={ref}
      className="github-stats glass-card gradient-border"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="github-stats__header">
        <div className="github-stats__title">
          <FiGithub className="github-icon-main" />
          <span>GitHub Activity</span>
        </div>
        <a 
          href="https://github.com/sanjay2902" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-stats__link"
        >
          @sanjay2902
        </a>
      </div>

      <div className="github-stats__body">
        {/* Real GitHub Contribution Heatmap SVG via ghchart API */}
        <div className="github-heatmap-container">
          <img 
            src="https://ghchart.rshah.org/38bdf8/sanjay2902" 
            alt="Sanjay's GitHub Contributions" 
            className="github-heatmap"
          />
          <div className="heatmap-overlay" />
        </div>

        <div className="github-metrics">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              className="metric-item"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <span className="metric-icon" style={{ color: stat.color }}>{stat.icon}</span>
              <div className="metric-info">
                <span className="metric-value">{stat.value}</span>
                <span className="metric-label">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubStats;
