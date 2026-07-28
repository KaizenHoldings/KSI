import type {
  AudienceTrackContent,
  ContentItem,
  FaqEntry,
  ProcessStep,
} from "@/types/content";

/**
 * All landing-page copy. Sourced from ksi_reference.html, which PRODUCT.md
 * confirms as real content, and normalised to the formal "usted" register
 * required by BRAND.md. No figure, claim or testimonial is added here.
 */

export const heroContent = {
  eyebrow: "Sociedad de Inversión · Venezuela",
  titleLead: "Soluciones de inversión",
  titleAccent: "estratégicas",
  titleTail: "para el crecimiento de su capital",
  lead: "Estructuramos, gestionamos y acompañamos inversiones con enfoque financiero, legal y operativo.",
  primaryAction: "Agende una reunión",
  secondaryAction: "Conozca nuestros servicios",
  credentialsLabel: "Marco regulatorio",
  credentials: [
    "Supervisión SUNAVAL",
    "Caja Venezolana de Valores",
    "Procesos KYC / AML",
    "Auditorías periódicas",
  ],
} as const;

export const aboutContent = {
  eyebrow: "Quiénes somos",
  title: "KFG Sociedad de Inversión",
  paragraphs: [
    "Somos una entidad financiera cuyo propósito es captar capital de inversionistas para canalizarlo hacia proyectos y empresas de diversos sectores con potencial de crecimiento, bajo una política de inversión definida.",
    "Captamos fondos de inversionistas a quienes ofrecemos rendimientos competitivos derivados de la participación en proyectos productivos y del uso eficiente de sus aportes.",
  ],
  imageAlt:
    "Profesionales caminando frente a un edificio corporativo contemporáneo en un distrito financiero.",
  imageCaption: "Actividad financiera institucional",
  pillars: [
    {
      id: "mision",
      title: "Misión",
      description:
        "Brindar soluciones de inversión seguras, rentables y estructuradas, alineadas con los objetivos de nuestros clientes.",
      icon: "target",
    },
    {
      id: "vision",
      title: "Visión",
      description:
        "Ser una firma de referencia en el mercado de capitales venezolano y regional, reconocida por su rigor y transparencia.",
      icon: "eye",
    },
    {
      id: "valores",
      title: "Valores",
      description:
        "Transparencia, confianza, disciplina financiera y cumplimiento normativo como pilares de cada operación.",
      icon: "diamond",
    },
  ] as const satisfies readonly ContentItem[],
} as const;

export const servicesContent = {
  eyebrow: "Qué hacemos",
  title: "Soluciones financieras estructuradas",
  lead: "Diseñadas con rigor técnico y un conocimiento profundo del mercado venezolano.",
  items: [
    {
      id: "estructuracion",
      title: "Estructuración de inversiones",
      description:
        "Diseño de vehículos financieros, esquemas de inversión y modelos de negocio adaptados a cada cliente.",
      icon: "layers",
    },
    {
      id: "portafolio",
      title: "Gestión de portafolio",
      description:
        "Administración estratégica de activos con enfoque en rentabilidad, preservación del capital y control de riesgo.",
      icon: "briefcase",
    },
    {
      id: "asesoria",
      title: "Asesoría financiera",
      description:
        "Evaluación de oportunidades, análisis de mercado y acompañamiento en la toma de decisiones de inversión.",
      icon: "search",
    },
    {
      id: "intermediacion",
      title: "Intermediación",
      description:
        "Acompañamiento en operaciones de compra y venta de activos financieros entre inversionistas y proyectos.",
      icon: "exchange",
    },
    {
      id: "corporativa",
      title: "Estructuración corporativa",
      description:
        "Diseño de estructuras legales y financieras para inversiones nacionales e internacionales eficientes.",
      icon: "structure",
    },
    {
      id: "titularizacion",
      title: "Titularización",
      description:
        "Vehículo SPV para transformar activos o flujos futuros en títulos valores negociables en el mercado.",
      icon: "coins",
    },
  ] as const satisfies readonly ContentItem[],
} as const;

export const sectorsContent = {
  eyebrow: "Dónde invertimos",
  title: "Sectores con mayor potencial",
  lead: "Participación en un portafolio diversificado de empresas y proyectos productivos.",
  items: [
    { id: "energia", title: "Energía", icon: "energy" },
    { id: "alimentos", title: "Alimentos y Agro", icon: "agro" },
    { id: "tecnologia", title: "Tecnología", icon: "technology" },
    { id: "logistica", title: "Logística", icon: "logistics" },
    { id: "inmobiliario", title: "Inmobiliario", icon: "realEstate" },
  ] as const satisfies readonly ContentItem[],
} as const;

export const processContent = {
  eyebrow: "Cómo funciona",
  title: "Del capital al retorno",
  lead: "Un proceso estructurado, transparente y supervisado en cada etapa.",
  imageAlt:
    "Pantalla con indicadores y gráficos de seguimiento utilizados durante el análisis de una operación.",
  imageCaption:
    "Cada oportunidad atraviesa un análisis financiero, legal y operativo antes de entrar en el portafolio.",
  steps: [
    {
      id: "identificacion",
      title: "Identificación",
      description: "Detección de oportunidades de inversión.",
    },
    {
      id: "evaluacion",
      title: "Evaluación",
      description: "Análisis financiero, legal y operativo.",
    },
    {
      id: "estructuracion",
      title: "Estructuración",
      description: "Diseño del vehículo legal y financiero.",
    },
    {
      id: "levantamiento",
      title: "Levantamiento",
      description: "Captación de capital de inversionistas.",
    },
    {
      id: "ejecucion",
      title: "Ejecución",
      description: "Despliegue del capital y gestión activa.",
    },
    {
      id: "retorno",
      title: "Retorno",
      description: "Seguimiento y distribución de rendimientos.",
    },
  ] as const satisfies readonly ProcessStep[],
} as const;

export const advantagesContent = {
  eyebrow: "Por qué elegirnos",
  title: "Dos formas de trabajar con KFG",
  lead: "Elija el perfil que corresponde a su objetivo y conozca lo que ponemos a su disposición.",
  tracks: [
    {
      id: "inversionistas",
      label: "Inversionistas",
      summary:
        "Para quienes buscan hacer crecer su capital dentro de una estructura regulada.",
      items: [
        {
          id: "acceso",
          title: "Acceso diversificado",
          description:
            "Participación en un portafolio de empresas y proyectos en sectores estratégicos.",
          icon: "network",
        },
        {
          id: "rendimientos",
          title: "Rendimientos competitivos",
          description:
            "Potencial de retorno atractivo derivado de proyectos productivos reales.",
          icon: "trend",
        },
        {
          id: "montos",
          title: "Montos de entrada flexibles",
          description:
            "Participación posible desde capitales reducidos, ajustados a distintos perfiles de inversionista.",
          icon: "coins",
        },
        {
          id: "proteccion",
          title: "Protección regulatoria",
          description:
            "Supervisión por SUNAVAL y la Caja Venezolana de Valores, garantizando transparencia.",
          icon: "shield",
        },
        {
          id: "decisiones",
          title: "Decisiones expertas",
          description:
            "Análisis financiero, gobierno corporativo y cumplimiento regulatorio especializado.",
          icon: "search",
        },
        {
          id: "mercado",
          title: "Entrada al mercado",
          description:
            "Acceso al mercado de valores venezolano con respaldo institucional.",
          icon: "chart",
        },
      ],
    },
    {
      id: "empresas",
      label: "Empresas",
      summary:
        "Para compañías que necesitan capital fuera de las limitaciones del crédito bancario.",
      items: [
        {
          id: "alternativa",
          title: "Alternativa al crédito bancario",
          description:
            "Fuente de capital que no depende de las limitaciones del sistema bancario.",
          icon: "exchange",
        },
        {
          id: "expansion",
          title: "Recursos para expansión",
          description:
            "Financiamiento para modernización, culminación de obras o adquisiciones estratégicas.",
          icon: "trend",
        },
        {
          id: "apalancamiento",
          title: "Reducción de apalancamiento",
          description:
            "Fortalecimiento patrimonial y reducción de la dependencia bancaria.",
          icon: "scale",
        },
        {
          id: "soporte",
          title: "Soporte corporativo",
          description:
            "Gobierno corporativo, planificación financiera y preparación para el mercado de valores.",
          icon: "structure",
        },
        {
          id: "visibilidad",
          title: "Visibilidad y reputación",
          description:
            "Respaldo institucional que abre puertas en el ecosistema empresarial venezolano.",
          icon: "eye",
        },
        {
          id: "camino",
          title: "Camino al mercado",
          description:
            "Posibilidad de evolucionar hacia emisiones propias con apoyo de la sociedad de inversión.",
          icon: "layers",
        },
      ],
    },
  ] as const satisfies readonly AudienceTrackContent[],
} as const;

export const complianceContent = {
  eyebrow: "Cumplimiento y regulación",
  title: "Operamos bajo los más altos estándares",
  lead: "Nuestra empresa opera conforme a las normativas vigentes del mercado de valores venezolano, con plena transparencia y debida diligencia.",
  items: [
    {
      id: "sunaval",
      title: "Cumplimiento SUNAVAL",
      description:
        "Supervisión de la Superintendencia Nacional de Valores en todas nuestras operaciones.",
      icon: "shield",
    },
    {
      id: "kyc",
      title: "KYC / AML",
      description:
        "Procesos robustos de conocimiento del cliente y prevención de legitimación de capitales.",
      icon: "search",
    },
    {
      id: "auditorias",
      title: "Auditorías",
      description:
        "Revisiones periódicas internas y externas que garantizan la integridad de las operaciones.",
      icon: "document",
    },
    {
      id: "gobierno",
      title: "Gobierno corporativo",
      description:
        "Estructura de dirección y control alineada con las mejores prácticas institucionales.",
      icon: "structure",
    },
  ] as const satisfies readonly ContentItem[],
} as const;

export const ctaContent = {
  title: "¿Listo para hacer crecer su capital?",
  lead: "Agendemos una reunión estratégica y exploremos las oportunidades que mejor se adapten a sus objetivos financieros.",
  primaryAction: "Agende una reunión",
  secondaryAction: "Conocer servicios",
} as const;

export const faqContent = {
  eyebrow: "Preguntas frecuentes",
  title: "Todo lo que necesita saber",
  lead: "Las consultas que recibimos con mayor frecuencia sobre nuestra estructura y forma de operar.",
  entries: [
    {
      id: "que-es",
      question: "¿Qué es una Sociedad de Inversión y cómo funciona en Venezuela?",
      answer:
        "Una Sociedad de Inversión es una entidad financiera regulada que capta capital de múltiples inversionistas para canalizarlo hacia proyectos y empresas con potencial de crecimiento. En Venezuela, estas entidades están reguladas por la Ley de Entidades de Inversión Colectiva (G.O. 36.027, 1996) y supervisadas por la SUNAVAL, lo que garantiza un marco legal sólido y transparente para todos los participantes.",
    },
    {
      id: "monto-minimo",
      question: "¿Cuál es el monto mínimo para invertir con KFG?",
      answer:
        "KFG está diseñada para ser accesible. Ofrecemos distintas estructuras de participación adaptadas a diferentes perfiles y capacidades de inversión. Para conocer las condiciones específicas vigentes y las oportunidades disponibles, le invitamos a agendar una reunión con nuestro equipo.",
    },
    {
      id: "proyectos",
      question: "¿Qué tipo de proyectos financia KFG?",
      answer:
        "Nos enfocamos en empresas y proyectos con potencial de crecimiento en sectores estratégicos de la economía venezolana: energía, alimentos y agro, tecnología, logística e inmobiliario. Cada oportunidad pasa por un proceso riguroso de evaluación financiera, legal y operativa antes de ser considerada para el portafolio.",
    },
    {
      id: "proteccion",
      question: "¿Cómo se protegen los fondos de los inversionistas?",
      answer:
        "Operamos bajo supervisión directa de la SUNAVAL y cumplimos con todos los estándares de la Caja Venezolana de Valores. Implementamos procesos estrictos de KYC/AML (conocimiento del cliente y prevención de lavado de activos), auditorías externas periódicas y estructuras de gobierno corporativo que garantizan la transparencia y la rendición de cuentas en todo momento.",
    },
    {
      id: "empresas",
      question: "¿Cómo puedo vincularme como empresa receptora de capital?",
      answer:
        "El proceso comienza agendando una reunión inicial con nuestro equipo para presentar su empresa y sus necesidades de financiamiento. Posteriormente, deberá reunir la documentación requerida, que pasará por nuestro proceso de evaluación financiera y legal. Si su perfil es compatible con nuestra política de inversión, estructuraremos junto a usted la mejor solución.",
    },
  ] as const satisfies readonly FaqEntry[],
} as const;

export const contactContent = {
  eyebrow: "Contáctenos",
  title: "Estamos listos para atenderle",
  lead: "Conversemos sobre sus objetivos de inversión o las necesidades de financiamiento de su empresa.",
  whatsappTitle: "WhatsApp",
  whatsappHint: "Atención directa con nuestro equipo.",
  officeTitle: "Oficina",
  officeHint: "Visitas coordinadas previamente.",
  mapTitle: "Ubicación de KFG Sociedad de Inversión en Caracas",
} as const;

export const footerContent = {
  description:
    "Sociedad de Inversión comprometida con el desarrollo del ecosistema empresarial venezolano, bajo los más altos estándares de transparencia y cumplimiento normativo.",
  navTitle: "Navegación",
  regulationTitle: "Marco regulatorio",
} as const;
