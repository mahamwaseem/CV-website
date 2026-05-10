import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

// ─── Inline SVG logos for each skill ───────────────────────────────────────
const SKILL_ICONS = {
  "Playwright": (
    <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
      <circle cx="16" cy="16" r="14" fill="#2EAD33"/>
      <path d="M10 22c0-4 3-7 6-7s6 3 6 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="11" r="3" fill="#fff"/>
    </svg>
  ),
  "Selenium WebDriver": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <circle cx="16" cy="16" r="14" fill="#43B02A"/>
      <circle cx="16" cy="16" r="8" fill="none" stroke="#fff" strokeWidth="1.5"/>
      <path d="M16 8v16M8 16h16" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  ),
  "Cypress": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <circle cx="16" cy="16" r="14" fill="#17202C"/>
      <circle cx="16" cy="16" r="7" fill="#69D3A7"/>
      <path d="M21 14a5 5 0 11-10 0" stroke="#17202C" strokeWidth="2" fill="none"/>
    </svg>
  ),
  "JIRA": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <rect width="32" height="32" rx="4" fill="#0052CC"/>
      <path d="M16 7l3.5 8.5L16 25l-3.5-9.5L16 7z" fill="#2684FF"/>
      <path d="M16 7l8.5 9-8.5 9V7z" fill="#fff" opacity=".25"/>
    </svg>
  ),
  "Postman / Bruno": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <circle cx="16" cy="16" r="14" fill="#FF6C37"/>
      <circle cx="16" cy="16" r="6" fill="none" stroke="#fff" strokeWidth="2"/>
      <path d="M16 10v6l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  "Karate DSL": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <circle cx="16" cy="16" r="14" fill="#1A1A2E"/>
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#c9a84c" fontFamily="serif" fontWeight="bold">K</text>
    </svg>
  ),
  "Java": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <circle cx="16" cy="16" r="14" fill="#ED8B00"/>
      <text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="sans-serif" fontWeight="bold">Java</text>
    </svg>
  ),
  "TypeScript / JS": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <rect width="32" height="32" rx="4" fill="#3178C6"/>
      <text x="16" y="22" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="sans-serif" fontWeight="bold">TS</text>
    </svg>
  ),
  "GitHub Actions": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <circle cx="16" cy="16" r="14" fill="#24292F"/>
      <circle cx="16" cy="13" r="4" fill="none" stroke="#f0f6ff" strokeWidth="1.5"/>
      <circle cx="16" cy="13" r="1.5" fill="#f0f6ff"/>
      <path d="M16 17v6" stroke="#f0f6ff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "Zephyr / QMetry": (
    <svg viewBox="0 0 32 32" width="18" height="18">
      <circle cx="16" cy="16" r="14" fill="#0D47A1"/>
      <path d="M10 12h12l-6 8-6-8z" fill="#64B5F6"/>
    </svg>
  ),
};

const DB_ICONS = {
  "PostgreSQL": <svg viewBox="0 0 24 24" width="13" height="13"><circle cx="12" cy="12" r="10" fill="#336791"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif">PG</text></svg>,
  "SQL": <svg viewBox="0 0 24 24" width="13" height="13"><rect width="24" height="24" rx="4" fill="#f29111"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif">SQL</text></svg>,
  "MongoDB": <svg viewBox="0 0 24 24" width="13" height="13"><circle cx="12" cy="12" r="10" fill="#4DB33D"/><path d="M12 5v14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>,
};

const LANG_ICONS = {
  "Java": <svg viewBox="0 0 24 24" width="13" height="13"><circle cx="12" cy="12" r="10" fill="#ED8B00"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif" fontWeight="bold">J</text></svg>,
  "JavaScript": <svg viewBox="0 0 24 24" width="13" height="13"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><text x="12" y="17" textAnchor="middle" fontSize="8" fill="#222" fontFamily="sans-serif" fontWeight="bold">JS</text></svg>,
  "TypeScript": <svg viewBox="0 0 24 24" width="13" height="13"><rect width="24" height="24" rx="3" fill="#3178C6"/><text x="12" y="17" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif" fontWeight="bold">TS</text></svg>,
  "Gherkin": <svg viewBox="0 0 24 24" width="13" height="13"><circle cx="12" cy="12" r="10" fill="#23D96C"/><text x="12" y="16" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif" fontWeight="bold">G</text></svg>,
};

const data = {
  en: {
    first: "Abdul", last: "Wahab Farooq",
    title: "Quality Assurance Consultant",
    email: "abdulwahabfarooq41c@gmail.com",
    phone: "+34 672 84 74 22",
    location: "Valencia, Spain",
    summary: "A dedicated Quality Assurance professional with more than four years of experience in agile environments. Specialising in designing, refining, and testing requirements, creating and automating test cases, and integrating QA activities into team iterations.",
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
    langsSpeak: [["English","EN"],["Urdu","UR"],["Spanish","ES"]],
    sports: ["Competed in Table Tennis at district level (U-19)","Enjoys Cricket and Futsal","Preparing for Swimming competition"],
    social: ["Active part of Amal – The Renaissance","Organised fundraising events for orphanages","Addressed financial challenges of students"],
    education: { inst: "The University of Lahore", deg: "BS in Software Engineering", period: "2017 – 2021", cgpa: "CGPA 3.14" },
    labels: { about:"About", exp:"Experience", edu:"Education", skills:"Skills & Tools", certs:"Certifications", langs:"Languages", sports:"Sports", social:"Social Work", dbs:"Databases", lp:"Programming Languages" },
  },
  es: {
    first: "Abdul", last: "Wahab Farooq",
    title: "Consultor de Control de Calidad",
    email: "abdulwahabfarooq41c@gmail.com",
    phone: "+34 672 84 74 22",
    location: "Valencia, España",
    summary: "Profesional dedicado al control de calidad con más de cuatro años de experiencia en entornos ágiles. Especializado en diseñar, refinar y probar requisitos, crear y automatizar casos de prueba e integrar actividades de QA en iteraciones del equipo.",
    experience: [
      { company: "Sogeti, Capgemini", role: "Consultor de Pruebas", period: "Abr 2025 — Actualidad", tag: "Actual",
        bullets: ["Desarrollo de marcos de automatización con Playwright y TypeScript.", "Extensión de marcos a entornos como Francia y Australia.", "Análisis de requisitos de negocio e historias de usuario.", "Pruebas de regresión y humo de forma sistemática.", "Mantenimiento de suites en Zephyr. Github Actions para CI/CD."] },
      { company: "Autónomo", role: "Ingeniero de Pruebas", period: "Abr 2024 — Mar 2025", tag: "Freelance",
        bullets: ["Pruebas de compatibilidad de navegadores con Playwright.", "Desarrollo de marcos con Java y Selenium.", "Pruebas manuales para apps web y móviles.", "Pruebas funcionales, de regresión e integración."] },
      { company: "Funding Societies", role: "Ingeniero de Software en Pruebas", period: "Oct 2021 — Nov 2023", tag: "FinTech",
        bullets: ["Diseño y ejecución de pruebas API con Karate.", "Uso de Postman para pruebas de API.", "Frameworks en Java con Selenium WebDriver.", "Pruebas entre navegadores con Cypress y rendimiento con JMeter."] },
      { company: "Microperts", role: "Ingeniero de QA", period: "Feb 2021 — Sep 2021", tag: "Inicio",
        bullets: ["Papel clave en pruebas de apps móviles y web.", "Metodologías ágiles para planes de prueba eficaces.", "Pruebas manuales y documentación diligente."] },
    ],
    skills: [["Playwright",95],["Selenium WebDriver",90],["Cypress",85],["JIRA",90],["Postman / Bruno",88],["Karate DSL",82],["Java",80],["TypeScript / JS",78],["GitHub Actions",75],["Zephyr / QMetry",80]],
    databases: ["PostgreSQL","SQL","MongoDB"],
    langsProg: ["Java","JavaScript","TypeScript","Gherkin"],
    certifications: ["Karate DSL: Automatización y Rendimiento de API","Liderazgo Ágil y Equipos Resistentes","IELTS"],
    langsSpeak: [["Inglés","EN"],["Urdu","UR"],["Español","ES"]],
    sports: ["Compitió en tenis de mesa a nivel de distrito (sub-19)","Disfruta del críquet y fútbol sala","Preparación para competición de natación"],
    social: ["Parte activa de Amal – El Renacimiento","Organización de eventos para orfanatos","Apoyo financiero a estudiantes"],
    education: { inst: "Universidad de Lahore", deg: "Grado en Ingeniería de Software", period: "2017 – 2021", cgpa: "CGPA 3.14" },
    labels: { about:"Sobre mí", exp:"Experiencia", edu:"Educación", skills:"Habilidades", certs:"Certificaciones", langs:"Idiomas", sports:"Deportes", social:"Social", dbs:"Bases de Datos", lp:"Lenguajes" },
  },
};

const TICKER_ITEMS = ["Quality Assurance","Test Automation","Playwright","Selenium","Cypress","Agile · TDD","BDD","API Testing","CI/CD","JIRA","Karate DSL","End-to-End Testing"];

// ─── Particle Canvas ────────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const sz = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    sz(); window.addEventListener("resize", sz);
    const ps = Array.from({ length: 55 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.2 + 0.3,
      sx: (Math.random() - 0.5) * 0.22, sy: -Math.random() * 0.35 - 0.08,
      o: Math.random() * 0.45 + 0.1, l: Math.random(),
    }));
    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach(p => {
        p.x += p.sx; p.y += p.sy; p.l += 0.003;
        if (p.y < -5) { p.y = c.height + 5; p.x = Math.random() * c.width; }
        const a = Math.sin(p.l * Math.PI) * p.o;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a})`; ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("resize", sz); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.55 }} />;
}

// ─── Expandable Experience Card ─────────────────────────────────────────────
function ExpCard({ exp }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "rgba(201,168,76,0.03)", border: `1px solid ${open ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.1)"}`,
      borderRadius: 2, overflow: "hidden", marginBottom: 3,
      borderLeft: open ? "2px solid #c9a84c" : "2px solid transparent",
      transition: "all .4s", cursor: "pointer",
    }} onClick={() => setOpen(o => !o)}>
      <div style={{ padding: "22px 26px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#f0e6d0", marginBottom: 3 }}>{exp.company}</div>
          <div style={{ fontSize: 11, color: "#c9a84c", letterSpacing: ".8px", marginBottom: 4 }}>{exp.role}</div>
          <div style={{ fontSize: 11, color: "#6b6257", fontStyle: "italic" }}>{exp.period}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", padding: "3px 10px", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 1, color: "#6b6257" }}>{exp.tag}</span>
          <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${open ? "#c9a84c" : "rgba(201,168,76,0.25)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a84c", fontSize: 14, transition: "transform .3s", transform: open ? "rotate(45deg)" : "none" }}>+</div>
        </div>
      </div>
      <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height .5s cubic-bezier(.23,1,.32,1)", padding: open ? "0 26px 22px" : "0 26px" }}>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 12.5, color: "#6b6257", paddingLeft: 18, position: "relative", lineHeight: 1.6 }}>
              <span style={{ position: "absolute", left: 0, top: 9, width: 8, height: 1, background: "#c9a84c", opacity: 0.45, display: "block" }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Jost:wght@200;300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#0c0b09;color:#e8ddd0;font-family:'Jost',sans-serif;font-weight:300;font-size:14px;line-height:1.7;overflow-x:hidden;cursor:auto}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0c0b09}::-webkit-scrollbar-thumb{background:#7a5c1e;border-radius:2px}

.glow1{position:fixed;top:-20%;left:-10%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 70%);pointer-events:none;z-index:0;animation:gp 8s ease-in-out infinite}
.glow2{position:fixed;bottom:-20%;right:-10%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.04) 0%,transparent 70%);pointer-events:none;z-index:0;animation:gp 11s ease-in-out infinite reverse}
@keyframes gp{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}

.nav{background:rgba(12,11,9,.9);backdrop-filter:blur(20px);border-bottom:1px solid rgba(201,168,76,.12);padding:14px 48px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100}
.nav-logo{font-family:'Playfair Display',serif;font-size:15px;color:#c9a84c;letter-spacing:3px;font-style:italic}
.lang-grp{display:flex;border:1px solid rgba(201,168,76,.25);border-radius:2px;overflow:hidden}
.lang-btn{border:none;background:transparent;color:#6b6257;font-family:'Jost',sans-serif;font-size:10px;font-weight:400;padding:7px 18px;cursor:pointer;letter-spacing:2px;text-transform:uppercase;transition:all .3s}
.lang-btn.active{background:#c9a84c;color:#0c0b09;font-weight:500}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:100px 64px 80px;position:relative;overflow:hidden;border-bottom:1px solid rgba(201,168,76,.12)}
.hl1{position:absolute;left:48px;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(201,168,76,.25),transparent);opacity:.5}
.hl2{position:absolute;right:48px;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(201,168,76,.2),transparent);opacity:.5}
.hero-in{display:grid;grid-template-columns:1fr 280px;gap:60px;align-items:center;position:relative;z-index:2}
.overline{display:flex;align-items:center;gap:14px;font-size:9px;font-weight:500;letter-spacing:5px;text-transform:uppercase;color:#c9a84c;margin-bottom:24px}
.overline::before{content:'';width:36px;height:1px;background:#c9a84c;opacity:.5}
.big-name{font-family:'Playfair Display',serif;font-size:clamp(4rem,9vw,7.5rem);font-weight:900;line-height:.88;letter-spacing:-3px;color:#f0e6d0;margin-bottom:28px}
.big-name em{font-style:italic;color:#c9a84c;display:block}
.tagline{display:flex;align-items:center;gap:16px;margin-bottom:40px}
.tagline span{font-size:10px;font-weight:400;letter-spacing:4px;text-transform:uppercase;color:#6b6257}
.tdot{width:3px;height:3px;border-radius:50%;background:#c9a84c;opacity:.5}
.chips{display:flex;flex-wrap:wrap;gap:7px}
.chip{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(201,168,76,.25);border-radius:1px;padding:8px 16px;font-size:11px;color:#6b6257;text-decoration:none;transition:all .35s;background:rgba(201,168,76,.04);cursor:pointer}
.chip:hover{border-color:#c9a84c;color:#e8c97a;transform:translateY(-2px)}
.prof{position:relative;display:flex;justify-content:center}
.prof-ring{position:absolute;inset:-10px;border-radius:999px;border:1px solid rgba(201,168,76,.2);animation:spin 12s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.prof-oval{width:210px;height:268px;border-radius:999px;overflow:hidden;border:1px solid rgba(201,168,76,.3);position:relative;z-index:1;display:flex;align-items:center;justify-content:center;background:rgba(201,168,76,.04)}
.prof-badge{position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);background:#c9a84c;color:#0c0b09;font-size:9px;font-weight:500;letter-spacing:3px;text-transform:uppercase;padding:5px 18px;border-radius:1px;white-space:nowrap;z-index:2}

.tick-wrap{overflow:hidden;border-top:1px solid rgba(201,168,76,.12);border-bottom:1px solid rgba(201,168,76,.12);padding:11px 0;background:rgba(201,168,76,.02)}
.tick{display:flex;white-space:nowrap;animation:tk 28s linear infinite}
.tick-inner{display:flex;gap:48px;padding-right:48px;font-size:10px;font-weight:300;letter-spacing:3px;text-transform:uppercase;color:#6b6257}
.tsep{color:#c9a84c;opacity:.5}
@keyframes tk{from{transform:translateX(0)}to{transform:translateX(-50%)}}

.main{padding:0 64px 100px;position:relative;z-index:1}
.sec{padding:72px 0;border-bottom:1px solid rgba(201,168,76,.12)}
.sec:last-child{border-bottom:none}
.sh{display:flex;align-items:flex-start;gap:28px;margin-bottom:44px}
.snum{font-family:'Playfair Display',serif;font-size:4.5rem;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.1);line-height:1;flex-shrink:0;margin-top:-12px;user-select:none}
.slabel{font-size:9px;font-weight:500;letter-spacing:5px;text-transform:uppercase;color:#c9a84c;padding-top:6px}
.sline{flex:1;height:1px;background:linear-gradient(90deg,#7a5c1e,transparent);margin-top:18px}

.summary{font-family:'Playfair Display',serif;font-style:italic;font-size:1.3rem;font-weight:400;line-height:1.8;color:rgba(240,230,208,.55);border-left:2px solid #c9a84c;padding-left:28px;max-width:680px;position:relative}
.summary::before{content:'"';font-size:5rem;color:rgba(201,168,76,.07);position:absolute;top:-16px;left:-8px;font-family:'Playfair Display',serif;line-height:1}

.edu-card{border:1px solid rgba(201,168,76,.25);border-top:2px solid #c9a84c;border-radius:2px;padding:32px;background:rgba(201,168,76,.03);max-width:480px}
.edu-y{font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.13);line-height:1;margin-bottom:14px}
.edu-inst{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#f0e6d0;margin-bottom:4px}
.edu-deg{font-size:11px;color:#c9a84c;letter-spacing:.8px;margin-bottom:12px}
.edu-meta{display:flex;gap:12px;font-size:11px;color:#6b6257;font-style:italic}
.edu-meta span{padding:3px 10px;border:1px solid rgba(201,168,76,.12);border-radius:1px}

.skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px}
.skill-item{padding:9px 0;border-bottom:1px solid rgba(201,168,76,.1);display:flex;align-items:center;gap:10px}
.skill-item:last-child{border-bottom:none}
.skill-icon{width:22px;height:22px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.skill-name{font-size:12px;color:#999;flex:1}
.skill-bar{width:80px;height:1px;background:#3a342c}
.skill-fill{height:100%;background:linear-gradient(90deg,#7a5c1e,#c9a84c)}
.skill-pct{font-size:10px;color:#c9a84c;min-width:26px;text-align:right}

.sub-h{font-size:9px;font-weight:500;letter-spacing:4px;text-transform:uppercase;color:#3a342c;margin:28px 0 10px}
.sub-h:first-child{margin-top:0}
.tags{display:flex;flex-wrap:wrap;gap:6px}
.tag{font-size:10px;padding:4px 11px;border:1px solid rgba(201,168,76,.15);border-radius:1px;color:#6b6257;display:inline-flex;align-items:center;gap:5px;transition:all .3s;cursor:default}
.tag:hover{border-color:#c9a84c;color:#c9a84c}
.tag-a{border-color:rgba(201,168,76,.2);color:#c9a84c}
.tag-g{border-color:rgba(80,120,80,.25);color:#6a9a6a}
.cert-list{display:flex;flex-direction:column}
.cert-item{display:flex;align-items:flex-start;gap:14px;padding:13px 0;border-bottom:1px solid rgba(201,168,76,.1);transition:padding .3s}
.cert-item:last-child{border-bottom:none}
.cert-item:hover{padding-left:6px}
.cert-n{font-family:'Playfair Display',serif;font-size:1.1rem;color:rgba(201,168,76,.2);font-style:italic;flex-shrink:0;line-height:1.3}
.cert-t{font-size:12px;color:#6b6257;line-height:1.6;padding-top:2px}

.bot{display:grid;grid-template-columns:repeat(3,1fr);gap:44px}
.bc-title{font-size:9px;font-weight:500;letter-spacing:4px;text-transform:uppercase;color:#c9a84c;margin-bottom:18px;padding-bottom:10px;border-bottom:1px solid rgba(201,168,76,.12)}
.lang-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(201,168,76,.1)}
.lang-item:last-child{border-bottom:none}
.lang-nm{font-size:13px;color:#999}
.lang-cd{font-size:9px;letter-spacing:2px;color:#c9a84c;background:rgba(201,168,76,.07);padding:2px 8px}
.mi{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid rgba(201,168,76,.1);font-size:12px;color:#6b6257;line-height:1.5}
.mi:last-child{border-bottom:none}
.mi-dot{width:4px;height:4px;border-radius:50%;background:#c9a84c;opacity:.4;flex-shrink:0;margin-top:6px}
.footer{padding:28px 64px;border-top:1px solid rgba(201,168,76,.12);display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1}
.fn{font-size:10px;color:#3a342c;letter-spacing:2px;text-transform:uppercase}
.fg{color:#c9a84c}

@media(max-width:820px){
  .hero{padding:90px 24px 60px}.hero-in{grid-template-columns:1fr}
  .main{padding:0 24px 60px}
  .skills-grid{grid-template-columns:1fr}.bot{grid-template-columns:1fr}
  .nav{padding:12px 20px}.footer{padding:20px 24px}
  .big-name{font-size:3.5rem}
}
`;

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ".reveal{opacity:0;transform:translateY(22px);transition:opacity .8s ease,transform .8s ease}.reveal.visible{opacity:1;transform:translateY(0)}";
    document.head.appendChild(style);
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 70); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => { obs.disconnect(); document.head.removeChild(style); };
  });
}

export default function CV() {
  const [lang, setLang] = useState("en");
  const d = data[lang];
  useReveal();

  return (
    <>
      <style>{CSS}</style>
      <ParticleCanvas />
      <div className="glow1" /><div className="glow2" />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>

        {/* NAVBAR */}
        <div className="nav">
          <div className="nav-logo">AWF</div>
          <div className="lang-grp">
            <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`lang-btn${lang === "es" ? " active" : ""}`} onClick={() => setLang("es")}>ES</button>
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hl1" /><div className="hl2" />
          <div className="hero-in">
            <div>
              <div className="overline">{d.title}</div>
              <h1 className="big-name">{d.first}<em>{d.last}</em></h1>
              <div className="tagline">
                <span>QA</span><div className="tdot" />
                <span>Automation</span><div className="tdot" />
                <span>Agile</span>
              </div>
              <div className="chips">
                <a className="chip" href={`mailto:${d.email}`}><FaEnvelope style={{ color: "#c9a84c", fontSize: 10 }} />{d.email}</a>
                <span className="chip"><FaPhoneAlt style={{ color: "#c9a84c", fontSize: 10 }} />{d.phone}</span>
                <span className="chip"><FaMapMarkerAlt style={{ color: "#c9a84c", fontSize: 10 }} />{d.location}</span>
                <a className="chip" href="https://www.linkedin.com/in/abdul-wahab-farooq-78a60415a/" target="_blank" rel="noreferrer">
                  <FaLinkedin style={{ color: "#c9a84c", fontSize: 10 }} />LinkedIn
                </a>
              </div>
            </div>
            <div className="prof">
              <div className="prof-ring" />
              <div className="prof-oval">
                 <img src={require("./images/image.png")} alt="Abdul Wahab Farooq" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}} /> 
                
              </div>
              <div className="prof-badge">QA Consultant</div>
            </div>
          </div>
        </div>

        {/* TICKER */}
        <div className="tick-wrap">
          <div className="tick">
            {[0, 1].map(r => (
              <div className="tick-inner" key={r}>
                {TICKER_ITEMS.map((t, i) => <span key={i}>{t}<span className="tsep"> ✦ </span></span>)}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* ABOUT */}
          <div className="sec">
            <div className="sh reveal"><div className="snum">01</div><div className="slabel">{d.labels.about}</div><div className="sline" /></div>
            <p className="summary reveal">{d.summary}</p>
          </div>

          {/* EXPERIENCE */}
          <div className="sec">
            <div className="sh reveal"><div className="snum">02</div><div className="slabel">{d.labels.exp}</div><div className="sline" /></div>
            <div className="reveal">
              {d.experience.map((exp, i) => <ExpCard key={`${lang}-${i}`} exp={exp} />)}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="sec">
            <div className="sh reveal"><div className="snum">03</div><div className="slabel">{d.labels.edu}</div><div className="sline" /></div>
            <div className="edu-card reveal">
              <div className="edu-y">2021</div>
              <div className="edu-inst">{d.education.inst}</div>
              <div className="edu-deg">{d.education.deg}</div>
              <div className="edu-meta"><span>{d.education.period}</span><span>{d.education.cgpa}</span></div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="sec">
            <div className="sh reveal"><div className="snum">04</div><div className="slabel">{d.labels.skills}</div><div className="sline" /></div>
            <div className="skills-grid reveal">
              <div>
                {d.skills.map(([name, pct], i) => (
                  <div className="skill-item" key={i}>
                    <div className="skill-icon">{SKILL_ICONS[name] || <svg viewBox="0 0 22 22" width="18" height="18"><circle cx="11" cy="11" r="10" fill="rgba(201,168,76,.2)" /></svg>}</div>
                    <span className="skill-name">{name}</span>
                    <div className="skill-bar"><div className="skill-fill" style={{ width: `${pct}%` }} /></div>
                    <span className="skill-pct">{pct}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="sub-h">{d.labels.dbs}</div>
                <div className="tags">
                  {d.databases.map(t => <span className="tag tag-a" key={t}>{DB_ICONS[t]}{t}</span>)}
                </div>
                <div className="sub-h">{d.labels.lp}</div>
                <div className="tags">
                  {d.langsProg.map(t => <span className="tag tag-g" key={t}>{LANG_ICONS[t]}{t}</span>)}
                </div>
                <div className="sub-h">{d.labels.certs}</div>
                <div className="cert-list">
                  {d.certifications.map((c, i) => (
                    <div className="cert-item" key={i}>
                      <div className="cert-n">0{i + 1}</div>
                      <div className="cert-t">{c}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LANGUAGES / SPORTS / SOCIAL */}
          <div className="sec">
            <div className="sh reveal"><div className="snum">05</div><div className="slabel">{d.labels.langs}</div><div className="sline" /></div>
            <div className="bot reveal">
              <div>
                <div className="bc-title">{d.labels.langs}</div>
                {d.langsSpeak.map(([n, c]) => (
                  <div className="lang-item" key={n}><span className="lang-nm">{n}</span><span className="lang-cd">{c}</span></div>
                ))}
              </div>
              <div>
                <div className="bc-title">{d.labels.sports}</div>
                {d.sports.map((s, i) => <div className="mi" key={i}><div className="mi-dot" />{s}</div>)}
              </div>
              <div>
                <div className="bc-title">{d.labels.social}</div>
                {d.social.map((s, i) => <div className="mi" key={i}><div className="mi-dot" />{s}</div>)}
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="footer">
          <div className="fn">© 2025 <span className="fg">Abdul Wahab Farooq</span></div>
          <div className="fn">Quality Assurance <span className="fg">·</span> Valencia, Spain</div>
        </div>

      </div>
    </>
  );
}
