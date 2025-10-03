import "./NBLGame.css";

const NBLGame = () => {
  const features = [
    {
      icon: "fas fa-swimmer",
      title: "Underwater Training",
      description: "Experience weightlessness simulation in water"
    },
    {
      icon: "fas fa-satellite",
      title: "EVA Practice",
      description: "Practice spacewalk procedures safely"
    },
    {
      icon: "fas fa-tools",
      title: "Equipment Handling",
      description: "Learn to operate space tools and equipment"
    },
    {
      icon: "fas fa-users",
      title: "Team Coordination",
      description: "Work with mission specialists"
    }
  ];

  return (
    <div className="nbl-container">
      <div className="nbl-content">
        <i className="fas fa-rocket nbl-icon"></i>
        <h1 className="nbl-title">NBL Training</h1>
        <p className="nbl-description">
          Experience the Neutral Buoyancy Laboratory where astronauts train for spacewalks. 
          This underwater facility simulates the weightless environment of space, allowing 
          astronauts to practice complex procedures before their missions.
        </p>
        
        <div className="nbl-features">
          {features.map((feature, index) => (
            <div key={index} className="nbl-feature">
              <i className={`${feature.icon} nbl-feature-icon`}></i>
              <h3 className="nbl-feature-title">{feature.title}</h3>
              <p className="nbl-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NBLGame;