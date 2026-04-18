import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Education />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
