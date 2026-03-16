import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUpRight, MonitorPlay, Layers, Layout, BookOpen, Globe, Presentation, MessageSquare, MapPin, Phone, Smartphone, X, CheckCircle2, ChevronRight, ChevronUp, ChevronDown, Sparkles, ArrowDown, Send, Loader2, PhoneCall, Bot, HeartPulse, BarChart3, Database, ClipboardCheck, Megaphone, Users, Gift, Truck, ShieldCheck, BrainCircuit, Mail as MailIcon, Target, Eye, Search, BookMarked, Image, Languages, FileEdit, Theater, PenTool, ScanSearch, MessageCircle, Radio, Rocket, Activity, Subtitles, Video, FileText, Globe2, Mic, View, Film, GraduationCap, Gamepad2, Stethoscope, Pill, Briefcase, Navigation, UserSearch, MapPinned, TrendingUp, Radar, LocateFixed } from 'lucide-react';
import { Link } from 'react-router';

// Mapa de iconos para renderizado dinámico en cards
const iconMap: Record<string, React.ReactNode> = {
  BookMarked: <BookMarked className="w-6 h-6" />,
  Image: <Image className="w-6 h-6" />,
  Languages: <Languages className="w-6 h-6" />,
  FileEdit: <FileEdit className="w-6 h-6" />,
  Theater: <Theater className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  ScanSearch: <ScanSearch className="w-5 h-5" />,
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Subtitles: <Subtitles className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Globe2: <Globe2 className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  View: <View className="w-5 h-5" />,
  Film: <Film className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Stethoscope: <Stethoscope className="w-5 h-5" />,
  Pill: <Pill className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Navigation: <Navigation className="w-5 h-5" />,
  UserSearch: <UserSearch className="w-5 h-5" />,
  MapPinned: <MapPinned className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Radar: <Radar className="w-5 h-5" />,
  LocateFixed: <LocateFixed className="w-5 h-5" />,
  MonitorPlay: <MonitorPlay className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
};

// Array de servicios expandido con detalles profundos
// CAMBIO 8: Eliminado "Marketing Digital" (era id "05"). Quedan 7 ejes.
// CAMBIO 7: Títulos en Title Case, "BiCall" → "Contact Center", "BIOGEO INSIGHTS" → "BioGeo Insights"
// CAMBIO 6: Degradados de títulos consistentes
const SERVICES = [
  {
    id: "01",
    title: "Desarrollos Gráficos",
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
      type: "bento-grid",
      items: [
        { label: "Videos 2D y 3D Motion Graphics", icon: "Video" },
        { label: "Realidad Aumentada", icon: "View" },
        { label: "Páginas web", icon: "Globe2" },
        { label: "Subtitulación de videos", icon: "Subtitles" },
        { label: "PDF Interactivo", icon: "FileText" },
        { label: "Podcast y Locuciones", icon: "Mic" },
        { label: "Loops y miniclips", icon: "Film" },
        { label: "Capacitaciones virtuales", icon: "GraduationCap" },
        { label: "Juegos", icon: "Gamepad2" },
        { label: "Casos clínicos", icon: "Stethoscope" },
        { label: "Cápsulas informativas", icon: "Pill" },
        { label: "Ayuda ventas", icon: "Briefcase" }
      ]
    }
  },
  {
    id: "03",
    title: "E-Learning",
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
        { label: "Búsquedas bibliográficas", icon: "BookMarked" },
        { label: "Infografías", icon: "Image" },
        { label: "Traducciones", icon: "Languages" },
        { label: "Editorialización de estudios", icon: "FileEdit" },
        { label: "Sagas culturales", icon: "Theater" },
        { label: "Adaptaciones editoriales", icon: "PenTool" }
      ]
    }
  },
  {
    id: "05",
    title: "Programas Multi-impacto 360°",
    description: "Estrategias integrales diseñadas para maximizar la visibilidad a bajos costos.",
    icon: <Presentation className="w-6 h-6" />,
    image: "/images/smooth-wave-pattern-reflects-beauty-nature-freshness-generated-by-ai.jpg",
    list: ["Audiencia", "Mensajes Clave", "Ejecución"],
    detailed: {
      subtitle: "Creamos estrategias integrales diseñadas para maximizar la visibilidad y el impacto de su marca o productos a bajos costos",
      type: "steps",
      items: [
        { title: "Análisis de Audiencia", desc: "Identificamos el público objetivo y sus necesidades o preferencias.", icon: "ScanSearch" },
        { title: "Mensajes Clave", desc: "Creamos mensajes atractivos para la audiencia en cada plataforma.", icon: "MessageCircle" },
        { title: "Canales de Comunicación", desc: "Redes sociales, Medios tradicionales, Marketing digital, Eventos, etc.", icon: "Radio" },
        { title: "Ejecución de la Campaña", desc: "Puesta en acción en los canales elegidos y asegurar un enfoque unificado.", icon: "Rocket" },
        { title: "Monitoreo y Evaluación", desc: "Del rendimiento de la campaña con métricas y KPIs, analizando la efectividad de cada canal.", icon: "Activity" }
      ]
    }
  },
  {
    id: "06",
    // CAMBIO 7: "BiCall" → "Contact Center"
    title: "Contact Center",
    description: "Contact Center especializado en salud y relacionamiento corporativo efectivo de última generación.",
    icon: <PhoneCall className="w-6 h-6" />,
    image: "/images/call-center-bio.png",
    list: ["Atención al paciente", "Fidelización", "Servicio integral"],
    detailed: {
      subtitle: "Solución de Call Center para las necesidades de comunicación y relacionamiento.",
      type: "pills",
      items: [
        "Inbound (Recepción de llamadas)",
        "Outbound (Emisión de llamadas)",
        "Agendamiento de citas",
        "Campañas de prevención/adherencia",
        "Seguimiento a pacientes/médicos",
        "Actualización de bases de datos",
        "Encuestas de satisfacción",
        "Atención omnicanal (WhatsApp/Web)"
      ]
    }
  },
  {
    id: "07",
    // CAMBIO 7: "BIOGEO INSIGHTS" → "BioGeo Insights"
    title: "BioGeo Insights",
    description: "Sistema inteligente de georreferenciación para optimizar la ubicación de puntos de atención y el análisis territorial de pacientes en el sector salud.",
    icon: <MapPin className="w-6 h-6" />,
    image: "/images/technology-hologram-indoors.jpg",
    list: ["Ubicación estratégica", "Perfiles de clientes", "Análisis territorial"],
    detailed: {
      subtitle: "Descubra dónde ubicar sus sedes, dónde surtir y cómo llegar a su cliente ideal con precisión geográfica e inteligencia de datos.",
      type: "geo-features",
      items: [
        { label: "Sugerencia de puntos de atención", desc: "Identificamos las ubicaciones óptimas para maximizar su alcance.", icon: "MapPinned" },
        { label: "Análisis de perfiles cercanos", desc: "Perfilamos la población y clientes potenciales en cada zona.", icon: "UserSearch" },
        { label: "Identificación de zonas de surtido", desc: "Detectamos las áreas con mayor demanda de sus productos.", icon: "Navigation" },
        { label: "Potencial del cliente objetivo", desc: "Evaluamos el potencial de conversión por segmento y territorio.", icon: "TrendingUp" },
        { label: "Geomarketing en salud", desc: "Estrategias de marketing basadas en inteligencia geográfica.", icon: "Radar" },
        { label: "Optimización de cobertura territorial", desc: "Maximice su presencia con la menor inversión posible.", icon: "LocateFixed" }
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Element[]>([]);
  const [currentResultIdx, setCurrentResultIdx] = useState(-1);
  const [searchNoResults, setSearchNoResults] = useState(false);
  // CAMBIO 2: Estado para colapsar Visión y Misión por defecto
  const [showVisionMision, setShowVisionMision] = useState(false);

  const clearHighlights = () => {
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight', 'bg-orange-500/40', 'transition-colors', 'duration-500', 'rounded');
    });
    document.querySelectorAll('.search-current').forEach(el => {
      el.classList.remove('search-current', 'bg-orange-500/70', 'ring-2', 'ring-orange-400');
    });
  };

  const goToResult = (results: Element[], idx: number) => {
    // Quitar highlight activo del anterior
    document.querySelectorAll('.search-current').forEach(el => {
      el.classList.remove('search-current', 'bg-orange-500/70', 'ring-2', 'ring-orange-400');
      el.classList.add('bg-orange-500/40');
    });
    // Activar el nuevo
    const el = results[idx];
    if (el) {
      el.classList.add('search-current', 'bg-orange-500/70', 'ring-2', 'ring-orange-400');
      el.classList.remove('bg-orange-500/40');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setCurrentResultIdx(idx);
    }
  };

  const handleSearchNext = () => {
    if (searchResults.length === 0) return;
    const nextIdx = (currentResultIdx + 1) % searchResults.length;
    goToResult(searchResults, nextIdx);
  };

  const handleSearchPrev = () => {
    if (searchResults.length === 0) return;
    const prevIdx = (currentResultIdx - 1 + searchResults.length) % searchResults.length;
    goToResult(searchResults, prevIdx);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const term = searchQuery.toLowerCase();
    clearHighlights();

    const elements = Array.from(document.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, a, strong, b, button'));
    const matches: Element[] = [];

    for (const el of elements) {
      const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE && (node.nodeValue?.trim()?.length || 0) > 0);
      const elementContainsText = textNodes.some(node => node.nodeValue?.toLowerCase().includes(term));

      if (elementContainsText) {
        el.classList.add('search-highlight', 'bg-orange-500/40', 'transition-colors', 'duration-500', 'rounded');
        matches.push(el);
      }
    }

    setSearchResults(matches);
    setSearchNoResults(matches.length === 0);

    if (matches.length > 0) {
      setCurrentResultIdx(0);
      goToResult(matches, 0);
    } else {
      setCurrentResultIdx(-1);
      // Quitar el indicador de "sin resultados" después de 2s
      setTimeout(() => setSearchNoResults(false), 2000);
    }
  };

  const handleCloseSearch = () => {
    clearHighlights();
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setCurrentResultIdx(-1);
    setSearchNoResults(false);
  };

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
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-orange-500 selection:text-black font-sans overflow-x-hidden">
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

        <div className="flex gap-2 sm:gap-3 lg:gap-4 items-center z-10 scale-90 sm:scale-100 origin-right transition-all">

          {/* Búsqueda: botón cuando cerrada, inline en md+ cuando abierta */}
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-orange-500 transition-colors p-1.5 hover:bg-white/10 rounded-lg"
              title="Buscar"
            >
              <Search size={20} />
            </button>
          ) : (
            /* Barra inline — solo visible en tablet/desktop */
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar en la página..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className={`bg-white/10 backdrop-blur-sm text-white text-sm pl-3 pr-16 py-2 rounded-l-xl outline-none border md:w-[200px] lg:w-[250px] placeholder:text-gray-400 transition-all ${searchNoResults ? 'border-red-500/70 bg-red-500/10' : 'border-white/20 focus:border-orange-500'}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') handleCloseSearch();
                      if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); handleSearchPrev(); }
                    }}
                  />
                  {searchResults.length > 0 && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-orange-400 font-mono font-bold tabular-nums">
                      {currentResultIdx + 1}/{searchResults.length}
                    </span>
                  )}
                  {searchNoResults && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-400 font-medium">
                      Sin resultados
                    </span>
                  )}
                </div>
                <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-2 border-y border-orange-600 transition-colors flex items-center justify-center shrink-0" title="Buscar">
                  <Search size={15} />
                </button>
              </form>
              <div className="flex items-center border-y border-white/20 shrink-0">
                <button type="button" onClick={handleSearchPrev} disabled={searchResults.length === 0} className="text-white hover:text-orange-400 px-1.5 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Anterior">
                  <ChevronUp size={15} />
                </button>
                <button type="button" onClick={handleSearchNext} disabled={searchResults.length === 0} className="text-white hover:text-orange-400 px-1.5 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Siguiente">
                  <ChevronDown size={15} />
                </button>
              </div>
              <button type="button" onClick={handleCloseSearch} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-2 rounded-r-xl border border-l-0 border-white/20 transition-colors flex items-center justify-center shrink-0" title="Cerrar (Esc)">
                <X size={15} />
              </button>
            </div>
          )}

          {/* Redes sociales (Ocultar dinámicamente en tablet/móvil si la búsqueda está activa) */}
          <div className={`items-center gap-2 sm:gap-3 ${isSearchOpen ? 'hidden lg:flex' : 'flex'}`}>
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
        </div>
      </nav>

      {/* Overlay de búsqueda — solo móvil (< md), fuera del nav */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center bg-[#050505] border-b border-white/10 px-3 sm:px-4 py-2.5">
          <form onSubmit={handleSearch} className="flex items-center flex-1 min-w-0">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Buscar en la página..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className={`bg-white/10 text-white text-sm pl-3 pr-16 py-2 rounded-l-xl outline-none border w-full placeholder:text-gray-400 transition-all ${searchNoResults ? 'border-red-500/70 bg-red-500/10' : 'border-white/20 focus:border-orange-500'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleCloseSearch();
                  if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); handleSearchPrev(); }
                }}
              />
              {searchResults.length > 0 && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-orange-400 font-mono font-bold tabular-nums">
                  {currentResultIdx + 1}/{searchResults.length}
                </span>
              )}
              {searchNoResults && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-400 font-medium">
                  Sin resultados
                </span>
              )}
            </div>
            <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-2 border-y border-orange-600 transition-colors flex items-center justify-center shrink-0" title="Buscar">
              <Search size={15} />
            </button>
          </form>
          <div className="flex items-center border-y border-white/20 shrink-0">
            <button type="button" onClick={handleSearchPrev} disabled={searchResults.length === 0} className="text-white hover:text-orange-400 px-1.5 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Anterior">
              <ChevronUp size={15} />
            </button>
            <button type="button" onClick={handleSearchNext} disabled={searchResults.length === 0} className="text-white hover:text-orange-400 px-1.5 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Siguiente">
              <ChevronDown size={15} />
            </button>
          </div>
          <button type="button" onClick={handleCloseSearch} className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-2 rounded-r-xl border border-l-0 border-white/20 transition-colors flex items-center justify-center shrink-0" title="Cerrar (Esc)">
            <X size={15} />
          </button>
        </div>
      )}

      {/* QUIÉNES SOMOS */}
      {/* CAMBIO 2: Sección compacta - Visión y Misión colapsadas por defecto */}
      <section id="about" className="pt-20 pb-12 bg-[#1a1a1a] relative border-t border-white/20 z-20 overflow-x-hidden">
        {/* TEXTURA GRID MODERNA MUCHO MÁS CLARA */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />

        {/* LUCES DE NEON "AURORA" */}
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

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">

          {/* Logo centrado, ancho completo — animación solo al montar, no depende de viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-row items-center justify-center gap-4 sm:gap-6 mb-2"
          >
            <img src="/images/logo-biomercadeo.png" alt="Biomercadeo" className="h-16 w-16 sm:h-20 sm:w-20 lg:h-28 lg:w-28 object-contain" />
            <span className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter uppercase drop-shadow-lg">Biomercadeo</span>
          </motion.div>

          {/* Dos columnas en desktop, apilado en tablet/móvil */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-10 lg:mb-0">

            {/* COLUMNA IZQUIERDA: Expertos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative px-4"
            >
              <div className="flex justify-center mb-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-200 leading-[1.4] sm:leading-[1.5] text-center font-light font-sans mb-6">
                Expertos en <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">comunicaciones en salud</span> y soluciones corporativas.
              </h3>

              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed text-center lg:text-left font-light font-sans mb-8">
                Somos una empresa de mercadeo enfocada en transformar la visión de su marca ofreciendo soluciones integrales de:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
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

              <div className="relative">
                <div className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 top-1/2 -translate-y-1/2 w-64 h-32 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="relative z-10 border-l-2 border-orange-500/50 pl-6 py-2 md:pl-8 text-left inline-block">
                  <p className="text-neutral-300 text-base md:text-xl leading-relaxed font-light font-sans">
                    Contamos con un <strong className="text-white font-medium">amplio portafolio de servicios</strong>, respaldado por una <strong className="text-white font-medium">sólida experiencia</strong> en el acompañamiento de importantes compañías a nivel <strong className="text-white font-medium">nacional e internacional</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* COLUMNA DERECHA: Diseño y comunicación + Stats */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <div className="flex justify-center mb-6">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight font-sans">
                  Diseño y comunicación <br />
                  <span className="text-orange-500 underline decoration-wavy decoration-orange-500/50 underline-offset-8">hecha a su medida.</span>
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-2 gap-6"
              >
                <StatsCard number="17+" label="Años de Experiencia" delay={0.1} />
                <StatsCard number="+12" label="Países de experiencia" delay={0.2} />
                <StatsCard number="360°" label="Estrategias Integrales" delay={0.3} />
                <StatsCard number="Top" label="Partners en Salud & Farma" delay={0.4} />
              </motion.div>
            </div>

          </div>
        </div>

        {/* CAMBIO 2: VISIÓN Y MISIÓN COLAPSABLES */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Botón toggle para mostrar/ocultar Visión y Misión */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowVisionMision(prev => !prev)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-bold text-sm uppercase tracking-widest transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              {showVisionMision ? 'Ocultar Visión y Misión' : 'Ver Visión y Misión'}
              <motion.span
                animate={{ rotate: showVisionMision ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                ▼
              </motion.span>
            </button>
          </div>

          <AnimatePresence>
            {showVisionMision && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-col items-center pb-4">
                  {/* Controles interactivos (Tabs) */}
                  <div className="bg-[#111] border border-white/10 rounded-full p-1.5 flex shadow-2xl mb-6 relative">
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
                  <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 w-full flex items-center justify-center relative overflow-hidden shadow-2xl">
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
                          {/* CAMBIO 3: text-white en lugar de text-neutral-300 para mejor legibilidad */}
                          <p className="text-white text-xl md:text-2xl leading-relaxed font-light font-sans">
                            Biomercadeo es una empresa Colombiana que apoya principalmente a <strong className="font-bold text-orange-400">empresas del área de la salud</strong> a <strong className="font-bold text-orange-400">desarrollar y aplicar estrategias de comunicación novedosas</strong> con sus colaboradores internos, médicos, farmacias, pacientes y socios estratégicos para <strong className="font-bold text-orange-400">alcanzar sus objetivos comerciales y de ventas</strong>.
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
                          <p className="text-white text-xl md:text-2xl leading-relaxed font-light font-sans">
                            Biomercadeo quiere ser reconocido como el <strong className="font-bold text-orange-400">más importante aliado estratégico en Colombia</strong> para la <strong className="font-bold text-orange-400">Industria de la salud en comunicación</strong> con su unidad de diseño y Contact Center. Deseamos <strong className="font-bold text-orange-400">expandir nuestros servicios a otras empresas</strong> en los próximos años.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* EQUIPO DE TRABAJO */}
      <section className="relative py-16 md:py-24 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 border-t border-white/5 bg-[#050505]">
        {/* CAMBIO 1: Reducida la opacidad del overlay sobre la imagen de fondo para verla más */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-transparent to-[#0a0a0a]/20 z-10" />
          <img
            src="https://images.unsplash.com/photo-1758468274726-1197049bbfa9?q=80&w=2000&auto=format&fit=crop"
            alt="Futuristic Background"
            className="w-full h-full object-cover"
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
            {/* CAMBIO 6: Degradado estándar from-orange-400 to-orange-600 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.2] mb-2 uppercase font-sans">
              Queremos ser parte de su <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-1 block">
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

        {/* LUCES DE NEON "AURORA" */}
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
            {/* CAMBIO 6: Degradado estándar from-orange-400 to-orange-600 */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">7 Ejes</span> de Innovación
            </h3>
            {/* CAMBIO 3: text-white/90 en lugar de text-neutral-500 */}
            <p className="text-white/90 mt-4 text-lg font-sans">Haz click en cualquier servicio para conocer el detalle</p>
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
          {/* CAMBIO 6: Degradado estándar en título */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-black uppercase tracking-tighter font-sans">Importantes compañías confían en nosotros</h3>
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
        {/* TEXTURA GRID MODERNA */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />

        {/* LUCES DE NEON "AURORA" */}
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

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12">
            {/* CAMBIO 6: Degradado estándar */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 font-sans">Iniciar <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Proyecto</span></h2>
            <p className="text-neutral-300 text-lg font-sans">Cuéntenos sobre su iniciativa y le responderemos a la brevedad.</p>
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
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-10 md:gap-0">
          <div className="text-center md:text-left space-y-2">
            {/* CAMBIO 6: Degradado estándar */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              LET'S WORK.
            </h2>
            <p className="text-xl md:text-2xl font-bold text-neutral-300 font-sans">
              ¿Tiene un proyecto en mente?
            </p>
            <p className="text-xl md:text-2xl font-bold text-neutral-300 font-sans">
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
            {/* CAMBIO 1: bg-neutral-900 → bg-gray-700 para el modal (más claro) */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-gray-700 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Image Side (Hidden on mobile for more space) */}
              {/* CAMBIO 1: Reducir overlay oscuro sobre la imagen del modal */}
              <div className="hidden md:block w-2/5 relative">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                {/* CAMBIO 1: from-black/10 to-gray-700 para que la imagen sea visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-700/80" />
                <div className="absolute bottom-8 left-8 text-white max-w-xs">
                  <div className="text-orange-500 w-16 h-16 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center mb-6">
                    {selectedService.icon}
                  </div>
                  {/* CAMBIO 5: Eliminado el número {selectedService.id} del render */}
                </div>
              </div>

              {/* Content Side */}
              {/* CAMBIO 1: bg del content side más claro */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-gray-800">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-orange-600 rounded-full transition-colors text-neutral-200 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* CAMBIO 3: text gradient más legible en fondo menos oscuro */}
                <h3 className="text-3xl md:text-5xl font-black mb-4 pr-12 text-white font-sans">
                  {selectedService.title}
                </h3>

                <p className="text-xl text-orange-400 font-medium mb-8 leading-relaxed font-sans">
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
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-transparent border border-orange-500/30 px-5 py-3 rounded-full hover:bg-orange-500/30 hover:border-orange-500/60 transition-all cursor-default"
                          >
                            <Sparkles className="w-4 h-4 text-orange-400" />
                            <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TIPO: BENTO GRID (Desarrollos Interactivos - grid uniforme llamativo) */}
                    {selectedService.detailed.type === "bento-grid" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedService.detailed.items.map((item: any, idx: number) => {
                          const icon = item.icon ? iconMap[item.icon] : null;
                          return (
                            <div
                              key={idx}
                              className="group/bento relative overflow-hidden rounded-2xl border bg-white/[0.06] border-white/10 hover:border-orange-500/50 hover:bg-white/[0.12] hover:shadow-[0_0_20px_rgba(234,88,12,0.15)] transition-all duration-300 cursor-default"
                            >
                              <div className="relative z-10 flex flex-col justify-between h-full p-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-700/10 flex items-center justify-center text-orange-400 group-hover/bento:scale-110 group-hover/bento:text-orange-300 transition-all duration-300 mb-3">
                                  {icon || <MonitorPlay className="w-5 h-5" />}
                                </div>
                                <span className="text-white font-semibold leading-tight text-sm">
                                  {item.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* TIPO: GEO FEATURES (BioGeo Insights - cards con icono hexagonal y descripción) */}
                    {selectedService.detailed.type === "geo-features" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedService.detailed.items.map((item: any, idx: number) => {
                          const icon = item.icon ? iconMap[item.icon] : null;
                          return (
                            <div
                              key={idx}
                              className="group/geo relative bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 rounded-2xl p-5 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 overflow-hidden"
                            >
                              {/* Efecto de pulso sutil en hover */}
                              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-cyan-500/0 rounded-full blur-2xl group-hover/geo:bg-cyan-500/15 transition-all duration-500" />
                              <div className="relative z-10 flex items-start gap-4">
                                {/* Icono hexagonal */}
                                <div className="shrink-0 w-12 h-12 relative">
                                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border border-cyan-500/30 group-hover/geo:from-cyan-500/50 group-hover/geo:to-blue-500/30 group-hover/geo:border-cyan-400/50 transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                                  <div className="absolute inset-0 flex items-center justify-center text-cyan-400 group-hover/geo:text-cyan-300 group-hover/geo:scale-110 transition-all duration-300">
                                    {icon || <MapPin className="w-5 h-5" />}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-white font-bold text-base mb-1 group-hover/geo:text-cyan-300 transition-colors">{item.label}</h5>
                                  <p className="text-neutral-400 text-sm leading-relaxed group-hover/geo:text-neutral-300 transition-colors">{item.desc}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* TIPO: MASONRY CARDS (Tarjetas con iconos temáticos) */}
                    {selectedService.detailed.type === "masonry-cards" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedService.detailed.items.map((item: any, idx: number) => {
                          const label = typeof item === 'string' ? item : item.label;
                          const icon = typeof item === 'object' && item.icon ? iconMap[item.icon] : null;
                          return (
                            <div
                              key={idx}
                              className={`group/card flex flex-col bg-white/10 p-6 rounded-2xl border border-white/20 hover:border-orange-500/50 hover:bg-white/[0.14] transition-all ${idx % 3 === 0 ? 'sm:col-span-2' : ''}`}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover/card:from-orange-500/50 group-hover/card:to-orange-600/20 group-hover/card:scale-110 transition-all">
                                  {icon || <ArrowUpRight className="w-6 h-6" />}
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover/card:text-orange-500 transition-colors" />
                              </div>
                              <span className="text-white font-bold text-lg">{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* TIPO: GRID (Checklists) */}
                    {selectedService.detailed.type === "grid" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedService.detailed.items.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 bg-white/10 p-4 rounded-xl border border-white/10 hover:border-orange-500/40 transition-colors">
                            <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                            <span className="text-white font-medium">{item}</span>
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
                          <div className="absolute left-[1.1rem] md:left-[1.6rem] top-1 w-10 h-10 rounded-full bg-gray-700 border-2 border-orange-500 flex items-center justify-center text-orange-500 font-black text-lg group-hover:bg-orange-500 group-hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)] z-10">
                            {idx + 1}
                          </div>
                          {/* Tarjeta de Contenido */}
                          <div className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:border-orange-500/40 transition-colors flex items-center">
                            <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">{item}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TIPO: STEPS (Títulos y descripciones como Timeline vertical con iconos) */}
                  {selectedService.detailed.type === "steps" && (
                    <div className="flex flex-col relative w-full pt-4">
                      {/* Línea vertical continua de fondo */}
                      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent md:left-8"></div>

                      {selectedService.detailed.items.map((step: any, idx: number) => {
                        const stepIcon = step.icon ? iconMap[step.icon] : null;
                        return (
                          <div key={idx} className="group relative pl-16 md:pl-20 mb-10 last:mb-0">
                            {/* Nodo del Timeline con icono */}
                            <div className="absolute left-[1.1rem] md:left-[1.6rem] top-1 w-10 h-10 rounded-full bg-gray-700 border-2 border-orange-500 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)] z-10">
                              {stepIcon || <Sparkles className="w-5 h-5" />}
                            </div>
                            {/* Tarjeta de Contenido */}
                            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 hover:border-orange-500/40 transition-colors">
                              <h4 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors font-sans">{step.title}</h4>
                              <p className="text-neutral-200 text-lg leading-relaxed font-sans">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* TIPO: MIXED (E-learning con dos bloques) */}
                  {selectedService.detailed.type === "mixed" && (
                    <div className="space-y-8">
                      <div className="flex flex-col gap-3">
                        {selectedService.detailed.items.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
                            <span className="text-white text-lg font-sans">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-orange-500/20 border border-orange-500/30 rounded-2xl p-6">
                        <h4 className="text-orange-400 font-bold mb-4 font-sans">{selectedService.detailed.subtitle2}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedService.detailed.items2.map((item: string, idx: number) => (
                            <span key={idx} className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-white font-sans">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CAMBIO 9: TIPO: CONTACT-CENTER-GALLERY (Galería con imagen + texto) */}
                  {selectedService.detailed.type === "contact-center-gallery" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedService.detailed.items.map((item: { label: string; image: string }, idx: number) => (
                        <div
                          key={idx}
                          className="relative rounded-2xl overflow-hidden border border-white/20 hover:border-orange-500/50 transition-all group/card h-36"
                        >
                          {/* CAMBIO 1: Imagen sin filtros oscuros pesados */}
                          <img
                            src={item.image}
                            alt={item.label}
                            className="w-full h-full object-cover"
                          />
                          {/* Overlay suave solo en la parte inferior para que se lea el texto */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                            <span className="text-white font-semibold text-sm leading-tight font-sans">{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer del servicio (Si existe) */}
                {selectedService.detailed.footer && (
                  <div className="mt-8 p-4 bg-orange-500/15 border border-orange-500/30 text-orange-300 font-semibold text-center rounded-xl uppercase tracking-widest text-sm">
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
      {/* CAMBIO 3: text-white en lugar de text-neutral-300 */}
      <span className="text-sm font-bold uppercase tracking-widest text-white font-sans">{label}</span>
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
      {/* CAMBIO 1: Reducir el overlay oscuro sobre las fotos de las tarjetas */}
      <div className="absolute inset-0">
        <img
          src={srv.image}
          alt={srv.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent transition-opacity group-hover:opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Superior: Título de la Tarjeta */}
        <div className="flex justify-between items-start">
          {/* CAMBIO 5: Eliminado el número (srv.id) del render */}
          <h3 className="text-2xl font-bold leading-tight drop-shadow-md pr-4 text-white font-sans">
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
                {/* CAMBIO 3: text-white en lugar de text-neutral-400 */}
                <p className="text-white/90 text-sm leading-relaxed mb-4 font-sans">
                  {srv.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {srv.list.map((item: string, i: number) => (
                    <li key={i} className="text-xs px-3 py-1.5 rounded-full border bg-black/50 text-white border-white/20 font-sans">
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
