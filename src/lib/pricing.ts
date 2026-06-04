export const ALV_COMMERCIAL = 0.255; // Coworking
export const FIXED_COST_PER_MONTH = 1371.5;

// Coworking (Terassitalo) komponenttihinnat
export const COWORKING = {
  day: 350,           // €/vrk listahinta (haarukka 300–450)
  week: 1200,         // €/viikko (haarukka 900–1500)
  projectMonth: 2500, // €/kk projektitoimisto (haarukka 2500–4000)
  vat: ALV_COMMERCIAL,
};

// Yhdistelmäpaketti = Coworking + EH1 (PK33), alennettu
export const BUNDLE = { day: 550, threeDays: 1000, week: 1300, month: 2900 };

// VE2-jako (tavoite vs realistinen)
export const VE2 = {
  commercial:  { area: 131, target: 2100, realistic: [1300, 1600] as const },
  residential: { area: 94,  target: 1800, realistic: [1400, 1800] as const },
  totalTarget: 3900, totalRealistic: [2700, 3200] as const,
};

// Tuottolaskuri
export const PURCHASE_PRICE = 119000;
export const MAINTENANCE = 832.5; // €/kk vastike
export const RENT_MIN = 1200;
export const RENT_MAX = 2500;
export const RENT_DEFAULT = 1800;

// Hotellivertailun referenssit (säädettävissä)
export const HOTEL = { nightPerPerson: 120, meetingRoomPerDay: 200 };

// EXECUTIVE HOUSING – laajennettava lista.
export type EHUnit = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  nightlyRate: number;
  vat: number;
  external: boolean;       // kumppanin kohde?
  link: string | null;     // sivustolinkki (vain EH1)
  headlineOnly: boolean;   // true = vain nimi/kapasiteetti/hinta, ei yksityiskohtia
  featuresKey: string;     // translations-avain features-taulukolle (esim. "ehFeaturesEh1")
};

export const EXECUTIVE_HOUSING: EHUnit[] = [
  {
    id: "eh1",
    name: "Executive Suite",
    location: "Pitkänsillankatu 33, Kokkolan keskusta",
    capacity: 4,
    nightlyRate: 120,
    vat: 0,
    external: false,
    link: "https://pitkansillankatu33.com",
    headlineOnly: false,
    featuresKey: "ehFeaturesEh1",
  },
  {
    id: "eh2",
    name: "Merenrantakiinteistö",
    location: "Kokkola (merenranta)",
    capacity: 6,
    nightlyRate: 300,
    vat: 0,
    external: false,
    link: null,
    headlineOnly: true,
    featuresKey: "ehFeaturesEh2",
  },
  {
    id: "eh3",
    name: "Kokkolan vanhakaupunki – Neristan",
    location: "Neristan, Kokkola (kumppani)",
    capacity: 4, // TODO: korvaa ystävän AirBnB-ilmoituksen kapasiteetilla
    nightlyRate: 180, // TODO: paikkamerkki (kesäarvio 150–200); korvaa ilmoituksen hinnalla
    vat: 0,
    external: true,
    link: null,
    headlineOnly: true,
    featuresKey: "ehFeaturesEh3",
  },
  // EH4+ lisätään tähän samalla kaavalla.
];
