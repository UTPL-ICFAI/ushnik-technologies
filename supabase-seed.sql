-- ADD NEW COLUMNS IF THEY DON'T EXIST
ALTER TABLE services ADD COLUMN IF NOT EXISTS bullet_points TEXT[];
ALTER TABLE services ADD COLUMN IF NOT EXISTS footer_text TEXT;

-- SEED CONTENT FOR HERO SECTIONS
INSERT INTO hero_sections (page_route, heading, subheading) VALUES
('/', 'Strategic Technology & Infrastructure Partner for the Evolving Digital Economy', 'Connecting enterprises, cloud ecosystems, and technology partners to unlock scalable growth opportunities across infrastructure, software, and digital services.'),
('/infrastructure', 'Infrastructure & Data Center Division', 'Building the backbone of India''s digital future — through carrier-neutral data centers, cloud partnerships, IXP ecosystems, and end-to-end infrastructure advisory.'),
('/software', 'Software & Technology Services Division', 'End-to-end software solutions — from product development and enterprise applications to cybersecurity support and technology staffing — built for businesses across every industry.')
ON CONFLICT (page_route) DO UPDATE SET 
    heading = EXCLUDED.heading, 
    subheading = EXCLUDED.subheading;

-- SEED CONTENT FOR INFRASTRUCTURE SERVICES
INSERT INTO services (division, title, description, icon_name, order_index, bullet_points, footer_text) VALUES
('infrastructure', 'Data Center Planning & Feasibility Studies', 'We support organizations, investors, and real estate developers entering the data center business with complete end-to-end advisory:', 'Building2', 1, 
ARRAY['Feasibility Study & Market Analysis for new DC projects', 'Detailed Project Report (DPR) preparation', 'Site selection and due diligence', 'Power, cooling, and connectivity infrastructure planning', 'Regulatory and licensing roadmap', 'Financial modeling and ROI projections', 'Carrier-neutral architecture design (MMR, cross-connects, fiber diversity)', 'IXP readiness planning and BGP/ASN advisory', 'Vendor evaluation and procurement support', 'Go-to-market strategy for carrier and enterprise customer acquisition'], NULL),

('infrastructure', 'Reduce Infrastructure Costs. Improve Performance.', 'Are you paying high monthly bills for cloud, hosting, or infrastructure? Ushnik Technologies helps startups and enterprises optimize infrastructure costs through cost-effective alternatives:', 'Cloud', 2, 
ARRAY['Cloud cost audit and rightsizing (AWS, Azure, GCP, Oracle Cloud)', 'Migration from expensive or underutilized infrastructure', 'Hybrid cloud architecture design', 'On-premise to cloud or DC migration planning', 'Colocation evaluation and migration support', 'Backup and Disaster Recovery (DR) solution design', 'Multi-cloud strategy and vendor-neutral advisory', 'Infrastructure architecture and HLD/LLD review'], 'Through our ecosystem of trusted Data Center and Cloud partnerships, we analyze your current infrastructure usage and help you reduce monthly costs, improve performance, and build resilience — without compromising reliability.'),

('infrastructure', 'Colocation & Carrier Hotel Services', 'Connecting enterprises with carrier-neutral colocation facilities across India:', 'Server', 3, 
ARRAY['Rack, cage, and suite colocation planning', 'Cross-connect and Meet-Me Room (MMR) advisory', 'Power and cooling requirement assessment', 'SLA evaluation and vendor comparison', 'Remote hands and managed services coordination'], NULL),

('infrastructure', 'IXP & Interconnection Advisory', 'Strategic guidance for robust internet and network exchanges:', 'Network', 4, 
ARRAY['Internet Exchange Point (IXP) planning and ecosystem development', 'ASN and IP address resource planning (IRINN/APNIC)', 'BGP peering strategy and route server design', 'Carrier and ISP interconnection advisory', 'CDN integration planning (Cloudflare, Akamai, Google)', 'PeeringDB registration and global peering community engagement'], NULL),

('infrastructure', 'DC Partnerships & Collaborations', 'We actively build and facilitate partnerships between:', 'Handshake', 5, 
ARRAY['Data center operators and enterprise end-users', 'Cloud providers and colocation facilities', 'ISPs and carrier-neutral hubs', 'Technology vendors and DC operators', 'Investors and greenfield DC developers'], 'Building meaningful partnerships across the global digital infrastructure landscape. If you are a data center operator, cloud provider, ISP, or enterprise seeking connectivity — connect with us.');

-- SEED CONTENT FOR SOFTWARE SERVICES
INSERT INTO services (division, title, description, icon_name, order_index, bullet_points, footer_text) VALUES
('software', 'Product & Software Development', 'From concept to deployment, we build robust software products tailored to your operational needs:', 'Code2', 1, 
ARRAY['Custom Web Application Development', 'Enterprise Mobile Apps (iOS & Android)', 'SaaS Platform Engineering', 'UI/UX Design & Prototyping', 'MVP Development for Startups', 'API Integration & Modernization'], NULL),

('software', 'Cybersecurity Services', 'Protecting your digital assets with comprehensive security assessments and monitoring:', 'ShieldCheck', 2, 
ARRAY['Cybersecurity Assessment & Audit', 'Vulnerability Assessment and Penetration Testing (VAPT)', 'Security Architecture Design', 'Incident Response & Recovery', 'ISO 27001 Compliance Consulting'], NULL),

('software', 'IT Staffing & Resource Augmentation', 'Scaling your technical capabilities with pre-vetted, high-quality talent:', 'Users', 3, 
ARRAY['Technology Staffing & Contract Hiring', 'Project-based Dedicated Teams', 'Remote-first IT Resource Placement', 'Executive Search for IT Leadership', 'Rapid Team Scaling'], NULL),

('software', 'Enterprise IT Solutions', 'Streamlining operations through digital transformation and managed IT services:', 'Laptop', 4, 
ARRAY['IT Infrastructure Consulting for SMEs', 'Digital Transformation Advisory', 'Cloud Adoption & Migration Support', 'Managed IT Services', 'ERP & CRM Implementation Support'], NULL);
