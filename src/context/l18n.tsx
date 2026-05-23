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

    footer_brand_desc: 'Banking built for the modern world. Secure, intelligent, and always in your corner.',
 
  // Footer — headings
  footer_services_heading: 'Services',
  footer_company_heading: 'Company',
  footer_support_heading: 'Support',
//   footer_app_heading: 'Get the App',
 
  // Footer — company links
  footer_about_us:   'About Us',
  footer_careers:    'Careers',
  footer_press:      'Press',
  footer_blog:       'Blog',
  footer_investors:  'Investors',
 
  // Footer — support links
  footer_help_center:   'Help Center',
  footer_contact:       'Contact Us',
  footer_security:      'Security',
  footer_fraud:         'Report Fraud',
  footer_accessibility: 'Accessibility',
 
  // Footer — legal links
  footer_privacy:      'Privacy Policy',
  footer_terms:        'Terms of Service',
  footer_cookies:      'Cookie Policy',
  footer_disclosures:  'Disclosures',
 
  // Footer — app
  footer_app_ios:     'App Store',
  footer_app_android: 'Google Play',
 
  // Footer — trust badges
  footer_trust_fdic:    'FDIC Insured',
  footer_trust_ssl:     '256-bit SSL',
  footer_trust_secured: 'Bank-grade Security',
 
  // Footer — bottom bar
  footer_copyright: '© {year} Crown Ledger Bank. All rights reserved.',
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

    footer_brand_desc: 'Banca construida para el mundo moderno. Segura, inteligente y siempre de tu lado.',
 
  footer_services_heading: 'Servicios',
  footer_company_heading:  'Empresa',
  footer_support_heading:  'Soporte',
  footer_app_heading:      'Descarga la App',
 
  footer_about_us:   'Sobre Nosotros',
  footer_careers:    'Empleos',
  footer_press:      'Prensa',
  footer_blog:       'Blog',
  footer_investors:  'Inversores',
 
  footer_help_center:   'Centro de Ayuda',
  footer_contact:       'Contáctanos',
  footer_security:      'Seguridad',
  footer_fraud:         'Reportar Fraude',
  footer_accessibility: 'Accesibilidad',
 
  footer_privacy:     'Política de Privacidad',
  footer_terms:       'Términos de Servicio',
  footer_cookies:     'Política de Cookies',
  footer_disclosures: 'Divulgaciones',
 
  footer_app_ios:     'App Store',
  footer_app_android: 'Google Play',
 
  footer_trust_fdic:    'Asegurado por FDIC',
  footer_trust_ssl:     'SSL de 256 bits',
  footer_trust_secured: 'Seguridad Bancaria',
 
  footer_copyright: '© {year} Crown Ledger Bank. Todos los derechos reservados.',
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