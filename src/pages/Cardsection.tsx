import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../context/l18n';

const BRAND      = '#FA510F';
const BRAND_DARK = '#D94309';

const CARDS = [
  {
    id: 'crown',
    img: '/card1.png',
    name: { en: 'Crown Card', es: 'Tarjeta Crown' },
    perks: {
      en: ['10% cashback on all spend', 'Zero FX fees worldwide', 'Dedicated concierge 24/7', 'Airport lounge access'],
      es: ['10% cashback en todo gasto', 'Sin comisiones FX globales', 'Concierge dedicado 24/7', 'Acceso a salas VIP'],
    },
  },
  {
    id: 'titan',
    img: '/card2.png',
    name: { en: 'Titan Card', es: 'Tarjeta Titan' },
    perks: {
      en: ['5% cashback on groceries & dining', 'Free ATM withdrawals', 'Purchase protection', 'Travel insurance included'],
      es: ['5% cashback en comida y tiendas', 'Retiros de cajero gratis', 'Protección de compras', 'Seguro de viaje incluido'],
    },
  },
  {
    id: 'edge',
    img: '/card3.png',
    name: { en: 'Edge Card', es: 'Tarjeta Edge' },
    perks: {
      en: ['3% cashback on all categories', 'Multi-currency account', 'Business expense analytics', 'Priority customer support'],
      es: ['3% cashback en todas las categorías', 'Cuenta multidivisa', 'Análisis de gastos empresariales', 'Soporte prioritario'],
    },
  },
];

const PERK_ICONS = ['💸', '🌐', '🔐', '✈️'];

const COPY = {
  en: {
    eyebrow:      'Crown Ledger Cards',
    heading1:     'A card for every',
    heading2:     'chapter of your life.',
    sub:          'From your first salary to your boardroom deal — there is a Crown Ledger card shaped exactly for where you are, and where you are going.',
    cta:          'Apply now',
    perks_label:  'Key benefits',
    global:       'Accepted in 180+ countries',
    instant:      'Instant virtual card on signup',
    freeze:       'Freeze & unfreeze instantly',
  },
  es: {
    eyebrow:      'Tarjetas Crown Ledger',
    heading1:     'Una tarjeta para cada',
    heading2:     'etapa de tu vida.',
    sub:          'Desde tu primer salario hasta tu acuerdo empresarial — hay una tarjeta Crown Ledger diseñada para donde estás y hacia donde vas.',
    cta:          'Solicitar ahora',
    perks_label:  'Beneficios clave',
    global:       'Aceptada en más de 180 países',
    instant:      'Tarjeta virtual instantánea',
    freeze:       'Congela y descongela al instante',
  },
};

function useInView(threshold = 0.06) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Card Stack – shared between desktop & mobile ─────────────────────────── */
function CardStack({
  active,
  onSelect,
  inView,
}: {
  active: number;
  onSelect: (i: number) => void;
  inView: boolean;
}) {
  // We always show exactly 3 layers: active on top, then the two others behind
  const order = [active, (active + 1) % 3, (active + 2) % 3];

  // Layer styles: index 0 = front (active), 1 = middle, 2 = back
  const layers = [
    // front – floating upright
    { zIndex: 10, top: '0%',  left: '0%',  rotate: '-4deg', scale: 1,    opacity: 1,    blur: 0 },
    // middle – peeks behind-right
    { zIndex: 6,  top: '10%', left: '8%',  rotate: '4deg',  scale: 0.93, opacity: 0.82, blur: 0 },
    // back – further behind-right
    { zIndex: 3,  top: '19%', left: '15%', rotate: '10deg', scale: 0.86, opacity: 0.55, blur: 1 },
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      /* height is driven by the card aspect ratio (card images ~3:2) */
      paddingBottom: '80%',
      opacity: inView ? 1 : 0,
      transition: 'opacity .7s ease .3s',
    }}>
      {order.map((cardIdx, layerIdx) => {
        const ly = layers[layerIdx];
        const cd = CARDS[cardIdx];
        const isActive = layerIdx === 0;
        return (
          <div
            key={cd.id}
            onClick={() => !isActive && onSelect(cardIdx)}
            style={{
              position: 'absolute',
              top: ly.top,
              left: ly.left,
              width: '85%',
              zIndex: ly.zIndex,
              transform: `rotate(${ly.rotate}) scale(${ly.scale})`,
              opacity: ly.opacity,
              filter: ly.blur ? `blur(${ly.blur}px)` : 'none',
              cursor: isActive ? 'default' : 'pointer',
              transition: 'all .55s cubic-bezier(.34,1.15,.64,1)',
              transformOrigin: 'bottom left',
            }}
          >
            <img
              src={cd.img}
              alt={cd.name.en}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: 18,
                boxShadow: isActive
                  ? '0 28px 72px rgba(0,0,0,0.55), 0 6px 20px rgba(0,0,0,0.35)'
                  : '0 12px 36px rgba(0,0,0,0.4)',
                animation: isActive ? 'csFloat 5s ease-in-out infinite' : 'none',
                transition: 'box-shadow .4s ease',
              }}
            />
            {/* shimmer on active */}
            {isActive && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 18,
                background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.09) 50%, transparent 70%)',
                animation: 'csShimmer 3.8s ease-in-out infinite',
                pointerEvents: 'none',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────────────────────────── */
const CardsSection: React.FC = () => {
  const { language } = useI18n();
  const c    = COPY[language as keyof typeof COPY] ?? COPY.en;
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView();
  const card = CARDS[active];

//   const anim = (delay: string, extra = '') =>
//     `opacity ${inView ? 1 : 0}, transform ${inView ? 'none' : 'translateY(18px)'}; transition: opacity .6s ease ${delay}, transform .6s ease ${delay}; ${extra}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes csFloat   { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-12px) rotate(-4deg)} }
        @keyframes csShimmer { 0%{transform:translateX(-120%)} 100%{transform:translateX(220%)} }
        @keyframes csFadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .cs-root {
          position: relative;
          overflow: hidden;
          font-family: "DM Sans", sans-serif;
          background: #07070E;
        }

        /* ── background image ── */
        .cs-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80&fit=crop');
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        /* heavy dark overlay so image is moody atmosphere, not distracting */
        .cs-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(7,7,14,0.78) 0%, rgba(7,7,14,0.68) 50%, rgba(7,7,14,0.88) 100%);
        }

        /* orange glow orb */
        .cs-orb {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(250,81,15,0.18) 0%, transparent 68%);
          top: 50%; right: 2%;
          transform: translateY(-50%);
          z-index: 1;
          pointer-events: none;
        }

        /* ── inner grid ── */
        .cs-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(56px,8vh,104px) clamp(16px,5vw,60px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px,5vw,80px);
          align-items: center;
        }

        /* ── text column ── */
        .cs-left  { display:flex; flex-direction:column; min-width:0; }
        .cs-right { min-width:0; }

        /* tabs */
        .cs-tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:24px; }

        .cs-tab {
          display:flex; align-items:center; gap:7px;
          padding:8px 16px;
          border-radius:99px;
          border:1.5px solid rgba(255,255,255,0.13);
          background:transparent;
          cursor:pointer;
          font-family:"DM Sans",sans-serif;
          font-size:12px; font-weight:600;
          color:rgba(255,255,255,0.42);
          letter-spacing:.2px;
          transition:all .2s ease;
          white-space:nowrap;
        }
        .cs-tab.active {
          background:${BRAND}; border-color:${BRAND}; color:#fff;
          box-shadow:0 4px 16px rgba(250,81,15,0.38);
        }
        .cs-tab:not(.active):hover {
          border-color:rgba(255,255,255,0.3);
          color:rgba(255,255,255,0.7);
        }

        /* perks */
        .cs-perk {
          display:flex; align-items:center; gap:11px;
          font-size:clamp(12px,1.3vw,14px);
          color:rgba(255,255,255,0.68);
          line-height:1.5;
          transition:color .18s;
        }
        .cs-perk:hover { color:#fff; }

        .cs-perk-icon {
          width:28px; height:28px; border-radius:8px; flex-shrink:0;
          background:rgba(250,81,15,0.14);
          border:1px solid rgba(250,81,15,0.22);
          display:flex; align-items:center; justify-content:center;
          font-size:13px;
        }

        /* feature strip */
        .cs-features {
          display:flex; flex-direction:column; gap:8px;
          padding:16px 18px;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:14px;
          margin-bottom:26px;
        }
        .cs-feature-row {
          display:flex; align-items:center; gap:9px;
          font-size:clamp(11px,1.2vw,13px);
          color:rgba(255,255,255,0.5);
        }

        /* CTA */
        .cs-cta {
          display:inline-flex; align-items:center; gap:8px;
          background:${BRAND}; color:#fff;
          border:none; border-radius:12px;
          padding:13px 26px;
          font-size:14px; font-weight:700; cursor:pointer;
          font-family:"DM Sans",sans-serif;
          box-shadow:0 6px 22px rgba(250,81,15,0.32);
          transition:all .2s ease; letter-spacing:-.1px;
          align-self:flex-start;
          white-space:nowrap;
        }
        .cs-cta:hover { background:${BRAND_DARK}; transform:translateY(-2px); box-shadow:0 10px 28px rgba(250,81,15,0.45); }
        .cs-cta:active { transform:translateY(0); }

        /* ── RESPONSIVE ── */
        @media (max-width: 800px) {
          .cs-inner {
            grid-template-columns: 1fr;
            padding: clamp(40px,6vh,64px) clamp(14px,4vw,24px);
            gap: 40px;
          }
          /* card stack goes on top */
          .cs-right { order: -1; }
          .cs-orb   { display: none; }
        }

        @media (max-width: 480px) {
          .cs-tabs { gap: 6px; }
          .cs-tab  { font-size: 11px; padding: 7px 13px; }
        }
      `}</style>

      <section className="cs-root">
        <div className="cs-bg" />
        <div className="cs-orb" />

        <div className="cs-inner" ref={ref}>

          {/* ══ LEFT: text ══ */}
          <div className="cs-left">

            {/* Eyebrow */}
            <div style={{
              display:'flex', alignItems:'center', gap:9, marginBottom:16,
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(14px)',
              transition: 'opacity .55s ease .1s, transform .55s ease .1s',
            }}>
              <span style={{ width:24, height:2, background:BRAND, borderRadius:2, display:'inline-block', flexShrink:0 }} />
              <span style={{ fontSize:11, fontWeight:700, color:BRAND, textTransform:'uppercase', letterSpacing:'2.4px' }}>
                {c.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              margin:'0 0 16px',
              fontFamily:'"Syne",Georgia,serif', fontWeight:800,
              fontSize:'clamp(26px,3.6vw,48px)',
              lineHeight:1.08, letterSpacing:'-0.03em',
              color:'#fff', wordBreak:'break-word',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(20px)',
              transition: 'opacity .65s ease .2s, transform .65s ease .2s',
            }}>
              {c.heading1}<br />
              <span style={{ background:`linear-gradient(90deg,${BRAND} 0%,#FF8A50 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {c.heading2}
              </span>
            </h2>

            {/* Sub */}
            <p style={{
              margin:'0 0 24px',
              fontSize:'clamp(13px,1.35vw,15px)', lineHeight:1.82,
              color:'rgba(255,255,255,0.5)',
              wordBreak:'break-word', overflowWrap:'break-word',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(16px)',
              transition: 'opacity .65s ease .3s, transform .65s ease .3s',
            }}>{c.sub}</p>

            {/* Card selector tabs */}
            <div className="cs-tabs" style={{ opacity: inView ? 1 : 0, transition:'opacity .5s ease .38s' }}>
              {CARDS.map((cd, i) => (
                <button
                  key={cd.id}
                  className={`cs-tab${active === i ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span style={{ width:7, height:7, borderRadius:'50%', background: active===i ? '#fff' : BRAND, flexShrink:0, display:'inline-block' }} />
                  {cd.name[language as keyof typeof cd.name] ?? cd.name.en}
                </button>
              ))}
            </div>

            {/* Perks */}
            <div style={{ opacity: inView ? 1 : 0, transition:'opacity .5s ease .46s', marginBottom:20 }}>
              <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.28)', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:10 }}>
                {c.perks_label}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {(card.perks[language as keyof typeof card.perks] ?? card.perks.en).map((p, i) => (
                  <div key={i} className="cs-perk" style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateX(-8px)',
                    transition: `opacity .48s ease ${0.5 + i * 0.07}s, transform .48s ease ${0.5 + i * 0.07}s`,
                  }}>
                    <span className="cs-perk-icon">{PERK_ICONS[i]}</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Features strip */}
            <div className="cs-features" style={{ opacity: inView ? 1 : 0, transition:'opacity .5s ease .7s' }}>
              {[
                { icon:'🌍', text: c.global  },
                { icon:'⚡', text: c.instant },
                { icon:'🧊', text: c.freeze  },
              ].map((f, i) => (
                <div key={i} className="cs-feature-row">
                  <span style={{ fontSize:14 }}>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="cs-cta" style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(12px)',
              transition: 'opacity .55s ease .78s, transform .55s ease .78s',
            }}>
              {c.cta}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ══ RIGHT: card stack (same on both desktop & mobile) ══ */}
          <div className="cs-right">
            <CardStack active={active} onSelect={setActive} inView={inView} />
          </div>

        </div>
      </section>
    </>
  );
};

export default CardsSection;