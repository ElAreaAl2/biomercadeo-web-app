import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUpRight, MonitorPlay, Layers, Layout, BookOpen, Globe, Presentation, MessageSquare, MapPin, Phone, Smartphone, X, CheckCircle2, ChevronRight, Sparkles, ArrowDown, Send, Loader2, PhoneCall, Bot, HeartPulse, BarChart3, Database, ClipboardCheck, Megaphone, Users, Gift, Truck, ShieldCheck, BrainCircuit, Mail as MailIcon, Target, Eye } from 'lucide-react';
import { Link } from 'react-router';

// Array de servicios expandido con detalles profundos
const SERVICES = [
  {
    id: "01",
    title: "Desarrollos Gráficos y Publicitarios",
    description: "Construimos conceptos, diagramamos y creamos piezas gráficas de alto impacto.",
    icon: <Layers className="w-6 h-6" />,
    image: "/images/futuristic-business-office-space.jpg",
    list: ["Ayuda ventas", "Etiquetas y Packaging", "Piezas digitales"],
    detailed: {
      subtitle: "Construimos conceptos, diagramamos y creamos piezas como:",
      type: "grid",
      items: [
        "Ayuda ventas", "Volantes y tarjetones", "Pendones", "Stands (Cajas de luz)", 
        "Etiquetas y Packaging", "Folletos, trípticos, dípticos y brochure",
        "Piezas digitales - Social media", "Presentaciones - Slide kits", 
        "Invitaciones", "Rotafolios - Calendarios", "Toma fotográfica de producto"
      ],
      footer: "¡Y otros desarrollos a su medida!"
    }
  },
  {
    id: "02",
    title: "Desarrollos Interactivos",
    description: "Renovamos la comunicación para el público objetivo con soluciones digitales innovadoras.",
    icon: <MonitorPlay className="w-6 h-6" />,
    image: "/images/cyberpunk-illustration-with-neon-colors-futuristic-technology.jpg",
    list: ["Videos 2D y 3D", "Realidad Aumentada", "Apps"],
    detailed: {
      subtitle: "Renovamos la comunicación para el público objetivo.",
      type: "pills",
      items: [
        "Subtitulación de videos", "Videos 2D y 3D Motion Graphics", "PDF Interactivo",
        "Páginas web", "Podcast y Locuciones", "Realidad Aumentada",
        "Loops y miniclips", "Capacitaciones virtuales", "Juegos",
        "Casos clínicos", "Cápsulas informativas", "Ayuda ventas"
      ]
    }
  },
  {
    id: "03",
    title: "e-Learning",
    description: "Entendemos las necesidades formativas y capacitamos a bajo costo.",
    icon: <Layout className="w-6 h-6" />,
    image: "/images/woman-with-vr-glasses-futuristic-city.jpg",
    list: ["Videos Interactivos", "Gamificación", "Formación"],
    detailed: {
      type: "mixed",
      subtitle: "Nos encargamos de entender las necesidades formativas de la organización y desde ahí:",
      items: [
        "Capacitar a sus fuerzas de ventas y socios estratégicos a bajo costo",
        "Evaluar el conocimiento ofrecido",
        "Desarrollo de personal a corto tiempo"
      ],
      subtitle2: "Usamos herramientas como:",
      items2: [
        "Chat", "Video Interactivo", "Diapositivas", "Infografías", 
        "Experiencias Gamificadas", "Podcast"
      ],
      footer: "Apoyamos el manejo y configuración de los cursos garantizando su correcto funcionamiento."
    }
  },
  {
    id: "04",
    title: "Contenido Editorial",
    description: "Realizamos materiales científicos y especializados en diferentes formatos.",
    icon: <BookOpen className="w-6 h-6" />,
    image: "/images/representation-collective-mind-process-concept-digital-art-style.jpg",
    list: ["Búsqueda bibliográfica", "Infografías", "Traducciones"],
    detailed: {
      subtitle: "Realizamos materiales científicos y especializados en diferentes formatos.",
      type: "masonry-cards",
      items: [
        "Búsquedas bibliográficas", "Infografías", "Traducciones",
        "Editorialización de estudios", "Sagas culturales", "Adaptaciones editoriales"
      ]
    }
  },
  {
    id: "05",
    title: "Marketing Digital",
    description: "Tenemos la estrategia para posicionar y promocionar su marca.",
    icon: <Globe className="w-6 h-6" />,
    image: "/images/3d-character-emerging-from-smartphone.jpg",
    list: ["Estrategia 360", "Social ads", "SEO / SEM"],
    detailed: {
      subtitle: "Tenemos la estrategia para posicionar y promocionar su marca",
      type: "numbered",
      items: [
        "Análisis de mercado y público objetivo",
        "Objetivos y métrica de rendimiento",
        "Selección de canales y tácticas",
        "Creación de contenido y mensajes",
        "Planificación y ejecución de campañas",
        "Seguimiento y análisis de resultado",
        "Optimización continua"
      ]
    }
  },
  {
    id: "06",
    title: "Programas Multi-impacto 360°",
    description: "Estrategias integrales diseñadas para maximizar la visibilidad a bajos costos.",
    icon: <Presentation className="w-6 h-6" />,
    image: "/images/smooth-wave-pattern-reflects-beauty-nature-freshness-generated-by-ai.jpg",
    list: ["Audiencia", "Mensajes Clave", "Ejecución"],
    detailed: {
      subtitle: "Creamos estrategias integrales diseñadas para maximizar la visibilidad y el impacto de su marca o productos a bajos costos",
      type: "steps",
      items: [
        { title: "Análisis de Audiencia", desc: "Identificamos el público objetivo y sus necesidades o preferencias." },
        { title: "Mensajes Clave", desc: "Creamos mensajes atractivos para la audiencia en cada plataforma." },
        { title: "Canales de Comunicación", desc: "Redes sociales, Medios tradicionales, Marketing digital, Eventos, etc." },
        { title: "Ejecución de la Campaña", desc: "Puesta en acción en los canales elegidos y asegurar un enfoque unificado." },
        { title: "Monitoreo y Evaluación", desc: "Del rendimiento de la campaña con métricas y KPIs, analizando la efectividad de cada canal." }
      ]
    }
  },
  {
    id: "07",
    title: "BiCall",
    description: "Contact Center especializado en salud y relacionamiento corporativo efectivo de última generación.",
    icon: <PhoneCall className="w-6 h-6" />,
    image: "/images/arte-digital-equipo-trabajo.jpg",
    list: ["Atención al paciente", "Fidelización", "Servicio integral"],
    detailed: {
      subtitle: "Solución de Call Center para las necesidades de comunicación y relacionamiento.",
      type: "pills",
      items: [
        "Inbound (Recepción de llamadas)", "Outbound (Emisión de llamadas)", 
        "Agendamiento de citas", "Campañas de prevención/adherencia",
        "Seguimiento a pacientes/médicos", "Actualización de bases de datos",
        "Encuestas de satisfacción", "Atención omnicanal (WhatsApp/Web)"
      ]
    }
  },
  {
    id: "08",
    title: "BIOGEO INSIGHTS",
    description: "Sistema inteligente de georreferenciación para optimizar la ubicación de puntos de atención y el análisis territorial de pacientes en el sector salud.",
    icon: <MapPin className="w-6 h-6" />,
    image: "/images/technology-hologram-indoors.jpg",
    list: ["Ubicación estratégica", "Perfiles de clientes", "Análisis territorial"],
    detailed: {
      subtitle: "Descubra dónde ubicar sus sedes, dónde surtir y cómo llegar a su cliente ideal con precisión geográfica e inteligencia de datos.",
      type: "pills",
      items: [
        "Sugerencia de puntos de atención", "Análisis de perfiles cercanos", 
        "Identificación de zonas de surtido", "Potencial del cliente objetivo",
        "Geomarketing en salud", "Optimización de cobertura territorial"
      ]
    }
  }
];

export function HomeV2() {
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'mision' | 'vision'>('mision');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Bloquear el scroll de la pagina cuando el modal está abierto
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedService]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      // Google Apps Script endpoint — reemplaza esta URL con tu propio script desplegado
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwuaOjSHtn7y2uTb0ByYmgmOuY3aoK1h13XQPcasN4rhIsgqqVWMkDhfHGqky-hPuLImg/exec';
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'angelamgiraldo@biomercadeo.com',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      setFormStatus('sent');
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormStatus('idle');
      }, 3000);
    } catch {
      setFormStatus('error');
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-orange-500 selection:text-black font-sans overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 sm:px-6 md:px-8 py-3 md:py-4 flex justify-between items-center bg-[#050505]/95 backdrop-blur-md border-b border-white/5">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-base sm:text-lg lg:text-2xl font-black tracking-tighter uppercase flex items-center gap-1.5 md:gap-2 cursor-pointer z-10 w-max truncate">
          <img src="/images/logo-biomercadeo.png" alt="Biomercadeo" className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 object-contain shrink-0" />
          <span className="truncate">Biomercadeo</span>
        </a>
        <div className="hidden lg:flex gap-6 lg:gap-8 text-sm xl:text-base font-bold uppercase tracking-widest items-center absolute left-1/2 -translate-x-1/2 min-w-max">
          <a href="#about" className="hover:text-orange-500 transition-colors">¿Quiénes somos?</a>
          <a href="#services" className="hover:text-orange-500 transition-colors">¿Qué hacemos?</a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">Contacto</a>
        </div>
        <div className="flex gap-3 sm:gap-4 items-center z-10 scale-90 sm:scale-100 origin-right">
          <a href="https://www.instagram.com/biomercadeosas?igsh=dXFkaTYyZzBxaTFm" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 transition-colors" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://www.facebook.com/share/1CL5jvcE1h/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 transition-colors" title="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.linkedin.com/search/results/content/?keywords=biomercadeo%20sas&origin=SWITCH_SEARCH_VERTICAL" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 transition-colors" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://wa.me/573103255698" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 transition-colors" title="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.638-1.653-1.935-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.122 1.536 5.86L.045 23.953l6.242-1.63A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.986c-1.84 0-3.642-.478-5.234-1.385l-.375-.213-3.896 1.018 1.043-3.796-.233-.372A9.972 9.972 0 0 1 2.014 12C2.014 6.49 6.49 2.014 12 2.014s9.986 4.476 9.986 9.986-4.476 9.986-9.986 9.986z"/></svg>
          </a>
        </div>
      </nav>

      {/* QUIÉNES SOMOS */}
      <section id="about" className="pt-20 pb-16 bg-[#1a1a1a] relative border-t border-white/20 z-20 overflow-hidden">
        {/* TEXTURA GRID MODERNA MUCHO MÁS CLARA */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />
        
        {/* LUCES DE NEON "AURORA" INTENSAS PARA ACLARAR EL FONDO */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-0 w-[800px] h-[800px] rounded-full bg-orange-500/40 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 -right-10 w-[600px] h-[600px] rounded-full bg-amber-400/40 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-32 left-1/4 w-[900px] h-[600px] rounded-full bg-orange-600/30 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        
        {/* Gradiente radial blanco masivo desde el centro para iluminar toda el área */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
          >
            <img src="/images/logo-biomercadeo.png" alt="Biomercadeo" className="h-20 w-20 sm:h-28 sm:w-28 lg:h-36 lg:w-36 object-contain" />
            <span className="text-white font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter uppercase drop-shadow-lg">Biomercadeo</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 max-w-5xl mx-auto relative px-4"
          >
            {/* Elemento decorativo visual */}
            <div className="flex justify-center mb-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-200 leading-[1.4] sm:leading-[1.5] text-center font-light mb-8">
              Expertos en <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">comunicaciones en salud</span> y soluciones corporativas.
            </h3>
            
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed text-center font-light mb-10 max-w-3xl mx-auto">
              Somos una empresa de mercadeo enfocada en transformar la visión de su marca ofreciendo soluciones integrales de:
            </p>

            {/* Grilla creativa de servicios core */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/5 bg-[#111]/80 hover:bg-[#1a1a1a] transition-colors text-neutral-200 text-sm md:text-base shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <Layers className="w-5 h-5 text-orange-500" /> 
                <span className="font-medium">Diseño y Publicidad</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/5 bg-[#111]/80 hover:bg-[#1a1a1a] transition-colors text-neutral-200 text-sm md:text-base shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <MonitorPlay className="w-5 h-5 text-sky-500" /> 
                <span className="font-medium">Tecnología</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/5 bg-[#111]/80 hover:bg-[#1a1a1a] transition-colors text-neutral-200 text-sm md:text-base shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <Presentation className="w-5 h-5 text-emerald-500" /> 
                <span className="font-medium">Estrategias de alto nivel</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/5 bg-[#111]/80 hover:bg-[#1a1a1a] transition-colors text-neutral-200 text-sm md:text-base shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <PhoneCall className="w-5 h-5 text-purple-500" /> 
                <span className="font-medium">Contact Center</span>
              </div>
            </div>

            {/* Parrafo de experiencia con styling tipo cita/Quote de impacto */}
            <div className="text-center relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 h-32 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="relative z-10 border-l-2 border-orange-500/50 pl-6 py-2 md:pl-8 text-left inline-block">
                <p className="text-neutral-300 text-base md:text-xl leading-relaxed font-light">
                  Contamos con un <strong className="text-white font-medium">amplio portafolio de servicios</strong>, respaldado por una <strong className="text-white font-medium">sólida experiencia</strong> en el acompañamiento de importantes compañías a nivel <strong className="text-white font-medium">nacional e internacional</strong>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STATS & ABOUT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
              Diseño y comunicación <br />
              <span className="text-orange-500 underline decoration-wavy decoration-orange-500/50 underline-offset-8">hecha a su medida.</span>
            </h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            <StatsCard number="17+" label="Años de Experiencia" delay={0.1} />
            <StatsCard number="+12" label="Países de experiencia" delay={0.2} />
            <StatsCard number="360°" label="Estrategias Integrales" delay={0.3} />
            <StatsCard number="Top" label="Partners en Salud & Farma" delay={0.4} />
          </motion.div>
        </div>

        {/* MISION & VISION */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-12 relative z-10">
          <div className="flex flex-col items-center">
            {/* Controles interactivos (Tabs) */}
            <div className="bg-[#111] border border-white/10 rounded-full p-1.5 flex shadow-2xl mb-8 relative">
              <button 
                onClick={() => setActiveTab('mision')}
                className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm sm:text-base font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'mision' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <Target className="w-5 h-5" />
                Misión
              </button>
              <button 
                onClick={() => setActiveTab('vision')}
                className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full text-sm sm:text-base font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'vision' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                <Eye className="w-5 h-5" />
                Visión
              </button>
              {/* Pill indicador de fondo con animacion */}
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_20px_rgba(249,115,22,0.3)] ${activeTab === 'mision' ? 'left-1.5' : 'left-[calc(50%+4.5px)]'}`} 
              />
            </div>

            {/* Contenedor del texto (Glassmorphism) */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 min-h-[300px] w-full flex items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Blur decorativo de fondo en la tarjeta */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />
              
              <AnimatePresence mode="wait">
                {activeTab === 'mision' && (
                  <motion.div
                    key="mision"
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4 }}
                    className="text-center w-full"
                  >
                    <p className="text-neutral-300 text-xl md:text-2xl leading-relaxed font-light">
                      Biomercadeo es una empresa Colombiana que apoya principalmente a <strong className="font-bold text-white">empresas del área de la salud</strong> a <strong className="font-bold text-white">desarrollar y aplicar estrategias de comunicación novedosas</strong> con sus colaboradores internos, médicos, farmacias, pacientes y socios estratégicos para <strong className="font-bold text-white">alcanzar sus objetivos comerciales y de ventas</strong>.
                    </p>
                  </motion.div>
                )}
                {activeTab === 'vision' && (
                  <motion.div
                    key="vision"
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4 }}
                    className="text-center w-full"
                  >
                    <p className="text-neutral-300 text-xl md:text-2xl leading-relaxed font-light">
                      Biomercadeo quiere ser reconocido como el <strong className="font-bold text-white">más importante aliado estratégico en Colombia</strong> para la <strong className="font-bold text-white">Industria de la salud en comunicación</strong> con su unidad de diseño y Contact Center. Deseamos <strong className="font-bold text-white">expandir nuestros servicios a otras empresas</strong> en los próximos años.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO DE TRABAJO */}
      <section className="relative py-16 md:py-24 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 border-t border-white/5 bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#050505] to-[#0a0a0a]/90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1758468274726-1197049bbfa9?q=80&w=2000&auto=format&fit=crop" 
            alt="Futuristic Background" 
            className="w-full h-full object-cover opacity-[0.15]"
          />
        </div>

        <div className="relative z-20 text-center max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.2] mb-2 uppercase">
              Queremos ser parte de su <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-1 block">
                Equipo de Trabajo
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE SERVICES ACCORDION/GRID */}
      <section id="services" className="pt-20 pb-20 relative bg-[#1a1a1a] border-t border-white/20 z-20 overflow-hidden">
        {/* TEXTURA GRID MODERNA MUCHO MÁS CLARA */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />
        
        {/* LUCES DE NEON "AURORA" INTENSAS PARA ACLARAR EL FONDO */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-0 w-[800px] h-[800px] rounded-full bg-orange-500/40 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 -right-10 w-[600px] h-[600px] rounded-full bg-amber-400/40 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-32 left-1/4 w-[900px] h-[600px] rounded-full bg-orange-600/30 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        
        {/* Gradiente radial blanco masivo desde el centro para iluminar toda el área */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="mb-12 md:mb-20 text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter"><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">8 Ejes</span> de Innovación</h3>
            <p className="text-neutral-500 mt-4 text-lg">Haz click en cualquier servicio para conocer el detalle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, index) => (
              <ServiceCard key={srv.id} srv={srv} index={index} onClick={() => setSelectedService(srv)} />
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="border-t border-white/5 py-16 bg-[#0a0a0a] z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-black uppercase tracking-tighter">Importantes compañías confían en nosotros</h3>
        </div>
        
        <div className="relative flex overflow-x-hidden group bg-white/5 py-8 border-y border-white/10">
          <div className="animate-[scroll_40s_linear_infinite] whitespace-nowrap flex items-center space-x-16 px-8">
            {["Fresenius Kabi", "AstraZeneca", "Pfizer", "Abbott", "Janssen", "Takeda", "Bayer", "Merck", "Novartis", "Sanofi", "Medtronic"].map((client, i) => (
              <span key={i} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors cursor-default">{client}</span>
            ))}
          </div>
          <div className="animate-[scroll_40s_linear_infinite] whitespace-nowrap flex items-center space-x-16 px-8">
            {["Fresenius Kabi", "AstraZeneca", "Pfizer", "Abbott", "Janssen", "Takeda", "Bayer", "Merck", "Novartis", "Sanofi", "Medtronic"].map((client, i) => (
              <span key={`dup-${i}`} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors cursor-default">{client}</span>
            ))}
          </div>
        </div>
      </section>

      {/* NEW CONTACT SECTION WITH FORM */}
      <section id="contact" className="py-24 bg-[#1a1a1a] relative border-t border-white/20 z-20 overflow-hidden">
        {/* TEXTURA GRID MODERNA MUCHO MÁS CLARA */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />
        
        {/* LUCES DE NEON "AURORA" INTENSAS PARA ACLARAR EL FONDO */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-0 w-[800px] h-[800px] rounded-full bg-orange-500/40 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 -right-10 w-[600px] h-[600px] rounded-full bg-amber-400/40 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }} 
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-32 left-1/4 w-[900px] h-[600px] rounded-full bg-orange-600/30 blur-[180px] pointer-events-none mix-blend-screen" 
        />
        
        {/* Gradiente radial blanco masivo desde el centro para iluminar toda el área */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">Iniciar <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Proyecto</span></h2>
            <p className="text-neutral-400 text-lg">Cuéntenos sobre su iniciativa y le responderemos a la brevedad.</p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl">
            {formStatus === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">¡Mensaje Enviado!</h3>
                <p className="text-neutral-400 text-lg">Nos pondremos en contacto pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Nombre</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Su nombre completo"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Correo</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Asunto</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Asunto del mensaje"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Mensaje</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Cuéntenos al detalle su idea..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-black font-black text-lg py-5 rounded-xl transition-colors flex items-center justify-center gap-2 uppercase tracking-wider mt-4"
                >
                  {formStatus === 'sending' ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Enviando...</>
                  ) : (
                    <><Send className="w-6 h-6" /> Enviar Mensaje</>
                  )}
                </button>
                {formStatus === 'error' && (
                  <p className="text-red-400 text-center font-medium mt-4">Hubo un error al enviar el mensaje. Su email no se pudo conectar con nuestro servidor, por favor intente más tarde.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-12 md:py-16 px-4 sm:px-8 bg-[#0d0d0d] text-white relative overflow-hidden border-t border-white/5">
        {/* Glow sutil en el fondo del footer */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-10 md:gap-0">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
              LET'S WORK.
            </h2>
            <p className="text-xl md:text-2xl font-bold text-neutral-300">
              ¿Tiene un proyecto en mente?
            </p>
            <p className="text-xl md:text-2xl font-bold text-neutral-300">
              Creemos un futuro juntos.
            </p>
          </div>
          
            <div className="flex flex-col items-center md:items-start text-lg md:text-xl lg:text-2xl font-bold gap-4 mt-4 md:mt-0 text-neutral-300">
            <div className="flex items-center gap-3 hover:text-orange-400 transition-colors cursor-default">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-orange-500 shrink-0" />
              <span>Carrera 55A #166-21, Bogotá Colombia</span>
            </div>
            <a href="tel:6018055894" className="flex items-center gap-3 hover:text-orange-400 transition-colors">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-orange-500 shrink-0" />
              <span>601 8055894</span>
            </a>
            <div className="flex items-center gap-3 hover:text-orange-400 transition-colors cursor-default">
              <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-orange-500 shrink-0" />
              <span>310 325 5698 - 311 450 9968</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <MailIcon className="w-6 h-6 md:w-8 md:h-8 text-orange-500 shrink-0" />
              <div className="flex flex-col gap-1 items-center md:items-start">
                <a href="mailto:angelamgiraldo@biomercadeo.com" className="hover:text-orange-400 transition-colors break-all text-center md:text-left text-base md:text-lg">
                  angelamgiraldo@biomercadeo.com
                </a>
                <a href="mailto:hellen.garzon@biomercadeo.com" className="hover:text-orange-400 transition-colors break-all text-center md:text-left text-base md:text-lg">
                  hellen.garzon@biomercadeo.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DE SERVICIOS */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
              onClick={() => setSelectedService(null)} 
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-neutral-900 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Image Side (Hidden on mobile for more space) */}
              <div className="hidden md:block w-2/5 relative">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-neutral-900" />
                <div className="absolute bottom-8 left-8 text-white max-w-xs">
                  <div className="text-orange-500 w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center mb-6">
                    {selectedService.icon}
                  </div>
                  <h2 className="text-5xl font-black leading-none mb-2">{selectedService.id}</h2>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-orange-600 rounded-full transition-colors text-neutral-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-3xl md:text-5xl font-black mb-4 pr-12 text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">
                  {selectedService.title}
                </h3>
                
                <p className="text-xl text-orange-500 font-medium mb-8 leading-relaxed">
                  {selectedService.detailed.subtitle}
                </p>

                {/* Renderizado dinámico según el tipo de servicio */}
                <div className="mb-8">
                    {/* TIPO: PILLS (Tags redondos) */}
                    {selectedService.detailed.type === "pills" && (
                      <div className="flex flex-wrap gap-3">
                        {selectedService.detailed.items.map((item: string, idx: number) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 px-5 py-3 rounded-full hover:bg-orange-500/20 hover:border-orange-500/50 transition-all cursor-default"
                          >
                            <Sparkles className="w-4 h-4 text-orange-400" />
                            <span className="text-neutral-200 font-medium text-sm md:text-base whitespace-nowrap">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TIPO: MASONRY CARDS (Tarjetas asimétricas) */}
                    {selectedService.detailed.type === "masonry-cards" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedService.detailed.items.map((item: string, idx: number) => (
                          <div 
                            key={idx} 
                            className={`flex flex-col bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all ${idx % 3 === 0 ? 'sm:col-span-2' : ''}`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-4xl font-black text-white/5">{String(idx + 1).padStart(2, '0')}</span>
                              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 text-orange-500" />
                              </div>
                            </div>
                            <span className="text-neutral-200 font-bold text-lg">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TIPO: GRID (Checklists) */}
                    {selectedService.detailed.type === "grid" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedService.detailed.items.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors">
                            <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                            <span className="text-neutral-300 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TIPO: NUMBERED (Pasos enumerados como Timeline interactivo) */}
                  {selectedService.detailed.type === "numbered" && (
                    <div className="flex flex-col relative w-full pt-4">
                      {/* Línea vertical continua de fondo */}
                      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent md:left-8"></div>
                      
                      {selectedService.detailed.items.map((item: string, idx: number) => (
                        <div key={idx} className="group relative pl-16 md:pl-20 mb-8 last:mb-0">
                          {/* Nodo del Timeline */}
                          <div className="absolute left-[1.1rem] md:left-[1.6rem] top-1 w-10 h-10 rounded-full bg-neutral-900 border-2 border-orange-500 flex items-center justify-center text-orange-500 font-black text-lg group-hover:bg-orange-500 group-hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)] z-10">
                            {idx + 1}
                          </div>
                          {/* Tarjeta de Contenido */}
                          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-orange-500/30 transition-colors flex items-center">
                            <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">{item}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TIPO: STEPS (Títulos y descripciones como Timeline vertical) */}
                  {selectedService.detailed.type === "steps" && (
                    <div className="flex flex-col relative w-full pt-4">
                      {/* Línea vertical continua de fondo */}
                      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent md:left-8"></div>
                      
                      {selectedService.detailed.items.map((step: any, idx: number) => (
                        <div key={idx} className="group relative pl-16 md:pl-20 mb-10 last:mb-0">
                          {/* Nodo del Timeline */}
                          <div className="absolute left-[1.1rem] md:left-[1.6rem] top-1 w-10 h-10 rounded-full bg-neutral-900 border-2 border-orange-500 flex items-center justify-center text-orange-500 font-black text-lg group-hover:bg-orange-500 group-hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)] z-10">
                            {idx + 1}
                          </div>
                          {/* Tarjeta de Contenido */}
                          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                            <h4 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">{step.title}</h4>
                            <p className="text-neutral-400 text-lg leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TIPO: MIXED (E-learning con dos bloques) */}
                  {selectedService.detailed.type === "mixed" && (
                    <div className="space-y-8">
                      <div className="flex flex-col gap-3">
                        {selectedService.detailed.items.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
                            <span className="text-neutral-300 text-lg">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
                        <h4 className="text-orange-500 font-bold mb-4">{selectedService.detailed.subtitle2}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedService.detailed.items2.map((item: string, idx: number) => (
                            <span key={idx} className="bg-black/50 border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer del servicio (Si existe) */}
                {selectedService.detailed.footer && (
                  <div className="mt-8 p-4 bg-orange-600 text-black font-bold text-center rounded-xl uppercase tracking-widest text-sm">
                    {selectedService.detailed.footer}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -- Componentes Reutilizables --

const ArrowsRight = () => <ArrowUpRight className="w-6 h-6 ml-2 group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />;

function StatsCard({ number, label, delay }: { number: string, label: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.4 }}
      className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center backdrop-blur-sm hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer"
    >
      <span className="text-5xl lg:text-6xl font-black text-orange-500 mb-3">{number}</span>
      <span className="text-sm font-bold uppercase tracking-widest text-neutral-300">{label}</span>
    </motion.div>
  );
}

function ServiceCard({ srv, index, onClick }: { srv: any, index: number, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-orange-500/50 transition-colors"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img 
          src={srv.image} 
          alt={srv.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 opacity-90 transition-opacity group-hover:opacity-80" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Superior: Título de la Tarjeta */}
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold leading-tight drop-shadow-md pr-4 text-white">
            {srv.title}
          </h3>
          <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/20 shrink-0 bg-white/10">
            <ChevronRight className="text-white" />
          </div>
        </div>

        {/* Inferior (Ícono y Hover Part) */}
        <div className="flex flex-col">
          {/* Hover part (Aparece encima del icono) */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <div className="pb-6">
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  {srv.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {srv.list.map((item: string, i: number) => (
                    <li key={i} className="text-xs px-3 py-1.5 rounded-full border bg-black/50 text-neutral-300 border-white/10">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-orange-500 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(234,88,12,0.2)] shrink-0 self-start">
            {srv.icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
