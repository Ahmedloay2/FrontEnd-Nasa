// Game state
let currentLevel = 1;
const discoveredLocations = new Set();
const levelDiscoveries = new Set();
let gameActive = false;

// Level tracking
let totalIcons = 0;
let collectedIcons = 0;
let missedIcons = 0;

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

// Elements
// const earthVideo = document.getElementById('earthVideo'); // Unused variable
const collectedCountDisplay = document.getElementById('collectedCount');
const missedCountDisplay = document.getElementById('missedCount');
const remainingCountDisplay = document.getElementById('remainingCount');
const victoryMessage = document.getElementById('victoryMessage');
const finalStats = document.getElementById('finalStats');
const hotspotsContainer = document.getElementById('hotspotsContainer');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const levelCompleteScreen = document.getElementById('levelCompleteScreen');
const levelStats = document.getElementById('levelStats');
const factsContainer = document.getElementById('factsContainer');
const nextLevelButton = document.getElementById('nextLevelButton');
const restartButton = document.getElementById('restartButton');
const missionBriefing = document.getElementById('missionBriefing');
const briefingLevelTitle = document.getElementById('briefingLevelTitle');
const briefingLevelName = document.getElementById('briefingLevelName');
const briefingDescription = document.getElementById('briefingDescription');
const briefingObjectives = document.getElementById('briefingObjectives');
const startLevelButton = document.getElementById('startLevelButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const gameOverText = document.getElementById('gameOverText');
const tryAgainButton = document.getElementById('tryAgainButton');

let spawnInterval;
let activeIcons = [];
let iconsSpawned = 0;

// Event Listeners
startButton.addEventListener('click', function() {
    startScreen.style.display = 'none';
    showMissionBriefing(1);
});

startLevelButton.addEventListener('click', function() {
    missionBriefing.classList.remove('show');
    gameActive = true;
    startLevel(currentLevel);
});

nextLevelButton.addEventListener('click', function() {
    levelCompleteScreen.classList.remove('show');
    currentLevel++;
    showMissionBriefing(currentLevel);
});

restartButton.addEventListener('click', function() {
    resetGame();
    victoryMessage.classList.remove('show');
    startScreen.style.display = 'flex';
});

tryAgainButton.addEventListener('click', function() {
    gameOverScreen.classList.remove('show');
    showMissionBriefing(currentLevel);
});

// Show mission briefing
function showMissionBriefing(level) {
    const config = levelConfig[level];
    briefingLevelTitle.textContent = `Level ${level}`;
    briefingLevelName.textContent = config.name;
    briefingDescription.textContent = config.description;
    
    // Clear and populate objectives
    briefingObjectives.innerHTML = '';
    config.objectives.forEach(objective => {
        const li = document.createElement('li');
        li.textContent = objective;
        briefingObjectives.appendChild(li);
    });
    
    missionBriefing.classList.add('show');
}

// Reset game function
function resetGame() {
    // Reset all game state
    currentLevel = 1;
    discoveredLocations.clear();
    levelDiscoveries.clear();
    gameActive = false;
    
    // Clear intervals
    clearInterval(spawnInterval);
    
    // Clear active icons
    activeIcons.forEach(icon => {
        if (icon.parentElement) {
            hotspotsContainer.removeChild(icon);
        }
    });
    activeIcons = [];
    
    // Reset all stickers to uncollected
    document.querySelectorAll('.sticker').forEach(sticker => {
        sticker.classList.remove('collected');
    });
}

// Start a level
function startLevel(level) {
    currentLevel = level;
    const config = levelConfig[currentLevel];
    
    // Reset level stats
    totalIcons = config.totalIcons;
    collectedIcons = 0;
    missedIcons = 0;
    iconsSpawned = 0;
    levelDiscoveries.clear();
    
    // Update display
    updateStatsDisplay();
    
    // Clear any existing icons
    activeIcons.forEach(icon => {
        if (icon.parentElement) {
            hotspotsContainer.removeChild(icon);
        }
    });
    activeIcons = [];
    
    // Start spawning icons
    clearInterval(spawnInterval);
    spawnInterval = setInterval(() => {
        if (gameActive && iconsSpawned < totalIcons) {
            spawnIcon();
        }
    }, config.spawnInterval);
    
    // Spawn first icon immediately
    setTimeout(() => spawnIcon(), 500);
}

// Update stats display
function updateStatsDisplay() {
    collectedCountDisplay.textContent = collectedIcons;
    missedCountDisplay.textContent = missedIcons;
    remainingCountDisplay.textContent = totalIcons - iconsSpawned;
    
    const config = levelConfig[currentLevel];
    
    // Update color based on missed count
    if (missedIcons >= config.maxMissed - 2 && missedIcons < config.maxMissed) {
        missedCountDisplay.className = 'stat-value danger';
    } else if (missedIcons >= config.maxMissed) {
        missedCountDisplay.className = 'stat-value danger';
    } else {
        missedCountDisplay.className = 'stat-value';
    }
    
    // Update collected color
    if (collectedIcons > 0) {
        collectedCountDisplay.className = 'stat-value success';
    } else {
        collectedCountDisplay.className = 'stat-value';
    }
}

// Spawn random icon
function spawnIcon() {
    if (!gameActive) return;
    
    const config = levelConfig[currentLevel];
    
    // Check if we've spawned all icons
    if (iconsSpawned >= totalIcons) {
        return;
    }
    
    // Check if we can spawn more icons simultaneously
    if (activeIcons.length >= config.maxSimultaneous) return;

    // Random icon
    const iconInfo = iconData[Math.floor(Math.random() * iconData.length)];
    
    // Random position (within viewport but avoiding edges)
    const x = 15 + Math.random() * 70; // 15% to 85%
    const y = 25 + Math.random() * 50; // 25% to 75%

    // Create hotspot
    const hotspot = document.createElement('div');
    hotspot.className = 'hotspot';
    hotspot.style.left = x + '%';
    hotspot.style.top = y + '%';
    hotspot.innerHTML = `<span style="font-size: 50px;">${iconInfo.emoji}</span>`;
    
    // Store data
    hotspot.iconData = iconInfo;
    hotspot.collected = false;
    
    // Add to container
    hotspotsContainer.appendChild(hotspot);
    activeIcons.push(hotspot);
    iconsSpawned++;
    
    // Update display
    updateStatsDisplay();

    // Click handler
    hotspot.addEventListener('click', function() {
        if (!hotspot.collected) {
            collectIcon(this);
        }
    });

    // Auto-disappear after time
    setTimeout(() => {
        if (hotspot.parentElement && !hotspot.collected) {
            // Icon was missed
            missedIcons++;
            updateStatsDisplay();
            
            hotspot.style.opacity = '0';
            setTimeout(() => {
                if (hotspot.parentElement) {
                    hotspotsContainer.removeChild(hotspot);
                    activeIcons = activeIcons.filter(icon => icon !== hotspot);
                    
                    // Check if level is complete or failed
                    checkLevelStatus();
                }
            }, 300);
        }
    }, config.disappearTime);
}

// Collect icon
function collectIcon(hotspot) {
    const iconInfo = hotspot.iconData;
    
    hotspot.collected = true;
    
    // Add to discovered locations (global)
    discoveredLocations.add(iconInfo.sticker);
    
    // Add to level discoveries
    levelDiscoveries.add(iconInfo.sticker);
    
    // Add to collected count
    collectedIcons++;
    updateStatsDisplay();

    // Collect sticker
    const sticker = document.querySelector(`.sticker[data-index="${iconInfo.sticker}"]`);
    if (sticker) {
        sticker.classList.add('collected');
    }

    // Visual feedback
    hotspot.style.transform = 'scale(1.5)';
    hotspot.style.opacity = '0';
    
    // Remove from active icons
    setTimeout(() => {
        if (hotspot.parentElement) {
            hotspotsContainer.removeChild(hotspot);
        }
        activeIcons = activeIcons.filter(icon => icon !== hotspot);
        
        // Check if level is complete
        checkLevelStatus();
    }, 300);
}

// Check level status
function checkLevelStatus() {
    const config = levelConfig[currentLevel];
    
    // Check if failed (too many missed)
    if (missedIcons >= config.maxMissed) {
        gameActive = false;
        clearInterval(spawnInterval);
        
        // Clear remaining icons
        activeIcons.forEach(icon => {
            if (icon.parentElement) {
                icon.style.opacity = '0';
                setTimeout(() => {
                    if (icon.parentElement) {
                        hotspotsContainer.removeChild(icon);
                    }
                }, 300);
            }
        });
        activeIcons = [];
        
        // Show game over
        setTimeout(() => {
            showGameOver();
        }, 1000);
        return;
    }
    
    // Check if all icons have been spawned and processed
    if (iconsSpawned >= totalIcons && activeIcons.length === 0) {
        gameActive = false;
        clearInterval(spawnInterval);
        
        // For level 3, check if all stickers collected
        if (currentLevel === 3) {
            if (discoveredLocations.size === 7) {
                setTimeout(() => {
                    showVictory();
                }, 1000);
            } else {
                setTimeout(() => {
                    showLevelComplete();
                }, 1000);
            }
        } else {
            // Show level complete
            setTimeout(() => {
                showLevelComplete();
            }, 1000);
        }
    }
}

// Show game over
function showGameOver() {
    const config = levelConfig[currentLevel];
    gameOverText.innerHTML = `
        You missed too many natural disasters!<br><br>
        <strong>Mission Statistics:</strong><br>
        Observed: ${collectedIcons} / ${totalIcons}<br>
        Missed: ${missedIcons} / ${config.maxMissed - 1} allowed<br><br>
        Don't worry - every astronaut fails sometimes.<br>
        Tracking Earth's disasters requires practice and focus.<br>
        Learn from this and try again!
    `;
    gameOverScreen.classList.add('show');
}

// Show level complete screen with facts
function showLevelComplete() {
    const config = levelConfig[currentLevel];
    
    // Update stats
    levelStats.innerHTML = `
        Excellent work! You've completed Level ${currentLevel}!<br><br>
        <strong>Mission Statistics:</strong><br>
        Observed: ${collectedIcons} / ${totalIcons}<br>
        Missed: ${missedIcons} / ${config.maxMissed - 1} allowed<br>
        Success Rate: ${Math.round((collectedIcons / totalIcons) * 100)}%<br><br>
        Disasters Observed: ${levelDiscoveries.size} unique phenomena
    `;
    
    // Display facts for discovered locations in this level
    factsContainer.innerHTML = '';
    levelDiscoveries.forEach(stickerIndex => {
        const iconInfo = iconData[stickerIndex];
        const factCard = document.createElement('div');
        factCard.className = 'fact-card';
        factCard.innerHTML = `
            <h3>${iconInfo.emoji} ${iconInfo.name}</h3>
            <p>${iconInfo.fact}</p>
        `;
        factsContainer.appendChild(factCard);
    });
    
    levelCompleteScreen.classList.add('show');
}

// Show victory message
function showVictory() {
    let totalCollected = 0;
    let totalMissed = 0;
    let totalPossible = 0;
    
    for (let i = 1; i <= 3; i++) {
        totalPossible += levelConfig[i].totalIcons;
    }
    
    // Calculate approximate stats (this is simplified)
    totalCollected = collectedIcons; // This would need to track across levels
    totalMissed = totalPossible - totalCollected; // Calculate missed icons
    
    finalStats.innerHTML = `
        Total Disasters Observed: ${totalCollected}<br>
        Total Missed: ${totalMissed}<br>
        All 7 Natural Disasters Tracked! ✅<br>
        Missions Completed: 3/3<br><br>
        You've proven yourself as a master Earth observer!
    `;
    victoryMessage.classList.add('show');
}

console.log('🚀 Cupola Explorer - Natural Disasters Edition Ready to Launch!');