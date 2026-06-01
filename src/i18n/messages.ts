import type { Localized } from '@/types/domain';

/*
 * The UI message catalog. Every user-facing string lives here as `{ en, ar }`.
 * The Arabic is intentionally Egyptian dialect (عامية) where it fits — warm and
 * natural, not stiff MSA. Components never hold bare text; they call `t(id)`.
 *
 * A test (messages.test.ts) fails if any entry is missing or empty in either
 * language, so the two catalogs can never drift apart.
 */
export const messages = {
  appName: { en: 'Saleem', ar: 'سليم' },
  tagline: {
    en: 'Eat well, move a little — the Egyptian way.',
    ar: 'كُل صح واتحرّك شوية، على الطريقة المصرية.',
  },

  // Navigation
  today: { en: 'Today', ar: 'النهاردة' },
  eat: { en: 'Eat', ar: 'الأكل' },
  move: { en: 'Move', ar: 'الحركة' },
  habits: { en: 'Habits', ar: 'العادات' },

  // Greetings
  goodMorning: { en: 'Good morning', ar: 'صباح الخير' },
  goodAfternoon: { en: 'Good afternoon', ar: 'نهارك سعيد' },
  goodEvening: { en: 'Good evening', ar: 'مساء الخير' },

  // Today
  nextMeal: { en: 'Build your next plate', ar: 'ظبّط طبق أكلتك الجاية' },
  plateMethod: { en: 'The hand plate', ar: 'طبق الإيد' },
  plateIntro: {
    en: 'No scales, no counting. Your own hand measures the right amount.',
    ar: 'من غير ميزان ولا عدّ سعرات. إيدك هي المقياس الصح.',
  },
  swaps: { en: 'Smarter swaps', ar: 'بدائل أذكى' },
  swapsIntro: {
    en: "Keep the food you love. Tweak how much and how it's made.",
    ar: 'خليك على أكلك اللي بتحبه. بس ظبّط الكمية وطريقة العمل.',
  },
  todaysHabit: { en: "This week's one habit", ar: 'عادة الأسبوع' },
  water: { en: 'Water', ar: 'المياه' },
  glasses: { en: 'glasses', ar: 'كباية' },
  addGlass: { en: 'Add a glass', ar: 'زوّد كباية' },
  move10: { en: 'Move 10 minutes', ar: 'اتحرّك ١٠ دقايق' },
  didIt: { en: 'Done', ar: 'خلصت' },
  start: { en: 'Start', ar: 'ابدأ' },
  minutes: { en: 'min', ar: 'دقيقة' },

  // The hand plate
  palm: { en: 'your palm', ar: 'راحة إيدك' },
  fist: { en: 'your fist', ar: 'قبضة إيدك' },
  cupped: { en: 'a cupped hand', ar: 'كف إيدك' },
  thumb: { en: 'your thumb', ar: 'إبهامك' },
  protein: { en: 'Protein', ar: 'بروتين' },
  veg: { en: 'Vegetables', ar: 'خضار' },
  carbs: { en: 'Carbs', ar: 'نشويات' },
  fats: { en: 'Fats', ar: 'دهون' },

  // Dishes
  why: { en: 'Why', ar: 'ليه' },

  // Habits
  streak: { en: 'day streak', ar: 'يوم ورا التاني' },
  pickHabit: { en: 'Pick one to focus on', ar: 'اختار واحدة تركّز عليها' },

  // Move
  rounds: { en: 'rounds', ar: 'جولات' },
  rest: { en: 'Rest', ar: 'راحة' },
  go: { en: 'Go', ar: 'يلا' },
  pause: { en: 'Pause', ar: 'وقفة' },
  workoutDone: {
    en: "Nice — that's movement in the bank.",
    ar: 'تمام — ده مجهود اتسجّل في رصيدك.',
  },
  close: { en: 'Close', ar: 'إغلاق' },
  moveIntro: {
    en: 'Short and at home. No gym, no equipment.',
    ar: 'قصيرة وفي البيت. من غير جيم ولا أدوات.',
  },

  // Safety note
  note: { en: 'Good to know', ar: 'معلومة تفيدك' },
  safety: {
    en: 'Saleem gives general, science-based guidance — not medical advice. If you have diabetes, pregnancy, or any health condition, check with your doctor before changing your diet.',
    ar: 'سليم بيقدّم نصايح عامة مبنية على العلم — مش بديل عن الدكتور. لو عندك سكر، أو حامل، أو أي حالة صحية، استشير دكتورك قبل ما تغيّر نظام أكلك.',
  },

  // Settings
  settings: { en: 'Settings', ar: 'الإعدادات' },
  language: { en: 'Language', ar: 'اللغة' },
  theme: { en: 'Theme', ar: 'المظهر' },
  themeDark: { en: 'Dark', ar: 'غامق' },
  themeLight: { en: 'Light', ar: 'فاتح' },
  accent: { en: 'Accent', ar: 'اللون' },
  waterGoal: { en: 'Water goal', ar: 'هدف المياه' },
  goals: { en: 'Goals', ar: 'الأهداف' },
  languageAndLook: { en: 'Language & look', ar: 'اللغة والمظهر' },
  switchToArabic: { en: 'العربية', ar: 'العربية' },
  switchToEnglish: { en: 'English', ar: 'English' },
} as const satisfies Record<string, Localized>;

export type MessageId = keyof typeof messages;
