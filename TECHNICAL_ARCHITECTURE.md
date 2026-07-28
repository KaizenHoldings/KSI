# Technical Architecture

## 1. Propósito

Este documento define las reglas técnicas y de organización que deben respetarse durante el desarrollo de la aplicación.

La estructura narrativa y el orden de las secciones del landing page deben partir del análisis de `ksi_reference.html`. Sin embargo, su código no debe copiarse literalmente: la nueva implementación debe adaptarse a la arquitectura, tecnologías y reglas definidas aquí.

Este archivo no define decisiones de marca, dirección visual ni criterios detallados de UI/UX. Esos aspectos serán atendidos por los documentos o skills especializados del proyecto.

---

## 2. Stack tecnológico

- **Next.js:** framework principal, usando App Router.
- **TypeScript:** lenguaje del proyecto, con modo estricto.
- **Tailwind CSS:** sistema principal de estilos.
- **Motion:** animaciones e interacciones, usando `motion/react`.
- **Zustand:** estado global compartido cuando sea necesario.
- **LocalStorage:** persistencia local únicamente para estados no sensibles que deban conservarse entre sesiones.

No se deben agregar librerías sin justificar primero:

1. El problema que resuelven.
2. Por qué no puede resolverse de forma razonable con el stack existente.
3. Su impacto sobre rendimiento, mantenimiento y tamaño del proyecto.

---

## 3. Principios de arquitectura

1. **Separación de responsabilidades:** la interfaz, la lógica de negocio, los datos y las integraciones deben mantenerse desacoplados.
2. **Componentes pequeños:** cada componente debe tener una responsabilidad clara.
3. **Secciones encapsuladas:** cada sección del landing page debe existir como un componente independiente.
4. **Server First:** usar Server Components por defecto. Agregar `"use client"` únicamente cuando el componente necesite estado, eventos del navegador, animaciones interactivas o APIs exclusivas del cliente.
5. **Datos separados de la vista:** evitar textos, configuraciones o colecciones extensas escritos directamente dentro del JSX.
6. **Dependencias dirigidas:** la capa visual puede consumir servicios y contratos, pero no debe implementar directamente lógica de datos o integraciones.
7. **Seguridad por diseño:** ningún token, secreto o credencial debe llegar al navegador.
8. **Simplicidad:** no crear abstracciones anticipadas para necesidades que todavía no existen.

---

## 4. Capas del código

### 4.1. Capa visual

Responsable de todo lo que el usuario ve y con lo que interactúa.

Incluye:

- Páginas y layouts.
- Secciones del landing page.
- Componentes reutilizables.
- Navegación.
- Estados visuales.
- Animaciones.
- Hooks orientados a la interfaz.

Reglas:

- No realizar llamadas directas a servicios externos desde un componente.
- No contener lógica de negocio compleja.
- No acceder directamente a LocalStorage fuera de un store, hook o adaptador dedicado.
- Mantener los componentes accesibles y responsive.
- Las animaciones deben respetar `prefers-reduced-motion`.

### 4.2. Capa de modelo de negocio

Responsable de encapsular las reglas, operaciones y comportamientos propios de la aplicación.

Incluye:

- Servicios de dominio.
- Casos de uso.
- Entidades y tipos principales.
- Interfaces o contratos que deben cumplir los repositorios e integraciones.

Ejemplo: `CommunicationService` puede centralizar la lógica necesaria para construir, validar o procesar una solicitud de contacto, sin conocer detalles visuales del formulario.

Reglas:

- No importar componentes React ni estilos.
- No depender directamente de APIs del navegador.
- Mantener la lógica reutilizable y fácil de probar.
- Usar clases cuando ayuden a encapsular comportamiento, dependencias o reglas relacionadas. Para operaciones simples y puras, se permiten funciones.

### 4.3. Capa de datos

Responsable del acceso, transformación y almacenamiento de los datos utilizados por la aplicación.

Incluye:

- Repositorios.
- Fuentes de datos locales.
- Mocks.
- Mapeadores.
- Persistencia local no sensible.

Reglas:

- Los componentes no deben conocer cómo se obtiene o almacena la información.
- Los mocks deben poder sustituirse posteriormente sin modificar la capa visual.
- Validar y normalizar los datos antes de entregarlos al resto de la aplicación.

### 4.4. Capa de integración

Responsable de la comunicación con elementos externos.

Incluye:

- Clientes HTTP.
- Adaptadores de APIs.
- Servicios de correo, formularios, analítica u otras plataformas.
- Configuración de integraciones.

Reglas:

- Las integraciones que requieran secretos deben ejecutarse únicamente en el servidor.
- La interfaz no debe depender directamente de la forma de respuesta de un proveedor externo.
- Cada integración debe exponer una interfaz interna estable.
- Los errores externos deben transformarse en errores controlados antes de llegar a la capa visual.

---

## 5. Estructura sugerida

```text
src/
├── app/
│   ├── api/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
│
├── business/
│   ├── entities/
│   ├── contracts/
│   ├── services/
│   └── use-cases/
│
├── data/
│   ├── mocks/
│   ├── mappers/
│   └── repositories/
│
├── integrations/
│   ├── adapters/
│   └── clients/
│
├── content/
├── hooks/
├── store/
├── config/
├── lib/
└── types/

public/
├── fonts/
├── icons/
├── images/
└── videos/
```

### Responsabilidad de las carpetas

- `app/`: rutas, layouts, metadata, endpoints y composición principal.
- `components/sections/`: componentes que representan secciones completas del landing.
- `components/ui/`: elementos reutilizables como botones, tarjetas, inputs y contenedores.
- `components/layout/`: header, footer, navegación y estructuras compartidas.
- `business/`: reglas y operaciones de negocio independientes de la interfaz.
- `data/`: acceso y transformación de datos, repositorios y mocks.
- `integrations/`: comunicación con servicios o plataformas externas.
- `content/`: contenido estático estructurado del sitio.
- `hooks/`: comportamiento reutilizable relacionado con React o el navegador.
- `store/`: estado global y configuración de persistencia.
- `config/`: constantes y configuración central del proyecto.
- `lib/`: utilidades técnicas generales.
- `types/`: tipos compartidos que no pertenecen a una entidad específica.

No crear carpetas vacías. Esta estructura debe crecer según las necesidades reales del proyecto.

---

## 6. Organización del landing page

`src/app/page.tsx` debe funcionar principalmente como punto de composición. No debe contener la implementación completa de cada sección.

Ejemplo:

```tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
```

Los nombres y el orden definitivo de las secciones deben salir del análisis de `ksi_reference.html`.

Cada sección debe:

- Tener un nombre semántico.
- Estar encapsulada en su propio archivo.
- Recibir datos mediante props o importarlos desde `content/`.
- Reutilizar componentes de `components/ui/` cuando corresponda.
- Evitar depender del funcionamiento interno de otras secciones.

---

## 7. Estado y persistencia

Elegir la herramienta de estado de acuerdo con el alcance:

- **Estado local de un componente:** `useState` o `useReducer`.
- **Estado compartido entre componentes o secciones:** Zustand.
- **Estado que debe sobrevivir una recarga:** Zustand con persistencia o un adaptador controlado de LocalStorage.
- **Estado que debe poder compartirse mediante URL:** search params.
- **Datos provenientes del servidor:** obtenerlos desde Server Components, Route Handlers o la estrategia de servidor correspondiente.

Reglas:

- No guardar tokens, credenciales ni información sensible en Zustand persistido o LocalStorage.
- Persistir únicamente las propiedades necesarias.
- Definir una versión del estado persistido si su estructura puede cambiar.
- Evitar usar Zustand para estados aislados que pueden permanecer dentro de un componente.
- Controlar la hidratación cuando un estado persistido afecte el render inicial.

---

## 8. Variables de entorno y seguridad

- Los valores reales deben estar en `.env.local`.
- El repositorio debe incluir `.env.example` únicamente con nombres y valores de ejemplo seguros.
- `.env.local` no debe subirse al repositorio.
- Las variables privadas solo pueden utilizarse en código del servidor.
- El prefijo `NEXT_PUBLIC_` se utilizará exclusivamente para valores que puedan ser visibles en el navegador.
- Nunca colocar tokens, claves o secretos dentro de componentes, archivos de contenido, mocks o commits.
- Las llamadas que requieran credenciales deben pasar por Route Handlers, Server Actions o servicios ejecutados en el servidor.

Ejemplo:

```env
# Público y visible en el navegador
NEXT_PUBLIC_SITE_URL=

# Privado y disponible únicamente en el servidor
EXTERNAL_SERVICE_API_KEY=
```

---

## 9. Integraciones y flujo de comunicación

El flujo recomendado es:

```text
Componente visual
→ caso de uso o servicio
→ contrato interno
→ repositorio o adaptador
→ integración externa
```

La capa visual debe trabajar con respuestas internas predecibles, no con la respuesta cruda de una API externa.

Toda operación externa debe contemplar:

- Estado inicial.
- Estado de carga.
- Resultado exitoso.
- Error esperado.
- Error inesperado.
- Posibilidad de reintento cuando corresponda.

---

## 10. TypeScript

- Activar y mantener el modo estricto.
- Evitar `any`. Si un dato todavía es desconocido, usar `unknown` y validarlo.
- Definir tipos claros para props, entidades, respuestas y estados.
- Preferir uniones discriminadas para estados complejos.
- No duplicar tipos que representen el mismo concepto.
- Los tipos generados por proveedores externos no deben filtrarse directamente a toda la aplicación; deben mapearse a modelos internos.

---

## 11. Tailwind y estilos

- Tailwind será la herramienta principal de estilos.
- Los estilos globales deben limitarse a resets, variables, tipografías base y comportamientos compartidos.
- Centralizar los design tokens definidos por la marca.
- Evitar valores arbitrarios repetidos.
- Crear variantes reutilizables para componentes con múltiples estados.
- Mantener un criterio mobile-first.
- No usar estilos inline salvo valores verdaderamente dinámicos.
- No añadir otra librería de componentes o CSS sin aprobación.

---

## 12. Animaciones

- Usar Motion para animaciones de entrada, salida, layout e interacción.
- Las animaciones deben apoyar la comprensión, jerarquía o continuidad.
- Evitar animar cada elemento sin un propósito claro.
- No bloquear navegación o lectura mientras termina una animación.
- Respetar la preferencia de movimiento reducido del sistema.
- Evitar animaciones costosas que modifiquen continuamente propiedades de layout.
- Priorizar transformaciones y opacidad para mantener fluidez.

---

## 13. Rendimiento

- Usar `next/image` para imágenes cuando corresponda.
- Usar `next/font` o archivos locales para las tipografías del proyecto.
- Cargar videos e imágenes con tamaños y formatos adecuados.
- Evitar JavaScript de cliente innecesario.
- Dividir componentes pesados cuando exista un beneficio medible.
- Evitar animaciones que causen layout shift.
- Mantener las dependencias y assets bajo revisión.

---

## 14. Manejo de errores

- No silenciar errores con bloques vacíos.
- Mostrar mensajes claros y accionables al usuario.
- Registrar suficiente contexto técnico en el servidor sin exponer datos sensibles.
- Las integraciones deben traducir errores externos a un formato interno consistente.
- Implementar estados vacíos y alternativas cuando un recurso no esté disponible.

Formato sugerido:

```ts
type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string } };
```

---

## 15. Reglas para Claude Code

Antes de implementar o modificar una funcionalidad:

1. Leer este documento.
2. Revisar la estructura actual del proyecto.
3. Identificar la capa correcta para cada cambio.
4. Reutilizar componentes, servicios y tipos existentes cuando tenga sentido.
5. Presentar un plan breve antes de realizar cambios amplios.
6. No modificar áreas no relacionadas con la tarea.
7. No instalar dependencias sin justificarlo.
8. No inventar endpoints, secretos, contenido o requisitos.
9. Mantener la aplicación funcional después de cada fase.
10. Ejecutar las validaciones disponibles antes de declarar una tarea terminada.

Cuando una solicitud contradiga este documento, señalar la contradicción y pedir confirmación antes de cambiar la arquitectura.

---

## 16. Criterios mínimos de finalización

Una sección o funcionalidad se considera terminada cuando:

- Cumple el objetivo solicitado.
- Respeta la separación por capas.
- Está correctamente tipada.
- Es responsive.
- Es accesible mediante teclado cuando aplica.
- Contempla estados de carga, error y vacío cuando consume datos.
- No contiene secretos ni datos sensibles.
- Respeta movimiento reducido.
- No introduce errores de lint, TypeScript o compilación.
- No rompe otras secciones o funcionalidades existentes.

