const pool = document.getElementById("hoboi");


const configs = [
    { id: "shark", vx: 130, vy: 25, invertFlip: false },
    { id: "turtle", vx: -75, vy: 20, invertFlip: false },
    { id: "faintSchool", vx: 95, vy: -18, invertFlip: false },
    { id: "goldFishSchool", vx: -115, vy: 22, invertFlip: false },
    { id: "men1", vx: 65, vy: -15, invertFlip: false },
    { id: "men2", vx: -55, vy: 15, invertFlip: false },
    { id: "men3", vx: 70, vy: 18, invertFlip: false }
];

const swimmers = [];

function initSwimmers() {
    const poolRect = pool.getBoundingClientRect();

    configs.forEach((cfg) => {
        const el = document.getElementById(cfg.id);
        if (!el) return;

        const w = el.offsetWidth || 120;
        const h = el.offsetHeight || 80;
        const maxX = Math.max(0, poolRect.width - w);
        const maxY = Math.max(0, poolRect.height - h);

        swimmers.push({
            el,
            x: Math.random() * maxX,
            y: Math.random() * maxY,
            vx: cfg.vx,
            vy: cfg.vy,
            invertFlip: cfg.invertFlip
        });
    });
}

let lastTime = performance.now();

function update(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05); 

    const poolWidth = pool.clientWidth;
    const poolHeight = pool.clientHeight;

    for (const s of swimmers) {
        const w = s.el.offsetWidth;
        const h = s.el.offsetHeight;

        s.x += s.vx * dt;
        s.y += s.vy * dt;

        
        if (s.x <= 0) {
            s.x = 0;
            s.vx = Math.abs(s.vx);
        } else if (s.x + w >= poolWidth) {
            s.x = Math.max(0, poolWidth - w);
            s.vx = -Math.abs(s.vx);
        }

        
        if (s.y <= 0) {
            s.y = 0;
            s.vy = Math.abs(s.vy);
        } else if (s.y + h >= poolHeight) {
            s.y = Math.max(0, poolHeight - h);
            s.vy = -Math.abs(s.vy);
        }

        
        const movingLeft = s.vx < 0;
        const shouldFlip = s.invertFlip ? !movingLeft : movingLeft;
        const scaleX = shouldFlip ? -1 : 1;

        s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scaleX(${scaleX})`;
    }

    requestAnimationFrame(update);
}


window.addEventListener("load", () => {
    initSwimmers();
    requestAnimationFrame(update);
});


window.addEventListener("resize", () => {
    const poolWidth = pool.clientWidth;
    const poolHeight = pool.clientHeight;

    for (const s of swimmers) {
        s.x = Math.min(s.x, Math.max(0, poolWidth - s.el.offsetWidth));
        s.y = Math.min(s.y, Math.max(0, poolHeight - s.el.offsetHeight));
    }
});