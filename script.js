// Project Data
const projects = [
    {
        title: "AMR Autonomous Driving System",
        description: "Developed an autonomous driving system using Agilex LIMO. Implemented LiDAR-based obstacle avoidance, vision-based lane tracking, and AR marker recognition. Mastered sensor fusion and drive control logic.",
        tags: ["ROS1", "Vision", "LiDAR"],
        image: "https://via.placeholder.com/400x250/111/fff?text=AMR+Autonomous+Driving",
        link: "https://github.com/PolyGon-13/limo_project"
    },
    {
        title: "VR Manipulator Control & Collaboration",
        description: "Integrated Doosan A0509 and Agilex PiPER into Unity for VR teleoperation using inverse kinematics. Developed a collaboration algorithm where a Unitree Go2 quadruped robot assists the manipulator when it reaches its workspace limit.",
        tags: ["Unity", "VR", "Manipulator"],
        image: "https://via.placeholder.com/400x250/111/fff?text=VR+Manipulator+Control",
        link: "https://github.com/PolyGon-13/PiPER_Unity_VR"
    },
    {
        title: "Hot Cell Digital Twin for Safety",
        description: "Virtualization of a high-risk hot cell facility using Unity. Implemented bidirectional communication between VR controllers and actual PLC to control equipment safely, replacing high-risk manual operations.",
        tags: ["Unity", "VR", "PLC"],
        image: "https://via.placeholder.com/400x250/111/fff?text=Hot+Cell+Digital+Twin",
        link: "#"
    }
];

// Render Projects
const projectsGrid = document.getElementById('projects-grid');

function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map((project, index) => `
        <article class="project-card reveal" style="transition-delay: ${index * 100}ms" onclick="window.open('${project.link}', '_blank')">
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
}

// Typing Effect
function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typing-cursor');
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Optional: Remove cursor after typing
            // element.classList.remove('typing-cursor');
        }
    }
    type();
}

// Particle System
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.fill();
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - dist / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        resize();
        init();
    });
    
    resize();
    init();
    animate();
}

// Scroll Observer
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Special handling for timeline items to stagger them
                if (entry.target.classList.contains('timeline')) {
                    const items = entry.target.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 300 + 200); // Stagger delay + initial delay
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe general reveal elements
    document.querySelectorAll('.section-title, .award-item, .paper-item, .reveal').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Observe timeline container
    const timeline = document.querySelector('.timeline');
    if (timeline) observer.observe(timeline);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initParticles();
    initScrollObserver();
    
    // Start typing effect with delay
    setTimeout(() => {
        const tagline = document.querySelector('.typing-text');
        if (tagline) typeWriter("Interest: SLAM, Robotics", tagline);
    }, 1000);
    
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            const isVisible = navList.style.display === 'flex';
            
            if (!isVisible) {
                navList.style.display = 'flex';
                navList.style.position = 'absolute';
                navList.style.top = '80px';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.background = 'rgba(10, 10, 10, 0.95)';
                navList.style.backdropFilter = 'blur(10px)';
                navList.style.flexDirection = 'column';
                navList.style.padding = '20px';
                navList.style.textAlign = 'center';
                navList.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            } else {
                navList.style.display = 'none';
            }
        });
    }
});
