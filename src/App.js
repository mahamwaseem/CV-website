import { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt
} from "react-icons/fa";
import profileImg from "./images/image.png";

// ─── SKILL ICONS ──────────────────────────────────────────────────────────────
const SKILL_ICONS = {
  "Playwright": (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <circle cx="16" cy="16" r="14" fill="#2EAD33" />
      <path d="M10 22c0-4 3-7 6-7s6 3 6 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="11" r="3" fill="#fff" />
    </svg>
  ),
  "Selenium WebDriver": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="#43B02A" />
      <circle cx="16" cy="16" r="8" fill="none" stroke="#fff" strokeWidth="1.5" />
      <path d="M16 8v16M8 16h16" stroke="#fff" strokeWidth="1.5" />
    </svg>
  ),
  "Cypress": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="#17202C" />
      <circle cx="16" cy="16" r="7" fill="#69D3A7" />
      <path d="M21 14a5 5 0 11-10 0" stroke="#17202C" strokeWidth="2" fill="none" />
    </svg>
  ),
  "JIRA": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <rect width="32" height="32" rx="4" fill="#0052CC" />
      <path d="M16 7l3.5 8.5L16 25l-3.5-9.5L16 7z" fill="#2684FF" />
      <path d="M16 7l8.5 9-8.5 9V7z" fill="#fff" opacity=".25" />
    </svg>
  ),
  "Postman / Bruno": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="#FF6C37" />
      <circle cx="16" cy="16" r="6" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M16 10v6l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "Karate DSL": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="#1A1A2E" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#f5c518" fontFamily="serif" fontWeight="bold">K</text>
    </svg>
  ),
  "Java": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="#ED8B00" />
      <text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="sans-serif" fontWeight="bold">Java</text>
    </svg>
  ),
  "TypeScript / JS": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <rect width="32" height="32" rx="4" fill="#3178C6" />
      <text x="16" y="22" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="sans-serif" fontWeight="bold">TS</text>
    </svg>
  ),
  "GitHub Actions": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="#24292F" />
      <circle cx="16" cy="13" r="4" fill="none" stroke="#f0f6ff" strokeWidth="1.5" />
      <circle cx="16" cy="13" r="1.5" fill="#f0f6ff" />
      <path d="M16 17v6" stroke="#f0f6ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "Zephyr / QMetry": (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="#0D47A1" />
      <path d="M10 12h12l-6 8-6-8z" fill="#64B5F6" />
    </svg>
  ),
};

const DB_ICONS = {
  "PostgreSQL": <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill="#336791" /><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif">PG</text></svg>,
  "SQL":        <svg viewBox="0 0 24 24" width="14" height="14"><rect width="24" height="24" rx="4" fill="#f29111" /><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif">SQL</text></svg>,
  "MongoDB":    <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill="#4DB33D" /><path d="M12 5v14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></svg>,
};

const LANG_ICONS = {
  "Java":       <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill="#ED8B00" /><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif" fontWeight="bold">J</text></svg>,
  "JavaScript": <svg viewBox="0 0 24 24" width="14" height="14"><rect width="24" height="24" rx="3" fill="#F7DF1E" /><text x="12" y="17" textAnchor="middle" fontSize="8" fill="#222" fontFamily="sans-serif" fontWeight="bold">JS</text></svg>,
  "TypeScript": <svg viewBox="0 0 24 24" width="14" height="14"><rect width="24" height="24" rx="3" fill="#3178C6" /><text x="12" y="17" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif" fontWeight="bold">TS</text></svg>,
  "Gherkin":    <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="10" fill="#23D96C" /><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif" fontWeight="bold">G</text></svg>,
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const data = {
  en: {
    first: "Abdul Wahab", last: "Farooq",
    title: "Quality Assurance Consultant",
    email: "abdulwahabfarooq41c@gmail.com",
    phone: "+34 672 84 74 22",
    location: "Valencia, Spain",
    stats: [{ num: "4+", label: "Years of\nExperience" }, { num: "10+", label: "Projects\nDone" }, { num: "3", label: "Companies\nWorked" }],
    summary: "A dedicated QA professional with 4+ years in agile environments. Specialising in designing, refining, and testing requirements, creating and automating test cases, and integrating QA into team iterations.",
    experience: [
      { company: "Sogeti, Capgemini", role: "Test Consultant", period: "Apr 2025 — Present", tag: "Current",
        bullets: ["Developing automation frameworks using Playwright with TypeScript for end-to-end testing.", "Extending frameworks to different tenants — France and Australia.", "Analysing business requirements and user stories to create test cases.", "Performing regression and smoke testing consistently.", "Maintaining test suites in Zephyr. Github Actions for CI/CD."] },
      { company: "Self Employed", role: "Software Test Engineer", period: "Apr 2024 — Mar 2025", tag: "Freelance",
        bullets: ["Conducting browser compatibility testing with Playwright.", "Developing automation frameworks using Java and Selenium.", "Comprehensive manual testing for web and mobile apps.", "Functional, regression, integration, and system testing."] },
      { company: "Funding Societies", role: "Software Engineer in Test", period: "Oct 2021 — Nov 2023", tag: "FinTech",
        bullets: ["Designed and executed Karate API tests for functionality.", "Utilised Postman to design and execute API tests.", "Created Java frameworks using Selenium WebDriver.", "Cross-browser testing with Cypress. Performance testing with JMeter."] },
      { company: "Microperts", role: "QA Engineer", period: "Feb 2021 — Sep 2021", tag: "First Role",
        bullets: ["Key role in testing mobile and web applications.", "Agile methodologies to design effective test plans.", "Manual testing and documented results diligently."] },
    ],
    skills: [["Playwright",95],["Selenium WebDriver",90],["Cypress",85],["JIRA",90],["Postman / Bruno",88],["Karate DSL",82],["Java",80],["TypeScript / JS",78],["GitHub Actions",75],["Zephyr / QMetry",80]],
    databases: ["PostgreSQL","SQL","MongoDB"],
    langsProg: ["Java","JavaScript","TypeScript","Gherkin"],
    certifications: ["Karate DSL: API Automation & Performance from Zero to Hero","Agile Leadership and Resilient Teams","IELTS"],
    langsSpeak: [["English","Fluent"],["Urdu","Native"],["Spanish","Intermediate"]],
    sports: ["Table Tennis — district level (U-19)","Cricket & Futsal","Preparing for Swimming competition"],
    social: ["Active part of Amal – The Renaissance","Organised fundraising for orphanages","Addressed financial challenges of students"],
    education: { inst: "The University of Lahore", deg: "BS in Software Engineering", period: "2017 – 2021", cgpa: "CGPA 3.14" },
    labels: { about:"About Me", exp:"Experience", edu:"Education", skills:"Skills & Tools", certs:"Certifications", langs:"Languages", sports:"Sports", social:"Social Work", dbs:"Databases", lp:"Programming Languages", more:"Interests & More" },
  },
  es: {
    first: "Abdul Wahab", last: "Farooq",
    title: "Consultor de Control de Calidad",
    email: "abdulwahabfarooq41c@gmail.com",
    phone: "+34 672 84 74 22",
    location: "Valencia, España",
    stats: [{ num: "4+", label: "Años de\nExperiencia" }, { num: "10+", label: "Proyectos\nRealizados" }, { num: "3", label: "Empresas\nTrabajadas" }],
    summary: "Profesional de QA con más de 4 años en entornos ágiles. Especializado en diseñar, refinar y probar requisitos, automatizar casos de prueba e integrar QA en iteraciones del equipo.",
    experience: [
      { company: "Sogeti, Capgemini", role: "Consultor de Pruebas", period: "Abr 2025 — Actualidad", tag: "Actual",
        bullets: ["Desarrollo de marcos con Playwright y TypeScript.", "Extensión a entornos de Francia y Australia.", "Análisis de requisitos e historias de usuario.", "Pruebas de regresión y humo sistemáticas.", "Mantenimiento en Zephyr. Github Actions para CI/CD."] },
      { company: "Autónomo", role: "Ingeniero de Pruebas", period: "Abr 2024 — Mar 2025", tag: "Freelance",
        bullets: ["Pruebas de compatibilidad de navegadores con Playwright.", "Desarrollo de marcos con Java y Selenium.", "Pruebas manuales para apps web y móviles.", "Pruebas funcionales, de regresión e integración."] },
      { company: "Funding Societies", role: "Ingeniero en Pruebas", period: "Oct 2021 — Nov 2023", tag: "FinTech",
        bullets: ["Pruebas API con Karate y Postman.", "Frameworks en Java con Selenium WebDriver.", "Pruebas entre navegadores con Cypress y JMeter."] },
      { company: "Microperts", role: "Ingeniero de QA", period: "Feb 2021 — Sep 2021", tag: "Inicio",
        bullets: ["Pruebas de apps móviles y web.", "Metodologías ágiles para planes de prueba.", "Pruebas manuales y documentación."] },
    ],
    skills: [["Playwright",95],["Selenium WebDriver",90],["Cypress",85],["JIRA",90],["Postman / Bruno",88],["Karate DSL",82],["Java",80],["TypeScript / JS",78],["GitHub Actions",75],["Zephyr / QMetry",80]],
    databases: ["PostgreSQL","SQL","MongoDB"],
    langsProg: ["Java","JavaScript","TypeScript","Gherkin"],
    certifications: ["Karate DSL: Automatización y Rendimiento de API","Liderazgo Ágil y Equipos Resistentes","IELTS"],
    langsSpeak: [["Inglés","Fluido"],["Urdu","Nativo"],["Español","Intermedio"]],
    sports: ["Tenis de mesa — nivel de distrito (sub-19)","Críquet y fútbol sala","Preparación para natación"],
    social: ["Parte activa de Amal – El Renacimiento","Organización de eventos para orfanatos","Apoyo financiero a estudiantes"],
    education: { inst: "Universidad de Lahore", deg: "Grado en Ingeniería de Software", period: "2017 – 2021", cgpa: "CGPA 3.14" },
    labels: { about:"Sobre Mí", exp:"Experiencia", edu:"Educación", skills:"Habilidades", certs:"Certificaciones", langs:"Idiomas", sports:"Deportes", social:"Social", dbs:"Bases de Datos", lp:"Lenguajes", more:"Intereses" },
  },
};

const TICKER = ["Quality Assurance","Test Automation","Playwright","Selenium","Cypress","Agile · TDD","BDD · Karate","API Testing","CI/CD","JIRA","End-to-End Testing","TypeScript"];

// ─── OPTIMIZED CSS WITH BETTER INTERACTIONS ─────────────────────────────────────
// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Open+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#f4f4f0;color:#0d1f1a;font-family:'Open Sans',sans-serif;font-size:14px;line-height:1.7;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#f4f4f0}::-webkit-scrollbar-thumb{background:#1a3d2e;border-radius:4px}

/* NAV */
.nav{background:#0d1f1a;padding:16px 60px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:999}
.nav-logo{font-family:'Poppins',sans-serif;font-size:20px;font-weight:800;color:#f5c518;letter-spacing:2px}
.nav-links{display:flex;gap:36px;list-style:none}
.nav-links a{color:rgba(255,255,255,0.5);text-decoration:none;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;transition:color .2s}
.nav-links a:hover{color:#f5c518}
.lang-grp{display:flex;border:1px solid rgba(245,197,24,0.3);border-radius:6px;overflow:hidden}
.lang-btn{border:none;background:transparent;color:rgba(255,255,255,0.4);font-family:'Open Sans',sans-serif;font-size:10px;font-weight:600;padding:7px 18px;cursor:pointer;letter-spacing:2px;text-transform:uppercase;transition:all .25s}
.lang-btn.active{background:#f5c518;color:#0d1f1a;font-weight:700}

.hero{background:linear-gradient(135deg,#0d1f1a 0%,#1a3d2e 100%);min-height:95vh;display:grid;grid-template-columns:1fr 380px;gap:0;position:relative;overflow:hidden}
.hero-left{padding:100px 0 80px 60px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2}
.hero-tag{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(245,197,24,0.15),rgba(245,197,24,0.05));border:1px solid rgba(245,197,24,0.3);border-radius:50px;padding:10px 24px;font-size:12px;font-weight:700;color:#f5c518;letter-spacing:2px;text-transform:uppercase;margin-bottom:32px;width:fit-content;backdrop-filter:blur(10px);animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.hero-tag-dot{width:8px;height:8px;background:#f5c518;border-radius:50%;animation:blink 1.5s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(0.8)}}
.hero-intro{font-size:14px;color:rgba(255,255,255,0.6);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;font-weight:500;animation:fadeInUp 1s ease 0.5s both}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.hero-name{font-family:'Poppins',sans-serif;font-weight:800;line-height:1;letter-spacing:-2px;margin-bottom:8px}
.hero-name .line1{font-size:clamp(4rem,8vw,7rem);color:#ffffff;display:block;background:linear-gradient(135deg,#ffffff,#f0f0f0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}
.hero-name .line2{font-size:clamp(4rem,8vw,7rem);color:transparent;background:linear-gradient(135deg,#f5c518,#ffd700);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:block;animation:gradientShift 3s ease infinite}
@keyframes gradientShift{0%,100%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(20deg)}}
.hero-role{font-size:14px;color:rgba(255,255,255,0.4);letter-spacing:3px;text-transform:uppercase;margin:24px 0 40px;font-weight:500;display:flex;align-items:center;gap:16px;position:relative}
.hero-role::before{content:'';width:50px;height:3px;background:linear-gradient(90deg,#f5c518,#ffd700);flex-shrink:0;border-radius:2px}
.hero-chips{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:48px}
.chip{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 24px;font-size:13px;color:rgba(255,255,255,0.9);text-decoration:none;transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);background:rgba(255,255,255,0.08);backdrop-filter:blur(10px);position:relative;overflow:hidden}
.chip::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left .6s}
.chip:hover{transform:translateY(-3px);border-color:#f5c518;color:#f5c518;background:linear-gradient(135deg,rgba(245,197,24,0.15),rgba(245,197,24,0.05));box-shadow:0 10px 30px rgba(245,197,24,0.3)}
.chip:hover::before{left:100%}
.hero-stats{display:flex;gap:48px}
.stat-box{display:flex;flex-direction:column;text-align:center;transition:all .3s ease}
.stat-box:hover .stat-num{transform:scale(1.1)}
.stat-num{font-family:'Poppins',sans-serif;font-size:3.2rem;font-weight:800;background:linear-gradient(135deg,#f5c518,#ffd700);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;animation:countUp 2s ease-out}
@keyframes countUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.stat-label{font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;margin-top:8px;line-height:1.4;white-space:pre-line}

/* HERO RIGHT — FIXED IMAGE */
.hero-right{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero-yellow-bg{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);width:320px;height:420px;background:linear-gradient(135deg,#f5c518 0%,#ffd700 100%);border-radius:200px 200px 40px 40px;z-index:1;animation:pulseBg 4s ease-in-out infinite}
@keyframes pulseBg{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.02)}}
.hero-img-wrap{position:relative;z-index:3;width:280px;height:380px;display:flex;align-items:center;justify-content:center;border:8px solid rgba(255,255,255,0.2);border-radius:180px 180px 50px 50px;background:linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05));backdrop-filter:blur(20px);box-shadow:0 20px 60px rgba(0,0,0,0.3);overflow:hidden}
.hero-img-wrap img{width:100%;height:100%;object-fit:cover;object-position:center top;transition:all .5s cubic-bezier(0.4, 0, 0.2, 1)}
.hero-img-wrap:hover img{transform:scale(1.05) rotate(2deg)}
.hero-initials-placeholder{width:280px;height:380px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(245,197,24,0.1),rgba(245,197,24,0.05))}
.hero-initials-text{font-family:'Poppins',sans-serif;font-size:8rem;font-weight:800;color:rgba(255,255,255,0.3);letter-spacing:-6px}
.hero-badge{position:absolute;top:30px;right:25px;background:linear-gradient(135deg,#f5c518,#ffd700);color:#0d1f1a;font-family:'Poppins',sans-serif;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:12px 24px;border-radius:50px;z-index:4;white-space:nowrap;box-shadow:0 8px 25px rgba(245,197,24,0.4);animation:float 2s ease-in-out infinite}


/* TICKER */
.ticker-wrap{background:#f5c518;padding:12px 0;overflow:hidden}
.ticker{display:flex;white-space:nowrap;animation:tk 28s linear infinite}
.ticker-inner{display:flex;gap:40px;padding-right:40px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#0d1f1a}
.tsep{opacity:0.35}
@keyframes tk{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* MAIN LAYOUT */
.main{padding:0 60px 100px;background:#f4f4f0}

/* SECTION */
.sec{padding:80px 0;border-bottom:1px solid rgba(13,31,26,0.1)}
.sec:last-child{border-bottom:none}
.sec-header{display:flex;align-items:center;gap:20px;margin-bottom:52px}
.sec-label{font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#f5c518;background:#0d1f1a;padding:5px 14px;border-radius:4px;flex-shrink:0}
.sec-title{font-family:'Poppins',sans-serif;font-size:2.2rem;font-weight:800;color:#0d1f1a;letter-spacing:-1px}
.sec-line{flex:1;height:2px;background:linear-gradient(90deg,rgba(13,31,26,0.12),transparent)}

/* ABOUT */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.about-quote{font-family:'Poppins',sans-serif;font-size:1.35rem;font-weight:600;color:#0d1f1a;line-height:1.7;border-left:4px solid #f5c518;padding-left:28px}
.about-details{display:flex;flex-direction:column;gap:16px}
.about-row{display:flex;align-items:center;gap:14px;padding:14px 20px;background:#fff;border-radius:10px;border:1px solid rgba(13,31,26,0.08)}
.about-row-icon{width:36px;height:36px;border-radius:8px;background:#f5c518;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.about-row-label{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(13,31,26,0.35);margin-bottom:2px}
.about-row-val{font-size:13px;font-weight:500;color:#0d1f1a}

/* EXPERIENCE */
.exp-card{background:#fff;border:1px solid rgba(13,31,26,0.08);border-radius:14px;margin-bottom:14px;overflow:hidden;transition:all .3s;cursor:pointer}
.exp-card:hover{border-color:rgba(245,197,24,0.5);box-shadow:0 4px 24px rgba(13,31,26,0.08)}
.exp-card.open{border-color:#f5c518;border-left:4px solid #f5c518}
.exp-header{padding:22px 28px;display:flex;justify-content:space-between;align-items:center}
.exp-left{}
.exp-company{font-family:'Poppins',sans-serif;font-size:1rem;font-weight:700;color:#0d1f1a;margin-bottom:4px}
.exp-role{font-size:11px;color:#1a6e44;letter-spacing:1px;font-weight:600;text-transform:uppercase;margin-bottom:4px}
.exp-period{font-size:11px;color:rgba(13,31,26,0.4);font-style:italic}
.exp-right-wrap{display:flex;align-items:center;gap:12px}
.exp-tag{font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;background:#f4f4f0;border:1px solid rgba(13,31,26,0.1);border-radius:50px;color:rgba(13,31,26,0.5);font-weight:600}
.exp-card.open .exp-tag{background:#f5c518;color:#0d1f1a;border-color:#f5c518}
.exp-toggle{width:30px;height:30px;border-radius:50%;border:2px solid rgba(13,31,26,0.15);display:flex;align-items:center;justify-content:center;color:#0d1f1a;font-size:18px;transition:transform .3s,background .25s,border-color .25s;flex-shrink:0;font-weight:300}
.exp-card.open .exp-toggle{transform:rotate(45deg);background:#f5c518;border-color:#f5c518}
.exp-body{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.23,1,.32,1)}
.exp-card.open .exp-body{max-height:400px}
.exp-body-inner{padding:0 28px 24px}
.exp-bullets{list-style:none;display:flex;flex-direction:column;gap:9px}
.exp-bullet{font-size:13px;color:rgba(13,31,26,0.65);padding-left:22px;position:relative;line-height:1.65}
.exp-bullet::before{content:'';position:absolute;left:0;top:10px;width:10px;height:2px;background:#f5c518}

/* EDUCATION */
.edu-card{background:#0d1f1a;border-radius:16px;padding:40px;max-width:520px;position:relative;overflow:hidden}
.edu-card::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:rgba(245,197,24,0.08);border-radius:50%}
.edu-year{font-family:'Poppins',sans-serif;font-size:5rem;font-weight:800;color:rgba(245,197,24,0.12);line-height:1;margin-bottom:20px;letter-spacing:-4px}
.edu-inst{font-family:'Poppins',sans-serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:6px}
.edu-deg{font-size:11px;color:#f5c518;letter-spacing:1.5px;margin-bottom:20px;font-weight:600;text-transform:uppercase}
.edu-meta{display:flex;gap:10px;flex-wrap:wrap}
.edu-pill{font-size:11px;padding:5px 16px;border:1px solid rgba(245,197,24,0.2);border-radius:50px;color:rgba(255,255,255,0.5)}

/* SKILLS */
.skills-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px}
.skill-item{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(13,31,26,0.07)}
.skill-item:last-child{border-bottom:none}
.skill-icon{width:32px;height:32px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;border:1px solid rgba(13,31,26,0.08)}
.skill-name{font-size:13px;color:#0d1f1a;flex:1;font-weight:400}
.skill-bar-bg{width:90px;height:5px;background:rgba(13,31,26,0.08);border-radius:5px;overflow:hidden}
.skill-bar-fill{height:100%;border-radius:5px;background:#f5c518}
.skill-pct{font-size:10px;color:#1a6e44;min-width:28px;text-align:right;font-weight:700}

.skills-right{}
.sub-label{font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(13,31,26,0.3);margin:28px 0 14px;display:flex;align-items:center;gap:10px}
.sub-label::after{content:'';flex:1;height:1px;background:rgba(13,31,26,0.1)}
.sub-label:first-child{margin-top:0}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;padding:6px 14px;border-radius:50px;font-weight:500;cursor:default;transition:all .2s}
.tag-db{background:#e8f5e9;border:1px solid rgba(26,110,68,0.2);color:#1a6e44}
.tag-db:hover{background:#c8e6c9}
.tag-lang{background:#fff8e1;border:1px solid rgba(245,197,24,0.3);color:#7a6200}
.tag-lang:hover{background:#fff3cd}
.cert-list{display:flex;flex-direction:column;gap:2px}
.cert-item{display:flex;align-items:flex-start;gap:16px;padding:14px 0;border-bottom:1px solid rgba(13,31,26,0.07);transition:padding .2s}
.cert-item:last-child{border-bottom:none}
.cert-item:hover{padding-left:6px}
.cert-num{font-family:'Poppins',sans-serif;font-size:1.1rem;font-weight:800;color:rgba(245,197,24,0.3);flex-shrink:0;line-height:1.3}
.cert-text{font-size:12.5px;color:rgba(13,31,26,0.6);line-height:1.65;padding-top:2px}

/* BOTTOM */
.bottom-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.b-card{background:#fff;border:1px solid rgba(13,31,26,0.08);border-radius:14px;padding:28px;transition:box-shadow .2s}
.b-card:hover{box-shadow:0 4px 20px rgba(13,31,26,0.06)}
.b-card-title{font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;color:#0d1f1a;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid #f5c518;display:flex;align-items:center;gap:8px}
.lang-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(13,31,26,0.06)}
.lang-row:last-child{border-bottom:none}
.lang-nm{font-size:13px;color:#0d1f1a;font-weight:400}
.lang-level{font-size:10px;color:#1a6e44;background:#e8f5e9;padding:3px 10px;border-radius:50px;font-weight:600;letter-spacing:.5px}
.list-item{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid rgba(13,31,26,0.06);font-size:12.5px;color:rgba(13,31,26,0.65);line-height:1.55}
.list-item:last-child{border-bottom:none}
.list-dot{width:7px;height:7px;border-radius:50%;background:#f5c518;flex-shrink:0;margin-top:5px}

/* FOOTER */
.footer{background:#0d1f1a;padding:28px 60px;display:flex;justify-content:space-between;align-items:center}
.footer-txt{font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:2px;text-transform:uppercase}
.footer-acc{color:#f5c518;font-weight:700}

/* REVEAL */
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}

@media(max-width:900px){
  .nav{padding:12px 20px}.nav-links{display:none}
  .hero{grid-template-columns:1fr;min-height:auto}
  .hero-left{padding:60px 20px 40px}
  .hero-right{width:100%;height:300px;margin-top:30px}
  .hero-yellow-bg{width:200px;height:280px;bottom:0}
  .hero-img-wrap{width:200px;height:280px}
  .hero-badge{font-size:10px;padding:8px 16px;top:20px;right:15px}
  .main{padding:0 20px 60px}
  .about-grid{grid-template-columns:1fr}
  .skills-layout{grid-template-columns:1fr}
  .bottom-grid{grid-template-columns:1fr}
  .footer{padding:20px;flex-direction:column;gap:8px;text-align:center}
  .hero-name .line1,.hero-name .line2{font-size:2.5rem}
  .hero-stats{gap:20px;flex-wrap:wrap}
  .stat-num{font-size:2rem}
  .hero-chips{gap:8px}
  .chip{font-size:11px;padding:8px 12px}
  .sec-title{font-size:1.8rem}
}
`;

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 60);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── EXP CARD ─────────────────────────────────────────────────────────────────
function ExpCard({ exp }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`exp-card${open ? " open" : ""}`} onClick={() => setOpen(o => !o)}>
      <div className="exp-header">
        <div className="exp-left">
          <div className="exp-company">{exp.company}</div>
          <div className="exp-role">{exp.role}</div>
          <div className="exp-period">{exp.period}</div>
        </div>
        <div className="exp-right-wrap">
          <span className="exp-tag">{exp.tag}</span>
          <div className="exp-toggle">+</div>
        </div>
      </div>
      <div className="exp-body">
        <div className="exp-body-inner">
          <ul className="exp-bullets">
            {exp.bullets.map((b, i) => <li key={i} className="exp-bullet">{b}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function CV() {
  const [lang, setLang] = useState("en");
  const d = data[lang];
  useReveal();

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">AWF</div>
        <ul className="nav-links">
          <li><a href="#about">{d.labels.about}</a></li>
          <li><a href="#exp">{d.labels.exp}</a></li>
          <li><a href="#edu">{d.labels.edu}</a></li>
          <li><a href="#skills">{d.labels.skills}</a></li>
          <li><a href="#more">{d.labels.more}</a></li>
        </ul>
        <div className="lang-grp">
          <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
          <button className={`lang-btn${lang === "es" ? " active" : ""}`} onClick={() => setLang("es")}>ES</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            {d.title}
          </div>
          <p className="hero-intro">Hey, my name is</p>
          <h1 className="hero-name">
            <span className="line1">{d.first}</span>
            <span className="line2">{d.last}</span>
          </h1>
          <p className="hero-role">{d.title}</p>
          <div className="hero-chips">
            <a className="chip" href={`mailto:${d.email}`}>
              <FaEnvelope style={{ color: "#f5c518", fontSize: 11 }} />{d.email}
            </a>
            <span className="chip">
              <FaPhoneAlt style={{ color: "#f5c518", fontSize: 11 }} />{d.phone}
            </span>
            <span className="chip">
              <FaMapMarkerAlt style={{ color: "#f5c518", fontSize: 11 }} />{d.location}
            </span>
            <a className="chip" href="https://www.linkedin.com/in/abdul-wahab-farooq-78a60415a/" target="_blank" rel="noreferrer">
              <FaLinkedin style={{ color: "#f5c518", fontSize: 11 }} />LinkedIn
            </a>
          </div>
          <div className="hero-stats">
            {d.stats.map((s, i) => (
              <div className="stat-box" key={i}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-yellow-bg" />
          <div className="hero-img-wrap">
            <img 
  src={profileImg}
  alt="Abdul Wahab Farooq"
  style={{
    width:"100%",
    height:"100%",
    objectFit:"cover",
    objectPosition:"center top"
  }}
/>
          </div>
          <div className="hero-badge">QA Consultant</div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[0, 1].map(r => (
            <div className="ticker-inner" key={r}>
              {TICKER.map((t, i) => <span key={i}>{t}<span className="tsep"> ★ </span></span>)}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* ABOUT */}
        <section className="sec" id="about">
          <div className="sec-header reveal">
            <span className="sec-label">01</span>
            <h2 className="sec-title">{d.labels.about}</h2>
            <div className="sec-line" />
          </div>
          <div className="about-grid reveal">
            <p className="about-quote">"{d.summary}"</p>
            <div className="about-details">
              <div className="about-row">
                <div className="about-row-icon">
                  <FaEnvelope style={{ color: "#0d1f1a", fontSize: 14 }} />
                </div>
                <div>
                  <div className="about-row-label">Email</div>
                  <div className="about-row-val">{d.email}</div>
                </div>
              </div>
              <div className="about-row">
                <div className="about-row-icon">
                  <FaPhoneAlt style={{ color: "#0d1f1a", fontSize: 14 }} />
                </div>
                <div>
                  <div className="about-row-label">Phone</div>
                  <div className="about-row-val">{d.phone}</div>
                </div>
              </div>
              <div className="about-row">
                <div className="about-row-icon">
                  <FaMapMarkerAlt style={{ color: "#0d1f1a", fontSize: 14 }} />
                </div>
                <div>
                  <div className="about-row-label">Location</div>
                  <div className="about-row-val">{d.location}</div>
                </div>
              </div>
              <div className="about-row">
                <div className="about-row-icon">
                  <FaLinkedin style={{ color: "#0d1f1a", fontSize: 14 }} />
                </div>
                <div>
                  <div className="about-row-label">LinkedIn</div>
                  <div className="about-row-val">abdul-wahab-farooq</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="sec" id="exp">
          <div className="sec-header reveal">
            <span className="sec-label">02</span>
            <h2 className="sec-title">{d.labels.exp}</h2>
            <div className="sec-line" />
          </div>
          <div className="reveal">
            {d.experience.map((exp, i) => <ExpCard key={`${lang}-${i}`} exp={exp} />)}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="sec" id="edu">
          <div className="sec-header reveal">
            <span className="sec-label">03</span>
            <h2 className="sec-title">{d.labels.edu}</h2>
            <div className="sec-line" />
          </div>
          <div className="edu-card reveal">
            <div className="edu-year">2021</div>
            <div className="edu-inst">{d.education.inst}</div>
            <div className="edu-deg">{d.education.deg}</div>
            <div className="edu-meta">
              <span className="edu-pill">{d.education.period}</span>
              <span className="edu-pill">{d.education.cgpa}</span>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="sec" id="skills">
          <div className="sec-header reveal">
            <span className="sec-label">04</span>
            <h2 className="sec-title">{d.labels.skills}</h2>
            <div className="sec-line" />
          </div>
          <div className="skills-layout reveal">
            <div>
              {d.skills.map(([name, pct], i) => (
                <div className="skill-item" key={i}>
                  <div className="skill-icon">
                    {SKILL_ICONS[name] || <svg viewBox="0 0 22 22" width="18" height="18"><circle cx="11" cy="11" r="10" fill="#f5c518" opacity=".3" /></svg>}
                  </div>
                  <span className="skill-name">{name}</span>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="skill-pct">{pct}</span>
                </div>
              ))}
            </div>
            <div className="skills-right">
              <div className="sub-label">{d.labels.dbs}</div>
              <div className="tags">
                {d.databases.map(t => <span className="tag tag-db" key={t}>{DB_ICONS[t]}{t}</span>)}
              </div>
              <div className="sub-label">{d.labels.lp}</div>
              <div className="tags">
                {d.langsProg.map(t => <span className="tag tag-lang" key={t}>{LANG_ICONS[t]}{t}</span>)}
              </div>
              <div className="sub-label">{d.labels.certs}</div>
              <div className="cert-list">
                {d.certifications.map((c, i) => (
                  <div className="cert-item" key={i}>
                    <div className="cert-num">0{i + 1}</div>
                    <div className="cert-text">{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LANGUAGES / SPORTS / SOCIAL */}
        <section className="sec" id="more">
          <div className="sec-header reveal">
            <span className="sec-label">05</span>
            <h2 className="sec-title">{d.labels.more}</h2>
            <div className="sec-line" />
          </div>
          <div className="bottom-grid reveal">
            <div className="b-card">
              <div className="b-card-title">🌐 {d.labels.langs}</div>
              {d.langsSpeak.map(([n, level]) => (
                <div className="lang-row" key={n}>
                  <span className="lang-nm">{n}</span>
                  <span className="lang-level">{level}</span>
                </div>
              ))}
            </div>
            <div className="b-card">
              <div className="b-card-title">🏆 {d.labels.sports}</div>
              {d.sports.map((s, i) => (
                <div className="list-item" key={i}><div className="list-dot" />{s}</div>
              ))}
            </div>
            <div className="b-card">
              <div className="b-card-title">🤝 {d.labels.social}</div>
              {d.social.map((s, i) => (
                <div className="list-item" key={i}><div className="list-dot" />{s}</div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-txt">© 2026 <span className="footer-acc">Abdul Wahab Farooq</span></div>
        <div className="footer-txt">Quality Assurance <span className="footer-acc">·</span> Valencia, Spain</div>
      </footer>
    </>
  );
}
  