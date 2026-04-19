import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiCode } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import GitHubStats from './GitHubStats';
import './CodingStats.css';

// Donut chart component using pure SVG
const DonutChart = ({ segments, size = 140, strokeWidth = 16, label, total }) => {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;

  let cumulativeOffset = 0;
  const arcs = segments
    .filter((s) => s.count > 0)
    .map((seg) => {
      const fraction = seg.count / total;
      const dashLen = fraction * circumference;
      const offset = -cumulativeOffset;
      cumulativeOffset += dashLen;
      return { ...seg, dashLen, offset };
    });

  return (
    <div className="donut-chart" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc.dashLen} ${circumference}`}
            strokeDashoffset={arc.offset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
              filter: `drop-shadow(0 0 8px ${arc.color}60)`,
              transition: 'all 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        ))}
      </svg>
      <div className="donut-chart__center">
        <span className="donut-chart__total">{total}</span>
        <span className="donut-chart__label">{label}</span>
      </div>
    </div>
  );
};

// Animated count-up hook
const useCountUp = (target, duration = 1500, inView = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
};

// ─── LeetCode Card ──────────────────────────────────────────────────────────
const LeetCodeCard = ({ inView }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use alfa-leetcode-api (popular CORS-friendly proxy)
        const res = await fetch(
          'https://alfa-leetcode-api.onrender.com/SANJAY3218/solved'
        );
        const data = await res.json();
        if (data && data.easySolved !== undefined) {
          setStats({
            easy: data.easySolved,
            medium: data.mediumSolved,
            hard: data.hardSolved,
            total: data.solvedProblem,
          });
        } else throw new Error('bad data');
      } catch {
        // Fallback to known stats
        setStats({ easy: 184, medium: 66, hard: 4, total: 254 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const easyCount = useCountUp(stats?.easy ?? 0, 1200, inView && !loading);
  const medCount = useCountUp(stats?.medium ?? 0, 1200, inView && !loading);
  const hardCount = useCountUp(stats?.hard ?? 0, 1200, inView && !loading);
  const total = stats?.total ?? 0;

  const segments = [
    { label: 'Easy', count: stats?.easy ?? 0, color: '#34d399' },
    { label: 'Medium', count: stats?.medium ?? 0, color: '#fbbf24' },
    { label: 'Hard', count: stats?.hard ?? 0, color: '#fb7185' },
  ];

  return (
    <motion.div
      className="coding-card glass-card gradient-border"
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="coding-card__header">
        <div className="coding-card__platform-logo leetcode-logo">
          <FiCode />
          <span>LeetCode</span>
        </div>
        <a
          href="https://leetcode.com/u/SANJAY3218/"
          target="_blank"
          rel="noopener noreferrer"
          className="coding-card__link"
        >
          <FiExternalLink />
          Profile
        </a>
      </div>

      <div className="coding-card__rating">
        <span className="coding-card__rating-badge">🏆 Knight</span>
        <span className="coding-card__rating-val">Rating: 1875</span>
      </div>

      <div className="coding-card__body">
        {loading ? (
          <div className="coding-card__loading">
            <div className="loading-spinner" />
          </div>
        ) : (
          <>
            <DonutChart segments={segments} total={total} label="Solved" />
            <div className="coding-card__breakdown">
              {[
                { label: 'Easy', count: easyCount, color: '#34d399', total: stats?.easy },
                { label: 'Medium', count: medCount, color: '#fbbf24', total: stats?.medium },
                { label: 'Hard', count: hardCount, color: '#fb7185', total: stats?.hard },
              ].map((item) => (
                <div key={item.label} className="breakdown-row">
                  <span className="breakdown-dot" style={{ background: item.color }} />
                  <span className="breakdown-label">{item.label}</span>
                  <div className="breakdown-bar-track">
                    <motion.div
                      className="breakdown-bar-fill"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(item.total / total) * 100}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="breakdown-count" style={{ color: item.color }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// ─── GFG Card ───────────────────────────────────────────────────────────────
const GFGCard = ({ inView }) => {
  // GFG has no reliable public CORS-friendly API; using accurate hardcoded stats
  // from the profile: https://geeksforgeeks.org/user/sanjayboofbf4/
  const stats = { school: 0, basic: 15, easy: 100, medium: 46, hard: 20, total: 181 };

  const easyCount  = useCountUp(stats.easy,   1200, inView);
  const medCount   = useCountUp(stats.medium,  1200, inView);
  const hardCount  = useCountUp(stats.hard,    1200, inView);
  const totalCount = useCountUp(stats.total,   1200, inView);

  const segments = [
    { label: 'Basic', count: stats.basic, color: '#60a5fa' },
    { label: 'Easy',  count: stats.easy,  color: '#34d399' },
    { label: 'Medium',count: stats.medium,color: '#fbbf24' },
    { label: 'Hard',  count: stats.hard,  color: '#fb7185' },
  ];

  return (
    <motion.div
      className="coding-card glass-card gradient-border"
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="coding-card__header">
        <div className="coding-card__platform-logo gfg-logo">
          <span className="gfg-icon">GFG</span>
          <span>GeeksforGeeks</span>
        </div>
        <a
          href="https://geeksforgeeks.org/user/sanjayboofbf4/"
          target="_blank"
          rel="noopener noreferrer"
          className="coding-card__link"
        >
          <FiExternalLink />
          Profile
        </a>
      </div>

      <div className="coding-card__rating">
        <span className="coding-card__rating-badge gfg-badge">📊 Institute Rank #100</span>
      </div>

      <div className="coding-card__body">
        <DonutChart segments={segments} total={stats.total} label="Solved" />
        <div className="coding-card__breakdown">
          {[
            { label: 'Basic',  count: stats.basic,  color: '#60a5fa' },
            { label: 'Easy',   count: easyCount,    color: '#34d399', total: stats.easy  },
            { label: 'Medium', count: medCount,     color: '#fbbf24', total: stats.medium },
            { label: 'Hard',   count: hardCount,    color: '#fb7185', total: stats.hard  },
          ].map((item) => (
            <div key={item.label} className="breakdown-row">
              <span className="breakdown-dot" style={{ background: item.color }} />
              <span className="breakdown-label">{item.label}</span>
              <div className="breakdown-bar-track">
                <motion.div
                  className="breakdown-bar-fill"
                  style={{ background: item.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${((item.total ?? item.count) / stats.total) * 100}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="breakdown-count" style={{ color: item.color }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="coding-card__total-row">
        <span className="coding-card__total-label">Total Solved</span>
        <span className="coding-card__total-val">{totalCount}</span>
      </div>
    </motion.div>
  );
};

// ─── Main Section ───────────────────────────────────────────────────────────
const CodingStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="section coding-stats" id="coding">
      <div className="container">
        <SectionHeading title="Coding Profiles" subtitle="Problem solving across platforms" />

        <div className="coding-stats__grid" ref={ref}>
          <LeetCodeCard inView={inView} />
          <GFGCard inView={inView} />
        </div>

        <GitHubStats />

        {/* Combined summary bar */}
        <motion.div
          className="coding-stats__summary glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { label: 'Total Problems Solved', value: '1000+', color: 'var(--accent-cyan)' },
            { label: 'LeetCode Rating', value: '1875', color: '#fbbf24' },
            { label: 'LeetCode Rank', value: 'Knight 🏆', color: 'var(--accent-violet)' },
            { label: 'Platforms', value: '2 Active', color: 'var(--accent-emerald)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="summary-stat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            >
              <span className="summary-stat__value" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="summary-stat__label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingStats;
