import type { ServiceExtra } from "../service-types";

/** Extra sections for every service page. Keyed by service slug. */
export const extraContent: Record<string, ServiceExtra> = {
  seo: {
    approach:
      "We start with what your customers type into Google, not a keyword export. We match each search to a page that answers it, fix what stops Google reading it and build trust signals around it. Local businesses also get a Google Business Profile plan, because maps often appear first in Mumbai.",
    mistakes: [
      "Targeting keywords nobody buys with, so traffic rises but enquiries do not.",
      "Ignoring technical problems such as slow pages, duplicate content and blocked resources.",
      "Publishing thin pages for every area name instead of useful, distinct content.",
      "Buying cheap links that put the site at risk of a penalty.",
    ],
    measure: [
      "Organic enquiries and calls",
      "Impressions and clicks in Search Console",
      "Rankings for priority keywords",
      "Google Business Profile actions",
      "Indexed pages and Core Web Vitals",
    ],
    prepare: [
      "Access to Google Search Console, Analytics and your website CMS.",
      "A list of your main services, locations and best customers.",
      "The competitors you want us to benchmark.",
      "Someone who can approve changes within a few working days.",
    ],
    extraFaq: {
      q: "Is SEO worth it for a small business?",
      a: "Yes, if your customers search for what you sell. Start with a few high-intent services and your local area, then build steadily.",
    },
  },

  "meta-ads": {
    approach:
      "Meta finds buyers when it gets good creative and clean conversion data, so we focus there. We test messages before audiences, keep structures simple and let data decide which offers get more budget. Weekly reviews focus on cost per result, not likes.",
    mistakes: [
      "Boosting posts instead of running proper campaigns with a clear objective.",
      "Changing budgets and audiences every day, which resets learning.",
      "Using one creative for everyone instead of testing several angles.",
      "Sending traffic to a slow or confusing page.",
    ],
    measure: [
      "Cost per lead or cost per purchase",
      "Return on ad spend",
      "Lead quality and sales from leads",
      "Frequency and creative fatigue",
      "Click-through and landing page conversion",
    ],
    prepare: [
      "Admin access to your Facebook Page, Instagram account and ad account.",
      "Product or service details, prices and offers.",
      "Existing photos, videos and testimonials.",
      "A way to tell us which leads became customers.",
    ],
    extraFaq: {
      q: "What is the difference between boosting a post and running Meta Ads?",
      a: "Boosting promotes a single post with limited targeting and goals. Ads Manager lets you choose objectives, audiences, placements and creative variations, and it tracks conversions. For leads and sales, proper campaigns almost always perform better.",
    },
  },

  "google-ads": {
    approach:
      "We build around buying intent: tight keyword groups, ads that echo the search and irrelevant queries excluded from day one. Then we use real conversion data, including calls and CRM outcomes, to decide where bids and budget go. Automation helps only after tracking is accurate.",
    mistakes: [
      "Using broad match without negative keywords, which pays for irrelevant clicks.",
      "Sending every keyword to the homepage.",
      "Counting any click or page view as a conversion.",
      "Running Performance Max before tracking and product data are ready.",
    ],
    measure: [
      "Cost per qualified lead or sale",
      "Conversion rate by keyword and ad",
      "Search impression share",
      "Wasted spend found in search terms",
      "Return on ad spend",
    ],
    prepare: [
      "Access to your Google Ads, Analytics and Tag Manager accounts.",
      "Your service list, locations and margins.",
      "Landing page or website access.",
      "Information on which calls or leads turned into sales.",
    ],
    extraFaq: {
      q: "What is a good conversion rate for Google Ads?",
      a: "It varies by industry and offer, so compare against your own history rather than a universal number. Many lead-generation accounts convert in the low to mid single digits. We set a baseline in the first month and improve it step by step.",
    },
  },

  "landing-pages-funnels": {
    approach:
      "A landing page succeeds when it answers one visitor question quickly: is this for me, and can I trust it? We write the headline, proof and form around that question, build for phones first and keep the page light. Then we test one change at a time so you learn what actually moves conversion.",
    mistakes: [
      "Adding menus and links that lead visitors away from the offer.",
      "Asking for too many form fields up front.",
      "Making promises without proof.",
      "Launching without checking speed on a mobile connection.",
    ],
    measure: [
      "Conversion rate",
      "Cost per lead",
      "Form completion rate",
      "Bounce rate and scroll depth",
      "Time to first content on mobile",
    ],
    prepare: [
      "Your offer, price points and any guarantees you can honestly state.",
      "Testimonials, results or logos you have permission to use.",
      "Brand assets and photos.",
      "The tool where leads should arrive.",
    ],
    extraFaq: {
      q: "How do I improve my landing page conversion rate?",
      a: "Clarify the headline, shorten the form, add real proof, speed up loading and place one clear button above the fold. Then run A/B tests, changing one element at a time.",
    },
  },

  "analytics-tracking": {
    approach:
      "We treat tracking as infrastructure. First we decide which actions matter to the business, such as a call, a form, a purchase or a booked demo. Then we implement them once, name them consistently and test them against real orders or CRM records. Dashboards come last, built from data we have verified.",
    mistakes: [
      "Counting every page view as a conversion.",
      "Leaving old Universal Analytics goals unmigrated.",
      "Installing the same pixel twice through the theme and Tag Manager.",
      "Ignoring consent settings, which risks both data loss and compliance problems.",
    ],
    measure: [
      "Event accuracy against real orders or leads",
      "Conversion rate by source and campaign",
      "Revenue and ROAS by channel",
      "Match quality in Meta Events Manager",
      "How often your team uses the reports",
    ],
    prepare: [
      "Admin access to GA4, Tag Manager and your ad accounts.",
      "Developer access or a developer contact for site changes.",
      "A list of key actions and funnels.",
      "Orders or lead data to check the numbers against.",
    ],
    extraFaq: {
      q: "What events should I track in GA4?",
      a: "Track actions that show intent and revenue: form submissions, calls, WhatsApp clicks, add to cart, checkout steps and purchases. Start with a small, well-named set rather than every possible click.",
    },
  },

  "ecommerce-marketing": {
    approach:
      "We start in the store. Ad money spent on a page that does not convert is wasted, so we fix product pages, speed and checkout first. Then we match channels to your margins: catalogue ads to find new buyers, Shopping for high-intent searches, and email and WhatsApp to bring customers back.",
    mistakes: [
      "Scaling ad spend without knowing your break-even ROAS.",
      "Using supplier images and descriptions that look like everyone else's.",
      "Ignoring repeat purchases, which cost less than new customers.",
      "Leaving feed errors that stop products from showing.",
    ],
    measure: [
      "Revenue, ROAS and contribution margin",
      "Conversion rate and average order value",
      "Cart-recovery revenue",
      "Repeat purchase rate",
      "Product feed approval rate",
    ],
    prepare: [
      "Store admin access and ad accounts.",
      "Product costs and margins so we can set targets.",
      "Your best sellers and seasonal plans.",
      "Shipping and returns policies.",
    ],
    extraFaq: {
      q: "How do I get my first sales on a new online store?",
      a: "Start with a few strong products and clear pages, then use targeted ads and WhatsApp or email outreach to reach people who already know you. Collect reviews early and keep delivery and returns information visible.",
    },
  },

  "social-media-management": {
    approach:
      "We plan content around what your customers want to know, see and trust, not around trends. Each month mixes educational posts, proof such as customer stories, behind-the-scenes content and clear offers. We reply to people quickly, because conversations in comments and messages are often where sales start.",
    mistakes: [
      "Posting only promotions and discounts.",
      "Being on every platform without the capacity to do any of them well.",
      "Ignoring comments and direct messages.",
      "Buying followers, which hurts reach and credibility.",
    ],
    measure: [
      "Reach and engagement rate",
      "Profile visits and link clicks",
      "Messages and enquiries received",
      "Follower growth from your target audience",
      "Best-performing content themes",
    ],
    prepare: [
      "Logins or admin access to your social accounts.",
      "Brand assets and tone preferences.",
      "Photos or videos of your products, work and team.",
      "A contact for approvals and urgent replies.",
    ],
    extraFaq: {
      q: "How do I grow my Instagram following organically?",
      a: "Post consistently, use clear hooks in reels, reply to comments, collaborate with relevant accounts and share content people want to save and send. Growth comes from useful content and regular engagement.",
    },
  },

  "content-marketing": {
    approach:
      "We write for the person with the problem, not for a keyword counter. Each piece answers a real question better than the pages already ranking, uses clear structure and links to the next step. Editors check facts, and we update articles when things change, because old content loses trust.",
    mistakes: [
      "Publishing generic articles that repeat what everyone else says.",
      "Targeting topics with no link to what you sell.",
      "Ignoring search intent, so the page format does not match what searchers want.",
      "Never updating older posts.",
    ],
    measure: [
      "Rankings and organic traffic per page",
      "Enquiries from content",
      "Engagement: time on page and scroll depth",
      "Backlinks earned",
      "Content refreshed and republished",
    ],
    prepare: [
      "Access to your CMS and Search Console.",
      "Subject-matter input from your team.",
      "Existing brochures, case notes and customer questions.",
      "Examples of a brand voice you like.",
    ],
    extraFaq: {
      q: "How often should I publish blog posts?",
      a: "Quality and relevance matter more than frequency. Many businesses do well with two to four strong articles a month. Choose a rhythm you can sustain for at least six months.",
    },
  },

  "video-editing-design": {
    approach:
      "We edit for attention and clarity. That means a hook in the first seconds, one idea per video, captions for people watching without sound and an ending that tells viewers what to do. For design work we create templates, so your team can post consistently without starting from scratch.",
    mistakes: [
      "Burying the point after a slow intro.",
      "Skipping captions, though most people watch muted.",
      "Changing fonts and colours in every post.",
      "Using music or footage without the right licence.",
    ],
    measure: [
      "Watch time and average view duration",
      "Shares, saves and comments",
      "Click-through on ad creatives",
      "Cost per result for video ads",
      "Turnaround time against agreed deadlines",
    ],
    prepare: [
      "Raw footage in the highest quality available.",
      "Your logo, colours and fonts.",
      "References of styles you like.",
      "A script, hook ideas or key messages.",
    ],
    extraFaq: {
      q: "How long should a reel be?",
      a: "There is no perfect length. Reels of 15 to 30 seconds often hold attention well, while tutorials may need 45 to 90 seconds. Keep it as short as the idea allows and test different lengths.",
    },
  },

  "email-marketing": {
    approach:
      "We start with flows that run all the time, because they earn while you sleep: a welcome series, cart or browse reminders, post-purchase care and win-back. Newsletters follow, built from segments rather than one list for everyone. We watch deliverability closely so the emails reach the inbox in the first place.",
    mistakes: [
      "Sending the same email to the entire list.",
      "Skipping authentication, so mail lands in spam.",
      "Using vague subject lines and several competing calls to action.",
      "Never cleaning inactive contacts.",
    ],
    measure: [
      "Revenue per email and per flow",
      "Click rates, read alongside conversions",
      "Spam complaints and unsubscribe rate",
      "List growth and engagement",
      "Deliverability and inbox placement",
    ],
    prepare: [
      "Access to your email platform or store.",
      "Your customer list with consent records.",
      "Brand assets and product information.",
      "Offers and seasonal plans for the year.",
    ],
    extraFaq: {
      q: "What is a good email open rate?",
      a: "Open rates vary and are less reliable now, because privacy features can pre-load emails. Focus on clicks, replies and revenue, and compare your own results month to month instead of chasing a benchmark.",
    },
  },

  "whatsapp-marketing": {
    approach:
      "We treat WhatsApp as a conversation channel, not a loudspeaker. We design messages people expect and value, such as confirmations, reminders and quick answers, and keep promotional broadcasts rare and relevant. Clear opt-in, easy opt-out and sensible volumes protect your quality rating and your customers' trust.",
    mistakes: [
      "Messaging contacts who never opted in.",
      "Sending long promotional broadcasts too often.",
      "Leaving the chatbot with no route to a human.",
      "Ignoring template quality ratings until the number is restricted.",
    ],
    measure: [
      "Delivery and read rates",
      "Reply and conversation rates",
      "Leads or sales from chats",
      "Opt-out rate",
      "Response time of your team",
    ],
    prepare: [
      "A verified Meta Business account.",
      "A phone number suitable for the API.",
      "Your opt-in process and customer lists.",
      "Common customer questions and answers.",
    ],
    extraFaq: {
      q: "How do I get WhatsApp Business API approval?",
      a: "You need a verified Meta Business account, a suitable phone number and a provider that connects to the API. We handle the application, display name and template approvals for you.",
    },
  },

  "website-design-development": {
    approach:
      "We plan the site around the questions visitors ask before they contact you. Pages are written to answer them, structured so Google can read them and built with fast, modern tools. You see designs before development starts, so changes happen when they are cheap, and you can edit your own content after launch.",
    mistakes: [
      "Starting design before agreeing the goal of each page.",
      "Using heavy images and plugins that slow the site.",
      "Forgetting redirects when replacing an old site, which loses rankings.",
      "Launching without analytics and form testing.",
    ],
    measure: [
      "Page speed and Core Web Vitals",
      "Enquiries and conversion rate",
      "Organic traffic after launch",
      "Mobile usability issues",
      "Form and tracking accuracy",
    ],
    prepare: [
      "Your logo, brand colours and photos.",
      "Content or interviews so we can write the copy.",
      "Access to your domain and current hosting.",
      "One person who can approve designs.",
    ],
    extraFaq: {
      q: "What should I include on a business website?",
      a: "Clear service pages, an about page with real proof of expertise, reviews, contact details, a simple enquiry form and a fast mobile experience. Add useful content such as guides and FAQs as you grow.",
    },
  },

  "full-stack-development": {
    approach:
      "We build the smallest version that proves the idea, then grow it. That means clear milestones, working software every couple of weeks and honest estimates. We choose reliable technology where we can and document decisions, so the application stays easy to maintain and extend.",
    mistakes: [
      "Trying to build every feature before launch.",
      "Skipping a written scope, which leads to disputes later.",
      "Ignoring security and backups until something breaks.",
      "Choosing tools because they are trendy, not because they fit.",
    ],
    measure: [
      "Milestones delivered against plan",
      "Bugs found before and after release",
      "Page and API response times",
      "User adoption and task completion",
      "Uptime and error rates",
    ],
    prepare: [
      "A description of the problem and who will use the system.",
      "Examples of current spreadsheets or processes.",
      "A list of tools it must connect to.",
      "A decision-maker for scope and priorities.",
    ],
    extraFaq: {
      q: "What is an MVP in software development?",
      a: "An MVP, or minimum viable product, is the first version with only the features needed to test the idea with real users. It lets you launch sooner, learn from feedback and invest in what works.",
    },
  },

  "crm-automation": {
    approach:
      "We copy your real sales process into the CRM before adding any automation. Every stage, field and rule should match how your team works, otherwise people stop using it. Then we automate the slow parts, such as instant replies, assignments and reminders, so leads get a fast, consistent response.",
    mistakes: [
      "Customising the CRM before mapping the sales process.",
      "Adding too many fields, which discourages data entry.",
      "Letting leads from ads and WhatsApp sit outside the system.",
      "Skipping training and then blaming the tool.",
    ],
    measure: [
      "Speed to first response",
      "Lead-to-meeting and lead-to-sale rates",
      "Follow-ups completed on time",
      "Pipeline value by stage",
      "Source-to-revenue reporting",
    ],
    prepare: [
      "A walkthrough of how you handle leads today.",
      "Your lead sources and tools.",
      "Existing contact lists for import.",
      "The team members who will use the CRM.",
    ],
    extraFaq: {
      q: "How do I choose between HubSpot and Zoho?",
      a: "Compare team size, budget, integrations and the features you actually need. HubSpot offers a polished all-in-one experience, while Zoho offers strong value and customisation. We can run a short evaluation against your workflow.",
    },
  },

  "branding-logo-design": {
    approach:
      "We begin with positioning, because a logo that looks good but says the wrong thing does not help. We explore a few clearly different directions, test them against your audience and competitors and refine the strongest. Then we build a simple system your team can apply without a designer.",
    mistakes: [
      "Copying a competitor's look and blending into the market.",
      "Choosing trendy styles that age quickly.",
      "Using too many colours and fonts.",
      "Not planning for small sizes, such as social profile icons.",
    ],
    measure: [
      "Consistency across channels",
      "Recognition in customer feedback",
      "Files delivered in every required format",
      "Time saved with templates",
      "Clarity of guidelines for your team",
    ],
    prepare: [
      "A short description of your business and customers.",
      "Examples of brands you admire and dislike.",
      "Names or taglines you are considering.",
      "Where the brand will appear first.",
    ],
    extraFaq: {
      q: "What should a brand guideline include?",
      a: "Logo versions and clear space, colour codes, typography, imagery style, tone of voice and examples of correct and incorrect use. A short, visual guide is easier for teams to follow.",
    },
  },

  "influencer-marketing": {
    approach:
      "We choose creators for fit and evidence, not follower counts. We look at who actually watches and responds, then give creators room to present your product in their own voice within clear guidelines. Tracking is planned before outreach, so every creator has a link or code to measure.",
    mistakes: [
      "Paying for reach without checking audience quality.",
      "Over-scripting creators, which makes content feel fake.",
      "Running one-off posts instead of repeat collaborations.",
      "Forgetting usage rights for paid ads.",
    ],
    measure: [
      "Reach and engagement on creator posts",
      "Clicks and code redemptions",
      "Sales and cost per order by creator",
      "Quality of content for reuse in ads",
      "Creator reliability and delivery",
    ],
    prepare: [
      "Your campaign goal and budget range.",
      "Product samples and key messages.",
      "Do's and don'ts for the brand.",
      "A contact who can approve content quickly.",
    ],
    extraFaq: {
      q: "How do I find the right influencers for my brand?",
      a: "Start with creators your customers already follow. Check engagement, comments and audience location, review past brand work and ask for audience insights before agreeing a fee.",
    },
  },

  "online-reputation-management": {
    approach:
      "We focus on the reviews and results real customers see first. We reply to feedback fast and politely, make leaving a review simple for happy customers and help fix the recurring problems that cause complaints. Search results improve through accurate, useful content and complete business profiles, never through tricks.",
    mistakes: [
      "Ignoring negative reviews or replying defensively.",
      "Asking only some customers for reviews, or offering incentives that break the rules.",
      "Leaving business profiles incomplete or inconsistent.",
      "Treating reputation as a one-time clean-up.",
    ],
    measure: [
      "Average rating and review count",
      "Response rate and response time",
      "Share of positive reviews",
      "Quality of brand search results",
      "Mentions and sentiment over time",
    ],
    prepare: [
      "Access to your Google Business Profile and other listings.",
      "A list of locations and platforms.",
      "Your policy for refunds and complaints.",
      "A contact for sensitive issues.",
    ],
    extraFaq: {
      q: "Can reviews really affect my local SEO ranking?",
      a: "Yes. Review quantity, quality and recency are among the factors for local results, and good reviews also increase clicks and enquiries. Responding to reviews shows customers you care.",
    },
  },
};
