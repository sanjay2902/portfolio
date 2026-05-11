import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import CodingStats from './components/CodingStats';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Education />
      <Skills />
      <CodingStats />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
