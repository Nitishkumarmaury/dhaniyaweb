import { CategoryInfo } from '@/types';

export const categories: CategoryInfo[] = [
  {
    id: 'laboratory-chemicals',
    name: 'Laboratory Chemicals',
    description:
      'High-purity analytical, reagent-grade, and specialty chemicals from world-renowned manufacturers for research, quality control, and industrial applications.',
    icon: 'FlaskConical',
    brands: [
      { name: 'Merck' },
      { name: 'Thermo Fisher' },
      { name: 'Sigma Aldrich' },
      { name: 'Alfa Aesar' },
      { name: 'Finar' },
      { name: 'CDH' },
      { name: 'Loba' },
      { name: 'HiMedia' },
      { name: 'TCI' },
      { name: 'Rankem' },
      { name: 'Molychem' },
    ],
  },
  {
    id: 'laboratory-glassware',
    name: 'Laboratory Glassware',
    description:
      'Premium borosilicate glassware including beakers, flasks, condensers, and custom apparatus for every laboratory need.',
    icon: 'TestTubes',
    brands: [
      { name: 'Borosil' },
      { name: 'Perfit' },
      { name: 'Supertek' },
      { name: 'Labco' },
      { name: 'Omsons' },
    ],
  },
  {
    id: 'lab-instruments',
    name: 'Lab Instruments',
    description:
      'Precision analytical instruments, meters, and equipment for accurate measurement and testing in research and industrial labs.',
    icon: 'Microscope',
    brands: [
      { name: 'Eutech' },
      { name: 'Toshcon' },
      { name: 'Perfit' },
      { name: 'Labco' },
    ],
  },
  {
    id: 'consumables',
    name: 'Consumables',
    description:
      'Essential laboratory consumables including filter papers, syringes, electrodes, and buffer solutions for daily lab operations.',
    icon: 'Package',
    brands: [
      { name: 'Whatman Filter Papers' },
      { name: 'Hamilton Syringes' },
      { name: 'pH Electrodes' },
      { name: 'Buffer Solutions' },
    ],
  },
  {
    id: 'liquid-handling',
    name: 'Liquid Handling',
    description:
      'Precision pipettes, tips, and liquid handling systems for accurate and reproducible sample preparation.',
    icon: 'Pipette',
    brands: [
      { name: 'Eppendorf' },
      { name: 'Microlit' },
      { name: 'Tarson' },
      { name: 'Himedia' },
    ],
  },
  {
    id: 'research-products',
    name: 'Research Products',
    description:
      'Cutting-edge research reagents, ELISA kits, antibodies, and molecular biology products for advanced scientific research.',
    icon: 'Dna',
    brands: [
      { name: 'Affinity Biosciences' },
      { name: 'ELISA Kits' },
      { name: 'Antibodies' },
    ],
  },
];

export const allBrands = [
  'Merck',
  'Thermo Fisher',
  'Sigma Aldrich',
  'Alfa Aesar',
  'Finar',
  'CDH',
  'Loba',
  'HiMedia',
  'TCI',
  'Rankem',
  'Molychem',
  'Borosil',
  'Perfit',
  'Supertek',
  'Labco',
  'Omsons',
  'Eutech',
  'Toshcon',
  'Eppendorf',
  'Microlit',
  'Tarson',
  'Affinity Biosciences',
  'Whatman',
  'Hamilton',
];

export const timelineData = [
  {
    year: 'Foundation',
    title: 'Company Established',
    description:
      'Dhanya Trader\'s was founded with a vision to become a trusted supplier of laboratory and industrial chemicals in the region.',
  },
  {
    year: 'Growth',
    title: 'Expanded Product Portfolio',
    description:
      'Partnered with leading global brands including Merck, Thermo Fisher, and Sigma Aldrich to offer comprehensive lab solutions.',
  },
  {
    year: 'Expansion',
    title: 'Nationwide Supply Network',
    description:
      'Built a robust supply chain network to serve research institutions, pharmaceutical companies, and industries across India.',
  },
  {
    year: 'Today',
    title: 'Industry Leader',
    description:
      'Recognized as a trusted partner for laboratory and industrial supplies, serving hundreds of clients with commitment to quality and reliability.',
  },
];

export const industries = [
  {
    name: 'Pharmaceutical',
    icon: 'Pill',
    description: 'QC labs, R&D departments, and production units',
  },
  {
    name: 'Research & Academia',
    icon: 'GraduationCap',
    description: 'Universities, research institutes, and colleges',
  },
  {
    name: 'Food & Beverage',
    icon: 'Wheat',
    description: 'Quality testing and food safety laboratories',
  },
  {
    name: 'Chemical Manufacturing',
    icon: 'Factory',
    description: 'Process chemicals and industrial solvents',
  },
  {
    name: 'Environmental',
    icon: 'Leaf',
    description: 'Water testing and environmental analysis labs',
  },
  {
    name: 'Healthcare',
    icon: 'HeartPulse',
    description: 'Hospital labs and diagnostic centers',
  },
];

export const whyChooseUs = [
  {
    title: 'Authentic Products',
    description: 'We supply only genuine products directly sourced from authorized distributors and manufacturers.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Wide Brand Portfolio',
    description: 'Access to 20+ leading global and Indian brands under one roof for all your lab needs.',
    icon: 'Award',
  },
  {
    title: 'Competitive Pricing',
    description: 'Best-in-class pricing with transparent quotes and no hidden costs.',
    icon: 'IndianRupee',
  },
  {
    title: 'Fast Delivery',
    description: 'Efficient logistics network ensuring timely delivery across India.',
    icon: 'Truck',
  },
  {
    title: 'Expert Support',
    description: 'Technical consultation and product guidance from our experienced team.',
    icon: 'Headphones',
  },
  {
    title: 'Custom Solutions',
    description: 'Tailored procurement solutions for bulk orders and special requirements.',
    icon: 'Settings',
  },
];
