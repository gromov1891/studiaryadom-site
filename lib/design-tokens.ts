// Дизайн-токены для JS/анимаций. Зеркало CSS-токенов из app/globals.css (@theme).
// Цвета держим в синхроне с CSS; здесь — то, что нужно GSAP/Framer (длительности, easing).

export const colors = {
  ink: '#0a0a0b',     // фон страницы (глубокий, не чистый чёрный)
  surface: '#141416', // карточки/поверхности
  line: '#26262b',    // границы
  fog: '#f3f2ef',     // основной текст (тёплый белый)
  mute: '#8b8b93',    // вторичный текст
  accent: '#ff5a30',  // единственный акцент (тёплый сигнальный)
} as const;

// Длительности (сек)
export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 1.0,
  reveal: 1.1,
  preloader: 1.8,
} as const;

// Easing-кривые. Строковые — для CSS/Framer, массивы — bezier-точки для Framer Motion.
export const ease = {
  // мягкий «дорогой» выход
  outExpo: [0.16, 1, 0.3, 1] as const,
  // плавный симметричный
  inOutQuint: [0.83, 0, 0.17, 1] as const,
  // лёгкий
  outQuart: [0.25, 1, 0.5, 1] as const,
  // строковые имена GSAP-аналоги
  gsapOutExpo: 'expo.out',
  gsapInOutExpo: 'expo.inOut',
  gsapOutPower3: 'power3.out',
} as const;

// Брейкпоинты для скриншот-проверок и логики
export const breakpoints = {
  mobile: 390,
  desktop: 1440,
} as const;

export const tokens = { colors, duration, ease, breakpoints };
export default tokens;
