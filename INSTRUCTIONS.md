# Plan de Proyecto: AI-Branding Express

## 1. Visión General
- **Nombre:** AI-Branding Express
- **Propósito:** Generador de identidad visual rápida para PYMES.
- **Caso de Uso actual:** Floristería Boutique "Aura Floral".

## 2. Identidad Visual de la App (UI)
# UI Style Guide: AI-Branding Express (Claude Style)

## Visual Principles
- **Atmosphere:** Sophisticated, calm, professional, and minimal.
- **Layout:** Centralized content with generous whitespace (padding).
- **Borders:** Subtle 1px borders (#E6E1D6), no heavy shadows.

## Color Tokens
- surface-primary: #F9F7F2 (Paper background)
- text-primary: #1F1F1F (Deep obsidian)
- accent-primary: #5D6D54 (Sage accent)
- border-subtle: #E6E1D6 (Sand grey)

## Component Specs
- **Input Fields:** Background #FFFFFF, Border 1px solid #E6E1D6, Focus Border #5D6D54.
- **Primary Buttons:** Background #1F1F1F, Text #F9F7F2, Border-radius 6px.
- **Secondary Buttons:** Background transparent, Border 1px solid #1F1F1F, Text #1F1F1F.
- **Typography:** - Headings: Serif font, weight 500, tight letter-spacing.
    - Body: Sans-serif font, weight 400, relaxed line-height (1.6).

## 3. Estructura de Pantallas (Flujo del Usuario)

### Pantalla 1: Landing & Onboarding
- **Encabezado:** "Tu marca profesional, lista en segundos."
- **Subtítulo:** "Diseño inteligente para negocios con alma."
- **Botón de Acción:** [Empezar ahora]

### Pantalla 2: Input de Datos
- **Formulario simple:**
    1. Campo de texto: "¿Cómo se llama tu negocio?" (Ejemplo: Aura Floral).
    2. Selector de estilo: [Minimalista / Rústico / Moderno].
    3. Selector de vibración: [Elegante / Divertido / Serio].
- **Botón:** [Generar Identidad Visual]

### Pantalla 3: Pantalla de Carga (Simulada)
- **Animación:** Barra de progreso o icono de carga.
- **Texto dinámico:** "Analizando sector botánico...", "Extrayendo paleta de colores...", "IA generando isotipo...".

### Pantalla 4: Resultado Final (Dashboard de Marca)
- **Sección Logo:** Visualización del logo generado.
- **Sección Colores:** Muestra de la paleta (HEX: #8FA382, #F2D5D5, #333333).
- **Sección Tipografía:** Muestra de fuentes (Playfair Display para títulos, Montserrat para cuerpo).
- **Sección Mockup:** Imagen del logo aplicado en una bolsa de la floristería.

## 4. Notas Técnicas para el Prototipo
- Utilizar un flujo lineal.
- Los resultados de la pantalla 4 deben estar pre-configurados con el ejemplo de la Floristería para asegurar una calidad visual alta en el TFM.

## 5. Tegnologia a utilizar
Para la UI utiliza Shadcn
Para la lógica utiliza React
Para la animacion utiliza Framer Motion
Para la parte de IA utiliza Gemini API
Para la parte de versionamiento utiliza Git y GitHub
Diseñada para que se vea bien en telefono movil


## 6. Lógica de IA y UX Senior
- **System Prompt:** Configuración de Gemini para actuar como consultor de branding de lujo.
- **UX Motion:** Animaciones secuenciales (stagger) en la entrega de resultados para aumentar el "valor percibido".
- **Responsive:** Layout de columna única optimizado para interacción táctil (Mobile-First).
- **Copywriting:** Tono pausado, profesional y minimalista.