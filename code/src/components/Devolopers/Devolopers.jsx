import React from "react";
import "./Devolopers.css";
import zezoImg from "../../assets/WhatsApp Image 2025-10-04 at 01.44.41_3b0d2515.jpg";
import ahmedImg from "../../assets/WhatsApp Image 2025-10-04 at 01.45.30_b0bbb01b.jpg";
import arwaImg from "../../assets/WhatsApp Image 2025-10-04 at 01.46.04_f21b394d.jpg";
import ekramImg from "../../assets/WhatsApp Image 2025-10-04 at 01.47.06_c029a31e.jpg";
import alaaImg from "../../assets/WhatsApp Image 2025-10-04 at 01.46.04_de269897.jpg";
import shefoImg from "../../assets/WhatsApp Image 2025-09-26 at 20.11.23_a45837c2.jpg";

const teamMembers = [
  {
    name: "ZEYAD NASSAR",
    quote: "Crafting the compelling narrative of the astronaut's experience, using storytelling to highlight their critical role in space exploration and the design of orbital habitats.",
    img: zezoImg,
  },
  {
    name: "AHMED LOAY",
    quote: "Crafting intuitive front-end experiences that transform complex data on Earth orbit and habitats into clear, engaging visualizations.",
    img: ahmedImg,
  },
  {
    name: "SHERIF ELGENDY",
    quote: "Building the front-end architecture that elegantly presents information on manmade satellites and orbital design.",
    img: shefoImg,
  },
  {
    name: "ARWA MOHAMED",
    quote: "Designing immersive games that simulate the challenges of building habitats and operating manmade satellites.",
    img: arwaImg,
  },
  {
    name: "EKRAM AHMED",
    quote: "Developing the interactive e-book that blends compelling graphic design with the core principles of ergonomics & human factors for an optimal reading journey.",
    img: ekramImg,
  },
  {
    name: "ALAA KHALED",
    quote: "Engineering interactive game mechanics that educate players on space exploration and the dynamics of Earth orbit.",
    img: alaaImg,
  },
  
];

const Devolopers = () => (
  <section className="devolopers-section">
    <h2 className="devolopers-title">Meet the Team</h2>
    <div className="devolopers-grid">
      {teamMembers.map((member) => (
        <div className="devoloper-card" key={member.name}>
          <div className="devoloper-img-wrap">
            <img src={member.img} alt={member.name} className="devoloper-img" />
          </div>
          <h3 className="devoloper-name">{member.name}</h3>
          <p className="devoloper-quote">{member.quote}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Devolopers;
