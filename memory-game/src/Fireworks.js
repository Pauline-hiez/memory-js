
import React, { useEffect, useRef } from 'react';

function Fireworks({ trigger }) {
    const canvasRef = useRef();

    // Efface le canvas dès que trigger passe à false
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!trigger) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [trigger]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        const colors = ['#ff5252', '#ffd600', '#69f0ae', '#40c4ff', '#ff4081'];

        // Si trigger est désactivé, efface le canvas et ne lance pas l'animation
        if (!trigger) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return undefined;
        }

        function createFirework() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 40; i++) {
                const angle = (Math.PI * 2 * i) / 40;
                const speed = Math.random() * 3 + 2;
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    color,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.restore();
            });
        }

        function update() {
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.04;
                p.alpha -= 0.012;
            });
            particles = particles.filter(p => p.alpha > 0);
        }

        function loop() {
            if (particles.length < 10) createFirework();
            draw();
            update();
            animationFrameId = requestAnimationFrame(loop);
        }

        loop();
        return () => {
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [trigger]);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 2000,
            }}
        />
    );
}

export default Fireworks;
