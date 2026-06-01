import type { Dish, Habit, Localized, PortionItem, Workout } from '@/types/domain';

/*
 * Saleem's bilingual content, ported faithfully from the design prototype
 * (saleem-i18n.js). Science-based (plate method / hand portions; WHO + Egyptian
 * dietary guidance on portion control, added sugar, activity) and positively
 * framed. To add a dish / habit / workout, append a typed entry here with both
 * `en` and `ar` filled in — the i18n completeness test enforces both.
 */

// ---- The hand-portion plate ----------------------------------------------
export const PLATE: PortionItem[] = [
  {
    id: 'protein',
    key: 'protein',
    hand: 'palm',
    color: '#e0795a',
    icon: 'protein',
    tip: {
      en: 'Eggs, ful, chicken, fish, meat, cheese, lentils.',
      ar: 'بيض، فول، فراخ، سمك، لحمة، جبنة، عدس.',
    },
  },
  {
    id: 'veg',
    key: 'veg',
    hand: 'fist',
    color: '#3fb27f',
    icon: 'veg',
    tip: {
      en: 'Salad, molokhia, cooked greens, tomato, cucumber. Fill up here.',
      ar: 'سلطة، ملوخية، خضار مطبوخة، طماطم، خيار. اشبع من هنا.',
    },
  },
  {
    id: 'carbs',
    key: 'carbs',
    hand: 'cupped',
    color: '#d9a23b',
    icon: 'carbs',
    tip: {
      en: 'Eish baladi, rice, koshari, pasta, potato. One cupped hand.',
      ar: 'عيش بلدي، رز، كشري، مكرونة، بطاطس. كف إيد واحد.',
    },
  },
  {
    id: 'fats',
    key: 'fats',
    hand: 'thumb',
    color: '#c9a86a',
    icon: 'fats',
    tip: {
      en: 'Oil, tahina, butter, nuts. A thumb is plenty.',
      ar: 'زيت، طحينة، زبدة، مكسرات. قد إبهامك يكفّي.',
    },
  },
];

// ---- Egyptian dishes: smarter swaps --------------------------------------
export const DISHES: Dish[] = [
  {
    id: 'ful',
    name: { en: 'Ful medames', ar: 'فول مدمّس' },
    icon: 'bowl',
    tone: 'good',
    verdict: { en: 'A champion — protein + fiber.', ar: 'بطل — بروتين وألياف.' },
    swap: {
      en: 'Go easy on the oil; scoop with whole eish baladi, not white.',
      ar: 'خفّف الزيت؛ وكُله بعيش بلدي مش أبيض.',
    },
    why: {
      en: 'Ful keeps you full for hours and steadies blood sugar. The oil is the only thing to watch.',
      ar: 'الفول بيشبّعك ساعات وبيظبّط السكر في الدم. الزيت بس هو اللي محتاج تنتبه له.',
    },
  },
  {
    id: 'taameya',
    name: { en: "Ta'meya (falafel)", ar: 'طعمية' },
    icon: 'circle',
    tone: 'ok',
    verdict: {
      en: 'Great beans — deep-frying is the catch.',
      ar: 'فول مدشوش جامد — القلي العميق هو المشكلة.',
    },
    swap: {
      en: 'Bake or air-fry it, or keep deep-fried to 2–3 pieces beside ful + salad.',
      ar: 'اعملها في الفرن أو الإيرفراير، أو خليها ٢–٣ قطع مقلية جنب فول وسلطة.',
    },
    why: {
      en: 'The fava base is healthy; deep frying soaks up a lot of oil. Baking keeps the good, drops the grease.',
      ar: 'أساسها الفول صحي؛ بس القلي بيشرب زيت كتير. الفرن بيحافظ على الفايدة ويشيل الدهن.',
    },
  },
  {
    id: 'koshari',
    name: { en: 'Koshari', ar: 'كشري' },
    icon: 'bowl',
    tone: 'ok',
    verdict: { en: "Loved by all — it's mostly carbs.", ar: 'محبوب الجميع — بس أغلبه نشويات.' },
    swap: {
      en: 'Smaller plate, ask for more lentils & chickpeas, less rice/macaroni, easy on fried onions.',
      ar: 'طبق أصغر، زوّد العدس والحمص، قلّل الرز والمكرونة، وخفّف البصل المحمّر.',
    },
    why: {
      en: 'Rice + pasta + bread = three carbs at once. Lentils and chickpeas add protein and slow it down.',
      ar: 'رز + مكرونة + عيش = تلات نشويات مع بعض. العدس والحمص بيزوّدوا بروتين ويبطّئوا الهضم.',
    },
  },
  {
    id: 'molokhia',
    name: { en: 'Molokhia', ar: 'ملوخية' },
    icon: 'leaf',
    tone: 'good',
    verdict: { en: 'Pure green goodness.', ar: 'خير أخضر صافي.' },
    swap: {
      en: 'Enjoy it — just keep the rice/bread to a cupped hand and add a palm of chicken.',
      ar: 'اتفضّل — بس خلي الرز/العيش كف إيد، وزوّد راحة إيد فراخ.',
    },
    why: {
      en: 'Molokhia is rich in fiber, iron and vitamins. The portion of starch beside it is what to size.',
      ar: 'الملوخية مليانة ألياف وحديد وفيتامينات. الكمية اللي جنبها من النشويات هي اللي تتظبط.',
    },
  },
  {
    id: 'mahshi',
    name: { en: 'Mahshi', ar: 'محشي' },
    icon: 'circle',
    tone: 'ok',
    verdict: { en: 'Veg wrap around rice.', ar: 'خضار حوالين رز.' },
    swap: {
      en: '4–5 pieces with a big salad. Mixing some bulgur into the rice stuffing helps.',
      ar: '٤–٥ قطع مع سلطة كبيرة. ولو خلطت برغل مع رز الحشو هيبقى أحسن.',
    },
    why: {
      en: 'The vegetable shell is great; the rice filling is the carb. Bulgur adds fiber and slows it.',
      ar: 'قشرة الخضار ممتازة؛ حشو الرز هو النشويات. البرغل بيزوّد ألياف ويبطّأ الامتصاص.',
    },
  },
  {
    id: 'tea',
    name: { en: 'Tea with sugar', ar: 'شاي بسكر' },
    icon: 'cup',
    tone: 'watch',
    verdict: { en: 'The hidden sugar river.', ar: 'نهر السكر المخفي.' },
    swap: {
      en: 'Drop one spoon every few days. Most people stop tasting the difference at 1 spoon.',
      ar: 'قلّل معلقة كل كام يوم. أغلب الناس مبيحسوش بفرق عند معلقة واحدة.',
    },
    why: {
      en: '3 sugary teas a day can be 9+ spoons — a major source of empty calories and blood-sugar spikes.',
      ar: '٣ كبايات شاي محلّى في اليوم ممكن تبقى ٩ معالق+ — مصدر كبير لسعرات فاضية وارتفاع السكر.',
    },
  },
  {
    id: 'eish',
    name: { en: 'Eish baladi', ar: 'عيش بلدي' },
    icon: 'bread',
    tone: 'good',
    verdict: { en: 'Better than white — still a carb.', ar: 'أحسن من الأبيض — وبرضه نشويات.' },
    swap: {
      en: 'Whole-grain baladi over white fino. Keep to one or two loaves a meal.',
      ar: 'بلدي بالردة أحسن من الفينو الأبيض. خليه رغيف أو اتنين في الوجبة.',
    },
    why: {
      en: 'Baladi bread has more fiber than white bread, but quantity still counts toward your carb portion.',
      ar: 'العيش البلدي فيه ألياف أكتر من الأبيض، بس الكمية بتتحسب من حصة النشويات بتاعتك.',
    },
  },
  {
    id: 'drinks',
    name: { en: 'Soda & juice', ar: 'مشروبات غازية وعصاير' },
    icon: 'cup',
    tone: 'watch',
    verdict: { en: 'Liquid sugar, no fullness.', ar: 'سكر سائل من غير شبع.' },
    swap: {
      en: 'Water, or water with lemon/mint. Eat the fruit whole instead of juicing it.',
      ar: 'مياه، أو مياه بليمون/نعناع. وكُل الفاكهة كاملة بدل ما تعصرها.',
    },
    why: {
      en: "A can of soda can hold 8+ spoons of sugar and doesn't fill you at all — the easiest win to cut.",
      ar: 'علبة الغازي ممكن تبقى ٨ معالق سكر+ ومبتشبّعش خالص — أسهل حاجة تقلّلها.',
    },
  },
];

// ---- Home workouts (no equipment) ----------------------------------------
export const WORKOUTS: Workout[] = [
  {
    id: 'wake',
    name: { en: 'Wake-up 5', ar: 'صحصحة ٥ دقايق' },
    mins: 5,
    rounds: 2,
    blurb: { en: 'A gentle start to move the blood.', ar: 'بداية هادية تحرّك الدم.' },
    moves: [
      { name: { en: 'March in place', ar: 'مشي في المكان' }, secs: 40 },
      { name: { en: 'Arm circles', ar: 'تدوير الذراعين' }, secs: 30 },
      { name: { en: 'Half squats', ar: 'نص سكوات' }, secs: 30 },
      { name: { en: 'Standing twists', ar: 'لف الجذع واقف' }, secs: 30 },
      { name: { en: 'Rest', ar: 'راحة' }, secs: 20, rest: true },
    ],
  },
  {
    id: 'burn',
    name: { en: 'Quick burn 8', ar: 'حرق سريع ٨' },
    mins: 8,
    rounds: 3,
    blurb: { en: 'Gets the heart going. No jumping needed.', ar: 'بيرفع ضربات القلب. من غير نطّ.' },
    moves: [
      { name: { en: 'Fast feet', ar: 'رجل سريعة' }, secs: 30 },
      { name: { en: 'Squats', ar: 'سكوات' }, secs: 30 },
      { name: { en: 'Wall push-ups', ar: 'ضغط على الحيطة' }, secs: 30 },
      { name: { en: 'Knee lifts', ar: 'رفع الركبة' }, secs: 30 },
      { name: { en: 'Rest', ar: 'راحة' }, secs: 30, rest: true },
    ],
  },
  {
    id: 'core',
    name: { en: 'Core & back', ar: 'بطن وضهر' },
    mins: 7,
    rounds: 2,
    blurb: { en: 'Strengthen the middle, ease back pain.', ar: 'قوّي وسطك وريّح ضهرك.' },
    moves: [
      { name: { en: 'Plank (knees ok)', ar: 'بلانك (على الركبة عادي)' }, secs: 30 },
      { name: { en: 'Glute bridge', ar: 'رفع الحوض' }, secs: 40 },
      { name: { en: 'Bird-dog', ar: 'بيرد-دوج' }, secs: 40 },
      { name: { en: 'Dead bug', ar: 'ديد-باج' }, secs: 40 },
      { name: { en: 'Rest', ar: 'راحة' }, secs: 25, rest: true },
    ],
  },
];

// ---- Habits (one at a time) ----------------------------------------------
export const HABITS: Habit[] = [
  {
    id: 'water',
    icon: 'drop',
    name: { en: '8 glasses of water', ar: '٨ كبايات مياه' },
    why: {
      en: 'Thirst often masquerades as hunger. Water first cuts needless snacking.',
      ar: 'العطش بيتلبّس جوع كتير. المياه الأول بتقلّل النقنقة الزيادة.',
    },
  },
  {
    id: 'sugar',
    icon: 'cup',
    name: { en: 'One less sugar in tea', ar: 'سكر أقل في الشاي' },
    why: {
      en: 'The single biggest easy win for most Egyptians. Cut gradually, painlessly.',
      ar: 'أكبر مكسب سهل لمعظم المصريين. قلّل بالتدريج من غير ما تحس.',
    },
  },
  {
    id: 'walk',
    icon: 'walk',
    name: { en: 'A 15-minute walk', ar: 'مشية ١٥ دقيقة' },
    why: {
      en: 'A daily walk after a meal lowers blood sugar and lifts mood. Cheapest medicine there is.',
      ar: 'مشية يومية بعد الأكل بتنزّل السكر وبترفع المزاج. أرخص دوا موجود.',
    },
  },
  {
    id: 'veg',
    icon: 'veg',
    name: { en: 'Veg with every lunch', ar: 'خضار مع كل غدا' },
    why: {
      en: 'Start lunch with salad and you eat less of everything else, automatically.',
      ar: 'ابدأ الغدا بسلطة هتاكل أقل من كل حاجة تانية، من غير ما تحس.',
    },
  },
  {
    id: 'plate',
    icon: 'plate',
    name: { en: 'Smaller plate, sit to eat', ar: 'طبق أصغر، وكُل وانت قاعد' },
    why: {
      en: 'A smaller plate and eating slowly, seated, lets fullness catch up before you overeat.',
      ar: 'طبق أصغر وأكل بالراحة وانت قاعد بيخلّي إحساس الشبع يوصل قبل ما تتخم.',
    },
  },
];

// ---- Rotating facts -------------------------------------------------------
export const FACTS: Localized[] = [
  {
    en: "You don't have to give up Egyptian food to get healthy — portion and prep matter more than the dish.",
    ar: 'مش لازم تسيب الأكل المصري عشان تبقى صحي — الكمية وطريقة العمل أهم من الأكلة نفسها.',
  },
  {
    en: "Fixing the sugar in your tea may matter more than any 'diet'.",
    ar: "تظبيط السكر في الشاي ممكن يفرق أكتر من أي 'رجيم'.",
  },
  {
    en: 'A walk after a meal lowers the blood-sugar spike. Ten minutes is enough to help.',
    ar: 'مشية بعد الأكل بتقلّل ارتفاع السكر. عشر دقايق تكفّي.',
  },
  {
    en: 'Half your plate vegetables is the simplest rule that works for any meal.',
    ar: 'نص الطبق خضار — أبسط قاعدة وبتنفع مع أي وجبة.',
  },
  {
    en: 'Eat slowly. Fullness takes about 20 minutes to reach your brain.',
    ar: 'كُل بالراحة. الشبع بياخد حوالي ٢٠ دقيقة عشان يوصل لدماغك.',
  },
];
