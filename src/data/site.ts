import { existsSync } from 'node:fs';
import { join } from 'node:path';
import cv, { slugify } from './cv';
import { url } from '../lib/url';

// Site copy that is not CV data. Replace placeholders with the user (see state.json blockers).
export const site = {
  hook: 'BSL-3 lab rigour and a designer\u2019s eye, turning complex science into clear, aligned CMC documents.',
  hookIsPlaceholder: false,
  location: 'Innsbruck',
  // TODO(user): public contact email. "Get in touch" (mailto:) stays hidden while empty.
  email: 'nguyenkhanhlinh1706@gmail.com',
  // Home route strip (DELTA-01). The `now` cell gets the signal fill.
  route: [
    { code: 'VN', years: 'Until 2019', place: 'Hà Nội' },
    { code: 'NP', years: '2018', place: 'Kathmandu' },
    { code: 'KR', years: '2019–2021', place: 'Seoul' },
    { code: 'AT', years: '2021–NOW', place: 'Innsbruck', now: true },
  ],
  threeMtTitle: 'My PhD in 3 minutes',
  featureCaption: 'My PhD in three minutes. Cover art designed by me.',
  featureAlt:
    'Hand-drawn illustration of a person defusing a time bomb, used to explain my PhD research in a three-minute talk.',
  chapters: [
    { title: 'Research', text: 'Where I learned to ask precise questions.' },
    { title: 'Design & communication', text: 'Where I learned to make complex ideas clear.' },
    { title: 'Regulatory affairs CMC', text: 'Where I turn science into submissions.' },
  ],
  // Story page copy (DELTA-02). Written with the user; nothing here is invented. Empty slots are hidden by story.astro.
  story: {
    label: 'Story',
    h1: 'Every new place showed me who I am',
    intro:
      'Someone who helps science cross borders. Four countries, many teams, one habit: I find out what each side needs, then translate. That is what cross-functional regulatory work asks for every day. Today I work in Regulatory Affairs CMC at Novartis. Here is the route that trained me.',
    chapters: [
      {
        years: 'Childhood–2019',
        code: 'VN',
        title: 'Every new place taught me to listen first',
        role: 'From biology graduate to environmental project officer and designer',
        place: 'Hà Nội',
        body:
          "Every three or four years, my parents moved me to a new school. I learned early to make friends fast and read a room quickly.\n\nAt 15, I left my rural hometown for Hanoi and one of Vietnam’s most competitive high schools. Every summer I went back home. I sat in the garden and watched birds and insects for hours. That is where my biology began.\n\nI went on to earn a biology degree and, alongside it, a design diploma. I also led a project group in a student environmental club. I brought together students from different universities, raised funds and ran campaigns for young people. This was when one-use plastic was normal and bringing your own bag looked odd.\n\nI then became a project officer at an environmental NGO, C&E. There I ran larger campaigns, and sponsors expected clear numbers and reports. The work took me across Vietnam, to Singapore and Norway, and to Nepal for four months. I met experts from many countries.\n\nAt PATH, an international health organisation, I worked on health and HIV campaigns. I advised both the technical and the marketing teams. My job was to turn complex content into materials people could understand and use.",
        takeaway:
          'Starting over many times taught me to adapt fast, reach out first and listen before I speak. In science and in regulated work, the gap between what people ask for and what they need is where the real work happens. I close that gap.',
      },
      {
        years: '2019–2021',
        code: 'KR',
        title: 'Being the newcomer taught me how to learn better',
        role: 'MSc student researcher',
        place: 'Seoul',
        body:
          "I had a biology degree, but my career had gone through environmental campaigns and design. I wanted to go back to what I do best, which is learning. I also wanted to give the child who watched bugs in the garden a real chance.\n\nSo while working as a graphic designer, I applied for a master’s scholarship, and I won it. I moved to Seoul for an MSc at the Korea Institute of Science and Technology (KIST). I joined an industrial R&D lab as the newcomer.\n\nStarting from zero was a disadvantage, but it was also an advantage. I had no habits to defend, so I asked questions early and learned fast. I worked on microbial engineering projects. I built reporting workflows and presented results in team sessions. I also served as president of the Vietnamese student association, where I organised networking, academic support and community events.",
        takeaway:
          'Being the newcomer showed me who I am. I ask early, document clearly and make my work easy for others to reuse.',
      },
      {
        years: '2021–NOW',
        code: 'AT',
        title: 'From the lab to the dossier',
        role: 'Scientific project officer and PhD candidate, then regulatory affairs CMC postgraduate',
        place: 'Graz, Schaftenau',
        body:
          "A weak passport taught me documentation the hard way. Every visa meant a stack of documents, and every document meant several offices to satisfy.\n\nThat habit followed me into the lab. From 2021 to mid-2025, I worked in the BSL-3 team at the Medical University of Graz, for nearly four years. I designed and documented experiments that moved between BSL-2 and BSL-3, where the working rules differ. Each move had to be written down clearly enough that another team could repeat it safely.\n\nI mentored two master’s students. I am completing my PhD, due in June 2027. A paper on which I am joint first author is accepted in Emerging Infectious Diseases.\n\nAfter the lab, I took a break to learn German, and I am now at B1. In January 2026, I joined Novartis as a regulatory affairs CMC postgraduate. I am learning to draft and review Module 3 dossiers, and I will rotate through Biologics, Cell and Gene Therapy, and Small Molecules.",
        takeaway:
          'A visa file is never just a checklist. It means knowing what the authority asks and which gap you still have to fill. Moving countries taught me to record everything early and prepare what I might need later. That is how I see a dossier in regulatory affairs CMC.',
      },
    ],
    // Standalone card after the chapters (not part of the route). Link slot stays empty until the Universal Architect card/repo is public.
    aside: {
      label: 'Outside of work',
      title: 'I learned to use AI properly instead of fearing it',
      body:
        'I have a love-hate relationship with AI. I love new technology and learning new things. I also worry about its environmental and ethical cost. So I decided that staying afraid would not help. Learning to use it responsibly would.\n\nI stopped only prompting and started learning to build. I taught myself to code as a beginner, with Automate the Boring Stuff with Python as my bedtime reading. Then I designed Universal Architect, a reusable way to run AI projects that saves tokens, costs less and avoids repeating work. This site was built with it.',
      // Short teaser for the Home card; links to the full card on /story.
      homeText:
        'I love new technology and worry about its cost, so I learned to build with AI properly. A beginner who ships: Universal Architect saves tokens, costs less and avoids repeating work.',
    },
    whyCmc: {
      label: 'Why CMC',
      text: 'CMC is where science, manufacturing, quality and health authorities meet, and each speaks its own language. I translate between them. I bring nearly four years in a BSL-3 team, where precise records are part of safety, and Module 3 drafting for drug substance and drug product. My goal is simple: help science reach patients through submissions that are clear and aligned.',
    },
  },
  // /ai page: intro from story.aside.body; the cards are every cv.json project tagged 'AI'.
  aiPage: {
    label: 'Outside of work',
    h1: 'My AI journey',
    workTitle: 'Selected AI work',
  },
  // Files are generated by .ai/skills/update-cv/scripts/export.py into public/downloads/.
  downloads: [
    { label: 'DOCX', kind: 'Word document', ext: 'docx' },
    { label: 'PDF', kind: 'PDF document', ext: 'pdf' },
    { label: 'JSON', kind: 'structured data', ext: 'json' },
  ]
    .map((d) => ({ ...d, file: `/downloads/cv-${slugify(cv.name.split(',')[0])}.${d.ext}` }))
    // Hide a download until its export file exists (DELTA-01).
    .filter((d) => existsSync(join(process.cwd(), 'public', d.file)))
    .map((d) => ({ ...d, href: url(d.file) })),
  // Portfolio filter chips. Each chip groups cv.json project tags; every tag must appear in one group (checked at build).
  portfolioFilters: [
    { id: 'science', label: 'Science', tags: ['melioidosis', 'infectious disease', 'molecular microbiology', 'BSL-3', 'synthetic biology', 'microbial engineering'] },
    { id: 'communication', label: 'Communication', tags: ['science communication', 'public speaking', 'training', 'health communication', 'sustainability'] },
    { id: 'design', label: 'Design', tags: ['editorial design', 'design'] },
    { id: 'tech', label: 'Tech & AI', tags: ['Astro', 'automation', 'AI'] },
  ],
  portfolioIntro: 'Research, design and communication projects. Pick a chip to filter; all work without JavaScript.',
  // Links to routes without a page in src/pages are hidden by Nav.astro (DELTA-01). Contact dropped in M8 (no page, no public email).
  nav: [
    { label: 'Story', href: '/story' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'CV', href: '/cv' },
    { label: 'AI journey', href: '/ai' },
  ],
};
