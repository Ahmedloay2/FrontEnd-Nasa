import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Game.css';

const Game = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const gameLoopRef = useRef(null);
    const audioContextRef = useRef(null);
    const keysRef = useRef({});
    
    // Game state
    const [gameState, setGameState] = useState({
        player: {
            x: 575,
            y: 375,
            width: 50,
            height: 80,
            vx: 0,
            vy: 0,
            mass: 0,
            baseMass: 0,
            speed: 1.0,
            rotation: 0
        },
        objects: [],
        bubbles: [],
        massEffects: [],
        timeLeft: 60,
        score: 0,
        collected: 0,
        totalObjects: 10,
        targetCollections: 8,
        hasWon: false,
        isGameOver: false,
        safeZone: {
            x: 575,
            y: 375,
            radius: 280
        },
        attempts: 3,
        wasOutsideZone: false,
        alarmCooldown: 0,
        bubbleSoundTimer: 0
    });

    const [showEndScreen, setShowEndScreen] = useState(false);
    const [showWinNotification, setShowWinNotification] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [alarmActive, setAlarmActive] = useState(false);

    const objectTypes = useMemo(() => [
        { name: 'EVA Helmet', mass: 3.2, color: '#E6E6FA', size: 28, points: 40, isTarget: true, emoji: '🪖' },
        { name: 'Space Tether', mass: 0.8, color: '#C0C0C0', size: 22, points: 25, isTarget: true, emoji: '🔗' },
        { name: 'EVA Glove', mass: 1.5, color: '#F0F8FF', size: 24, points: 30, isTarget: true, emoji: '🧤' },
        { name: 'Life Support Unit', mass: 5.2, color: '#4169E1', size: 35, points: 65, isTarget: true, emoji: '🔋' },
        { name: 'Oxygen Tank', mass: 4.8, color: '#32CD32', size: 32, points: 60, isTarget: true, emoji: '🫧' },
        { name: 'Communication Device', mass: 1.2, color: '#FFD700', size: 20, points: 35, isTarget: true, emoji: '📡' },
        { name: 'EVA Tool', mass: 2.3, color: '#8B4513', size: 26, points: 45, isTarget: true, emoji: '🔧' },
        { name: 'Space Suit Boot', mass: 2.8, color: '#DCDCDC', size: 30, points: 50, isTarget: true, emoji: '🥾' },
        { name: 'Thermal Blanket', mass: -1.8, color: '#FFB6C1', size: 28, points: 40, isTarget: true, emoji: '🛡️' },
        { name: 'EVA Camera Module', mass: 1.9, color: '#333333', size: 25, points: 38, isTarget: true, emoji: '📷' }
    ], []);

    // Sound System
    const sounds = useMemo(() => ({
        collect: (pitch = 1) => {
            if (!soundEnabled || !audioContextRef.current) return;
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            oscillator.frequency.value = 400 * pitch;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);

            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + 0.3);
        },

        alarm: () => {
            if (!soundEnabled || !audioContextRef.current) return;
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            oscillator.frequency.value = 200;
            oscillator.type = 'square';

            gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + 0.5);
        },

        win: () => {
            if (!soundEnabled || !audioContextRef.current) return;
            const frequencies = [523.25, 659.25, 783.99]; // C, E, G chord

            frequencies.forEach((freq, i) => {
                const oscillator = audioContextRef.current.createOscillator();
                const gainNode = audioContextRef.current.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContextRef.current.destination);

                oscillator.frequency.value = freq;
                oscillator.type = 'sine';

                const startTime = audioContextRef.current.currentTime + (i * 0.1);
                gainNode.gain.setValueAtTime(0.15, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);

                oscillator.start(startTime);
                oscillator.stop(startTime + 0.8);
            });
        },

        bubble: () => {
            if (!soundEnabled || !audioContextRef.current || Math.random() > 0.05) return;
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            oscillator.frequency.value = 800 + Math.random() * 400;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2);

            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + 0.2);
        },

        perfect: () => {
            if (!soundEnabled || !audioContextRef.current) return;
            const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C octave

            frequencies.forEach((freq, i) => {
                const oscillator = audioContextRef.current.createOscillator();
                const gainNode = audioContextRef.current.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContextRef.current.destination);

                oscillator.frequency.value = freq;
                oscillator.type = 'sine';

                const startTime = audioContextRef.current.currentTime + (i * 0.15);
                gainNode.gain.setValueAtTime(0.2, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 1);

                oscillator.start(startTime);
                oscillator.stop(startTime + 1);
            });
        },

        fail: () => {
            if (!soundEnabled || !audioContextRef.current) return;
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            oscillator.frequency.setValueAtTime(400, audioContextRef.current.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContextRef.current.currentTime + 0.5);
            oscillator.type = 'sawtooth';

            gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + 0.5);
        },

        move: () => {
            if (!soundEnabled || !audioContextRef.current || Math.random() > 0.05) return;
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            oscillator.frequency.value = 100 + Math.random() * 50;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.02, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);

            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + 0.1);
        }
    }), [soundEnabled]);

    // Helper functions
    const isInSafeZone = useCallback((x, y) => {
        const distance = Math.hypot(x - gameState.safeZone.x, y - gameState.safeZone.y);
        return distance <= gameState.safeZone.radius;
    }, [gameState.safeZone]);

    const createBubble = useCallback(() => {
        return {
            x: Math.random() * 1150,
            y: 750 + Math.random() * 200,
            size: Math.random() * 6 + 2,
            speed: Math.random() * 0.8 + 0.4,
            opacity: Math.random() * 0.5 + 0.3
        };
    }, []);

    const createMassEffect = useCallback((x, y, mass) => {
        return {
            x: x,
            y: y,
            mass: mass,
            life: 90,
            maxLife: 90,
            scale: 0.5,
            alpha: 1
        };
    }, []);

    const triggerAlarm = useCallback(() => {
        setAlarmActive(true);
        sounds.alarm();
        setTimeout(() => {
            setAlarmActive(false);
        }, 600);
    }, [sounds]);

    const showWinNotificationHandler = useCallback(() => {
        setShowWinNotification(true);
        sounds.win();
        setTimeout(() => {
            setShowWinNotification(false);
        }, 3000);
    }, [sounds]);

    const endGame = useCallback(() => {
        setGameState(prev => ({ ...prev, isGameOver: true }));
        setShowEndScreen(true);

        if (gameState.attempts <= 0) {
            sounds.fail();
        } else if (gameState.collected >= gameState.totalObjects) {
            sounds.perfect();
        } else if (gameState.hasWon) {
            sounds.win();
        } else {
            sounds.fail();
        }
    }, [gameState.attempts, gameState.collected, gameState.totalObjects, gameState.hasWon, sounds]);

    // Drawing functions
    const drawAstronaut = useCallback((ctx, x, y) => {
        ctx.save();
        ctx.translate(x, y);

        // Main body
        ctx.fillStyle = '#F0F0F0';
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 30, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#C0C0C0';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Helmet
        ctx.fillStyle = 'rgba(100, 180, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(0, -25, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#E0E0E0';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Helmet reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(-5, -28, 6, 0, Math.PI * 2);
        ctx.fill();

        // Torso equipment
        ctx.fillStyle = '#808080';
        ctx.fillRect(-12, -5, 24, 25);
        ctx.strokeStyle = '#606060';
        ctx.lineWidth = 2;
        ctx.strokeRect(-12, -5, 24, 25);

        // Arms
        ctx.fillStyle = '#E0E0E0';
        ctx.beginPath();
        ctx.ellipse(-20, 5, 8, 20, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#C0C0C0';
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(20, 5, 8, 20, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Legs
        ctx.fillStyle = '#E8E8E8';
        ctx.beginPath();
        ctx.ellipse(-8, 40, 7, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#C0C0C0';
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(8, 40, 7, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Control panel
        ctx.fillStyle = '#4A4A4A';
        ctx.fillRect(-10, 5, 20, 15);

        // Status lights
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(-8, 7, 4, 4);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(-2, 7, 4, 4);
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(4, 7, 4, 4);

        // Mass indicator
        ctx.save();
        ctx.translate(0, 13);
        if (gameState.player.mass > 5) {
            ctx.fillStyle = '#ff0000';
        } else if (gameState.player.mass < -3) {
            ctx.fillStyle = '#ffff00';
        } else {
            ctx.fillStyle = '#00ff00';
        }
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // EVA pack
        ctx.fillStyle = '#4169E1';
        ctx.beginPath();
        ctx.ellipse(-25, -15, 8, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 6px Arial';
        ctx.fillText('EVA', -30, -12);

        ctx.restore();
    }, [gameState.player.mass]);

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        // Clear canvas with underwater effect
        ctx.fillStyle = 'rgba(74, 141, 184, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw safe zone
        const gradient = ctx.createRadialGradient(
            gameState.safeZone.x, gameState.safeZone.y, 0,
            gameState.safeZone.x, gameState.safeZone.y, gameState.safeZone.radius
        );
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.25)');
        gradient.addColorStop(0.7, 'rgba(0, 255, 0, 0.15)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0.05)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(gameState.safeZone.x, gameState.safeZone.y, gameState.safeZone.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw safe zone border
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
        ctx.lineWidth = 4;
        ctx.setLineDash([20, 15]);
        ctx.beginPath();
        ctx.arc(gameState.safeZone.x, gameState.safeZone.y, gameState.safeZone.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw safe zone label
        ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
        ctx.font = 'bold 18px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('NEUTRAL BUOYANCY ZONE', gameState.safeZone.x, gameState.safeZone.y - gameState.safeZone.radius - 15);
        ctx.textAlign = 'left';

        // Draw training structure
        ctx.fillStyle = 'rgba(180, 180, 180, 0.7)';
        ctx.fillRect(150, 580, 850, 120);
        ctx.fillRect(350, 520, 450, 60);
        ctx.fillRect(475, 470, 200, 50);

        ctx.strokeStyle = 'rgba(220, 220, 220, 0.5)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            ctx.strokeRect(180 + i * 100, 590, 80, 100);
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 14px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('NBL TRAINING STRUCTURE', canvas.width / 2, 560);
        ctx.textAlign = 'left';

        // Draw bubbles
        gameState.bubbles.forEach(bubble => {
            ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
            ctx.beginPath();
            ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw objects
        gameState.objects.forEach(obj => {
            if (!obj.collected) {
                ctx.shadowBlur = obj.isMoving ? 25 : 20;
                ctx.shadowColor = obj.isMoving ? '#FFD700' : obj.color;

                ctx.fillStyle = obj.color;
                ctx.fillRect(obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);

                ctx.shadowBlur = 0;

                ctx.font = `${obj.size * 0.7}px Arial`;
                ctx.fillText(obj.emoji, obj.x - obj.size / 3, obj.y + obj.size / 4);

                ctx.fillStyle = 'white';
                ctx.font = 'bold 12px Courier New';
                ctx.fillText(`${obj.mass}kg`, obj.x - 18, obj.y - obj.size / 2 - 8);

                if (obj.isTarget) {
                    ctx.strokeStyle = '#00ff00';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(obj.x, obj.y, obj.size / 2 + 8, 0, Math.PI * 2);
                    ctx.stroke();
                }

                if (obj.isMoving) {
                    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.arc(obj.x, obj.y, obj.size / 2 + 12, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
        });

        // Draw mass effects
        gameState.massEffects.forEach(effect => {
            ctx.save();
            ctx.globalAlpha = effect.alpha;
            ctx.translate(effect.x, effect.y);
            ctx.scale(effect.scale, effect.scale);

            const massColor = effect.mass > 0 ? '#FF4500' : '#00BFFF';

            ctx.shadowBlur = 30;
            ctx.shadowColor = massColor;
            ctx.fillStyle = massColor;
            ctx.font = 'bold 24px Arial';
            const massText = (effect.mass > 0 ? '+' : '') + effect.mass.toFixed(1) + ' kg';
            ctx.fillText(massText, -40, 0);

            ctx.shadowBlur = 20;
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 18px Arial';
            ctx.fillText('Total: ' + gameState.player.mass.toFixed(1) + ' kg', -45, 25);

            ctx.restore();
        });

        // Draw player
        drawAstronaut(
            ctx,
            gameState.player.x + gameState.player.width / 2,
            gameState.player.y + gameState.player.height / 2
        );

        // Draw collection range if spacebar is pressed
        if (keysRef.current[' ']) {
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(gameState.player.x + gameState.player.width / 2, gameState.player.y + gameState.player.height / 2, 60, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }, [gameState, drawAstronaut]);

    const update = useCallback(() => {
        if (gameState.isGameOver) return;

        setGameState(prev => {
            const newState = { ...prev };
            let isMoving = false;

            // Player movement (WASD only)
            if (keysRef.current['a']) {
                newState.player.vx -= newState.player.speed;
                isMoving = true;
            }
            if (keysRef.current['d']) {
                newState.player.vx += newState.player.speed;
                isMoving = true;
            }
            if (keysRef.current['w']) {
                newState.player.vy -= newState.player.speed;
                isMoving = true;
            }
            if (keysRef.current['s']) {
                newState.player.vy += newState.player.speed;
                isMoving = true;
            }

            if (isMoving) {
                sounds.move();
            }

            // Physics - reduced mass impact for better gameplay
            const buoyancyForce = newState.player.mass * 0.008;
            newState.player.vy += buoyancyForce;

            // Reduced friction for more responsive movement
            newState.player.vx *= 0.96;
            newState.player.vy *= 0.96;

            newState.player.x += newState.player.vx;
            newState.player.y += newState.player.vy;

            // Boundaries
            if (newState.player.x < 50) newState.player.x = 50;
            if (newState.player.x > 1150 - newState.player.width - 50) newState.player.x = 1150 - newState.player.width - 50;
            if (newState.player.y < 50) newState.player.y = 50;
            if (newState.player.y > 750 - newState.player.height - 50) newState.player.y = 750 - newState.player.height - 50;

            // Safe zone check
            const playerCenterX = newState.player.x + newState.player.width / 2;
            const playerCenterY = newState.player.y + newState.player.height / 2;
            const isInZone = isInSafeZone(playerCenterX, playerCenterY);

            if (!isInZone && !newState.wasOutsideZone && newState.alarmCooldown === 0) {
                newState.wasOutsideZone = true;
                newState.attempts--;
                newState.alarmCooldown = 90;
                triggerAlarm();

                if (newState.attempts <= 0) {
                    setTimeout(() => endGame(), 800);
                }
            } else if (isInZone) {
                newState.wasOutsideZone = false;
            }

            if (newState.alarmCooldown > 0) {
                newState.alarmCooldown--;
            }

            // Bubble sounds
            newState.bubbleSoundTimer++;
            if (newState.bubbleSoundTimer > 60) {
                sounds.bubble();
                newState.bubbleSoundTimer = 0;
            }

            // Update bubbles
            newState.bubbles = newState.bubbles.map(bubble => {
                bubble.y -= bubble.speed;
                bubble.x += Math.sin(bubble.y * 0.01) * 0.5;
                if (bubble.y < -20) {
                    bubble.y = 750 + Math.random() * 200;
                    bubble.x = Math.random() * 1150;
                }
                return bubble;
            });

            // Update objects
            newState.objects = newState.objects.map(obj => {
                if (!obj.collected) {
                    obj.floatOffset += obj.floatSpeed;

                    if (obj.isMoving) {
                        obj.x += obj.vx;
                        obj.y += obj.vy;
                        obj.y += Math.sin(obj.floatOffset) * 0.3;

                        if (obj.x < 50 || obj.x > 1150 - 50) obj.vx *= -1;
                        if (obj.y < 50 || obj.y > 750 - 50) obj.vy *= -1;

                        obj.directionChangeTimer--;
                        if (obj.directionChangeTimer <= 0) {
                            obj.vx = (Math.random() - 0.5) * 3.5;
                            obj.vy = (Math.random() - 0.5) * 3.5;
                            obj.directionChangeTimer = Math.random() * 200 + 100;
                        }
                    } else {
                        obj.y += Math.sin(obj.floatOffset) * 0.3;
                    }
                }
                return obj;
            });

            // Update mass effects
            newState.massEffects = newState.massEffects.filter(effect => {
                effect.life--;
                effect.y -= 1;
                effect.scale = Math.min(2, effect.scale + 0.05);
                effect.alpha = effect.life / effect.maxLife;
                return effect.life > 0;
            });

            return newState;
        });
    }, [gameState.isGameOver, isInSafeZone, sounds, triggerAlarm, endGame]);

    const gameLoop = useCallback(() => {
        update();
        render();
        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [update, render]);

    // Initialize game
    const initGame = useCallback(() => {
        const newObjects = [];
        
        // Objects in safe zone
        for (let i = 0; i < 5; i++) {
            const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (gameState.safeZone.radius - 80);
            const x = gameState.safeZone.x + Math.cos(angle) * distance;
            const y = gameState.safeZone.y + Math.sin(angle) * distance;

            newObjects.push({
                ...type,
                x: x,
                y: y,
                collected: false,
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: 0.02 + Math.random() * 0.02,
                isMoving: false,
                vx: 0,
                vy: 0
            });
        }

        // Objects outside safe zone
        for (let i = 0; i < 5; i++) {
            const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
            let x, y;
            do {
                x = Math.random() * (1150 - 200) + 100;
                y = Math.random() * (750 - 200) + 100;
            } while (isInSafeZone(x, y));

            newObjects.push({
                ...type,
                x: x,
                y: y,
                collected: false,
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: 0.02 + Math.random() * 0.02,
                isMoving: true,
                vx: (Math.random() - 0.5) * 3.5,
                vy: (Math.random() - 0.5) * 3.5,
                directionChangeTimer: Math.random() * 150 + 100
            });
        }

        // Initialize bubbles
        const newBubbles = [];
        for (let i = 0; i < 40; i++) {
            newBubbles.push(createBubble());
        }

        setGameState(prev => ({
            ...prev,
            objects: newObjects,
            bubbles: newBubbles,
            targetCollections: prev.totalObjects - 2
        }));
    }, [gameState.safeZone, isInSafeZone, createBubble, objectTypes]);

    // Initialize audio context
    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext && !audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }
    }, []);

    // Initialize canvas context
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctxRef.current = canvas.getContext('2d');
        }
    }, []);

    // Initialize game when component mounts
    useEffect(() => {
        initGame();
    }, [initGame]);

    // Start game loop
    useEffect(() => {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gameLoop]);

    // Game timer
    useEffect(() => {
        if (!gameState.isGameOver && gameState.timeLeft > 0) {
            const timer = setTimeout(() => {
                if (gameState.timeLeft === 10) {
                    sounds.alarm();
                }
                
                setGameState(prev => ({
                    ...prev,
                    timeLeft: prev.timeLeft - 1
                }));

                if (gameState.timeLeft <= 1) {
                    endGame();
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [gameState.timeLeft, gameState.isGameOver, sounds, endGame]);

    const collectNearbyObject = useCallback(() => {
        setGameState(prev => {
            let newState = { ...prev };
            let hasCollected = false;

            newState.objects = prev.objects.map(obj => {
                if (!obj.collected && !hasCollected) {
                    const distance = Math.hypot(
                        obj.x - (prev.player.x + prev.player.width / 2),
                        obj.y - (prev.player.y + prev.player.height / 2)
                    );
                    if (distance < 60) {
                        hasCollected = true;
                        newState.player.mass += obj.mass;
                        newState.score += obj.points;

                        // Play collect sound with pitch based on mass
                        const pitch = obj.mass > 0 ? 1 + (obj.mass / 10) : 0.8;
                        sounds.collect(pitch);

                        // Create mass effect
                        newState.massEffects.push(createMassEffect(
                            newState.player.x + newState.player.width / 2,
                            newState.player.y - 20,
                            obj.mass
                        ));

                        if (obj.isTarget) {
                            newState.collected++;

                            if (newState.collected >= newState.targetCollections && !newState.hasWon) {
                                newState.hasWon = true;
                                showWinNotificationHandler();
                            }

                            if (newState.collected >= newState.totalObjects) {
                                setTimeout(() => endGame(), 500);
                            }
                        }

                        return { ...obj, collected: true };
                    }
                }
                return obj;
            });

            return newState;
        });
    }, [sounds, createMassEffect, showWinNotificationHandler, endGame]);

    // Keyboard event handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Prevent arrow keys from scrolling the page
            if (e.key.startsWith('Arrow')) {
                e.preventDefault();
                return; // Don't register arrow keys for movement
            }
            
            keysRef.current[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
                collectNearbyObject();
            }
        };

        const handleKeyUp = (e) => {
            keysRef.current[e.key] = false;
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [collectNearbyObject]);

    const restartGame = () => {
        setGameState({
            player: {
                x: 575,
                y: 375,
                width: 50,
                height: 80,
                vx: 0,
                vy: 0,
                mass: 0,
                baseMass: 0,
                speed: 0.6,
                rotation: 0
            },
            objects: [],
            bubbles: [],
            massEffects: [],
            timeLeft: 60,
            score: 0,
            collected: 0,
            totalObjects: 10,
            targetCollections: 8,
            hasWon: false,
            isGameOver: false,
            safeZone: {
                x: 575,
                y: 375,
                radius: 280
            },
            attempts: 3,
            wasOutsideZone: false,
            alarmCooldown: 0,
            bubbleSoundTimer: 0
        });
        setShowEndScreen(false);
        setShowWinNotification(false);
        initGame();
    };

    return (
        <div className="game-body">
            <div className="game-container">
                <canvas 
                    ref={canvasRef}
                    className="game-canvas"
                    width="1150" 
                    height="750"
                />
                
                <div className={`alarm-overlay ${alarmActive ? 'alarm-active' : ''}`}></div>
                
                <div className={`win-notification ${showWinNotification ? 'show' : ''}`}>
                    ✅ TRAINING PASSED! Keep Going!
                </div>
                
                <button 
                    className="sound-toggle"
                    onClick={() => {
                        setSoundEnabled(!soundEnabled);
                        if (!soundEnabled) {
                            sounds.collect(1.2);
                        }
                    }}
                >
                    {soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF'}
                </button>

                <div className="game-hud">
                    <div>⏱️ TIME: <span>{gameState.timeLeft}</span>s</div>
                    <div>⚖️ MASS: <span>{gameState.player.mass.toFixed(1)}</span>kg</div>
                    <div>📦 COLLECTED: <span>{gameState.collected}</span>/<span>{gameState.totalObjects}</span></div>
                    <div style={{color: '#00ff00', fontWeight: 'bold'}}>🎯 TARGET: <span>{gameState.targetCollections}</span></div>
                    <div className="attempts">❤️ ATTEMPTS: <span>{gameState.attempts}</span></div>
                    <div className="status">
                        {isInSafeZone(gameState.player.x + gameState.player.width / 2, gameState.player.y + gameState.player.height / 2) 
                            ? '✓ NEUTRAL' 
                            : '⚠️ OUT OF ZONE!'
                        }
                    </div>
                </div>

                <div className="buoyancy-meter">
                    <div className="buoyancy-label">DEPTH</div>
                    <div className="safe-zone"></div>
                    <div 
                        className="buoyancy-bar" 
                        style={{height: `${100 - ((gameState.player.y / 750) * 100)}%`}}
                    ></div>
                </div>

                <div className="game-instructions">
                    ⬆️⬇️⬅️➡️ SWIM | SPACE to COLLECT | Stay in GREEN CIRCLE
                </div>

                <div className={`end-screen ${showEndScreen ? 'show' : ''}`}>
                    <h1>
                        {gameState.attempts <= 0 ? '💔 OUT OF ATTEMPTS' :
                         gameState.collected >= gameState.totalObjects ? '🌟 PERFECT SCORE!' :
                         gameState.hasWon ? '✅ TRAINING PASSED' :
                         '⚠️ TRAINING INCOMPLETE'}
                    </h1>
                    <div className="score">Score: <span>{gameState.score}</span></div>
                    <div className="fact">
                        The NBL pool holds 6.2 million gallons of water and is 40 feet deep.
                        Astronauts train here for 7 hours underwater to simulate every 1 hour of actual spacewalk.
                        You just experienced what they practice hundreds of times before ever leaving Earth.
                    </div>
                    <button onClick={restartGame}>🔄 RETRY TRAINING</button>
                </div>
            </div>
        </div>
    );
};

export default Game;