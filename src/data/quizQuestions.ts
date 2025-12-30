export interface QuizQuestion {
  id: number;
  category: string;
  categoryEn: string;
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correctAnswer: number; // 0-based index
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "Maantiede",
    categoryEn: "Geography",
    question: "Missä Lapin kunnassa Levi sijaitsee?",
    questionEn: "In which Lapland municipality is Levi located?",
    options: ["Rovaniemellä", "Sodankylässä", "Kittilässä"],
    optionsEn: ["Rovaniemi", "Sodankylä", "Kittilä"],
    correctAnswer: 2, // C) Kittilässä
  },
  {
    id: 2,
    category: "Tapahtumat",
    categoryEn: "Events",
    question: "Mikä kansainvälinen suurtapahtuma avaa usein Levin laskettelukauden marraskuussa?",
    questionEn: "Which international major event often opens Levi's ski season in November?",
    options: [
      "Mäkihypyn maailmancup",
      "Alppihiihdon maailmancupin pujottelu",
      "Lumilautailun X-Games",
    ],
    optionsEn: [
      "Ski Jumping World Cup",
      "Alpine Skiing World Cup Slalom",
      "Snowboarding X-Games",
    ],
    correctAnswer: 1, // B) Alppihiihdon maailmancupin pujottelu
  },
  {
    id: 3,
    category: "Nähtävyydet",
    categoryEn: "Attractions",
    question: "Mikä kuuluisa \"kuvauspaikka\" sijaitsee Levin rinteillä lähellä huippua, G2-hissin yläasemalla?",
    questionEn: "What famous \"photo spot\" is located on Levi's slopes near the top, at the G2 lift upper station?",
    options: ["Muumipapan torni", "Joulupukin mökki (Santa's Cabin)", "Angry Birds -puisto"],
    optionsEn: ["Moominpappa's Tower", "Santa's Cabin", "Angry Birds Park"],
    correctAnswer: 1, // B) Joulupukin mökki
  },
  {
    id: 4,
    category: "Faktat",
    categoryEn: "Facts",
    question: "Mikä on Levitunturin huipun korkeus merenpinnasta?",
    questionEn: "What is the height of Levi fell's peak above sea level?",
    options: ["531 metriä", "718 metriä", "1029 metriä"],
    optionsEn: ["531 meters", "718 meters", "1029 meters"],
    correctAnswer: 0, // A) 531 metriä
  },
  {
    id: 5,
    category: "Palvelut",
    categoryEn: "Services",
    question: "Mikä legendaarinen ravintola- ja viihdebrändi on erottamaton osa Levin yöelämää ja majoitusta?",
    questionEn: "Which legendary restaurant and entertainment brand is an integral part of Levi's nightlife and accommodation?",
    options: ["Villi Vanki", "Riemukas Reindeer", "Hullu Poro"],
    optionsEn: ["Wild Prisoner", "Joyful Reindeer", "Crazy Reindeer"],
    correctAnswer: 2, // C) Hullu Poro
  },
  {
    id: 6,
    category: "Kulttuuri",
    categoryEn: "Culture",
    question: "Mikä on Lapin alkuperäiskansan nimi?",
    questionEn: "What is the name of Lapland's indigenous people?",
    options: ["Inuiitit", "Saamelaiset", "Eskimot"],
    optionsEn: ["Inuit", "Sami", "Eskimos"],
    correctAnswer: 1, // B) Saamelaiset
  },
  {
    id: 7,
    category: "Luonto",
    categoryEn: "Nature",
    question: "Mikä on \"Levi Black\"?",
    questionEn: "What is \"Levi Black\"?",
    options: [
      "Suomen vaativin murtomaahiihtolatu",
      "Alueella elävä harvinainen musta poro",
      "Jyrkkä musta laskettelurinne, jossa kisataan maailmancupia",
    ],
    optionsEn: [
      "Finland's most demanding cross-country ski trail",
      "A rare black reindeer living in the area",
      "A steep black ski slope where World Cup races are held",
    ],
    correctAnswer: 2, // C) Jyrkkä musta laskettelurinne
  },
  {
    id: 8,
    category: "Ympäristö",
    categoryEn: "Environment",
    question: "Mikä suuri ja suosittu kansallispuisto sijaitsee aivan Levin länsipuolella?",
    questionEn: "Which large and popular national park is located just west of Levi?",
    options: [
      "Urho Kekkosen kansallispuisto",
      "Pyhä-Luoston kansallispuisto",
      "Pallas-Yllästunturin kansallispuisto",
    ],
    optionsEn: [
      "Urho Kekkonen National Park",
      "Pyhä-Luosto National Park",
      "Pallas-Yllästunturi National Park",
    ],
    correctAnswer: 2, // C) Pallas-Yllästunturin kansallispuisto
  },
  {
    id: 9,
    category: "Kesäaktiviteetit",
    categoryEn: "Summer Activities",
    question: "Kun lumet sulavat, miksi Levin rinteet muuttuvat kesäisin?",
    questionEn: "When the snow melts, what do Levi's slopes become in summer?",
    options: [
      "Alamäkipyöräilykeskukseksi (Levi Bike Park)",
      "Suureksi golfkentäksi",
      "Vesipuistoksi",
    ],
    optionsEn: [
      "A downhill biking center (Levi Bike Park)",
      "A large golf course",
      "A water park",
    ],
    correctAnswer: 0, // A) Alamäkipyöräilykeskus
  },
  {
    id: 10,
    category: "Rinteiden määrä",
    categoryEn: "Number of Slopes",
    question: "Kuinka monta laskettelurinnettä Levillä on suunnilleen?",
    questionEn: "Approximately how many ski slopes does Levi have?",
    options: ["Noin 25", "Noin 43", "Yli 60"],
    optionsEn: ["About 25", "About 43", "Over 60"],
    correctAnswer: 1, // B) Noin 43
  },
];

export const getResultMessage = (score: number, total: number, lang: "fi" | "en" = "fi") => {
  const percentage = (score / total) * 100;
  
  if (lang === "en") {
    if (percentage === 100) return { title: "Perfect!", message: "You are a true Levi expert!" };
    if (percentage >= 70) return { title: "Excellent!", message: "You know Levi very well." };
    if (percentage >= 40) return { title: "Good start!", message: "You've been to Levi before." };
    return { title: "Keep exploring!", message: "Levi is waiting to be discovered by you!" };
  }
  
  if (percentage === 100) return { title: "Täydellistä!", message: "Olet todellinen Levi-asiantuntija!" };
  if (percentage >= 70) return { title: "Mahtavaa!", message: "Tunnet Levin hyvin." };
  if (percentage >= 40) return { title: "Hyvä alku!", message: "Olet käynyt Levillä." };
  return { title: "Levi odottaa!", message: "Levi odottaa vielä tutustumistasi!" };
};
