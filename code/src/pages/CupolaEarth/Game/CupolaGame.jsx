import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import './CupolaGame.css';

// Level configurations
const levelConfig = {
    1: { 
        totalIcons: 10,
        maxMissed: 5,
        maxSimultaneous: 2,
        spawnInterval: 3000, 
        disappearTime: 8000,
        name: "Beginner Explorer",
        description: "Welcome to your first mission aboard the International Space Station! Ten natural phenomena will appear one after another. Your reflexes and attention will be tested as you observe Earth's dynamic events.",
        objectives: [
            "10 disaster icons will appear throughout the mission",
            "Click on each icon before it disappears",
            "You can miss up to 4 icons and still pass",
            "Miss 5 or more - Mission Failed!",
            "Icons disappear after 8 seconds"
        ]
    },
    2: { 
        totalIcons: 20,
        maxMissed: 10,
        maxSimultaneous: 3,
        spawnInterval: 2500, 
        disappearTime: 6000,
        name: "Skilled Astronaut",
        description: "Excellent work! Now the challenge intensifies. Twenty natural phenomena will appear, some simultaneously. You'll need sharper focus and faster reactions to track these Earth-changing events.",
        objectives: [
            "20 disaster icons will appear throughout the mission",
            "Multiple icons may appear at the same time",
            "You can miss up to 9 icons and still pass",
            "Miss 10 or more - Mission Failed!",
            "Icons disappear after 6 seconds"
        ]
    },
    3: { 
        totalIcons: 30,
        maxMissed: 15,
        maxSimultaneous: 4,
        spawnInterval: 2000, 
        disappearTime: 4000,
        name: "Master of Space",
        description: "This is your final and most demanding mission! Thirty natural disasters will rapidly appear across the globe. Only astronauts with exceptional observation skills can track all these critical Earth events.",
        objectives: [
            "30 disaster icons will appear throughout the mission",
            "Up to 4 icons may appear simultaneously!",
            "You can miss up to 14 icons and still pass",
            "Miss 15 or more - Mission Failed!",
            "Icons disappear after only 4 seconds",
            "Collect all 7 unique disaster observations to win!"
        ]
    }
};

// Icon data - Natural Disasters
const iconData = [
    { 
        emoji: "🌪️", 
        name: "Hurricane/Cyclone", 
        fact: "Hurricanes can be 500km wide with massive spiral cloud structures! Astronauts provide crucial images from space that help predict their paths and save lives on Earth. Examples include Hurricane Harvey (2017) and Hurricane Florence (2018).", 
        sticker: 0 
    },
    { 
        emoji: "🌋", 
        name: "Volcanic Eruption", 
        fact: "Astronauts can see volcanic ash plumes and smoke spreading into the atmosphere from space! Major eruptions like Eyjafjallajökull (2010) in Iceland and Mount Etna have been photographed from the ISS, helping scientists track ash clouds.", 
        sticker: 1 
    },
    { 
        emoji: "🔥", 
        name: "Wildfires", 
        fact: "Large wildfires appear as smoke plumes stretching over vast areas, visible from 400km above Earth! Astronauts monitor California wildfires and Amazon forest fires, providing real-time data to emergency responders on the ground.", 
        sticker: 2 
    },
    { 
        emoji: "🌊", 
        name: "Flooding", 
        fact: "After hurricanes or monsoons, astronauts can see rivers overflowing and large areas submerged from space! These observations help disaster relief teams identify the worst-affected regions and coordinate rescue operations.", 
        sticker: 3 
    },
    { 
        emoji: "💨", 
        name: "Dust Storms", 
        fact: "Dust storms from the Sahara Desert appear as giant tan clouds covering thousands of kilometers! These massive storms can cross the Atlantic Ocean, and astronauts track them to help predict air quality and weather patterns.", 
        sticker: 4 
    },
    { 
        emoji: "⚡", 
        name: "Earthquake Effects", 
        fact: "While earthquakes aren't directly visible from space, astronauts can observe their aftermath including coastal changes, massive landslides, and urban blackouts. These observations help assess damage and coordinate relief efforts.", 
        sticker: 5 
    },
    { 
        emoji: "🌀", 
        name: "Tsunami Effects", 
        fact: "Tsunami waves themselves are hard to spot from space, but astronauts can observe coastal flooding and dramatic changes in water patterns after these devastating events, helping to map affected areas for rescue teams.", 
        sticker: 6 
    }
];

// Helper Components
const Hotspot = React.memo(({ icon, onCollect }) => {
    const handleClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!icon.collected) {
            onCollect(icon.id);
        }
    }, [icon.collected, icon.id, onCollect]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!icon.collected) {
            onCollect(icon.id);
        }
    }, [icon.collected, icon.id, onCollect]);

    return (
        <div 
            className="hotspot"
            style={{ 
                left: `${icon.x}%`, 
                top: `${icon.y}%`,
                opacity: icon.collected ? 0 : 1,
                transform: icon.collected ? 'scale(1.5)' : 'scale(1)',
                transition: 'all 0.3s ease',
                zIndex: icon.collected ? 600 : 500,
                position: 'absolute',
                cursor: 'pointer',
                pointerEvents: 'auto'
            }}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <span style={{ 
                fontSize: '50px', 
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
                {icon.emoji}
            </span>
        </div>
    );
});

const MissionBriefing = ({ level, config, onStartLevel }) => {
    return (
        <div className="mission-briefing">
            <div className="mission-briefing-content">
                <h1>Level {level}</h1>
                <h2>{config.name}</h2>
                <div className="mission-description">{config.description}</div>
                <div className="mission-objectives">
                    <h3>📋 Mission Objectives:</h3>
                    <ul>
                        {config.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                        ))}
                    </ul>
                </div>
                <button className="game-button" onClick={onStartLevel}>
                    🚀 Start Mission
                </button>
            </div>
        </div>
    );
};

const GameOverScreen = ({ collectedIcons, missedIcons, totalIcons, maxMissed, onTryAgain }) => {
    return (
        <div className="game-over-screen">
            <div className="game-over-content">
                <h1>❌ Mission Failed</h1>
                <div className="game-over-text">
                    You missed too many natural disasters!<br /><br />
                    <strong>Mission Statistics:</strong><br />
                    Observed: {collectedIcons} / {totalIcons}<br />
                    Missed: {missedIcons} / {maxMissed - 1} allowed<br /><br />
                    Don't worry - every astronaut fails sometimes.<br />
                    Tracking Earth's disasters requires practice and focus.<br />
                    Learn from this and try again!
                </div>
                <button className="game-button try-again" onClick={onTryAgain}>
                    🔄 Try Again
                </button>
            </div>
        </div>
    );
};

const LevelCompleteScreen = ({ level, collectedIcons, missedIcons, totalIcons, maxMissed, levelDiscoveries, iconData, onNextLevel }) => {
    return (
        <div className="level-complete-screen">
            <div className="level-complete-content">
                <h1>🎊 Level Complete! 🎊</h1>
                <div className="level-stats">
                    Excellent work! You've completed Level {level}!<br /><br />
                    <strong>Mission Statistics:</strong><br />
                    Observed: {collectedIcons} / {totalIcons}<br />
                    Missed: {missedIcons} / {maxMissed - 1} allowed<br />
                    Success Rate: {Math.round((collectedIcons / totalIcons) * 100)}%<br /><br />
                    Disasters Observed: {levelDiscoveries.size} unique phenomena
                </div>
                <h2>📚 What You Discovered:</h2>
                <div className="facts-container">
                    {Array.from(levelDiscoveries).map(stickerIndex => {
                        const iconInfo = iconData[stickerIndex];
                        return (
                            <div key={stickerIndex} className="fact-card">
                                <h3>{iconInfo.emoji} {iconInfo.name}</h3>
                                <p>{iconInfo.fact}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="button-container">
                    <button className="game-button" onClick={onNextLevel}>
                        Next Mission →
                    </button>
                </div>
            </div>
        </div>
    );
};

const VictoryScreen = ({ discoveredLocations, onRestart }) => {
    return (
        <div className="victory-message">
            <div className="victory-content">
                <h1>🎉 Mission Complete! 🎉</h1>
                <div className="victory-text">
                    <p>
                        Outstanding work, astronaut!<br />
                        You've successfully completed all three missions!<br /><br />
                        📊 Final Statistics:<br />
                        Total Disasters Observed: {discoveredLocations.size * 8}+<br />
                        All 7 Natural Disasters Tracked! ✅<br />
                        Missions Completed: 3/3<br /><br />
                        You've proven yourself as a master Earth observer!
                    </p>
                </div>
                <button className="game-button restart" onClick={onRestart}>
                    🔄 Play Again
                </button>
            </div>
        </div>
    );
};

const CupolaGame = () => {
    // Game state
    const [currentLevel, setCurrentLevel] = useState(1);
    const [discoveredLocations, setDiscoveredLocations] = useState(new Set());
    const [levelDiscoveries, setLevelDiscoveries] = useState(new Set());
    const [gameActive, setGameActive] = useState(false);
    const [collectedIcons, setCollectedIcons] = useState(0);
    const [missedIcons, setMissedIcons] = useState(0);
    const [iconsSpawned, setIconsSpawned] = useState(0);
    const [activeIcons, setActiveIcons] = useState([]);
    
    // Loading state for video
    const [videoLoaded, setVideoLoaded] = useState(false);
    
    // Screen states
    const [showStartScreen, setShowStartScreen] = useState(true);
    const [showMissionBriefing, setShowMissionBriefing] = useState(false);
    const [showGameOverScreen, setShowGameOverScreen] = useState(false);
    const [showLevelComplete, setShowLevelComplete] = useState(false);
    const [showVictoryMessage, setShowVictoryMessage] = useState(false);

    // Refs
    const spawnIntervalRef = useRef(null);
    const gameContainerRef = useRef(null);
    const iconIdCounterRef = useRef(0);

    // Helper function to generate positions like vanilla JS version
    const generatePosition = useCallback(() => {
        // Random position (within viewport but avoiding edges) - same as vanilla JS
        const x = 15 + Math.random() * 70; // 15% to 85%
        const y = 25 + Math.random() * 50; // 25% to 75%
        
        return { x, y };
    }, []);

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (spawnIntervalRef.current) {
                clearInterval(spawnIntervalRef.current);
            }
        };
    }, []);

    // Helper function for missed status class
    const getMissedStatusClass = () => {
        const config = levelConfig[currentLevel];
        if (!config) return '';
        
        if (missedIcons >= config.maxMissed - 2 && missedIcons < config.maxMissed) {
            return 'danger';
        } else if (missedIcons >= config.maxMissed) {
            return 'danger';
        }
        return '';
    };

    // Generate unique icon ID
    const generateIconId = useCallback(() => {
        iconIdCounterRef.current += 1;
        return `icon-${iconIdCounterRef.current}`;
    }, []);

    // Check level status
    const checkLevelStatus = useCallback(() => {
        const config = levelConfig[currentLevel];
        
        // Check if failed (too many missed)
        if (missedIcons >= config.maxMissed) {
            setGameActive(false);
            if (spawnIntervalRef.current) {
                clearInterval(spawnIntervalRef.current);
            }
            
            // Clear remaining icons
            setActiveIcons([]);
            
            // Show game over
            setTimeout(() => {
                setShowGameOverScreen(true);
            }, 1000);
            return;
        }
        
        // Check if all icons have been spawned and processed
        if (iconsSpawned >= config.totalIcons && activeIcons.length === 0) {
            setGameActive(false);
            if (spawnIntervalRef.current) {
                clearInterval(spawnIntervalRef.current);
            }
            
            // For level 3, check if all stickers collected
            if (currentLevel === 3) {
                if (discoveredLocations.size === 7) {
                    setTimeout(() => {
                        setShowVictoryMessage(true);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        setShowLevelComplete(true);
                    }, 1000);
                }
            } else {
                // Show level complete
                setTimeout(() => {
                    setShowLevelComplete(true);
                }, 1000);
            }
        }
    }, [currentLevel, missedIcons, iconsSpawned, activeIcons.length, discoveredLocations.size]);

    // Check level status when relevant state changes
    useEffect(() => {
        if (gameActive) {
            checkLevelStatus();
        }
    }, [missedIcons, iconsSpawned, activeIcons.length, gameActive, checkLevelStatus]);

    // Video loading handlers
    const handleVideoLoad = useCallback(() => {
        setVideoLoaded(true);
    }, []);

    const handleVideoError = useCallback(() => {
        setVideoLoaded(false);
        // Could add error state here if needed
    }, []);

    // Spawn icon function - simplified approach
    const spawnIcon = useCallback(() => {
        console.log('🎯 spawnIcon called');
        
        const config = levelConfig[currentLevel];
        if (!config) {
            console.log('❌ No config found for level:', currentLevel);
            return;
        }

        // Random icon
        const iconInfo = iconData[Math.floor(Math.random() * iconData.length)];
        
        // Generate position like vanilla JS
        const position = generatePosition();

        // Create icon object
        const newIcon = {
            id: generateIconId(),
            emoji: iconInfo.emoji,
            iconData: iconInfo,
            x: position.x,
            y: position.y,
            collected: false
        };

        console.log('✨ Creating new icon at position:', position, 'emoji:', iconInfo.emoji);

        // Add to active icons and increment spawned count
        setActiveIcons(prev => {
            const newIcons = [...prev, newIcon];
            console.log('📊 Active icons count will be:', newIcons.length);
            return newIcons;
        });
        setIconsSpawned(prev => {
            const newCount = prev + 1;
            console.log('📈 Icons spawned count will be:', newCount);
            return newCount;
        });

        // Auto-disappear after time
        setTimeout(() => {
            setActiveIcons(currentIcons => {
                const iconStillExists = currentIcons.find(icon => icon.id === newIcon.id);
                if (iconStillExists && !iconStillExists.collected) {
                    // Icon was missed
                    setMissedIcons(prev => prev + 1);
                    return currentIcons.filter(icon => icon.id !== newIcon.id);
                }
                return currentIcons;
            });
        }, config.disappearTime);
    }, [currentLevel, generatePosition, generateIconId]);

    // Game logic functions - simplified version
    const startLevel = useCallback((level) => {
        console.log('🚀 Starting level:', level);
        const config = levelConfig[level];
        
        // Reset level stats
        setCollectedIcons(0);
        setMissedIcons(0);
        setIconsSpawned(0);
        setLevelDiscoveries(new Set());
        setActiveIcons([]);
        
        // Clear any existing interval
        if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current);
            spawnIntervalRef.current = null;
        }
        
        console.log('📋 Level config:', config);
        
        // Start spawning icons immediately - simplified approach
        console.log('⏰ Starting to spawn icons immediately');
        
        // Spawn first icon immediately 
        setTimeout(() => {
            console.log('🎯 Spawning first icon');
            spawnIcon();
        }, 500);
        
        // Set up interval for subsequent icons
        spawnIntervalRef.current = setInterval(() => {
            console.log('🎯 Interval attempting to spawn icon');
            spawnIcon();
        }, config.spawnInterval);
        
    }, [spawnIcon]);

    // Event handlers
    const handleStartGame = useCallback(() => {
        setShowStartScreen(false);
        setShowMissionBriefing(true);
    }, []);

    const handleStartLevel = useCallback(() => {
        console.log('🎮 handleStartLevel called');
        setShowMissionBriefing(false);
        setGameActive(true);
        startLevel(currentLevel);
    }, [currentLevel, startLevel]);

    const handleTryAgain = useCallback(() => {
        setShowGameOverScreen(false);
        setShowMissionBriefing(true);
    }, []);

    const handleNextLevel = useCallback(() => {
        setShowLevelComplete(false);
        setCurrentLevel(prev => prev + 1);
        setShowMissionBriefing(true);
    }, []);
    const resetGame = useCallback(() => {
        // Reset all game state
        setCurrentLevel(1);
        setDiscoveredLocations(new Set());
        setLevelDiscoveries(new Set());
        setGameActive(false);
        setCollectedIcons(0);
        setMissedIcons(0);
        setIconsSpawned(0);
        setActiveIcons([]);
        
        // Clear intervals
        if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current);
        }
        
        // Reset screen states
        setShowStartScreen(false);
        setShowMissionBriefing(false);
        setShowGameOverScreen(false);
        setShowLevelComplete(false);
        setShowVictoryMessage(false);
    }, []);
    const handleRestart = useCallback(() => {
        resetGame();
        setShowVictoryMessage(false);
        setShowStartScreen(true);
    }, [resetGame]);

    const handleIconCollect = useCallback((iconId) => {
        setActiveIcons(prevIcons => {
            const updatedIcons = prevIcons.map(icon => {
                if (icon.id === iconId && !icon.collected) {
                    // Mark as collected
                    const updatedIcon = { ...icon, collected: true };
                    
                    // Add to discovered locations (global)
                    setDiscoveredLocations(prev => new Set([...prev, icon.iconData.sticker]));
                    
                    // Add to level discoveries
                    setLevelDiscoveries(prev => new Set([...prev, icon.iconData.sticker]));
                    
                    // Increment collected count
                    setCollectedIcons(prev => prev + 1);
                    
                    return updatedIcon;
                }
                return icon;
            });
            
            // Remove collected icon after animation
            setTimeout(() => {
                setActiveIcons(currentIcons => 
                    currentIcons.filter(icon => icon.id !== iconId)
                );
            }, 300);
            
            return updatedIcons;
        });
    }, []);
    // Game logic functions

    return (
        <div className="cupola-game">
            <div className="game-container" ref={gameContainerRef}>
                {/* Video background */}
                <video 
                    className="earth-video" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                >
                    <source src="/earth2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Loading overlay for video */}
                {!videoLoaded && (
                    <div className="video-loading-overlay">
                        <LoadingSpinner 
                            message="Loading Earth view..." 
                            size="large" 
                            theme="space" 
                        />
                    </div>
                )}

                <div className="overlay"></div>
                <div className="stars"></div>

                {/* Cupola Window Frame */}
                <div className="cupola-frame"></div>
                
                {/* Title */}
                <div className="title">🛰️ Cupola Explorer 🌍</div>

                {/* Mission Stats */}
                <div className="mission-stats">
                    <div className="stat-row">
                        <h3>Collected:</h3>
                        <span className={`stat-value ${collectedIcons > 0 ? 'success' : ''}`}>
                            {collectedIcons}
                        </span>
                    </div>
                    <div className="stat-row">
                        <h3>Missed:</h3>
                        <span className={`stat-value ${getMissedStatusClass()}`}>
                            {missedIcons}
                        </span>
                    </div>
                    <div className="stat-row">
                        <h3>Remaining:</h3>
                        <span className="stat-value">
                            {levelConfig[currentLevel]?.totalIcons - iconsSpawned || 0}
                        </span>
                    </div>
                </div>

                {/* Hotspots Container */}
                <div className="hotspots-container">
                    {activeIcons.map((icon) => (
                        <Hotspot
                            key={icon.id}
                            icon={icon}
                            onCollect={handleIconCollect}
                        />
                    ))}
                </div>

                {/* Sticker Collection Book */}
                <div className="sticker-book">
                    <div className="book-title">🎖️<br />Collection</div>
                    <div className="stickers-container">
                        {iconData.map((item, index) => (
                            <div 
                                key={index}
                                className={`sticker ${discoveredLocations.has(item.sticker) ? 'collected' : ''}`}
                                data-index={index}
                            >
                                {item.emoji}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Start Screen */}
                {showStartScreen && (
                    <div className="start-screen">
                        <h1>🛰️ Cupola Explorer 🌍</h1>
                        <p>
                            Welcome, Astronaut!<br /><br />
                            Your mission: Collect Earth's wonders as they appear through the cupola window.<br />
                            Click fast before they disappear!<br /><br />
                            🎯 Complete 3 levels of increasing difficulty<br />
                            ⚠️ Don't miss too many - or the mission fails!<br />
                            ⭐ Collect all 7 unique stickers to win
                        </p>
                        <button className="game-button" onClick={handleStartGame}>
                            🚀 Begin Mission
                        </button>
                    </div>
                )}

                {/* Mission Briefing Screen */}
                {showMissionBriefing && (
                    <MissionBriefing
                        level={currentLevel}
                        config={levelConfig[currentLevel]}
                        onStartLevel={handleStartLevel}
                    />
                )}

                {/* Game Over Screen */}
                {showGameOverScreen && (
                    <GameOverScreen
                        collectedIcons={collectedIcons}
                        missedIcons={missedIcons}
                        totalIcons={levelConfig[currentLevel]?.totalIcons || 0}
                        maxMissed={levelConfig[currentLevel]?.maxMissed || 0}
                        onTryAgain={handleTryAgain}
                    />
                )}

                {/* Level Complete Screen */}
                {showLevelComplete && (
                    <LevelCompleteScreen
                        level={currentLevel}
                        collectedIcons={collectedIcons}
                        missedIcons={missedIcons}
                        totalIcons={levelConfig[currentLevel]?.totalIcons || 0}
                        maxMissed={levelConfig[currentLevel]?.maxMissed || 0}
                        levelDiscoveries={levelDiscoveries}
                        iconData={iconData}
                        onNextLevel={handleNextLevel}
                    />
                )}

                {/* Victory Message */}
                {showVictoryMessage && (
                    <VictoryScreen
                        discoveredLocations={discoveredLocations}
                        onRestart={handleRestart}
                    />
                )}
            </div>
        </div>
    );
};

export default CupolaGame;