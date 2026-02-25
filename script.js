// 1. 粒子系统
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 80; i++) particlesArray.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// 2. 模态框逻辑
const products = [
    { title: "JDM Core X1", desc: "专为高端智能洗衣机设计的控制核心，支持AI称重与静音驱动。", specs: ["双核处理器", "集成Wi-Fi 6", "工业级防潮"] },
    { title: "Vision Panel", desc: "超薄冰箱触控交互面板，让食材管理直观可见。", specs: ["4K分辨率", "抗指纹涂层", "智能温控系统"] },
    { title: "JDM Hub", desc: "连接全屋设备的控制枢纽。", specs: ["支持Matter协议", "低延迟响应", "语音控制"] }
];

function openModal(index) {
    const p = products[index];
    document.getElementById('modalTitle').innerText = p.title;
    document.getElementById('modalDescription').innerText = p.desc;
    document.getElementById('modalSpecs').innerHTML = p.specs.map(s => `<li>${s}</li>`).join('');
    document.getElementById('productModal').style.display = 'block';
}

document.querySelector('.close-button').onclick = () => {
    document.getElementById('productModal').style.display = 'none';
};

// 初始化
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
initParticles();
animate();
