import { useState } from 'react';
import './RoadmapVisualization.css';

function RoadmapVisualization({ roadmap }) {
  const [hoveredStage, setHoveredStage] = useState(null);

  if (!roadmap || !roadmap.stages) {
    return null;
  }

  return (
    <div className="roadmap-container">
      <h2 className="roadmap-title">{roadmap.title}</h2>

      <div className="roadmap-path">
        {roadmap.stages.map((stage, index) => (
          <div key={stage.id} className="stage-wrapper">
            <div
              className={`stage-node ${hoveredStage === index ? 'active' : ''}`}
              onMouseEnter={() => setHoveredStage(index)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <div className="stage-number">{index + 1}</div>
              <div className="stage-name">{stage.name}</div>
              <div className="stage-duration">{stage.duration}</div>

              {hoveredStage === index && (
                <div className="stage-details">
                  <div className="details-content">
                    <h3>{stage.name}</h3>
                    <p className="description">{stage.description}</p>

                    <div className="skills-section">
                      <h4>Key Skills</h4>
                      <ul>
                        {stage.skills.map((skill, idx) => (
                          <li key={idx}>{skill}</li>
                        ))}
                      </ul>
                    </div>

                    {stage.resources && stage.resources.length > 0 && (
                      <div className="resources-section">
                        <h4>Recommended Resources</h4>
                        <ul>
                          {stage.resources.map((resource, idx) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {index < roadmap.stages.length - 1 && (
              <div className="stage-connector">
                <svg width="100%" height="60" viewBox="0 0 100 60">
                  <path
                    d={index % 2 === 0 ? "M 0 30 Q 50 0, 100 30" : "M 0 30 Q 50 60, 100 30"}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapVisualization;
