import type { ServiceContent } from "../service-types";

/** Content for the "Web & Tech" services. Keyed by service slug. */
export const webContent: Record<string, ServiceContent> = {
  "website-design-development": {
    h1: "Website Development Company in Mumbai for Fast, High-Converting Websites",
    intro:
      "We are a website development company in Mumbai that builds fast, mobile-first websites designed to rank on Google and turn visitors into enquiries. You get clear scope, a fixed timeline, SEO-ready structure and tracking from day one.",
    topic: "website design and development",
    what: [
      "Website design and development covers planning the structure, designing the pages, writing and building them, and connecting forms, analytics and your other tools. A good website is more than a digital brochure. It is your main sales asset and the destination for your ads and search traffic.",
      "Speed, clarity and trust decide whether visitors stay. We design around your customer's questions, build with modern frameworks for fast loading, and set up the technical SEO basics so search engines can understand every page.",
    ],
    whoFor: [
      "Businesses launching a new website or replacing an outdated one.",
      "Service companies that need a site that generates enquiries.",
      "Ecommerce brands that want a fast, branded store.",
      "Startups that need a credible first version quickly.",
      "Businesses whose site is slow, hard to edit or not mobile-friendly.",
    ],
    includes: [
      "Planning, sitemap and wireframes",
      "Custom UI design aligned to your brand",
      "Responsive development on Next.js, WordPress or Shopify",
      "On-page SEO foundations and schema",
      "Speed and accessibility checks",
      "Forms, WhatsApp, CRM and analytics integration",
    ],
    process: [
      {
        title: "Brief",
        text: "We agree goals, audience, pages, features and content responsibilities in writing.",
      },
      {
        title: "Design",
        text: "We create wireframes, then full page designs for your approval before any code is written.",
      },
      {
        title: "Build",
        text: "We develop the site, connect integrations and test it on real devices and browsers.",
      },
      {
        title: "Launch",
        text: "We handle domain, hosting, redirects and tracking, then monitor the first weeks.",
      },
      {
        title: "Support",
        text: "We train your team, document the site and offer ongoing care plans.",
      },
    ],
    deliverables: [
      "Approved design files",
      "Responsive, tested website",
      "SEO-ready structure and metadata",
      "Analytics and form tracking",
      "Editing training and documentation",
    ],
    tools: ["Next.js", "WordPress", "Shopify", "Figma", "Tailwind CSS"],
    costFactors: [
      "Number of pages and templates.",
      "Design depth: custom design and animation take longer than a template-based build.",
      "Functionality: booking, payments, member areas and integrations.",
      "Content: who writes the copy and prepares images.",
      "Platform and hosting: custom builds, CMS choice and ongoing maintenance.",
    ],
    results: [
      "A typical business website goes live in three to six weeks, depending on size and how quickly feedback arrives. After launch, search visibility builds over the following months as pages are indexed and improved.",
      "A new site does not guarantee more leads on its own, but a fast, clear, well-tracked site gives your SEO and ads a much stronger place to send traffic.",
    ],
    faqs: [
      {
        q: "How much does website development cost in Mumbai?",
        a: "Cost depends on pages, design depth and functionality. A simple business website costs far less than a custom ecommerce or portal build. We scope your requirements and give a fixed quote.",
      },
      {
        q: "How long does it take to build a website?",
        a: "Most business sites take three to six weeks. Larger or more complex builds take longer. Fast feedback and ready content are the biggest factors in keeping to schedule.",
      },
      {
        q: "Which is better: WordPress, Shopify or a custom website?",
        a: "WordPress suits content-heavy sites with simple needs, Shopify suits online stores and custom builds on Next.js suit speed, flexibility and unique features. We recommend based on your goals and team.",
      },
      {
        q: "Will my website show up on Google?",
        a: "We build with SEO foundations, including clean structure, fast loading, metadata and schema. Ranking also depends on content, competition and ongoing SEO work.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes. We set up an easy editing system and train your team, so you can change text, images and blog posts without a developer.",
      },
      {
        q: "Do you provide hosting and maintenance?",
        a: "We can recommend and set up hosting and offer maintenance plans covering updates, backups, security and small changes.",
      },
      {
        q: "Will my website work on mobile phones?",
        a: "Yes. We design mobile-first because most visitors in India browse on phones. We test on real devices and screen sizes before launch.",
      },
    ],
    related: ["seo", "landing-pages-funnels", "full-stack-development"],
    blog: "digital-marketing-cost-india",
  },

  "full-stack-development": {
    h1: "Full Stack Web Application Development in India for Custom Business Tools",
    intro:
      "We provide full stack web application development in India for dashboards, portals, booking systems and internal tools. Our team builds with React, Node.js and MongoDB, with secure logins, clean code and a clear roadmap from idea to launch.",
    topic: "full stack web application development",
    what: [
      "A web application does more than display information. It lets users log in, submit data, make bookings or payments and manage their own accounts, while your team manages everything from an admin panel. Full stack development covers both the screens people see and the server, database and security behind them.",
      "Off-the-shelf software often forces your process to fit its limits. A custom application fits how you work, connects to the tools you already use and grows with you.",
    ],
    whoFor: [
      "Businesses with a repeatable process that spreadsheets and email can no longer handle.",
      "Startups building a first version of a product.",
      "Service companies that need client portals or booking systems.",
      "Teams that need an admin dashboard or internal reporting tool.",
      "Companies that need to connect several systems, such as CRM, payments and WhatsApp.",
    ],
    includes: [
      "Requirements workshops and technical planning",
      "Frontend in React or Next.js",
      "Backend APIs in Node.js with MongoDB or SQL",
      "Authentication, roles and admin panels",
      "Payment, email and third-party integrations",
      "Deployment, monitoring and support",
    ],
    process: [
      {
        title: "Scope",
        text: "We define users, features and priorities, and split the work into milestones.",
      },
      {
        title: "Design",
        text: "We map user flows and the data model, then design the interface.",
      },
      {
        title: "Build",
        text: "We develop in short sprints with regular demos so you see progress early.",
      },
      {
        title: "Test",
        text: "We test features, security and performance before release.",
      },
      {
        title: "Launch and support",
        text: "We deploy, document the system and provide a support window after go-live.",
      },
    ],
    deliverables: [
      "Written scope and roadmap",
      "Production-ready application",
      "Source code and documentation",
      "Admin panel and user roles",
      "Post-launch support window",
    ],
    tools: ["React and Next.js", "Node.js", "MongoDB", "TypeScript", "Vercel or AWS"],
    costFactors: [
      "Feature count and complexity.",
      "User roles and permissions.",
      "Integrations: payments, CRM, WhatsApp, maps and others.",
      "Design requirements and branding.",
      "Hosting, security and compliance needs.",
    ],
    results: [
      "A focused first version, often called an MVP, can usually launch in two to four months depending on scope. We prioritise the features that deliver value first, then expand based on real usage.",
      "You receive full ownership of the code and clear documentation, so you are never locked in to us.",
    ],
    faqs: [
      {
        q: "How much does custom web application development cost in India?",
        a: "Cost depends on features, integrations and design. We scope your requirements and give a fixed or milestone-based quote, so you know the investment before work begins.",
      },
      {
        q: "How long does it take to build a web application?",
        a: "A focused first version typically takes two to four months. Larger systems take longer. Splitting the work into milestones lets you start using the key features sooner.",
      },
      {
        q: "What technologies do you use?",
        a: "We build with React and Next.js on the frontend and Node.js with MongoDB or SQL on the backend, using TypeScript for reliability. We choose tools to suit your needs.",
      },
      {
        q: "Do I own the source code?",
        a: "Yes. On final payment you own the code, designs and deployments. We provide documentation so another developer can take over if needed.",
      },
      {
        q: "Can you add features to an existing application?",
        a: "Yes. We review the current code, recommend improvements and add features, or help rebuild parts that are hard to maintain.",
      },
      {
        q: "How do you keep the application secure?",
        a: "We use hashed passwords, role-based access, input validation, encrypted connections and rate limiting, and we test for common vulnerabilities before launch.",
      },
      {
        q: "Do you offer support after launch?",
        a: "Yes. A support window is included and ongoing maintenance plans cover updates, monitoring and new features.",
      },
    ],
    related: ["website-design-development", "crm-automation", "analytics-tracking"],
    blog: "digital-marketing-cost-india",
  },

  "crm-automation": {
    h1: "CRM Setup Services in India That Capture and Follow Up Every Lead",
    intro:
      "Our CRM setup services make sure every enquiry is captured, assigned and followed up on time. We configure HubSpot, Zoho or a custom CRM, connect your ads, website and WhatsApp, and automate reminders so no lead goes cold.",
    topic: "CRM setup and automation",
    what: [
      "A CRM, or customer relationship management system, is where your leads, conversations and deals live. A good setup shows who enquired, where they came from, what was said and what should happen next.",
      "Automation handles the repetitive parts. When a form is submitted, the CRM can assign the lead, send an instant reply, create a task for your team and remind them if nobody responds. Faster follow-up usually means more conversations and more sales.",
    ],
    whoFor: [
      "Businesses that track leads in spreadsheets, notebooks or WhatsApp chats.",
      "Real estate, education and healthcare teams that handle many enquiries.",
      "Companies running ads that cannot tell which leads became customers.",
      "Sales teams that miss follow-ups.",
      "Business owners who want a clear view of the pipeline.",
    ],
    includes: [
      "CRM selection and setup",
      "Lead capture from forms, ads, calls and WhatsApp",
      "Pipeline stages, scoring and assignment rules",
      "Automated email, SMS and WhatsApp follow-ups",
      "Reminders, tasks and sales dashboards",
      "Team training and playbook",
    ],
    process: [
      {
        title: "Map",
        text: "We document how enquiries arrive today and how your team handles them.",
      },
      {
        title: "Design",
        text: "We define pipeline stages, fields and the automation rules that fit your sales process.",
      },
      {
        title: "Build",
        text: "We configure the CRM and connect every lead source and message channel.",
      },
      {
        title: "Train",
        text: "We train your team and write a short playbook for daily use.",
      },
      {
        title: "Refine",
        text: "After a few weeks of real data, we adjust stages, scoring and reports.",
      },
    ],
    deliverables: [
      "Configured CRM and pipelines",
      "Automation workflows",
      "Lead-source integrations",
      "Sales dashboards",
      "Team training and playbook",
    ],
    tools: ["HubSpot", "Zoho CRM", "Zapier or Make", "WhatsApp Business API", "Google Sheets"],
    costFactors: [
      "CRM platform and the number of user licences.",
      "Number of lead sources and integrations.",
      "Complexity of pipelines and automation rules.",
      "Data migration from spreadsheets or an old CRM.",
      "Training and ongoing support needs.",
    ],
    results: [
      "Most teams see faster response times within days of go-live, because replies and tasks happen automatically. Over the following months, clearer reporting shows which sources and stages produce paying customers.",
      "A CRM supports your sales team but does not replace them. Results improve when the team uses it daily, which is why training and a simple setup matter.",
    ],
    faqs: [
      {
        q: "What does a CRM do for a small business?",
        a: "It keeps all leads and conversations in one place, reminds you to follow up and shows what is in your pipeline. That means fewer missed enquiries and a clearer view of sales.",
      },
      {
        q: "Which CRM is best for Indian businesses?",
        a: "HubSpot suits growing teams that want marketing and sales together, Zoho suits cost-conscious businesses and custom CRMs suit unusual processes. We recommend based on your team and budget.",
      },
      {
        q: "How much do CRM setup services cost?",
        a: "Cost depends on the platform, the number of integrations and the automation required. We scope it and give a fixed quote. Software licences are separate.",
      },
      {
        q: "How long does CRM implementation take?",
        a: "A standard setup takes two to four weeks, including testing and training. Larger migrations take longer.",
      },
      {
        q: "Can the CRM connect to my Meta and Google ads?",
        a: "Yes. Leads from Meta lead forms, Google forms and your website can flow into the CRM automatically with their source recorded.",
      },
      {
        q: "Can the CRM send WhatsApp messages automatically?",
        a: "Yes, through the WhatsApp Business API. You can send instant acknowledgements, reminders and follow-ups to opted-in leads.",
      },
      {
        q: "Will my team find it hard to use?",
        a: "We keep the setup simple, train your team on real examples and provide a one-page guide. Adoption is the main factor in success, so we plan for it.",
      },
    ],
    related: ["whatsapp-marketing", "email-marketing", "analytics-tracking"],
    blog: "digital-marketing-cost-india",
  },
};
