import React, { createContext, useContext, useState } from 'react';

// ─── Translation dictionaries ─────────────────────────────────────────────────
const translations = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_about: 'About',
    nav_services: 'Services',
    nav_contact: 'Contact',

    // Header CTA
    cta_login: 'Log in',
    cta_signup: 'Sign up',

    // Services dropdown
    services_heading: 'Our Services',
    services_cta_label: 'Compare all services',
    services_cta_sub: 'Find the right plan for you',

    // Service items
    service_personal_label: 'Personal Banking',
    service_personal_desc: 'Accounts, savings & everyday banking',
    service_business_label: 'Business Banking',
    service_business_desc: 'Solutions for growing businesses',
    service_investments_label: 'Investments',
    service_investments_desc: 'Grow your wealth intelligently',
    service_card_label: 'Card',
    service_card_desc: 'Debit, credit & prepaid cards',

    // Logo
    logo_tagline: 'Digital Bank',
  },
  es: {
    // Nav
    nav_home: 'Inicio',
    nav_about: 'Nosotros',
    nav_services: 'Servicios',
    nav_contact: 'Contacto',

    // Header CTA
    cta_login: 'Iniciar sesión',
    cta_signup: 'Registrarse',

    // Services dropdown
    services_heading: 'Nuestros Servicios',
    services_cta_label: 'Comparar todos los servicios',
    services_cta_sub: 'Encuentra el plan ideal para ti',

    // Service items
    service_personal_label: 'Banca Personal',
    service_personal_desc: 'Cuentas, ahorros y banca cotidiana',
    service_business_label: 'Banca Empresarial',
    service_business_desc: 'Soluciones para empresas en crecimiento',
    service_investments_label: 'Inversiones',
    service_investments_desc: 'Haz crecer tu patrimonio inteligentemente',
    service_card_label: 'Tarjeta',
    service_card_desc: 'Tarjetas de débito, crédito y prepago',

    // Logo
    logo_tagline: 'Banco Digital',
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['en'];

// ─── Context ──────────────────────────────────────────────────────────────────
interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => translations[language][key];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}