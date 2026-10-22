/* Sarki Energy page templates — one per route of the current site, plus the pages a
 * site like this is expected to have (case study, article, checkout, account, 404).
 * Templates compose organisms only; copy is real where the current site has it.
 * Built into bundle.js after sarki.js; exported as window.Sarki.templates. */

var S = Sarki;
var NAV = [
  { label: 'Solutions', href: '/services' }, { label: 'Who we serve', href: '/industries' },
  { label: 'Store', href: '/store' }, { label: 'Projects', href: '/projects' }, { label: 'Insights', href: '/learn' }, { label: 'About', href: '/about' }
];
var FOOTER = [
  { title: 'Solutions', links: ['Solar & storage', 'Mini-grids', 'Energy audit', 'Fuel supply', 'EPC & engineering'] },
  { title: 'Store', links: ['Shop all', 'Shipping & returns', 'Store policy', 'FAQ'] },
  { title: 'Company', links: ['About', 'Projects', 'Who we serve', 'Careers'] },
  { title: 'Insights', links: ['Blog', 'Reports', 'News'] }
];
var PRODUCTS = [
  { icon: 'lightning', category: 'Inverters', name: 'Smart Inverter Module 5 kVA', spec: 'Pure sine wave, 48 V, Wi-Fi monitoring', price: 550000 },
  { icon: 'battery-charging', category: 'Battery storage', name: 'Compact Lithium Cell 5 kWh', spec: 'LiFePO4, 6,000 cycles', price: 899000, stock: 'low' },
  { icon: 'solar-panel', category: 'Solar panels', name: 'Monocrystalline Solar Module 550 W', spec: 'Half-cut cells, 21.3% efficiency', price: 285000 },
  { icon: 'solar-panel', category: 'Solar panels', name: 'Bifacial Glass Panel 580 W', spec: 'Dual glass, up to 25% rear gain', price: 420000, badge: { label: 'New' } },
  { icon: 'plug-charging', category: 'Power systems', name: 'Outdoor Energy Hub', spec: 'IP65 enclosure, 10 kWh, hybrid ready', price: 950000 },
  { icon: 'solar-panel', category: 'Solar panels', name: 'Lightweight Flexible Laminate', spec: 'For curved and weak roofs', price: 195000 },
  { icon: 'gauge', category: 'Site equipment', name: 'Digital Flow Meter', spec: 'Diesel and petrol, ±0.5%', price: 380000, stock: 'out' },
  { icon: 'gauge', category: 'Site equipment', name: 'Industrial Pressure Gauge', spec: '0–250 bar, glycerine filled', price: 125000 },
  { icon: 'package', category: 'Site equipment', name: 'Thermal Insulation Wrap', spec: 'For pipes and tanks, 10 m roll', price: 100000 }
];
var ARTICLES = [
  { category: 'Batteries', readTime: '4 min', title: 'Why your inverter battery dies in a year', excerpt: 'Batteries rarely fail on their own. They are killed by deep discharge, heat, and a system never sized for its load.' },
  { category: 'Batteries', readTime: '5 min', title: 'Lithium vs tubular: what the price tag doesn’t tell you', excerpt: 'Tubular looks cheaper on the invoice. Work out the cost per usable kilowatt-hour over ten years and the picture flips.' },
  { category: 'Solar sizing', readTime: '4 min', title: 'How many panels do you actually need?', excerpt: 'Panels are sized by energy, not by count. Here is the arithmetic an installer should do before quoting you.' },
  { category: 'Tariffs', readTime: '4 min', title: 'Is Band A worth the money?', excerpt: 'Twenty hours of grid at a cost-reflective tariff, or a cheaper band plus a generator? The answer is arithmetic.' },
  { category: 'Generators', readTime: '4 min', title: 'The true cost of your generator', excerpt: 'Servicing, depreciation and lost hours put most generators at ₦400–700 per kWh.' },
  { category: 'Installation', readTime: '5 min', title: 'How to spot a bad solar installation', excerpt: 'Most solar disappointment is installation shortcuts, not technology. Here is what to look for.' }
];
var PROJECTS = [
  { icon: 'house', status: 'Delivered', location: 'Abuja', title: 'Home solar systems', text: 'Inverter, battery and rooftop PV for private homes, from board and inverter mounting to commissioning.', brief: 'Installer fixing rails on a tiled roof, late afternoon', points: ['Hybrid inverter and battery bank', 'Rooftop mounting on tile and long-span roofs', 'Surge and earth protection, labelled boards'] },
  { icon: 'solar-panel', status: 'Delivered', location: 'Kano', title: 'Commercial rooftop PV', text: 'Multi-array rooftop PV with parallel inverter walls and lithium storage for a site running long hours.', brief: 'Wide aerial of panel rows on industrial roofing', points: ['Multi-array rooftop PV on long-span roofing', 'Parallel inverter walls with lithium storage', 'Monitoring so output is verified'] },
  { icon: 'flame', status: 'Ongoing', location: 'Kaduna', title: 'CNG infrastructure', text: 'Civil and pipeline works for compressed natural gas: trenching, pipe laying, reinforcement and station build-out.', brief: 'Crew laying HDPE pipe in an open trench', points: ['Trenching and HDPE pipe runs across live sites', 'Civil works for station structures', 'Forecourt and building fit-out'] }
];

function Page(props) {
  return h('div', { className: 'se-page' },
    h(S.SiteHeader, { links: NAV, cartCount: props.cart || 0, className: 'se-header--sticky' }),
    h('main', { id: 'main' }, props.children),
    props.cta === false ? null : h(S.CTABand, props.cta || { title: 'Have a site in mind? We’ll come and measure it.', text: 'Tell us the site. We visit, log your load, and give you numbers you can decide with. Free for homes.', secondaryLabel: 'Chat on WhatsApp' }),
    h(S.SiteFooter, { columns: FOOTER }),
    h(S.WhatsAppButton, { className: 'se-wa--static se-wa--demo' }));
}
function Section(props) {
  return h('section', { className: cx('se-section', props.tone && 'se-section--' + props.tone, props.className), 'aria-label': props.label },
    h('div', { className: 'se-container' }, props.children));
}
function Cols(props) { return h('div', { className: 'se-cols se-cols--' + (props.n || 3) }, props.children); }
var btn = function (variant, label, icon, size) { return h(S.Button, { variant: variant, size: size || 'lg', iconRight: variant === 'accent' ? (icon || 'arrow-right') : null, iconLeft: variant !== 'accent' ? icon : null }, label); };
var productCards = function (list) { return list.map(function (p, i) { return h(S.ProductCard, Object.assign({ key: i }, p)); }); };

/* 1 ── Home  (/) */
function HomeTemplate() {
  return h(Page, { cart: 2 },
    h(S.Hero, { variant: 'home', eyebrow: 'Solar \u00B7 Storage \u00B7 Fuel \u00B7 Engineering', title: 'Energy you can plan around.',
      lead: 'Solar and battery systems, fuel supply, and the engineering that connects them, for homes, businesses and industry across Nigeria. We measure your site first, build to standard, and stay accountable after handover.', footnote: 'Site visits are free for homes.',
      actions: [h(S.Button, { key: 1, variant: 'accent', size: 'lg', iconRight: 'arrow-right' }, 'Start a project'), h(S.Button, { key: 2, variant: 'secondary', size: 'lg' }, 'Explore solutions')],
      media: h(S.Media, { ratio: '4x3', icon: 'solar-panel', brief: 'Hero: completed rooftop array in Abuja at golden hour, engineer in frame' }) }),
    h(Section, { label: 'Our business' },
      h(S.SectionHeader, { eyebrow: 'Our business', title: 'Power, fuel and the engineering that connects them.', action: h(S.TextLink, null, 'All solutions') }),
      h(Cols, { n: 3 },
        h(S.ServiceCard, { icon: 'solar-panel', title: 'Renewable Energy & Power', description: 'Solar PV, battery storage and hybrid systems, from one home to a mini-grid.', href: '#', linkLabel: 'Explore solar & storage' }),
        h(S.ServiceCard, { icon: 'gas-pump', title: 'Oil & Gas', description: 'Bulk diesel, petrol and LPG on a schedule, plus fuel, CNG and LPG station builds.', href: '#', linkLabel: 'Explore oil & gas' }),
        h(S.ServiceCard, { icon: 'hard-hat', title: 'Engineering', description: 'Design, procurement, construction and commissioning, run by one accountable team.', href: '#', linkLabel: 'Explore engineering' }),
        h(S.ServiceCard, { icon: 'chart-line-up', title: 'Technology', description: 'Monitoring and energy data that show what your system is really doing.', href: '#', linkLabel: 'Explore technology' }),
        h(S.ServiceCard, { icon: 'atom', title: 'Research & Innovation', description: 'Biogas, waste-to-energy and clean technology, tested before we sell it.', href: '#', linkLabel: 'Explore research' }),
        h(S.ServiceCard, { icon: 'buildings', title: 'Energy Infrastructure', description: 'Power infrastructure, energy hubs and distributed generation for estates and industry.', href: '#', linkLabel: 'Explore infrastructure' }))),
    h(Section, { tone: 'subtle', label: 'Featured solutions' },
      h(S.SectionHeader, { eyebrow: 'Featured solutions', title: 'Where most projects start.', lead: 'Not sure which you need? Start with an audit. It tells you what is worth doing before you spend.' }),
      h(Cols, { n: 3 },
        h(S.SectorCard, { icon: 'gauge', title: 'Energy audit & advisory', text: 'Measure first, then spend' }),
        h(S.SectorCard, { icon: 'solar-panel', title: 'Solar PV installation', text: 'Homes to utility scale' }),
        h(S.SectorCard, { icon: 'gas-pump', title: 'Fuel station construction', text: 'Civil, tanks and forecourt' }),
        h(S.SectorCard, { icon: 'leaf', title: 'Biogas facility', text: 'Waste to cooking gas and power' }),
        h(S.SectorCard, { icon: 'charging-station', title: 'EVs & EV charging', text: 'Chargers for fleets and sites' }),
        h(S.SectorCard, { icon: 'sun', title: 'Solar mini-grids', text: 'Power for communities and estates' }))),
    h(Section, { label: 'How we work' },
      h(S.SectionHeader, { eyebrow: 'How a project runs', title: 'From first measurement to years of monitoring.' }),
      h(S.ProcessSteps, { steps: [
        { kicker: 'Survey', title: 'We measure the site', text: 'Load logging, roof or land checks, and the bills you already pay.' },
        { kicker: 'Design', title: 'Sized on your numbers', text: 'Equipment matched to your peak, your outages and your budget.' },
        { kicker: 'Build', title: 'Installed to standard', text: 'Certified mounting, cable sizing and protection, clean finishing.' },
        { kicker: 'Operate', title: 'Monitored after handover', text: 'Remote monitoring, maintenance visits and a team you can call.' }] })),
    h(Section, { label: 'Featured products' },
      h(S.SectionHeader, { eyebrow: 'Store', title: 'The equipment we install, available to order.', lead: 'Build a cart and send one order request. We confirm prices, stock and delivery before you pay.', action: h(S.TextLink, null, 'Shop all equipment') }),
      h(Cols, { n: 4 }, productCards(PRODUCTS.slice(0, 4)))),
    h(Section, { tone: 'subtle', label: 'Projects' },
      h(S.SectionHeader, { eyebrow: 'Projects', title: 'Work we can stand behind.', action: h(S.TextLink, null, 'All projects') }),
      h(Cols, { n: 3 }, PROJECTS.map(function (p, i) { return h(S.ProjectCard, Object.assign({ key: i, href: '#' }, p)); }))),
    h(Section, { label: 'Testimonials' },
      h(Cols, { n: 2 },
        h(S.Testimonial, { quote: 'Placeholder. Replace with a real client quote about reliability or savings, with permission.', name: 'Client name', role: 'Role, organisation, city' }),
        h(S.Testimonial, { quote: 'Placeholder. A second quote from a different sector (home, industry or public) balances the page.', name: 'Client name', role: 'Role, organisation, city' }))),
    h(Section, { tone: 'subtle', label: 'Insights' },
      h(S.SectionHeader, { eyebrow: 'Insights', title: 'Straight answers, no sales pitch.', action: h(S.TextLink, null, 'All articles') }),
      h(Cols, { n: 3 }, ARTICLES.slice(0, 3).map(function (a, i) { return h(S.ArticleCard, Object.assign({ key: i }, a)); }))));
}

/* 2 ── Solutions index  (/services) */
function SolutionsTemplate() {
  var caps = [
    ['Power & Renewable Energy', ['Solar PV systems', 'Battery energy storage', 'Hybrid power systems', 'Mini-grids', 'Solar street lighting', 'Energy audits', 'Energy efficiency']],
    ['Engineering & EPC', ['Engineering design', 'Procurement', 'Construction', 'Installation', 'Commissioning', 'Operations & maintenance', 'Technical consulting']],
    ['Oil & Gas trading', ['Energy supply', 'Fuel solutions', 'Downstream energy services', 'Energy infrastructure']],
    ['Research & Innovation', ['Energy transition research', 'Clean technology', 'Waste-to-energy', 'Biomass energy', 'Emerging energy systems']],
    ['Energy Technology', ['Energy monitoring', 'Energy data', 'Digital energy systems', 'Energy modelling', 'Asset management']],
    ['Energy Infrastructure', ['Power infrastructure', 'Industrial energy systems', 'Distributed generation', 'Energy hubs']]
  ];
  return h(Page, { cta: { title: 'Ready to specify a system?', text: 'Send us the site and what it needs to run. An engineer replies with next steps [confirm: within 1 working day].', secondaryLabel: 'Chat on WhatsApp' } },
    h(S.Hero, { eyebrow: 'Solutions', title: 'Six capabilities. One team accountable for all of them.', lead: 'Most energy problems cross more than one trade. We design, supply, build and run the whole system, so nothing falls between contractors.', actions: [btn('accent', 'Start a project')] }),
    h(Section, { label: 'Capabilities' },
      h(S.SectionHeader, { eyebrow: 'Connected capabilities', title: 'Built to work together.' }),
      h('div', null, caps.map(function (c, i) { return h(S.CapabilityRow, { key: i, number: String(i + 1).padStart(2, '0'), title: c[0], items: c[1], href: '#' }); }))));
}

/* 3 ── Service detail  (/solar, /fuel, /audit) */
function ServiceDetailTemplate() {
  return h(Page, { cta: { title: 'Book a site survey. Free for homes.', text: 'Send your last electricity bill and what you spend on generator fuel. We size the system on your real load.', primaryLabel: 'Book a site survey', secondaryLabel: 'Send your bill on WhatsApp' } },
    h(S.Hero, { variant: 'inverse', breadcrumbs: [{ label: 'Solutions' }, { label: 'Solar & storage' }], eyebrow: 'Solar services · Clean energy', title: 'Sun by day. Battery by night.',
      lead: 'From a single home system to a mini-grid or a utility-scale array: solar designed around the load you actually run, and installed to last.',
      actions: [h(S.Button, { key: 1, variant: 'accent', size: 'lg', iconRight: 'arrow-right' }, 'Book a site survey'), h(S.Button, { key: 2, variant: 'secondary', size: 'lg', iconLeft: 'whatsapp-logo', className: 'se-btn--on-inverse' }, 'Send your bill on WhatsApp')],
      media: h(S.Media, { ratio: '4x3', icon: 'solar-panel', brief: 'Close-up: panel array with inverter wall, crisp daylight' }) }),
    h(Section, { label: 'What we build' },
      h(S.SectionHeader, { eyebrow: 'What we build', title: 'Six ways we put solar to work.' }),
      h(Cols, { n: 3 },
        h(S.BenefitItem, { icon: 'house', title: 'Solar home systems' }, 'Compact kits with battery backup for homes and small businesses.'),
        h(S.BenefitItem, { icon: 'lamp', title: 'Solar street lights' }, 'Standalone lighting for streets and estates, dusk to dawn.'),
        h(S.BenefitItem, { icon: 'factory', title: 'Utility-scale solar' }, 'Ground-mounted arrays for industrial sites and grid supply.'),
        h(S.BenefitItem, { icon: 'users-three', title: 'Solar mini-grids' }, 'Generation and distribution for off-grid communities and estates.'),
        h(S.BenefitItem, { icon: 'battery-charging', title: 'Battery storage & hybrids' }, 'BESS and hybrid solar-generator-grid systems sized on measured load.'),
        h(S.BenefitItem, { icon: 'drop-half', title: 'Solar thermal water heaters' }, 'Hot water from the sun for homes, hotels and hospitals.'))),
    h(Section, { tone: 'subtle', label: 'Process' },
      h(S.SectionHeader, { eyebrow: 'What an installation includes', title: 'Four stages, one accountable team.' }),
      h(S.ProcessSteps, { steps: [
        { kicker: 'Survey', title: 'Roof, load and shading', text: 'We log what you draw across a day and check orientation, pitch and shading before quoting.' },
        { kicker: 'Design', title: 'Sized on your day', text: 'Array, inverter and battery matched to your evening peak and outage tolerance.' },
        { kicker: 'Install', title: 'Mounting, wiring, protection', text: 'Certified mounting, correct cable sizing, surge and earth protection, a labelled board.' },
        { kicker: 'Handover', title: 'Commissioning and training', text: 'Performance test, monitoring on your phone, and a walkthrough for the household.' }] })),
    h(Section, { tone: 'inverse', label: 'Benefits' },
      h(S.SectionHeader, { eyebrow: 'Why clients switch', title: 'The difference shows up after sunset.' }),
      h(Cols, { n: 3 },
        h(S.BenefitItem, { number: '01', title: 'Quiet nights' }, 'No generator noise or fumes. The battery carries the evening.'),
        h(S.BenefitItem, { number: '02', title: 'A bill you can plan' }, 'Fuel and tariff swings stop driving your monthly spend.'),
        h(S.BenefitItem, { number: '03', title: 'Cleaner by default' }, 'Every kWh from the roof is one the generator didn’t burn.'))),
    h(Section, { label: 'Payment options' },
      h(S.SectionHeader, { eyebrow: 'Paying for it', title: 'Three ways to pay for the same good system.' }),
      h(Cols, { n: 3 },
        h(S.PlanCard, { tag: 'Lowest total cost', featured: true, title: 'Pay once, own it outright', text: 'One payment, and the system is yours from handover.', points: ['One invoice after you approve the design', 'Installed [confirm: within 2–3 weeks]'], action: h(S.Button, { variant: 'primary', fullWidth: true }, 'Book a site survey') }),
        h(S.PlanCard, { title: 'Pay in stages', text: 'Split the cost across survey, delivery and commissioning.', points: ['A deposit to start', 'The balance at handover'], action: h(S.Button, { variant: 'secondary', fullWidth: true }, 'Book a site survey') }),
        h(S.PlanCard, { title: 'Structure it around your cash flow', text: 'For businesses: payments set against what the system saves you.', points: ['Based on your current fuel and tariff spend', 'Subject to a credit assessment'], action: h(S.Button, { variant: 'secondary', fullWidth: true }, 'Discuss terms') }))),
    h(Section, { tone: 'subtle', label: 'Questions' },
      h('div', { className: 'se-split se-split--aside' },
        h('div', null,
          h(S.AccordionItem, { title: 'How long does an installation take?', defaultOpen: true }, h('p', null, 'A home system takes [confirm: 1–3 days] on site once the design is approved. Commercial systems are scheduled with you.')),
          h(S.AccordionItem, { title: 'What happens when it’s cloudy?' }, h('p', null, 'The battery and grid or generator cover the gap. We size for Nigerian rainy-season output, not brochure figures.')),
          h(S.AccordionItem, { title: 'Do you maintain the system?' }, h('p', null, 'Yes. Monitoring is set up at handover and maintenance visits can be scheduled.'))),
        h(S.SectionHeader, { eyebrow: 'Questions', title: 'Before you book.', lead: 'Anything else? Ask an engineer directly.', action: h(S.TextLink, { icon: 'whatsapp-logo' }, 'Ask an engineer on WhatsApp') }))),
    h(Section, { label: 'Related products' },
      h(S.SectionHeader, { eyebrow: 'From the store', title: 'Equipment we install.', action: h(S.TextLink, null, 'Shop solar') }),
      h(Cols, { n: 4 }, productCards(PRODUCTS.slice(0, 4)))));
}

/* 4 ── Who we serve  (/industries) */
function IndustriesTemplate() {
  var group = function (title, lead, items) {
    return h(Section, { label: title },
      h(S.SectionHeader, { title: title, lead: lead }),
      h(Cols, { n: 3 }, items.map(function (s, i) { return h(S.SectorCard, { key: i, icon: s[0], title: s[1], text: s[2] }); })));
  };
  return h(Page, { cta: { title: 'Tell us the sector. We will size the system.', text: 'Every sector has a different load shape. We measure yours before recommending anything.', secondaryLabel: 'Chat on WhatsApp' } },
    h(S.Hero, { eyebrow: 'Who we serve', title: 'Every sector draws power differently.', lead: 'A hospital can\u2019t lose its cold chain. A mill runs heavy motors through one shift. A home needs quiet evenings. We size for the load in front of us.' }),
    group('Industry, infrastructure and government', 'Large loads, long hours, zero tolerance for downtime.', [
      ['storefront', 'Commercial & retail', 'Malls, offices, retail chains'], ['factory', 'Industrial facilities', 'Process loads and heavy motors'], ['warehouse', 'Manufacturing', 'Shift power and backup'],
      ['graduation-cap', 'Education', 'Campuses and schools'], ['first-aid-kit', 'Healthcare', 'Clinics, labs, cold chain'], ['road-horizon', 'Public infrastructure', 'Street lighting, public buildings']]),
    h('div', { className: 'se-section--subtle' }, group('Homes, estates and communities', 'Reliable evenings, lower bills, less generator.', [
      ['buildings', 'Real estate', 'Estates and developments'], ['users-three', 'Communities', 'Mini-grids for off-grid areas'], ['bed', 'Hospitality', 'Hotels and guest houses'],
      ['storefront', 'SMEs', 'Shops, salons, workshops'], ['house', 'Homes', 'Solar, storage and backup'], ['tractor', 'Agriculture & agro-processing', 'Irrigation, mills, cold rooms']])));
}

/* 5 ── Projects  (/projects) */
function ProjectsTemplate() {
  return h(Page, { cta: { title: 'Have a site in mind?', text: 'We document every project as it’s ready to publish. Yours could be next.', secondaryLabel: 'Chat on WhatsApp' } },
    h(S.Hero, { eyebrow: 'Projects', title: 'Work we can stand behind.', lead: 'Installations we have delivered and works in progress. We publish each project once the client is happy for us to.' }),
    h(Section, { label: 'Project list' },
      h('div', { className: 'se-filterbar__chips' }, ['All', 'Solar', 'Storage', 'CNG & gas', 'EPC', 'Mini-grids'].map(function (c, i) { return h(S.Chip, { key: c, selected: i === 0 }, c); })),
      h(Cols, { n: 3 }, PROJECTS.concat(PROJECTS).map(function (p, i) { return h(S.ProjectCard, Object.assign({ key: i, href: '#' }, p)); }))));
}

/* 6 ── Project case study  (/projects/:slug) */
function ProjectDetailTemplate() {
  return h(Page, null,
    h(S.Hero, { variant: 'compact', breadcrumbs: [{ label: 'Projects' }, { label: 'Commercial rooftop PV, Kano' }], eyebrow: 'Delivered · Kano · 2026', title: 'A 120 kWp rooftop that runs a mill through the evening shift.' }),
    h('div', { className: 'se-container' }, h(S.Media, { ratio: '21x9', icon: 'solar-panel', brief: 'Wide aerial of the full array, factory roof and surroundings' })),
    h(Section, { label: 'Results' },
      h(Cols, { n: 4 },
        h(S.StatTile, { icon: 'solar-panel', label: 'Array', value: '120', unit: 'kWp' }),
        h(S.StatTile, { icon: 'battery-charging', label: 'Storage', value: '215', unit: 'kWh' }),
        h(S.StatTile, { icon: 'gas-pump', label: 'Diesel saved', value: '68', unit: '%', trend: 'down', delta: '68%', upIsGood: false, caption: 'vs before' }),
        h(S.StatTile, { icon: 'clock', label: 'Build time', value: '6', unit: 'weeks' })),
      h('div', { className: 'se-split se-split--aside' },
        h('div', { className: 'se-prose' },
          h('h2', null, 'The problem'), h('p', null, 'Placeholder. Describe the client’s situation in their numbers: diesel spend, outage hours, the load that mattered most.'),
          h('h2', null, 'What we built'), h('p', null, 'Placeholder. The system, why it was sized that way, and anything unusual about the site.'),
          h('h2', null, 'The result'), h('p', null, 'Placeholder. Measured output and savings after 3 months of monitoring.')),
        h(S.Testimonial, { quote: 'Placeholder. One sentence from the client in their own words.', name: 'Client name', role: 'Operations manager, client' }))),
    h(Section, { tone: 'subtle', label: 'Gallery' },
      h(Cols, { n: 3 }, h(S.Media, { icon: 'wrench', brief: 'Inverter wall during install' }), h(S.Media, { icon: 'hard-hat', brief: 'Crew on the roof' }), h(S.Media, { icon: 'chart-line-up', brief: 'Monitoring screen at handover' }))),
    h(Section, { label: 'More projects' },
      h(S.SectionHeader, { title: 'More projects', action: h(S.TextLink, null, 'All projects') }),
      h(Cols, { n: 3 }, PROJECTS.map(function (p, i) { return h(S.ProjectCard, Object.assign({ key: i, href: '#' }, p)); }))));
}

/* 7 ── Insights index  (/learn) */
function LearnTemplate() {
  return h(Page, { cta: { title: 'Have a question these don’t answer?', text: 'Ask an engineer directly. We reply with arithmetic, not adjectives.', primaryLabel: 'Ask an engineer', secondaryLabel: 'Ask on WhatsApp' } },
    h(S.Hero, { eyebrow: 'Insights', title: 'Straight answers, no sales pitch.', lead: 'The questions we get asked on every survey, answered the way we answer them on site.' }),
    h(Section, { label: 'Articles' },
      h('div', { className: 'se-split se-split--even' },
        h(S.ArticleCard, Object.assign({ featured: true, brief: 'Swollen battery bank in a hot plant room' }, ARTICLES[0])),
        h('div', null, ARTICLES.slice(1, 4).map(function (a, i) { return h(S.ArticleCard, Object.assign({ key: i }, a)); }))),
      h('div', { className: 'se-filterbar__chips' }, ['All', 'Batteries', 'Solar sizing', 'Tariffs', 'Generators', 'Installation', 'Reports', 'News'].map(function (c, i) { return h(S.Chip, { key: c, selected: i === 0 }, c); })),
      h(Cols, { n: 3 }, ARTICLES.map(function (a, i) { return h(S.ArticleCard, Object.assign({ key: i }, a)); }))));
}

/* 8 ── Article  (/learn/:slug) */
function ArticleTemplate() {
  var a = ARTICLES[4];
  return h(Page, null,
    h(Section, { label: 'Article' },
      h('div', { className: 'se-split se-split--aside' },
        h('article', { className: 'se-stack-lg' },
          h(S.Breadcrumbs, { items: [{ label: 'Insights' }, { label: a.category }] }),
          h('p', { className: 'se-eyebrow' }, a.category + ' · ' + a.readTime + ' read · 12 Oct 2026'),
          h('h1', { className: 'se-hero__title se-article-title' }, a.title),
          h('p', { className: 'se-hero__lead' }, a.excerpt),
          h(S.Media, { ratio: '16x9', icon: 'gas-pump', brief: 'Generator in a compound, fuel jerrycans beside it' }),
          h('div', { className: 'se-prose' },
            h('h2', null, 'What you pay for besides fuel'), h('p', null, 'Body copy in body-lg at 65 characters per line. Use H2 for sections and keep paragraphs short.'),
            h('ul', null, h('li', null, 'Servicing every 250 hours'), h('li', null, 'Depreciation over the engine’s life'), h('li', null, 'Downtime when it fails')),
            h('h2', null, 'The arithmetic'), h('p', null, 'Worked examples belong in a table or a StatTile row so the numbers line up.'))),
        h('aside', { className: 'se-aside' },
          h('div', { className: 'se-aside__card' },
            h('h2', null, 'Want this worked out for your site?'),
            h('p', null, 'Send your fuel spend and we’ll compare it with solar and grid.'),
            h(S.Button, { variant: 'accent', fullWidth: true, iconRight: 'arrow-right' }, 'Compare my costs'))))),
    h(Section, { tone: 'subtle', label: 'Related' },
      h(S.SectionHeader, { title: 'Keep reading' }),
      h(Cols, { n: 3 }, ARTICLES.slice(0, 3).map(function (x, i) { return h(S.ArticleCard, Object.assign({ key: i }, x)); }))));
}

/* 9 ── About  (/about) */
function AboutTemplate() {
  return h(Page, { cta: { title: 'Energy is infrastructure. Infrastructure is progress.', secondaryLabel: 'Chat on WhatsApp' } },
    h(S.Hero, { eyebrow: 'About us', title: 'Building the energy systems behind progress.', lead: 'We make energy work as infrastructure: designed, built and run as one system, by one accountable team.', media: h(S.Media, { ratio: '4x3', icon: 'users-three', brief: 'Team photo on site in PPE, natural light' }) }),
    h(Section, { tone: 'subtle', label: 'Mission and vision' },
      h(Cols, { n: 2 },
        h('div', { className: 'se-statement' }, h('p', { className: 'se-eyebrow' }, 'Mission'), h('h2', null, 'To provide world-class energy services and infrastructure that power progress.')),
        h('div', { className: 'se-statement' }, h('p', { className: 'se-eyebrow' }, 'Vision'), h('h2', null, 'To become one of the most trusted and innovative energy companies in Africa.')))),
    h(Section, { label: 'Values' },
      h(S.SectionHeader, { eyebrow: 'How we work', title: 'Four things we don’t compromise on.' }),
      h(Cols, { n: 4 },
        h(S.BenefitItem, { icon: 'wrench', title: 'Technical competence' }, 'Certified engineers, proper tools, documented work.'),
        h(S.BenefitItem, { icon: 'shield-check', title: 'Transparency & quality' }, 'Clear quotes, real specs, checked installations.'),
        h(S.BenefitItem, { icon: 'users-three', title: 'Client-centred' }, 'Sized on your site and budget, not our stock.'),
        h(S.BenefitItem, { icon: 'lightbulb', title: 'Innovation driven' }, 'Research that turns into better systems.'))),
    h(Section, { tone: 'subtle', label: 'Lifecycle' },
      h(S.SectionHeader, { eyebrow: 'Lifecycle', title: 'One partner from first study to long-term operation.' }),
      h(S.ProcessSteps, { steps: [{ title: 'Study', text: 'Audits and feasibility.' }, { title: 'Design', text: 'Engineering and specification.' }, { title: 'Build', text: 'Procurement and construction.' }, { title: 'Operate', text: 'Monitoring and maintenance.' }] })),
    h(Section, { label: 'Leadership' },
      h(S.SectionHeader, { eyebrow: 'Leadership', title: 'The people accountable for the work.' }),
      h(Cols, { n: 4 }, [1, 2, 3, 4].map(function (i) {
        return h('div', { key: i, className: 'se-person' }, h(S.Media, { ratio: '3x4', icon: 'user', brief: 'Portrait, plain background' }), h('h3', null, 'Name Surname'), h('p', null, 'Role'));
      }))));
}

/* 10 ── Start a project  (/book) */
function StartProjectTemplate() {
  return h(Page, { cta: false },
    h(S.Hero, { variant: 'compact', eyebrow: 'Start a project', title: 'Tell us what you are building.', lead: 'An energy audit, a solar survey, CNG works, or something still taking shape: tell us the site, we come, we measure, and you get numbers you can decide with.' }),
    h(Section, { label: 'Booking form' },
      h('div', { className: 'se-split' },
        h('form', { className: 'se-form', onSubmit: function (e) { e.preventDefault(); } },
          h('h2', { className: 'se-form__title' }, 'Tell us where to come.'),
          h('p', { className: 'se-form__lead' }, 'This opens as a WhatsApp message from your phone. No waiting on hold.'),
          h('div', { className: 'se-cols se-cols--2' },
            h(S.FormField, { label: 'Your name', required: true }, h(S.Input, { autoComplete: 'name' })),
            h(S.FormField, { label: 'Phone', optional: true }, h(S.Input, { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '0803 123 4567' }))),
          h(S.FormField, { label: 'Location', required: true, hint: 'Area and city, like Wuse II, Abuja' }, h(S.Input, null)),
          h('div', { className: 'se-field' }, h('span', { className: 'se-field__label' }, 'Site type'), h(S.ChoiceGroup, { label: 'Site type', defaultValue: 'Home', options: [{ value: 'Home', label: 'Home', icon: 'house' }, { value: 'Institution', label: 'Institution', icon: 'graduation-cap' }, { value: 'Industry', label: 'Industry', icon: 'factory' }, { value: 'Commercial', label: 'Commercial building', icon: 'buildings' }] })),
          h('div', { className: 'se-cols se-cols--2' },
            h(S.FormField, { label: 'Preferred day' }, h(S.Input, { type: 'date' })),
            h('div', { className: 'se-field' }, h('span', { className: 'se-field__label' }, 'Preferred time'), h(S.ChoiceGroup, { label: 'Preferred time', defaultValue: 'Any time', options: ['Morning', 'Afternoon', 'Any time'] }))),
          h(S.FormField, { label: 'What do you run?', hint: 'Rough is fine. It helps us send the right engineer with the right meters.' }, h(S.Textarea, { placeholder: 'e.g. 2 ACs, a freezer, borehole pump, 5 kVA generator 8 h a day' })),
          h('div', { className: 'se-form__actions' }, h(S.Button, { variant: 'accent', size: 'lg', iconLeft: 'whatsapp-logo', type: 'submit' }, 'Send booking on WhatsApp'), h(S.Button, { variant: 'ghost', size: 'lg' }, 'Email instead'))),
        h('aside', { className: 'se-aside' },
          h('div', { className: 'se-aside__card' },
            h('h2', null, 'What happens next'),
            h(S.ProcessSteps, { direction: 'vertical', steps: [{ title: 'Press send in WhatsApp', text: 'Your request opens pre-filled.' }, { title: 'We confirm a day and time', text: '[confirm: usually within 1 working day]' }, { title: 'We visit, measure and quote', text: 'Free for homes. No obligation.' }] })),
          h('div', { className: 'se-aside__card se-aside__card--plain' },
            h('h2', null, 'Prefer to talk?'),
            h('p', null, h(S.Icon, { name: 'phone', size: 16 }), ' 0814 736 3336'),
            h('p', null, h(S.Icon, { name: 'envelope-simple', size: 16 }), ' info@sarkienergy.com'))))));
}

/* 11 ── Store  (/store) */
function StoreTemplate() {
  return h(Page, { cart: 2, cta: { title: 'Buying for a project?', text: 'Send us your parts list. We quote wholesale and project supply.', primaryLabel: 'Request a project quote', secondaryLabel: 'Chat on WhatsApp' } },
    h(S.Hero, { variant: 'compact', eyebrow: 'Equipment store', title: 'Equipment for the work.', lead: 'Panels, inverters, storage and site equipment. Build a cart and send one order request. We confirm prices, availability and delivery.' }),
    h(Section, { label: 'Products' },
      h(S.FilterBar, { categories: [{ value: 'all', label: 'All products', count: 9 }, { value: 'site', label: 'Site equipment', count: 3 }, { value: 'inv', label: 'Inverters', count: 1 }, { value: 'power', label: 'Power systems', count: 1 }, { value: 'bat', label: 'Battery storage', count: 1 }, { value: 'pv', label: 'Solar panels', count: 3 }] }),
      h('div', { className: 'se-results' }, h('span', null, '9 products'), h(S.Select, { size: 'sm', 'aria-label': 'Sort', options: ['Featured', 'Price: low to high', 'Price: high to low', 'Newest'] })),
      h(Cols, { n: 3 }, productCards(PRODUCTS))));
}

/* 12 ── Product  (/store/:slug) */
function ProductTemplate() {
  var spec = [['Rated power', '5 kVA / 5,000 W'], ['Battery voltage', '48 V DC'], ['MPPT range', '120–450 V DC'], ['Max PV input', '6,500 W'], ['Efficiency', '93% peak'], ['Monitoring', 'Wi-Fi, mobile app'], ['Warranty', '2 years']];
  return h(Page, { cart: 2, cta: false },
    h(Section, { label: 'Product' },
      h(S.Breadcrumbs, { items: [{ label: 'Store' }, { label: 'Inverters' }, { label: 'Smart Inverter Module' }] }),
      h(S.ProductDetail, { icon: 'lightning', category: 'Inverters', name: 'Smart Inverter Module 5 kVA', lead: 'Power conversion for solar, battery and hybrid systems, with built-in MPPT and remote monitoring.', price: 550000, compareAt: 620000, note: 'Prices are confirmed with your order request, including availability and delivery.' })),
    h(Section, { tone: 'subtle', label: 'Details' },
      h('div', { className: 'se-split se-split--even' },
        h('div', null, h(S.SectionHeader, { title: 'Specifications' }),
          h('table', { className: 'se-table' }, h('tbody', null, spec.map(function (r, i) { return h('tr', { key: i }, h('th', { scope: 'row' }, r[0]), h('td', null, r[1])); })))),
        h('div', null, h(S.SectionHeader, { title: 'Questions' }),
          h(S.AccordionItem, { title: 'What can it run?', defaultOpen: true }, h('p', null, 'A typical home: lights, fans, TV, fridge, and one 1 HP AC on battery.')),
          h(S.AccordionItem, { title: 'Is installation included?' }, h('p', null, 'Installation is quoted separately. [confirm: cities where installation is offered]')),
          h(S.AccordionItem, { title: 'Downloads' }, h('p', null, h(S.TextLink, { icon: 'download-simple' }, 'Datasheet (PDF, 1.2 MB)')))))),
    h(Section, { label: 'Related' },
      h(S.SectionHeader, { title: 'Pairs well with', action: h(S.TextLink, null, 'Shop all') }),
      h(Cols, { n: 4 }, productCards(PRODUCTS.slice(1, 5)))));
}

/* 13 ── Cart  (/cart) */
function CartTemplate() {
  return h(Page, { cart: 3, cta: false },
    h(Section, { label: 'Cart' },
      h('h1', { className: 'se-page-title' }, 'Your cart'),
      h('div', { className: 'se-split se-split--aside' },
        h('div', null,
          h(S.CartLine, { icon: 'lightning', category: 'Inverters', name: 'Smart Inverter Module 5 kVA', spec: 'Pure sine wave, 48 V', price: 550000, qty: 1 }),
          h(S.CartLine, { icon: 'battery-charging', category: 'Battery storage', name: 'Compact Lithium Cell 5 kWh', spec: 'LiFePO4', price: 899000, qty: 2 }),
          h(S.CartLine, { icon: 'solar-panel', category: 'Solar panels', name: 'Monocrystalline Solar Module 550 W', spec: 'Half-cut cells', price: 285000, qty: 6 }),
          h('div', { className: 'se-cart-foot' }, h(S.TextLink, { icon: 'arrow-left' }, 'Continue shopping'))),
        h(S.OrderSummary, { items: [{ name: 'Smart Inverter Module 5 kVA', amount: 550000 }, { name: 'Compact Lithium Cell 5 kWh', qty: 2, amount: 899000 }, { name: 'Monocrystalline Solar Module 550 W', qty: 6, amount: 285000 }], delivery: 0, totalLabel: 'Estimated total', ctaLabel: 'Send order request', note: 'No payment yet. We confirm price, stock and delivery first.' }))),
    h(Section, { tone: 'subtle', label: 'Empty cart state' },
      h(S.EmptyState, { icon: 'shopping-cart-simple', title: 'Your cart is empty', text: 'Browse panels, inverters, storage and site equipment, or send us your parts list and we\u2019ll quote it.', action: [h(S.Button, { key: 1, variant: 'primary' }, 'Browse the store'), h(S.Button, { key: 2, variant: 'secondary', iconLeft: 'whatsapp-logo' }, 'Send a parts list')] })));
}

/* 14 ── Order request / checkout  (/checkout) */
function CheckoutTemplate() {
  var steps = ['Contact', 'Delivery', 'Review'];
  return h('div', { className: 'se-page' },
    h('header', { className: 'se-checkout-head' }, h('div', { className: 'se-container' }, h('a', { className: 'se-header__brand', href: '#' }, h('span', null, 'Sarki Energy')), h('span', { className: 'se-checkout-secure' }, h(S.Icon, { name: 'lock-simple', size: 16 }), 'Secure order request'))),
    h(Section, { label: 'Checkout' },
      h('ol', { className: 'se-progress' }, steps.map(function (s, i) { return h('li', { key: s, className: i < 1 ? 'is-done' : i === 1 ? 'is-on' : '' }, h('span', null, i < 1 ? h(S.Icon, { name: 'check', size: 16 }) : i + 1), s); })),
      h('div', { className: 'se-split se-split--aside' },
        h('form', { className: 'se-form', onSubmit: function (e) { e.preventDefault(); } },
          h('div', { className: 'se-done-step' }, h('div', null, h('strong', null, 'Contact'), h('span', null, 'Amina Bello · 0803 123 4567')), h(S.TextLink, { icon: false }, 'Edit')),
          h('h2', { className: 'se-form__title' }, 'Delivery'),
          h('div', { className: 'se-field' }, h('span', { className: 'se-field__label' }, 'How do you want it?'), h(S.ChoiceGroup, { label: 'Delivery method', defaultValue: 'Deliver', options: [{ value: 'Deliver', label: 'Deliver to site', icon: 'truck' }, { value: 'Install', label: 'Deliver and install', icon: 'wrench' }, { value: 'Pickup', label: 'Pick up in Abuja', icon: 'storefront' }] })),
          h(S.FormField, { label: 'Address', required: true }, h(S.Input, { autoComplete: 'street-address' })),
          h('div', { className: 'se-cols se-cols--2' },
            h(S.FormField, { label: 'City', required: true }, h(S.Input, { autoComplete: 'address-level2' })),
            h(S.FormField, { label: 'State', required: true }, h(S.Select, { placeholder: 'Choose a state', options: ['Abuja (FCT)', 'Kaduna', 'Kano', 'Lagos', 'Rivers', 'Other'] }))),
          h(S.FormField, { label: 'Notes for the driver', optional: true }, h(S.Textarea, { rows: 3, placeholder: 'Gate colour, landmark, best time' })),
          h(S.Checkbox, { label: 'This is a business purchase', description: 'Add company name and TIN for the invoice.' }),
          h('div', { className: 'se-form__actions' }, h(S.Button, { variant: 'primary', size: 'lg', iconRight: 'arrow-right' }, 'Continue to review'))),
        h(S.OrderSummary, { items: [{ name: 'Smart Inverter Module 5 kVA', amount: 550000 }, { name: 'Compact Lithium Cell 5 kWh', qty: 2, amount: 899000 }], delivery: 25000, totalLabel: 'Estimated total', ctaLabel: 'Send order request', note: 'We confirm price, stock and delivery before you pay. Pay by transfer, card or USSD.' }))));
}

/* 15 ── Request sent  (/checkout/sent) */
function ConfirmationTemplate() {
  return h(Page, { cta: false },
    h(Section, { label: 'Confirmation' },
      h('div', { className: 'se-confirm' },
        h('span', { className: 'se-confirm__icon' }, h(S.Icon, { name: 'check-circle', size: 48 })),
        h('p', { className: 'se-eyebrow' }, 'Request SE-2026-0142'),
        h('h1', { className: 'se-page-title' }, 'Order request sent.'),
        h('p', { className: 'se-hero__lead' }, 'We’ll confirm prices, stock and a delivery date by WhatsApp and email [confirm: within 1 working day].'),
        h(S.ProcessSteps, { direction: 'vertical', steps: [{ title: 'Request received', text: 'Today, 14:32' }, { title: 'We confirm prices and delivery', text: 'Within 1 working day' }, { title: 'You pay and we deliver', text: 'Transfer, card or USSD' }] }),
        h('div', { className: 'se-hero__actions' }, h(S.Button, { variant: 'primary', size: 'lg' }, 'View my orders'), h(S.Button, { variant: 'secondary', size: 'lg' }, 'Back to store')))));
}

/* 16 ── Sign in  (/sign-in) */
function SignInTemplate() {
  return h('div', { className: 'se-page se-auth' },
    h('div', { className: 'se-auth__brand' },
      h('a', { className: 'se-header__brand se-footer__logo', href: '#' }, h('span', null, 'Sarki Energy')),
      h('h1', null, 'Your energy orders, in one place.'),
      h('p', null, 'Track order requests, download invoices, and see how your system is performing.')),
    h('div', { className: 'se-auth__form' },
      h('form', { className: 'se-form', onSubmit: function (e) { e.preventDefault(); } },
        h(S.SegmentedControl, { options: ['Sign in', 'Create account'], fullWidth: true, label: 'Account' }),
        h('h2', { className: 'se-form__title' }, 'Welcome back'),
        h(S.FormField, { label: 'Email' }, h(S.Input, { type: 'email', autoComplete: 'email', placeholder: 'you@company.com' })),
        h(S.FormField, { label: 'Password' }, h(S.Input, { type: 'password', autoComplete: 'current-password' })),
        h('div', { className: 'se-auth__row' }, h(S.Checkbox, { label: 'Keep me signed in' }), h(S.TextLink, { icon: false }, 'Forgot password?')),
        h(S.Button, { variant: 'primary', size: 'lg', fullWidth: true, type: 'submit' }, 'Sign in'),
        h('p', { className: 'se-auth__note' }, 'You don’t need an account to send an order request.'))));
}

/* 17 ── Account dashboard  (/account) */
function AccountTemplate() {
  var orders = [['SE-2026-0142', '12 Oct 2026', 'Inverter + 2 batteries', 2373000, ['warning', 'Awaiting confirmation']], ['SE-2026-0118', '28 Sep 2026', '6 × 550 W panels', 1710000, ['info', 'Out for delivery']], ['SE-2026-0097', '02 Sep 2026', 'Site survey, Wuse II', 0, ['success', 'Completed']]];
  return h(Page, { cta: false, cart: 0 },
    h(Section, { label: 'Account' },
      h(S.SectionHeader, { level: 'h1', eyebrow: 'Account', title: 'Good afternoon, Amina.', lead: 'Your home system in Wuse II is online.', action: h(S.Button, { variant: 'accent', iconRight: 'arrow-right' }, 'Start a project') }),
      h(Cols, { n: 4 },
        h(S.StatTile, { icon: 'solar-panel', label: 'Solar today', value: '24.6', unit: 'kWh', trend: 'up', delta: '8%', caption: 'vs yesterday' }),
        h(S.StatTile, { icon: 'battery-charging', label: 'Battery', value: '86', unit: '%', caption: 'About 9 h of backup' }),
        h(S.StatTile, { icon: 'lightning', label: 'Grid used', value: '3.1', unit: 'kWh', trend: 'down', delta: '42%', upIsGood: false, caption: 'this week' }),
        h(S.StatTile, { icon: 'gas-pump', label: 'Generator', value: '0', unit: 'h', caption: 'not run this week' })),
      h('div', { className: 'se-split se-split--aside' },
        h(S.UsagePanel, { title: 'Solar generated this week', total: '186.4', unit: 'kWh', defaultPeriod: 'Week', data: [{ label: 'Mon', value: 24.1 }, { label: 'Tue', value: 28.6 }, { label: 'Wed', value: 19.2 }, { label: 'Thu', value: 30.4 }, { label: 'Fri', value: 27.9 }, { label: 'Sat', value: 26.3 }, { label: 'Sun', value: 29.9 }] }),
        h('div', { className: 'se-aside__card' }, h('h2', null, 'Next service'), h('p', null, 'Panel cleaning and battery check, 4 Nov 2026.'), h(S.Button, { variant: 'secondary', fullWidth: true, iconLeft: 'calendar-blank' }, 'Reschedule'))),
      h('div', null,
        h(S.SectionHeader, { title: 'Orders and requests', action: h(S.TextLink, null, 'All orders') }),
        h('div', { className: 'se-table-wrap' }, h('table', { className: 'se-table se-table--data' },
          h('thead', null, h('tr', null, ['Reference', 'Date', 'Items', 'Total', 'Status'].map(function (c) { return h('th', { key: c, scope: 'col' }, c); }))),
          h('tbody', null, orders.map(function (o) { return h('tr', { key: o[0] }, h('td', null, h('a', { href: '#' }, o[0])), h('td', null, o[1]), h('td', null, o[2]), h('td', { className: 'is-num' }, o[3] ? S.formatNaira(o[3]) : 'Free'), h('td', null, h(S.Badge, { tone: o[4][0], dot: true }, o[4][1]))); })))))));
}

/* 18 ── FAQ  (/faq) */
function FAQTemplate() {
  var qs = [['Can I buy directly on the website?', 'You build a cart and send an order request. We confirm prices, availability and delivery, then you pay.'], ['Why are prices shown on request?', 'Equipment prices move with the exchange rate. We confirm the current price before you commit.'], ['Do I need an account?', 'No. An account only helps you track requests and invoices.'], ['How will Sarki receive my request?', 'By WhatsApp and email. A person on our team replies [confirm: usually within 1 working day].'], ['What about delivery or returns?', 'Delivery is confirmed per order. Returns follow our shipping and returns policy.'], ['Can I ask about a larger energy project?', 'Yes. Start a project and an engineer will contact you.']];
  return h(Page, null,
    h(S.Hero, { variant: 'compact', eyebrow: 'Help', title: 'Frequently asked questions.' }),
    h(Section, { label: 'Questions' },
      h('div', { className: 'se-split se-split--aside' },
        h('div', null,
          h('div', { className: 'se-filterbar__chips' }, ['All', 'Ordering', 'Delivery', 'Projects', 'Account'].map(function (c, i) { return h(S.Chip, { key: c, selected: i === 0 }, c); })),
          h('div', { className: 'se-faq' }, qs.map(function (q, i) { return h(S.AccordionItem, { key: i, title: q[0], defaultOpen: i === 0 }, h('p', null, q[1])); }))),
        h('aside', { className: 'se-aside' }, h('div', { className: 'se-aside__card' }, h('h2', null, 'Still stuck?'), h('p', null, 'Ask us directly. A person replies.'), h(S.Button, { variant: 'primary', fullWidth: true, iconLeft: 'whatsapp-logo' }, 'Ask on WhatsApp'), h(S.Button, { variant: 'secondary', fullWidth: true, iconLeft: 'phone' }, '0814 736 3336'))))));
}

/* 19 ── Policy  (/shipping-returns, /store-policy) */
function PolicyTemplate() {
  var toc = ['Placing a request', 'Prices and availability', 'Payment', 'Wholesale and project supply', 'Your account information'];
  return h(Page, null,
    h(S.Hero, { variant: 'compact', breadcrumbs: [{ label: 'Store' }, { label: 'Store policy' }], title: 'Store policy.', footnote: 'Last updated 1 October 2026' }),
    h(Section, { label: 'Policy' },
      h('div', { className: 'se-split se-split--aside' },
        h('div', { className: 'se-prose' }, toc.map(function (t, i) { return h(React.Fragment, { key: i }, h('h2', { id: 'p' + i }, t), h('p', null, 'Placeholder policy text. Keep sentences short and specific: who does what, by when, and what happens if it doesn’t.')); })),
        h('nav', { className: 'se-toc', 'aria-label': 'On this page' }, h('p', { className: 'se-eyebrow' }, 'On this page'), h('ul', null, toc.map(function (t, i) { return h('li', { key: i }, h('a', { href: '#p' + i }, t)); }))))));
}

/* 20 ── Not found  (404) */
function NotFoundTemplate() {
  return h(Page, { cta: false },
    h(Section, { label: 'Not found' },
      h(S.EmptyState, { icon: 'plug-charging', title: 'This page isn’t connected.', text: 'The link may be old or mistyped. Try one of these instead.', action: [h(S.Button, { key: 1, variant: 'primary' }, 'Go to homepage'), h(S.Button, { key: 2, variant: 'secondary' }, 'Browse the store'), h(S.Button, { key: 3, variant: 'ghost', iconLeft: 'whatsapp-logo' }, 'Ask us')] })));
}

var templates = {
  Home: HomeTemplate, Solutions: SolutionsTemplate, ServiceDetail: ServiceDetailTemplate, Industries: IndustriesTemplate,
  Projects: ProjectsTemplate, ProjectDetail: ProjectDetailTemplate, Learn: LearnTemplate, Article: ArticleTemplate, About: AboutTemplate,
  StartProject: StartProjectTemplate, Store: StoreTemplate, Product: ProductTemplate, Cart: CartTemplate, Checkout: CheckoutTemplate,
  Confirmation: ConfirmationTemplate, SignIn: SignInTemplate, Account: AccountTemplate, FAQ: FAQTemplate, Policy: PolicyTemplate, NotFound: NotFoundTemplate
};
Sarki.templates = templates;
