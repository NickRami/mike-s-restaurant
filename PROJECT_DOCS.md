# Mike’s Restaurant - Project Documentation

## 1. Arquitectura del Proyecto

La estructura de carpetas sigue una arquitectura modular y escalable, separando responsabilidades claramente:

```
src/
├── app/                    # Next.js App Router (Rutas y Páginas)
│   ├── country/[country]/  # Ruta dinámica para platos por país
│   ├── meal/[id]/          # Ruta dinámica para detalle de plato
│   ├── layout.tsx          # Layout principal (Header, Footer)
│   └── page.tsx            # Página de inicio
├── components/
│   ├── ui/                 # Componentes base de shadcn/ui (reutilizables)
│   ├── layout/             # Componentes estructurales (Header, Footer, Nav)
│   └── features/           # Componentes de negocio (MealCard, CountrySelector)
├── lib/                    # Utilidades generales (cn, formatters)
├── services/               # Lógica de consumo de APIs (Separación de Business Logic)
├── types/                  # Definiciones de Tipos TypeScript (Interfaces compartidas)
└── styles/                 # Estilos globales (si fuera necesario más allá de Tailwind)
```

## 2. Decisiones Técnicas: Next.js vs React Puro

Se ha seleccionado **Next.js 14+ (App Router)** por las siguientes razones críticas para un sitio de restaurante profesional:

1.  **SEO (Search Engine Optimization):**
    *   **React Puro (SPA):** Renderiza en el cliente. Los motores de búsqueda pueden tener dificultades para indexar el contenido dinámico (menús, descripciones).
    *   **Next.js (SSR/ISR):** Entrega HTML pre-renderizado. Cada plato y categoría es indexable inmediatamente, crucial para aparecer en búsquedas como "Comida Italiana en [Ciudad]".

2.  **Performance (Core Web Vitals):**
    *   Next.js optimiza automáticamente imágenes (`next/image`), fuentes y scripts.
    *   **Server Components:** Reducen dramáticamente el JavaScript que se envía al navegador, mejorando el Time to Interactive (TTI) en móviles.

3.  **Routing y Estructura:**
    *   El sistema de archivos de Next.js facilita crear rutas como `/country/italian` o `/meal/52772` sin configurar un router complejo como `react-router`.

## 3. Flujo de Datos y Estrategia de Renderizado

*   **Server Components (Por defecto):**
    *   Las páginas (`page.tsx`) y layouts son Server Components.
    *   El consumo de la API `TheMealDB` ocurre en el servidor via `src/services`. Esto oculta la lógica de fetching y mejora el rendimiento.

*   **ISR (Incremental Static Regeneration):**
    *   La información de los platos no cambia cada segundo. Usaremos `revalidate` (por ejemplo, cada 24 horas o 1 hora) para cachear las respuestas de la API.
    *   Esto combina la velocidad de un sitio estático con la frescura de uno dinámico.

*   **Client Components:**
    *   Solo se usarán cuando haya interactividad (ej: un buscador en tiempo real, sliders, o el menú móvil). Se marcan con `'use client'`.

## 4. Roadmap de Implementación

### Etapa 1: Arquitectura y Base (Completado)
*   Setup de Next.js 14, TypeScript, Tailwind.
*   Instalación de shadcn/ui.
*   Definición de estructura de carpetas.

### Etapa 2: Servicios y Tipos (Siguiente)
*   Definir interfaces en `src/types`.
*   Implementar cliente HTTP en `src/services/api.ts` para conectar con TheMealDB.

### Etapa 3: Componentes UI
*   Desarrollar `MealCard` (Presentación de platos).
*   Desarrollar `Header` y `Footer`.
*   Implementar `CountrySelector` o navegación por categorías.

### Etapa 4: Páginas y Rutas
*   **Home:** Landing page con categorías destacadas.
*   **Country Page:** Grid de platos filtrados por país.
*   **Detail Page:** Vista rica del plato con instrucciones e ingredientes.

### Etapa 5: Polish & SEO
*   Metadatos dinámicos por página.
*   Optimización de imágenes.
*   Testing manual de flujos.
