import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUpRight, MonitorPlay, Layers, Layout, BookOpen, Globe, Presentation, MessageSquare, MapPin, Phone, Smartphone, X, CheckCircle2, ChevronRight, Sparkles, ArrowDown, Send, Loader2, PhoneCall, Bot, HeartPulse, BarChart3, Database, ClipboardCheck, Megaphone, Users, Gift, Truck, ShieldCheck, BrainCircuit, Mail as MailIcon } from 'lucide-react';
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
  }
];

export function HomeV2() {
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Bloquear el scroll de la pagina cuando el modal está abierto
  useEffect(() => {
    if (selectedService || showContactForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedService, showContactForm]);

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
        setShowContactForm(false);
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
    <div ref={containerRef} className="bg-black text-white selection:bg-orange-500 selection:text-black font-sans overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 sm:px-6 md:px-8 py-3 md:py-4 flex justify-between items-center bg-neutral-950/95 backdrop-blur-md border-b border-white/5">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter uppercase flex items-center gap-1.5 md:gap-2 cursor-pointer">
          <img src="/images/logo-biomercadeo.png" alt="Biomercadeo" className="h-7 w-7 md:h-8 md:w-8 object-contain" />
          Biomercadeo<span className="text-orange-500">.</span>
        </a>
        <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-bold uppercase tracking-widest">
          <a href="#clients" className="hover:text-orange-500 transition-colors">Clientes</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">Nosotros</a>
          <a href="#services" className="hover:text-orange-500 transition-colors">Portafolio</a>
          <a href="#bicall" className="hover:text-purple-400 transition-colors">Bicall</a>
        </div>
        <a href="#contact" className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 border border-white/20 rounded-full hover:bg-orange-600 hover:border-orange-600 transition-all font-medium text-xs sm:text-sm w-max uppercase block text-center">
          Contáctenos
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1758468274726-1197049bbfa9?q=80&w=2000&auto=format&fit=crop" 
            alt="Futuristic Background" 
            className="w-full h-full object-cover opacity-40 scale-110"
          />
        </div>

        <div className="relative z-20 text-center max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-orange-500 font-bold tracking-[0.3em] uppercase mb-6 text-sm md:text-base border border-orange-500/30 bg-orange-500/10 px-6 py-2 rounded-full backdrop-blur-md">
              Corporación Biomercadeo
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] mb-6 uppercase">
              Somos parte de su <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                Equipo de Trabajo
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed">
              Comunicación efectiva para el éxito. Somos una agencia especializada en diseño, tecnología y estrategias de alto nivel.
            </p>
            
            <div className="mt-12">
              <a href="#services" className="inline-block group relative overflow-hidden bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-wider sm:tracking-widest text-sm sm:text-base transition-all shadow-[0_0_40px_rgba(234,88,12,0.3)]">
                <span className="relative z-10 flex items-center gap-4">
                  Explorar Portafolio
                  <ArrowsRight />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLIENTS INFINITE SCROLL */}
      <section id="clients" className="py-24 bg-black overflow-hidden relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-black uppercase tracking-tighter">Grandes marcas confían en nosotros</h3>
        </div>
        
        {/* Marquee Banner */}
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

      {/* STATS & ABOUT */}
      <section id="about" className="py-24 bg-neutral-950 relative border-t border-white/10 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
              Diseño y comunicación hecha a su <span className="text-orange-500 underline decoration-wavy decoration-orange-500/50 underline-offset-8">medida.</span>
            </h3>
            <p className="text-neutral-400 text-xl leading-relaxed">
              Contamos con un amplio portafolio de servicios, aportando experiencia significativa apoyando importantes compañías a nivel nacional e internacional.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            <StatsCard number="15+" label="Años de Experiencia" delay={0.1} />
            <StatsCard number="12+" label="Países Trabajados" delay={0.2} />
            <StatsCard number="360°" label="Estrategias Integrales" delay={0.3} />
            <StatsCard number="Top" label="Partners en Salud & Farma" delay={0.4} />
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE SERVICES ACCORDION/GRID */}
      <section id="services" className="py-32 relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-orange-500 mb-4">6 Ejes de Innovación</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter">Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Portafolio</span></h3>
            <p className="text-neutral-500 mt-4 text-lg">Haz cli en cualquier servicio para conocer el detalle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, index) => (
              <ServiceCard key={srv.id} srv={srv} index={index} onClick={() => setSelectedService(srv)} />
            ))}
          </div>
        </div>
      </section>

      {/* BICALL - CONTACT CENTER */}
      <section id="bicall" className="relative py-32 bg-gradient-to-b from-black via-[#0d0520] to-[#120828] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-500/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Bicall Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-8">
              <PhoneCall className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-bold text-sm uppercase tracking-widest">Contact Center</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-6">
              <span className="text-white">Bi</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">call</span>
            </h2>
            <p className="text-xl md:text-2xl text-purple-200/60 max-w-2xl mx-auto leading-relaxed">
              La solución integral en un <span className="text-purple-400 font-bold">Contact Center</span>
            </p>
          </motion.div>

          {/* Programas Especializados Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-black text-white">Programas Especializados</h3>
            <p className="text-purple-400 text-lg font-medium mt-1">en diferentes áreas</p>
          </motion.div>

          {/* Bento Grid of Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Programas de apoyo", desc: "De recordación y educación para clientes y aliados", icon: <HeartPulse className="w-6 h-6" />, span: "lg:col-span-2", img: "/images/rendering-anime-doctors-work.jpg" },
              { title: "Confirmación", desc: "Para eventos", icon: <ClipboardCheck className="w-6 h-6" />, span: "", img: "/images/scene-with-business-person-working-futuristic-office-job (1).jpg" },
              { title: "Encuestas", desc: "De seguimiento y satisfacción", icon: <BarChart3 className="w-6 h-6" />, span: "", img: "/images/technology-hologram-indoors.jpg" },
              { title: "Fuerza de ventas telefónica", desc: "Para la comercialización de sus productos", icon: <PhoneCall className="w-6 h-6" />, span: "", img: "/images/venta-telefono.png" },
              { title: "Visita domiciliaria", desc: "Con educadores en salud", icon: <Users className="w-6 h-6" />, span: "", img: "/images/doctor-viosita.png" },
              { title: "Recordación", desc: "Para la toma de medicamentos, vacunas y citas médicas", icon: <HeartPulse className="w-6 h-6" />, span: "", img: "/images/yellow-pill-spills-reflection-addiction-water-generative-ai.jpg" },
              { title: "Servicios de IA", desc: "Listas de difusión • Chatbot • Voice call • Asistente virtual", icon: <BrainCircuit className="w-6 h-6" />, span: "", img: "/images/cyberpunk-illustration-with-futuristic-technology-bright-neon-lights.jpg" },
              { title: "Plataforma interactiva", desc: "Personalizada con informes en Dashboard y manejo de KPIs", icon: <BarChart3 className="w-6 h-6" />, span: "lg:col-span-2", img: "/images/online-cloud-data-storage-concept-cloudscape-digital-online-server-global-network-business-web-database-backup-computer-private-infrastructure-technology.jpg" },
              { title: "Actualización", desc: "De bases de datos (Habeas Data) de clientes, proveedores y aliados estratégicos", icon: <Database className="w-6 h-6" />, span: "lg:col-span-2", img: "/images/freepik__the-style-is-3d-model-with-octane-render-volumetri__62513.png" },
              { title: "Test de adherencia", desc: "De los clientes al producto", icon: <ClipboardCheck className="w-6 h-6" />, span: "", img: "/images/freepik__the-style-is-3d-model-with-octane-render-volumetri__17321.png" },
              { title: "Asesoría y apoyo", desc: "Gestión y apoyo para la entrega de productos", icon: <Truck className="w-6 h-6" />, span: "lg:col-span-2", img: "/images/delivery-robot-futuristic-environment.jpg" },
              { title: "Farmacovigilancia", desc: "Experiencia y manejo de los lineamientos de farmacovigilancia", icon: <ShieldCheck className="w-6 h-6" />, span: "", img: "/images/arte-digital-equipo-trabajo.jpg" },
              { title: "SMS y Mailing", desc: "Envío de mensajes personalizados para generar fidelidad", icon: <MailIcon className="w-6 h-6" />, span: "", img: "/images/work-team-digital-art.jpg" },
              { title: "Kits de fidelización", desc: "Creación y elaboración de kits personalizados", icon: <Gift className="w-6 h-6" />, span: "lg:col-span-2", img: "/images/work-team-digital-art (1).jpg" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className={`group relative bg-white/[0.03] backdrop-blur-sm border border-purple-500/10 rounded-2xl p-6 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-300 cursor-default overflow-hidden min-h-[200px] ${item.span}`}
              >
                {/* Background image */}
                <img
                  src={item.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 rounded-2xl"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-purple-900/30 rounded-2xl" />

                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:to-violet-600/15 transition-all duration-500 rounded-2xl" />
                
                <div className="relative z-10 flex flex-col justify-end h-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4 group-hover:bg-purple-500/30 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-black text-white mb-1 group-hover:text-purple-200 transition-colors drop-shadow-lg">{item.title}</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed group-hover:text-neutral-200 transition-colors drop-shadow-md">{item.desc}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <button onClick={() => setShowContactForm(true)} className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 rounded-full font-bold uppercase text-sm sm:text-base tracking-wider sm:tracking-widest transition-all shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] cursor-pointer">
              <PhoneCall className="w-5 h-5" />
              Conocer más sobre Bicall
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-24 bg-orange-600 text-black relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-none">
              LET'S <br/> WORK.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-bold max-w-sm mx-auto md:mx-0">
              ¿Tiene un proyecto en mente? Creamos el futuro juntos.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="space-y-3 md:space-y-4 text-base sm:text-lg md:text-xl font-bold w-fit mx-auto md:w-full md:max-w-md md:mx-0">
              <div className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                <MapPin className="w-6 h-6 shrink-0 text-black/50" />
                <span>Carrera 55A #166-21, Bogotá</span>
              </div>
              <a href="tel:6018055894" className="flex items-center gap-4 hover:text-white transition-colors">
                <Phone className="w-6 h-6 shrink-0 text-black/50" />
                <span>601 8055894</span>
              </a>
              <div className="flex items-center gap-4 hover:text-white transition-colors cursor-default">
                <Smartphone className="w-6 h-6 shrink-0 text-black/50" />
                <span>310 325 5698 - 311 450 9968</span>
              </div>
            </div>
            <div className="mt-10 w-full flex justify-center">
              <button 
                onClick={() => setShowContactForm(true)}
                className="bg-black text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                Iniciar Proyecto <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-black rounded-full blur-[150px] opacity-20 pointer-events-none" />
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

      {/* MODAL DE CONTACTO */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => { setShowContactForm(false); setFormStatus('idle'); }}
            />
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl"
            >
              <button
                onClick={() => { setShowContactForm(false); setFormStatus('idle'); }}
                className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-orange-600 rounded-full transition-colors text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {formStatus === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-neutral-400">Nos pondremos en contacto pronto.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-black text-white mb-2">
                    Iniciar <span className="text-orange-500">Proyecto</span>
                  </h3>
                  <p className="text-neutral-400 mb-8">Cuéntenos sobre su proyecto y le responderemos a la brevedad.</p>

                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Nombre</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Su nombre completo"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Correo electrónico</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Asunto</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Asunto del mensaje"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-2 block">Mensaje</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                        placeholder="Describa brevemente su proyecto..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-black font-black text-lg py-4 rounded-xl transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      {formStatus === 'sending' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Enviar Mensaje</>
                      )}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-red-400 text-sm text-center">Hubo un error. Intente de nuevo.</p>
                    )}
                  </form>
                </>
              )}
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
      className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-start justify-center backdrop-blur-sm hover:bg-white/10 hover:border-orange-500/50 transition-all cursor-pointer"
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
      className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer"
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
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* En el header del servicio le agrego un pequeño "+" para indicar accionable */}
        <div className="absolute top-8 right-8 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/20">
          <ChevronRight className="text-white group-hover:text-orange-500" />
        </div>

        {/* Static part */}
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="mb-4 text-orange-500 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(234,88,12,0.2)]">
            {srv.icon}
          </div>
          <div className="flex items-start justify-between mb-4 gap-4">
            <h3 className="text-2xl font-bold leading-tight drop-shadow-md">{srv.title}</h3>
            <span className="text-3xl font-black text-white/20 mt-1">{srv.id}</span>
          </div>
          
          {/* Hover part */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                {srv.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {srv.list.map((item: string, i: number) => (
                  <li key={i} className="text-xs bg-black/50 text-neutral-300 px-3 py-1.5 rounded-full border border-white/10">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
