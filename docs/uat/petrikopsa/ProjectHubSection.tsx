/** Valmis React/Tailwind-osio petrikopsa.comiin; ei käytössä PK18-sovelluksessa. */
const content = {
  fi: {
    title: "Strategic PMO, SAFe ja AI – projektitiimin tueksi Kokkolassa tai etänä",
    lead: "Yhdistä projektin johtaminen, tiimin osaaminen ja toimiva työympäristö. Petri Kopsa tukee hankkeen ohjausta ja käytännön toteutusta; Pitkänsillankatu 18:n Project Hub tarjoaa tilat tiimille.",
    services: [
      ["Strategic PMO ja hankejohto", "Tilannekuva, priorisointi, päätöksenteon rytmi ja hankkeen etenemisen seuranta – asiakkaan tavoitteista sovittavaksi kokonaisuudeksi."],
      ["SAFe-valmennus ja työpajat", "Projektitiimin toimintatavat, yhteistyö ja käytännön työpajat. Viralliset sertifiointikurssit löytyvät erikseen nykyisestä kurssivalikoimasta."],
      ["AI-konsultointi", "Tunnista tiimin työn kannalta hyödylliset käyttökohteet ja etene rajattuun kokeiluun, huomioiden organisaation tietoturva- ja tiedonkäsittelyvaatimukset."],
    ],
    venue: "Project Hub – Pitkänsillankatu 18", venueText: "Katutason projektitoimisto ja pohjakerroksen tiimitilat pitkäaikaiseen käyttöön, laajuus ja saatavuus sovitaan. Konsultointi, tilavuokra ja majoitus hinnoitellaan erikseen.",
    contact: "Keskustellaan projektisi tarpeesta", space: "Tutustu tiloihin ja vuokra-arvioon", short: "Kokoukset ja juhlat – Terassitalo", stay: "Corporate Housing – 69 m² kaksio",
  },
  sv: {
    title: "Strategic PMO, SAFe och AI – stöd för projektteam i Karleby eller på distans",
    lead: "Kombinera projektledning, teamets kompetens och en fungerande arbetsmiljö. Petri Kopsa stöder projektstyrning och praktiskt genomförande; Project Hub på Pitkänsillankatu 18 erbjuder lokaler för teamet.",
    services: [
      ["Strategic PMO och projektledning", "Lägesbild, prioritering, beslutsrytm och uppföljning av projektets framsteg – en helhet som avtalas utifrån kundens mål."],
      ["SAFe-coachning och workshoppar", "Teamets arbetssätt, samarbete och praktiska workshoppar. Officiella certifieringskurser finns separat i det nuvarande kursutbudet."],
      ["AI-konsultering", "Identifiera relevanta användningsfall och genomför ett avgränsat försök med hänsyn till organisationens krav på informationssäkerhet och datahantering."],
    ],
    venue: "Project Hub – Pitkänsillankatu 18", venueText: "Projektkontor på gatuplan och teamutrymmen på nedre våningen för längre hyrestider. Omfattning och tillgänglighet avtalas. Konsultering, lokalhyra och boende prissätts separat.",
    contact: "Diskutera projektets behov", space: "Se lokalen och hyresuppskattningen", short: "Möten och fester – Terassitalo", stay: "Corporate Housing – möblerad tvårummare, 69 m²",
  },
  en: {
    title: "Strategic PMO, SAFe and AI – support for project teams in Kokkola or remotely",
    lead: "Combine project leadership, team capability and a practical working environment. Petri Kopsa supports project governance and delivery; the Project Hub at Pitkänsillankatu 18 provides space for the team.",
    services: [
      ["Strategic PMO and project leadership", "Shared situational awareness, prioritisation, a decision-making rhythm and delivery tracking – a scope agreed around the client’s goals."],
      ["SAFe coaching and workshops", "Team practices, collaboration and practical workshops. Official certification courses remain separately available in the existing course catalogue."],
      ["AI consulting", "Identify useful team-level use cases and run a bounded pilot while respecting the organisation’s information-security and data-handling requirements."],
    ],
    venue: "Project Hub – Pitkänsillankatu 18", venueText: "A street-level project office and lower-floor team rooms for longer rentals; scope and availability are agreed separately. Consulting, space rental and accommodation are priced separately.",
    contact: "Discuss your project’s needs", space: "Explore the space and rental estimate", short: "Meetings and events – Terassitalo", stay: "Corporate Housing – furnished 69 m² apartment",
  },
} as const;

export default function ProjectHubSection({ lang = "fi", contactHref = "/yhteystiedot" }: { lang?: keyof typeof content; contactHref?: string }) {
  const t = content[lang];
  const suffix = lang === "fi" ? "" : `/${lang}`;
  return (
    <section id="strategic-pmo" aria-labelledby="strategic-pmo-title" className="bg-slate-950 px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="strategic-pmo-title" className="max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">{t.title}</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">{t.lead}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.services.map(([title, body]) => <article key={title} className="rounded-2xl border border-slate-700 p-6"><h3 className="text-xl font-semibold text-teal-300">{title}</h3><p className="mt-3 leading-relaxed text-slate-200">{body}</p></article>)}
        </div>
        <div className="mt-10 rounded-2xl bg-slate-900 p-6 sm:p-8">
          <h3 className="text-2xl font-semibold">{t.venue}</h3>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-200">{t.venueText}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={contactHref} className="inline-flex min-h-12 items-center rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950">{t.contact}</a>
            <a href={`https://pitkansillankatu18.com${suffix}#tilapaketit`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-slate-500 px-6 py-3 font-semibold">{t.space}</a>
          </div>
        </div>
        <ul className="mt-8 flex flex-col gap-4 text-teal-200 sm:flex-row sm:flex-wrap sm:gap-8">
          <li><a href={`https://terassitalo.com${suffix}/varauskalenteri`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t.short}</a></li>
          <li><a href={`https://pitkansillankatu33.com${suffix}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t.stay}</a></li>
        </ul>
      </div>
    </section>
  );
}
