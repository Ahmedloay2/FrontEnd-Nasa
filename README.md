# 🚀 AstroPass - NASA Space Apps Challenge 2025

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF?logo=vite)](https://vitejs.dev/)
[![NASA Space Apps](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge-0B3D91)](https://www.spaceappschallenge.org/)

> **An immersive astronaut training and space exploration experience built for NASA Space Apps Challenge 2025**

AstroPass is a cutting-edge web application that brings the wonders of space exploration to your fingertips. Experience life as an astronaut through interactive training simulations, educational content, and stunning visualizations of Earth from space.

![AstroPass Homepage](./docs/images/home-hero.jpg)
*The main homepage showcasing all available space experiences*

## 📖 Table of Contents

- [🌟 Features](#-features)
- [🖼️ Project Gallery](#️-project-gallery)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎮 Game Modules](#-game-modules)
- [🔧 Development](#-development)
- [🏗️ Deployment](#️-deployment)
- [♿ Accessibility](#-accessibility)
- [📱 Responsive Design](#-responsive-design)
- [🤝 Contributing](#-contributing)
- [👥 Team](#-team)
- [📄 License](#-license)

---

## 🌟 Features

<div align="center">

### 🌍 **Cupola Earth Observatory**
*Experience Earth observation from the International Space Station's Cupola module*

![Cupola Earth View](./docs/images/cupola-earth-main.png)

</div>

**Explore breathtaking views of our planet with:**
- Real-time Earth viewing simulation
- Interactive zoom controls
- NASA Earth observation data integration
- Stunning photography from space

---

<div align="center">

### 🏊‍♂️ **NBL (Neutral Buoyancy Laboratory) Training**
*Train like a real astronaut in our weightlessness simulation*

![NBL Training Game](./docs/images/nbl-training.jpg)

</div>
**Training features:**
- Realistic underwater training environment
- Interactive controls and movement
- Educational content about astronaut preparation
- Immersive 3D-like experience

---

<div align="center">

### 📚 **Interactive Astronaut Stories**
*Embark on a choose-your-own-adventure journey through space*

![Story Module](./docs/images/story-interface.png)

</div>

**Story features:**
- 6-part interactive story modules
- Role selection (Commander, Pilot, Mission Specialist)
- Smart quizzes with educational content
- Memory games and challenges
- Real astronaut experiences and scenarios

---

<div align="center">

### 📖 **Digital Space E-Book**
*"Orbiting the Void: An Astronaut's Life" - A comprehensive digital experience*

![E-Book Reader](./docs/images/ebook.JPG)

</div>
**E-book features:**
- Full PDF reader integration
- Audio narration (podcast version)
- Stunning space photography
- Personal astronaut stories and insights

---

## 🖼️ Project Gallery

<div align="center">

### 🏠 **Homepage Experience**

![Homepage Features](./docs/images/home-features.jpg)
*Clean and intuitive feature cards showcasing all available experiences*

![Homepage Missions](./docs/images/home-missions.jpg)
*Mission selection and navigation interface*

---

### 📖 **Interactive Story System**

![Story Hero](./docs/images/story-hero.jpg)
*Story introduction and character setup*

![Story Form](./docs/images/story-form.jpg)
*Interactive story form and user input interface*

![Story Questions](./docs/images/story-question.jpg)
*Educational quiz system with multiple choice questions*

---

### 🌍 **Earth Observation Gallery**

![Earth Gallery Aurora](./docs/images/earth-gallery-aurora.jpg)
*Aurora Borealis viewed from the International Space Station*

![Earth Gallery Night](./docs/images/earth-gallery-night.jpg)
*Earth at night showing city lights and human activity*

![Earth Gallery Eclipse](./docs/images/earth-gallery-eclipse.jpg)
*Solar eclipse shadow captured from space*

---

### 🏊‍♂️ **NBL Training Environment**

![NBL Main Interface](./docs/images/NBL-main.JPG)
*NBL training main interface and navigation*

![NBL Game Interface](./docs/images/nbl-game.JPG)
*Interactive underwater training simulation*

![NBL Content](./docs/images/nbl-content.JPG)
*Educational content and training information*

---

### 🛰️ **Cupola Earth Observatory**

![Cupola Main](./docs/images/cupola-main.JPG)
*Cupola Earth main interface with navigation tabs*

![Cupola Game](./docs/images/cupola-game.JPG)
*Interactive Earth observation game*

![Cupola Discover](./docs/images/cupola-discover.JPG)
*Educational content and Earth science information*

![Cupola Item Detail](./docs/images/cupola-item.jpg)
*Detailed view of Earth observation items*

---

### 📚 **E-Book Experience**

![E-Book Interface](./docs/images/ebook.JPG)
*Complete e-book reading experience with audio controls*

---

### 👥 **Development Team**

![Development Team](./docs/images/team-members.JPG)
*Meet the talented team behind AstroPass*

</div>

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern component-based UI library
- **React Router DOM 6.30.1** - Client-side routing
- **Vite 7.1.9** - Lightning-fast build tool and dev server

### State Management & Performance
- **TanStack React Query 5.83.0** - Server state management
- **React.lazy & Suspense** - Code splitting and lazy loading
- **React.memo** - Component memoization for performance

### Graphics & Visualization
- **GL Matrix 3.4.4** - WebGL matrix operations for 3D graphics
- **Custom CSS animations** - Smooth transitions and effects

### Development Tools
- **ESLint 9.32.0** - Code linting and formatting
- **PropTypes** - Runtime type checking
- **FontAwesome 6.5.1** - Icon library

### Build & Deployment
- **Vite Build System** - Optimized production builds
- **Code Splitting** - Automatic chunk optimization
- **Asset Optimization** - Image and video compression

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Ahmedloay2/Passengers.git

# Navigate to project directory
cd Passengers/code

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Setup
Create a `.env` file in the `/code` directory:
```env
VITE_APP_TITLE=AstroPass
VITE_APP_DESCRIPTION=NASA Space Apps Challenge 2025
VITE_API_BASE_URL=your_api_url_here
```

## 📁 Project Structure

```
code/
├── public/                     # Static assets
│   ├── earth2.mp4             # Earth rotation video
│   ├── Game/                  # Game-specific assets
│   └── audio/                 # Audio files
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Layout components (Navbar, Footer)
│   │   ├── ui/               # UI components (FeatureCard, LoadingSpinner)
│   │   ├── ErrorBoundary/    # Error handling
│   │   └── Developers/       # Team information
│   ├── pages/                # Main application pages
│   │   ├── Home/             # Landing page
│   │   ├── CupolaEarth/      # Earth observation module
│   │   ├── Story/            # Interactive stories
│   │   ├── EBook/            # Digital book reader
│   │   ├── NBLGame/          # Training simulation
│   │   └── NotFound/         # 404 page
│   ├── assets/               # Images, videos, and media
│   ├── styles/               # Global CSS styles
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── Dockerfile                # Container configuration
├── nginx.conf               # Production server config
├── package.json             # Dependencies and scripts
└── vite.config.js          # Build configuration
```

## 🎮 Game Modules

### 1. Cupola Earth Observatory
**Location**: `/cupola-earth`
- Interactive Earth viewing from ISS
- Zoom and pan controls
- Educational content about Earth science
- NASA imagery integration

**Key Features**:
- Real-time Earth rotation simulation
- Multiple viewing modes
- Educational overlays
- Photography gallery

### 2. NBL Training Simulation
**Location**: `/nbl-game`
- Underwater astronaut training simulation
- Realistic movement controls
- Educational content about spacewalk preparation
- Progress tracking

**Game Mechanics**:
- WASD movement controls
- Physics-based interactions
- Training objectives
- Performance scoring

### 3. Interactive Story Adventure
**Location**: `/story`
- Choose-your-own-adventure format
- Multiple story paths and endings
- Educational quizzes integrated
- Memory challenges

**Story Elements**:
- Character role selection
- Decision-based branching
- Educational content delivery
- Progress saving

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Production build
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix linting issues
npm run health-check    # Full project health check

# Deployment
npm run deploy:netlify  # Deploy to Netlify
npm run deploy:vercel   # Deploy to Vercel
```

### Development Guidelines

1. **Component Structure**: Use functional components with hooks
2. **Performance**: Implement React.memo for all components
3. **Accessibility**: Follow WCAG 2.1 AA guidelines
4. **Code Style**: Follow ESLint configuration
5. **Testing**: Write unit tests for critical components

### Adding New Features

1. Create component in appropriate `/src/components` or `/src/pages` directory
2. Add routing in `App.jsx` if needed
3. Implement lazy loading for page components
4. Add PropTypes for type checking
5. Include accessibility attributes
6. Update navigation if required

## 🏗️ Deployment

### Production Build
```bash
npm run build
```

### Deployment Options

#### Netlify
```bash
npm run deploy:netlify
```

#### Vercel
```bash
npm run deploy:vercel
```

#### Docker
```bash
# Build Docker image
docker build -t astropass .

# Run container
docker run -p 80:80 astropass
```

### Performance Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Compressed images and videos
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Optimized re-renders
- **Bundle Analysis**: Monitor chunk sizes

## ♿ Accessibility

AstroPass is built with accessibility as a priority:

- **WCAG 2.1 AA Compliant**
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast** - Accessible color schemes
- **Focus Management** - Clear focus indicators
- **Reduced Motion** - Respects user preferences

## 📱 Responsive Design

- **Mobile First** - Optimized for all devices
- **Flexible Grid** - CSS Grid and Flexbox layouts
- **Touch Friendly** - Large interactive areas
- **Performance** - Optimized for mobile networks

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 👥 Team

**AstroPass Development Team**

![Team Photo](./docs/images/team-members.JPG)
*The dedicated team behind AstroPass*

### Core Developers
- **Frontend Lead** - React architecture and UI/UX
- **Game Developer** - Interactive modules and simulations  
- **Content Creator** - Educational content and storytelling
- **Designer** - Visual design and user experience

*Special thanks to NASA for providing inspiration and educational content.*


## 🚀 Ready to Explore Space?

Experience the wonders of space exploration with AstroPass. Whether you're training like an astronaut, observing Earth from the ISS, or diving into interactive space stories, AstroPass offers an unforgettable journey through the cosmos.

**[🌟 Launch AstroPass](https://passengers-gilt.vercel.app/)**

*Built with ❤️ for NASA Space Apps Challenge 2025*

---
