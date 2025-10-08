import { useState } from 'react';
import RoadmapVisualization from './components/RoadmapVisualization';
import { generateRoadmap } from './services/geminiService';
import './App.css';

function App() {
  const [role, setRole] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!role.trim()) {
      setError('Please enter a role');
      return;
    }

    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const generatedRoadmap = await generateRoadmap(role);
      setRoadmap(generatedRoadmap);
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRole('');
    setRoadmap(null);
    setError(null);
  };

  return (
    <div className="app">
      <div className="background-gradient"></div>

      <div className="content-wrapper">
        {!roadmap ? (
          <div className="landing-section">
            <div className="hero-content">
              <h1 className="hero-title">
                Career Roadmap
                <span className="gradient-text">Generator</span>
              </h1>
              <p className="hero-subtitle">
                Transform your career aspirations into a structured, actionable roadmap powered by AI
              </p>

              <form onSubmit={handleGenerate} className="search-form">
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter your desired role (e.g., MERN Stack Developer)"
                    className="search-input"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="generate-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Generating...
                      </>
                    ) : (
                      'Generate Roadmap'
                    )}
                  </button>
                </div>
                {error && <p className="error-message">{error}</p>}
              </form>

              <div className="example-roles">
                <p>Try these:</p>
                <div className="role-tags">
                  <button onClick={() => setRole('MERN Stack Developer')} className="role-tag">
                    MERN Stack Developer
                  </button>
                  <button onClick={() => setRole('Data Scientist')} className="role-tag">
                    Data Scientist
                  </button>
                  <button onClick={() => setRole('DevOps Engineer')} className="role-tag">
                    DevOps Engineer
                  </button>
                  <button onClick={() => setRole('UI/UX Designer')} className="role-tag">
                    UI/UX Designer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="roadmap-section">
            <button onClick={handleReset} className="back-button">
              ← Generate New Roadmap
            </button>
            <RoadmapVisualization roadmap={roadmap} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
