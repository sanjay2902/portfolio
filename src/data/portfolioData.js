export const personalInfo = {
  name: "Sanjay B",
  title: "AI/ML Enthusiast · Full-Stack Developer",
  subtitle: "B.Tech IT @ MIT, Anna University",
  email: "sanjayboopathy32@gmail.com",
  phone: "+91-8667660435",
  linkedin: "https://www.linkedin.com/in/sanjay-b-2ab575252/",
  github: "https://github.com/sanjay2902",
  bio: "I'm a passionate Information Technology student at MIT, Anna University, driven by a deep curiosity for AI/ML and full-stack development. I love building intelligent systems that solve real-world problems — from medical image analysis to real-time communication platforms. When I'm not coding, you'll find me on the Kabaddi court or organizing events with TEDc MIT.",
};

export const education = [
  {
    institution: "Madras Institute of Technology, Anna University",
    degree: "B.Tech – Information Technology",
    score: "CGPA: 8.2 (relative grading)",
    period: "October 2022 – Present",
    location: "Chennai, Tamil Nadu",
  },
  {
    institution: "The Vikasa School",
    degree: "Class 12 – ISC",
    score: "Percentage: 93.75%",
    period: "",
    location: "",
  },
  {
    institution: "The Vikasa School",
    degree: "Class 10 – ICSE",
    score: "Percentage: 90%",
    period: "",
    location: "",
  },
];

export const skills = {
  Languages: ["Python", "Java", "SQL"],
  "Web Technologies": ["HTML", "Node.js", "MongoDB", "React"],
  "Frameworks & Tools": ["Express.js", "AWS", "GitHub", "Postman"],
  Coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Database Management System",
    "Object Oriented Methodologies",
    "Machine Learning",
  ],
};

export const projects = [
  {
    title: "Medical Reasoning Using VLM Model",
    subtitle: "Histopathology Interpretation",
    date: "December 2025",
    bullets: [
      "Built a zero-shot medical image classification system that removes dependency on annotated datasets, enabling scalable and effective cancer diagnosis support.",
      "Introduced an ontology-driven semantic understanding approach that translates medical knowledge into model-friendly prompts, achieving 92% accuracy.",
    ],
    tech: ["React", "Node.js", "Python", "BiomedCLIP"],
    image: "/assets/vlm.png",
    github: "",
    demo: "",
  },
  {
    title: "Document Summarization Tool",
    subtitle: "NLP Pipeline",
    date: "March 2025",
    bullets: [
      "Engineered an NLP pipeline using spaCy and NLTK and implemented the graph-based TextRank algorithm with NetworkX to rank and extract key sentences.",
      "Integrated Hugging Face Transformer model Pegasus for abstractive summarization within a robust application with comprehensive error handling.",
    ],
    tech: ["Python", "NLTK", "Transformers", "NetworkX"],
    image: "/assets/summarizer.png",
    github: "",
    demo: "",
  },
  {
    title: "Connect+",
    subtitle: "Real-Time Community Forum",
    date: "October 2024",
    bullets: [
      "Architected a full-stack community forum facilitating user engagement through text-based posts, private messaging, and voice-based interactions.",
      "Achieved real-time communication between concurrent users by integrating WebSockets for live messaging features.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/assets/connect.png",
    github: "",
    demo: "",
  },
];

export const achievements = [
  {
    icon: "🏆",
    text: "Ranked in the Top 3% out of 100K+ participants in Amazon National Coding Contest (by Scaler), earning a selection to Amazon ML Summer School 2025.",
  },
  {
    icon: "🥇",
    text: "Finalist – National Level Coding Contest AlgoChamp by Apti-Tech.",
  },
  {
    icon: "🥈",
    text: "Runner-up – Code Wars 2024, organized by ITA, Mutex 2024.",
  },
  {
    icon: "💻",
    text: "Solved 500+ coding problems across GeeksforGeeks and LeetCode. LeetCode Knight rating 1875.",
  },
  {
    icon: "🏅",
    text: "Represented the Tamil Nadu & Puducherry region in Kabaddi at the state level.",
  },
];

export const responsibility = {
  title: "Core Member — TEDc MIT",
  description:
    "Core member of TEDc MIT's Event Management Team, managing events and intra-college competitions, and overseeing coordination and execution.",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Coding", href: "#coding" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
