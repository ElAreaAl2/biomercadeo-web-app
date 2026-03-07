
  # Prototipos para Biomercadeo

Landing page interactiva y moderna para **Biomercadeo**, una agencia especializada en marketing, publicidad y comunicacion estrategica. El sitio presenta el portafolio de servicios de la compania mediante animaciones fluidas, un diseno oscuro con acentos en naranja y una experiencia de usuario inmersiva tipo single-page application.

---

## Que incluye

- **Hero animado** con scroll progress bar y navegacion fija con blur.
- **Catalogo de servicios** con modales detallados: Desarrollos Graficos, Interactivos, e-Learning, Contenido Editorial, Marketing Digital y Programas Multi-impacto 360 grados.
- **Formulario de contacto** integrado con Google Apps Script para envio de correos.
- **Animaciones y transiciones** controladas con Framer Motion y scroll-based effects.
- **Diseno responsivo** optimizado para desktop y dispositivos moviles.

---

## Stack tecnologico

| Capa              | Tecnologia                                              |
| ----------------- | ------------------------------------------------------- |
| Framework         | React 18 con TypeScript                                 |
| Build tool        | Vite 6                                                  |
| Estilos           | Tailwind CSS 4                                          |
| Componentes UI    | Radix UI / shadcn/ui, Material UI                       |
| Animaciones       | Framer Motion (motion/react)                            |
| Routing           | React Router 7                                          |
| Iconos            | Lucide React, MUI Icons                                 |
| Graficos          | Recharts                                                |
| Otros             | react-slick, react-responsive-masonry, react-hook-form  |

---

## Diseno original

El prototipo fue creado en Figma y se puede consultar aqui:

https://www.figma.com/design/hd6jWumdzpPJe5niOogS5B/Prototipos-para-Biomercadeo

---

## Inicio rapido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Generar build de produccion
npm run build
```

---

## Estructura del proyecto

```
src/
  main.tsx                  # Punto de entrada
  app/
    App.tsx                 # Componente raiz con RouterProvider
    routes.tsx              # Definicion de rutas
    components/
      figma/                # Componentes auxiliares (ImageWithFallback)
      ui/                   # Libreria de componentes reutilizables (shadcn/ui)
    pages/
      v2/
        HomeV2.tsx          # Pagina principal con todo el contenido
  styles/
    fonts.css               # Tipografias
    index.css               # Estilos globales
    tailwind.css            # Configuracion de Tailwind
    theme.css               # Variables de tema
public/
  images/                   # Recursos graficos
```

---

## Licencia

Proyecto privado. Todos los derechos reservados a Biomercadeo.
  