global.WebSocket = require('ws');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  console.log('Seeding Hero Sections...');
  const { error: heroError } = await supabase.from('hero_sections').upsert([
    {
      page_route: '/',
      heading: 'Strategic Technology & Infrastructure Partner for the Evolving Digital Economy',
      subheading: 'Connecting enterprises, cloud ecosystems, and technology partners to unlock scalable growth opportunities across infrastructure, software, and digital services.',
    },
    {
      page_route: '/infrastructure',
      heading: 'Infrastructure & Data Center Division',
      subheading: 'Building the backbone of India\'s digital future — through carrier-neutral data centers, cloud partnerships, IXP ecosystems, and end-to-end infrastructure advisory.',
    },
    {
      page_route: '/software',
      heading: 'Software & Technology Services Division',
      subheading: 'End-to-end software solutions — from product development and enterprise applications to cybersecurity support and technology staffing — built for businesses across every industry.',
    }
  ], { onConflict: 'page_route' });

  if (heroError) console.error('Hero Error:', heroError);

  console.log('Seeding Infrastructure Services...');
  const { error: infraError } = await supabase.from('services').upsert([
    {
      division: 'infrastructure',
      title: 'Data Center Planning & Feasibility Studies',
      description: 'We support organizations, investors, and real estate developers entering the data center business with complete end-to-end advisory including feasibility studies, DPR, site selection, and vendor evaluation.',
      icon_name: 'Server',
      order_index: 1,
      tags: ['Data Centers', 'Cloud', 'IXP', 'Colocation', 'DR', 'Feasibility']
    },
    {
      division: 'infrastructure',
      title: 'Reduce Infrastructure Costs. Improve Performance.',
      description: 'Are you paying high monthly bills for cloud, hosting, or infrastructure? Ushnik Technologies helps startups and enterprises optimize infrastructure costs through cost-effective alternatives.',
      icon_name: 'Database',
      order_index: 2,
      tags: []
    },
    {
      division: 'infrastructure',
      title: 'Colocation & Carrier Hotel Services',
      description: 'Connecting enterprises with carrier-neutral colocation facilities across India, including rack, cage, and suite planning.',
      icon_name: 'Building2',
      order_index: 3,
      tags: []
    },
    {
      division: 'infrastructure',
      title: 'IXP & Interconnection Advisory',
      description: 'Internet Exchange Point (IXP) planning, ASN/IP address resource planning, BGP peering strategy, and carrier interconnection advisory.',
      icon_name: 'Network',
      order_index: 4,
      tags: []
    },
    {
      division: 'infrastructure',
      title: 'DC Partnerships & Collaborations',
      description: 'Building meaningful partnerships across the global digital infrastructure landscape between operators, cloud providers, and ISPs.',
      icon_name: 'Handshake',
      order_index: 5,
      tags: []
    }
  ]);

  if (infraError) console.error('Infra Error:', infraError);

  console.log('Seeding Software Services...');
  const { error: softError } = await supabase.from('services').upsert([
    {
      division: 'software',
      title: 'Product & Software Development',
      description: 'Custom Web & Mobile Application Development, SaaS Platforms, ERP & CRM Solutions, MVP Development, and UI/UX Design.',
      icon_name: 'Code2',
      order_index: 1,
      tags: ['Product Dev', 'Cybersecurity', 'IT Staffing', 'Web & Mobile', 'ERP/CRM']
    },
    {
      division: 'software',
      title: 'Cybersecurity Services',
      description: 'Cybersecurity Assessment & Audit, VAPT, Security Architecture Design, Incident Response, and Compliance Consulting (ISO 27001).',
      icon_name: 'ShieldCheck',
      order_index: 2,
      tags: []
    },
    {
      division: 'software',
      title: 'IT Staffing & Resource Augmentation',
      description: 'Technology Staffing, Contract Hiring, Project-based Dedicated Teams, and remote-first IT resource placement across India.',
      icon_name: 'Users',
      order_index: 3,
      tags: []
    },
    {
      division: 'software',
      title: 'Enterprise IT Solutions',
      description: 'IT Infrastructure Consulting for SMEs, Digital Transformation Advisory, Cloud Adoption Support, and Managed Services.',
      icon_name: 'Laptop',
      order_index: 4,
      tags: []
    }
  ]);

  if (softError) console.error('Soft Error:', softError);

  console.log('Seed Complete!');
}

seed();
