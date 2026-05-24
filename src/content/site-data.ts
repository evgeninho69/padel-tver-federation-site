export interface NavSection {
  href: string;
  title: string;
  subtitle: string;
  heroImage: string;
  rubricImage: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string): string => `${basePath}${path}`;

export const inputImages = {
  architecture: withBasePath("/images/input/hero-architecture.png"),
  courtInterior: withBasePath("/images/input/court-interior.png"),
  liveMatch: withBasePath("/images/input/live-match.png"),
  duoAction: withBasePath("/images/input/duo-action.png"),
  racketCloseup: withBasePath("/images/input/racket-closeup.png"),
  neonMainCourtBackground: withBasePath("/images/input/neon-main-court-background.png"),
  federationLogo: withBasePath("/images/input/federation-logo-tver.png"),
  federationLogoMark: withBasePath("/images/input/federation-logo-mark.png"),
} as const;

export const navSections: NavSection[] = [
  {
    href: "/o-federacii",
    title: "О федерации",
    subtitle: "Миссия, команда и развитие падела в регионе",
    heroImage: inputImages.duoAction,
    rubricImage: inputImages.architecture,
  },
  {
    href: "/kalendar-turnirov",
    title: "Календарь турниров",
    subtitle: "Актуальные старты, форматы и регистрация",
    heroImage: inputImages.liveMatch,
    rubricImage: inputImages.courtInterior,
  },
  {
    href: "/rejting",
    title: "Рейтинг игроков",
    subtitle: "Очки, динамика и положение в региональной таблице",
    heroImage: inputImages.duoAction,
    rubricImage: inputImages.racketCloseup,
  },
  {
    href: "/sbornaya",
    title: "Сборная области",
    subtitle: "Кандидаты, состав и путь к крупным стартам",
    heroImage: inputImages.duoAction,
    rubricImage: inputImages.liveMatch,
  },
  {
    href: "/dokumenty",
    title: "Документы",
    subtitle: "Положения, стандарты, протоколы и отчеты",
    heroImage: inputImages.racketCloseup,
    rubricImage: inputImages.architecture,
  },
  {
    href: "/antidoping",
    title: "Антидопинг",
    subtitle: "Честная игра, разъяснения и материалы РУСАДА",
    heroImage: inputImages.courtInterior,
    rubricImage: inputImages.racketCloseup,
  },
  {
    href: "/ploshadki",
    title: "Площадки ROX",
    subtitle: "Корты, расписание, тренировки и семейный досуг",
    heroImage: inputImages.courtInterior,
    rubricImage: inputImages.liveMatch,
  },
  {
    href: "/o-padele",
    title: "О паделе",
    subtitle: "Правила, форматы и как быстро начать играть",
    heroImage: inputImages.liveMatch,
    rubricImage: inputImages.duoAction,
  },
  {
    href: "/kontakty",
    title: "Контакты",
    subtitle: "Связь с федерацией и запись на консультацию",
    heroImage: inputImages.architecture,
    rubricImage: inputImages.courtInterior,
  },
];

export const heroFacts = [
  { label: "Турниров в сезоне", value: "12" },
  { label: "Игроков в рейтинге", value: "284" },
  { label: "Проведенных матчей", value: "416" },
  { label: "Семейных спортивных дней", value: "38" },
] as const;

export const federationDocuments = [
  {
    id: "doc-1",
    title: "Стандарты проведения региональных турниров",
    category: "Федеральные стандарты" as const,
    fileSizeBytes: 1642000,
    uploadedAt: "2026-03-11T09:00:00.000Z",
    downloadUrl: "https://example.org/federation-standards.pdf",
    fz329Compliant: true,
  },
  {
    id: "doc-2",
    title: "Антидопинговый регламент 2026",
    category: "Антидопинг" as const,
    fileSizeBytes: 772000,
    uploadedAt: "2026-04-02T11:15:00.000Z",
    downloadUrl: "https://example.org/anti-doping-2026.pdf",
    fz329Compliant: true,
  },
  {
    id: "doc-3",
    title: "Отчет аудита региональной федерации",
    category: "Аудиторские отчеты" as const,
    fileSizeBytes: 2163000,
    uploadedAt: "2026-05-18T10:05:00.000Z",
    downloadUrl: "https://example.org/audit-report.pdf",
    fz329Compliant: true,
  },
  {
    id: "doc-4",
    title: "Региональное положение о рейтинговых очках",
    category: "Региональные положения" as const,
    fileSizeBytes: 1295000,
    uploadedAt: "2026-05-01T12:30:00.000Z",
    downloadUrl: "https://example.org/regional-rating.pdf",
    fz329Compliant: true,
  },
] as const;

export const ratingPlayers = [
  {
    id: "p-1",
    firstName: "Иван",
    lastName: "Смирнов",
    gender: "MALE" as const,
    uniNumber: "RU-TV-23011",
    regionalRatingPoints: 980,
    activeTournaments: 3,
  },
  {
    id: "p-2",
    firstName: "Алексей",
    lastName: "Васильев",
    gender: "MALE" as const,
    uniNumber: "TEMP-TV-9001",
    regionalRatingPoints: 730,
    activeTournaments: 2,
  },
  {
    id: "p-3",
    firstName: "Екатерина",
    lastName: "Козлова",
    gender: "FEMALE" as const,
    uniNumber: "RU-TV-19044",
    regionalRatingPoints: 1025,
    activeTournaments: 4,
  },
  {
    id: "p-4",
    firstName: "Анна",
    lastName: "Петрова",
    gender: "FEMALE" as const,
    uniNumber: "TEMP-TV-9015",
    regionalRatingPoints: 640,
    activeTournaments: 1,
  },
] as const;

export const antiDopingPrinciples = [
  "Чистый спорт и уважение к сопернику",
  "Личная ответственность спортсмена за состав препаратов",
  "Своевременная консультация с врачом перед турниром",
  "Открытая коммуникация с тренером и судейской коллегией",
] as const;

export const contactInfo = {
  phone: "+7 (4822) 60-69-09",
  address: "г. Тверь, пос. Сахарово, ул. Центральная, 1",
  email: "info@padel-tver.ru",
};
