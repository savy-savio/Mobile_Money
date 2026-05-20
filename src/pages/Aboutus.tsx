import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../context/l18n';

const BRAND      = '#FA510F';
const BRAND_DARK = '#D94309';
const BRAND_LITE = 'rgba(250,81,15,0.08)';

// ── i18n copy ─────────────────────────────────────────────────────────────────
const COPY = {
  en: {
    eyebrow:   'About Crown Ledger Bank',
    heading1:  'Built on trust.',
    heading2:  'Powered by innovation.',
    body1:     'Crown Ledger Bank was founded in Lagos with one unwavering conviction: every Nigerian — every African — deserves world-class financial services at their fingertips. We are not just another bank. We are your financial partner, your growth engine, and your safety net.',
    body2:     'From seamless cross-border transfers to intelligent savings vaults, every product we build is shaped by the real stories of the 2.4 million people who bank with us every day.',
    founded:   'Founded',
    foundedVal:'2018',
    hq:        'Headquartered',
    hqVal:     'Lagos, Nigeria',
    license:   'Licensed by',
    licenseVal:'CBN & SEC',
    mission_label:  'Our Mission',
    mission_text:   'To democratise access to premium financial services across Africa, closing the wealth gap one account at a time.',
    vision_label:   'Our Vision',
    vision_text:    'A continent where every individual and business can grow, save, and transact without borders or barriers.',
    values_label:   'Core Values',
    val1: 'Transparency', val2: 'Security', val3: 'Innovation', val4: 'Inclusion',
    cta: 'Open your free account',
    img_caption: 'Our headquarters · Victoria Island, Lagos',
  },
  es: {
    eyebrow:   'Acerca de Crown Ledger Bank',
    heading1:  'Construido en confianza.',
    heading2:  'Impulsado por innovación.',
    body1:     'Crown Ledger Bank fue fundado en Lagos con una convicción inquebrantable: cada nigeriano — cada africano — merece servicios financieros de clase mundial al alcance de su mano. No somos solo otro banco. Somos tu socio financiero, tu motor de crecimiento y tu red de seguridad.',
    body2:     'Desde transferencias internacionales sin fricciones hasta bóvedas de ahorro inteligentes, cada producto está moldeado por las historias reales de los 2.4 millones de personas que confían en nosotros cada día.',
    founded:   'Fundado',
    foundedVal:'2018',
    hq:        'Sede central',
    hqVal:     'Lagos, Nigeria',
    license:   'Autorizado por',
    licenseVal:'CBN & SEC',
    mission_label:  'Nuestra Misión',
    mission_text:   'Democratizar el acceso a servicios financieros premium en África, cerrando la brecha de riqueza una cuenta a la vez.',
    vision_label:   'Nuestra Visión',
    vision_text:    'Un continente donde cada persona y empresa pueda crecer, ahorrar y transaccionar sin fronteras ni barreras.',
    values_label:   'Valores Fundamentales',
    val1: 'Transparencia', val2: 'Seguridad', val3: 'Innovación', val4: 'Inclusión',
    cta: 'Abre tu cuenta gratuita',
    img_caption: 'Nuestra sede · Victoria Island, Lagos',
  },
};

// ── Intersection observer hook ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Value pill ────────────────────────────────────────────────────────────────
function ValuePill({ label, icon, delay, inView }: { label: string; icon: string; delay: number; inView: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: BRAND_LITE,
      border: `1px solid rgba(250,81,15,0.2)`,
      borderRadius: 99,
      padding: '7px 16px 7px 10px',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(12px)',
      transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`,
    }}>
      <span style={{ fontSize: 15 }}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: BRAND, letterSpacing: '0.3px' }}>{label}</span>
    </div>
  );
}

// ── Stat chip ─────────────────────────────────────────────────────────────────
function StatChip({ label, value, delay, inView }: { label: string; value: string; delay: number; inView: boolean }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid rgba(0,0,0,0.07)',
      borderRadius: 14,
      padding: '14px 20px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(14px)',
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      minWidth: 0,
      flex: 1,
    }}>
      <div style={{ fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 800, color: '#0D1117', fontFamily: '"Syne", serif', lineHeight: 1, letterSpacing: '-0.5px' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#64748B', marginTop: 5, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ── About Us ──────────────────────────────────────────────────────────────────
const AboutUs = () => {
  const { language } = useI18n();
  const c = COPY[language as keyof typeof COPY] ?? COPY.en;

  const { ref: secRef, inView } = useInView(0.08);
  const { ref: imgRef, inView: imgIn } = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .about-section {
          background: #F8F9FC;
          font-family: "DM Sans", sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* decorative mesh blob */
        .about-blob {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(250,81,15,0.07) 0%, transparent 70%);
          top: -120px;
          right: -160px;
          pointer-events: none;
          z-index: 0;
        }
        .about-blob2 {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(250,81,15,0.05) 0%, transparent 70%);
          bottom: 40px;
          left: -80px;
          pointer-events: none;
          z-index: 0;
        }

        .about-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(56px,8vh,96px) clamp(16px,5vw,56px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px,5vw,72px);
          align-items: center;
        }

        /* ── Image column ── */
        .about-img-col {
          position: relative;
        }
        .about-img-frame {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 24px 64px rgba(0,0,0,0.13);
        }
        .about-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 6s ease;
        }
        .about-img-frame:hover img { transform: scale(1.04); }

        /* subtle orange border accent */
        .about-img-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          border: 1.5px solid rgba(250,81,15,0.18);
          z-index: 2;
          pointer-events: none;
        }

        /* gradient wash at bottom of image */
        .about-img-frame::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 45%;
          background: linear-gradient(0deg, rgba(6,6,14,0.72) 0%, transparent 100%);
          z-index: 2;
          border-radius: 0 0 24px 24px;
        }

        .about-img-caption {
          position: absolute;
          bottom: 18px; left: 18px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity .6s ease 0.9s, transform .6s ease 0.9s;
        }
        .about-img-caption.visible {
          opacity: 1;
          transform: none;
        }

        /* floating experience badge */
        .about-badge {
          position: absolute;
          bottom: -22px;
          right: -22px;
          width: 108px;
          height: 108px;
          background: white;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 36px rgba(0,0,0,0.14);
          border: 4px solid #F8F9FC;
          z-index: 4;
        }

        /* decorative corner bracket */
        .about-corner {
          position: absolute;
          top: -16px;
          left: -16px;
          width: 56px;
          height: 56px;
          border-top: 3px solid ${BRAND};
          border-left: 3px solid ${BRAND};
          border-radius: 6px 0 0 0;
          z-index: 4;
        }

        /* ── Text column ── */
        .about-text-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* mission / vision cards */
        .mv-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .mv-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: ${BRAND};
          border-radius: 3px 0 0 3px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .about-inner {
            grid-template-columns: 1fr;
            padding: clamp(40px,6vh,64px) clamp(14px,5vw,28px);
          }
          .about-img-col { order: -1; }
          .about-img-frame { aspect-ratio: 16/9; }
          .about-badge { width: 88px; height: 88px; bottom: -16px; right: -10px; }
          .about-corner { width: 42px; height: 42px; top: -12px; left: -10px; }
        }
      `}</style>

      <section className="about-section">
        <div className="about-blob" />
        <div className="about-blob2" />

        <div className="about-inner" ref={secRef}>

          {/* ══ LEFT: Image column ══ */}
          <div className="about-img-col" ref={imgRef} style={{ opacity: imgIn ? 1 : 0, transform: imgIn ? 'none' : 'translateX(-32px)', transition: 'opacity .8s ease .1s, transform .8s ease .1s' }}>

            <div className="about-corner" />

            <div className="about-img-frame">
              {/* Professional banking/finance image from Unsplash */}
              <img
                src="https://images.unsplash.com/photo-1560472355-536de3962603?w=900&q=85&fit=crop&crop=faces,center"
                alt="Crown Ledger Bank headquarters"
                loading="lazy"
              />

              {/* Caption overlay */}
              <div className={`about-img-caption ${imgIn ? 'visible' : ''}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2"/>
                  <circle cx="7" cy="7" r="2.5" fill="rgba(255,255,255,0.85)"/>
                </svg>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 500 }}>{c.img_caption}</span>
              </div>
            </div>

            {/* Experience badge */}
            <div className="about-badge" style={{ opacity: imgIn ? 1 : 0, transform: imgIn ? 'none' : 'scale(0.7)', transition: 'opacity .65s ease .5s, transform .65s cubic-bezier(.34,1.56,.64,1) .5s' }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#0D1117', fontFamily: '"Syne", serif', lineHeight: 1, letterSpacing: '-1px' }}>6+</span>
              <span style={{ fontSize: 9, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, textAlign: 'center', lineHeight: 1.3, marginTop: 3 }}>Years<br/>Trust</span>
            </div>

            {/* Quick-fact chips row below image */}
            <div style={{ display: 'flex', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
              {[
                { label: c.founded,  value: c.foundedVal  },
                { label: c.hq,       value: c.hqVal       },
                { label: c.license,  value: c.licenseVal  },
              ].map((chip, i) => (
                <div key={i} style={{ flex: 1, minWidth: 0, background: 'white', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 12, padding: '10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', opacity: imgIn ? 1 : 0, transform: imgIn ? 'none' : 'translateY(10px)', transition: `opacity .5s ease ${300 + i * 80}ms, transform .5s ease ${300 + i * 80}ms` }}>
                  <div style={{ fontSize: 9, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{chip.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1117', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chip.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT: Text column ══ */}
          <div className="about-text-col">

            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 18, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)', transition: 'opacity .55s ease .15s, transform .55s ease .15s' }}>
              <span style={{ width: 28, height: 2, background: BRAND, borderRadius: 2, display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: BRAND, textTransform: 'uppercase', letterSpacing: '2.4px' }}>{c.eyebrow}</span>
            </div>

            {/* Heading */}
            <h2 style={{ margin: '0 0 20px', fontFamily: '"Syne", Georgia, serif', fontWeight: 800, fontSize: 'clamp(28px,3.8vw,52px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#0D1117', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity .65s ease .25s, transform .65s ease .25s' }}>
              {c.heading1}
              <br />
              <span style={{ background: `linear-gradient(90deg,${BRAND} 0%,#FF8A50 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{c.heading2}</span>
            </h2>

            {/* Body copy */}
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.8, color: '#475569', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: 'opacity .65s ease .35s, transform .65s ease .35s' }}>{c.body1}</p>
            <p style={{ margin: '0 0 28px', fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.8, color: '#475569', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: 'opacity .65s ease .43s, transform .65s ease .43s' }}>{c.body2}</p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              <StatChip label="Active users"     value="2.4M+" delay={500} inView={inView} />
              <StatChip label="Daily transfers"  value="₦18B+" delay={600} inView={inView} />
              <StatChip label="Uptime"           value="99.9%" delay={700} inView={inView} />
            </div>

            {/* Mission + Vision cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
              {[
                { label: c.mission_label, text: c.mission_text, icon: '🎯', delay: 520 },
                { label: c.vision_label,  text: c.vision_text,  icon: '🌍', delay: 620 },
              ].map((item) => (
                <div key={item.label} className="mv-card" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(16px)', transition: `opacity .6s ease ${item.delay}ms, transform .6s ease ${item.delay}ms` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: BRAND, textTransform: 'uppercase', letterSpacing: '1.2px' }}>{item.label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: '#475569' }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Core values */}
            <div style={{ marginBottom: 32, opacity: inView ? 1 : 0, transition: 'opacity .5s ease .7s' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>{c.values_label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <ValuePill label={c.val1} icon="🔍" delay={720} inView={inView} />
                <ValuePill label={c.val2} icon="🔐" delay={790} inView={inView} />
                <ValuePill label={c.val3} icon="⚙️" delay={860} inView={inView} />
                <ValuePill label={c.val4} icon="🤝" delay={930} inView={inView} />
              </div>
            </div>

            {/* CTA */}
            <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)', transition: 'opacity .6s ease .85s, transform .6s ease .85s' }}>
              <button
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: BRAND, color: '#fff', border: 'none', borderRadius: 13, padding: '14px 26px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: '"DM Sans",sans-serif', boxShadow: `0 6px 22px rgba(250,81,15,0.32)`, transition: 'all .2s ease', letterSpacing: '-0.1px' }}
                onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = BRAND_DARK; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 28px rgba(250,81,15,0.42)'; }}
                onMouseOut={e  => { (e.currentTarget as HTMLButtonElement).style.background = BRAND; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 22px rgba(250,81,15,0.32)'; }}
              >
                {c.cta}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;