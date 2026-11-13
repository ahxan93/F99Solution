/**
 * Credits for the stock photos in public/images/ (Pixabay). Written by `npm run images:fetch`
 * (scripts/fetch-images.ts), keyed by slot key (see data/image-slots.ts). A slot with an entry here
 * shows that photo's `alt`; slots without one keep their branded illustration and its alt text.
 * `alt` describes what the photo actually shows; edit it by hand after reviewing the photo.
 */
export interface ImageCredit {
  /** Pixabay photo id (each id is used for one slot only). */
  id: number;
  /** Contributor name. */
  photographer: string;
  /** Contributor profile on Pixabay. */
  photographerUrl: string;
  /** Pixabay page of the photo. */
  url: string;
  /** What the photo shows (reviewed). */
  alt: string;
  /** Search query that found it. */
  query: string;
}

export const imageCredits: Record<string, ImageCredit> = {
  "seo-card": {
    "id": 767776,
    "photographer": "Lalmch",
    "photographerUrl": "https://pixabay.com/users/1026205/",
    "url": "https://pixabay.com/photos/computer-summary-chart-business-767776/",
    "alt": "Close-up laptop with analytics charts and business dashboard",
    "query": "indian seo analytics laptop screen close up"
  },
  "meta-ads-card": {
    "id": 4246954,
    "photographer": "Averyanovphoto",
    "photographerUrl": "https://pixabay.com/users/12664159/",
    "url": "https://pixabay.com/photos/woman-coffee-phone-portrait-lady-4246954/",
    "alt": "Young woman checks smartphone while drinking iced coffee in a cozy cafe.",
    "query": "indian woman using smartphone social media"
  },
  "google-ads-card": {
    "id": 2937216,
    "photographer": "RachelScottYoga",
    "photographerUrl": "https://pixabay.com/users/1908782/",
    "url": "https://pixabay.com/photos/computer-kind-smile-2937216/",
    "alt": "Smiling woman typing on a laptop in a cozy home workspace.",
    "query": "indian over the shoulder laptop search"
  },
  "analytics-tracking-card": {
    "id": 1841158,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/analysis-analytics-business-charts-1841158/",
    "alt": "Tablet with analytics dashboard and printed business reports on a desk.",
    "query": "indian analytics dashboard business team"
  },
  "social-media-management-card": {
    "id": 407108,
    "photographer": "SplitShire",
    "photographerUrl": "https://pixabay.com/users/364019/",
    "url": "https://pixabay.com/photos/smartphone-hands-screen-407108/",
    "alt": "Hands hold a smartphone recording a live concert with stage lights.",
    "query": "indian content creator smartphone filming"
  },
  "content-marketing-card": {
    "id": 865073,
    "photographer": "picjumbo_com",
    "photographerUrl": "https://pixabay.com/users/2130229/",
    "url": "https://pixabay.com/photos/student-notebook-female-study-type-865073/",
    "alt": "Woman typing on laptop on sofa in a casual home office setting.",
    "query": "indian writer typing laptop notebook"
  },
  "video-editing-design-card": {
    "id": 1141505,
    "photographer": "Recklessstudios",
    "photographerUrl": "https://pixabay.com/users/1884442/",
    "url": "https://pixabay.com/photos/editing-video-computer-1141505/",
    "alt": "Close-up video editing timeline on monitor with audio tracks.",
    "query": "indian video editing monitor timeline"
  },
  "email-marketing-card": {
    "id": 620822,
    "photographer": "Firmbee",
    "photographerUrl": "https://pixabay.com/users/663163/",
    "url": "https://pixabay.com/photos/office-business-accountant-620822/",
    "alt": "Woman using a smartphone over a laptop keyboard at a modern desk.",
    "query": "indian man typing email laptop"
  },
  "whatsapp-marketing-card": {
    "id": 1847044,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/woman-smartphone-technology-1847044/",
    "alt": "Young woman using smartphone outdoors at sunset in an urban setting.",
    "query": "indian chatting smartphone close up"
  },
  "website-design-development-card": {
    "id": 6795505,
    "photographer": "OleksandrPidvalnyi",
    "photographerUrl": "https://pixabay.com/users/4638469/",
    "url": "https://pixabay.com/photos/telework-technology-laptop-6795505/",
    "alt": "Woman working on laptop at a home office desk.",
    "query": "indian web designer working computer"
  },
  "full-stack-development-card": {
    "id": 1839406,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/code-coding-computer-data-1839406/",
    "alt": "Close-up of colorful source code on screen for programming and software development",
    "query": "indian programmer code monitor"
  },
  "crm-automation-card": {
    "id": 3213924,
    "photographer": "Mohamed_hassan",
    "photographerUrl": "https://pixabay.com/users/5229782/",
    "url": "https://pixabay.com/photos/teamwork-cooperation-brainstorming-3213924/",
    "alt": "Business team showing unity with fist bump over office desk.",
    "query": "indian tablet business customer"
  },
  "branding-logo-design-card": {
    "id": 767781,
    "photographer": "Lalmch",
    "photographerUrl": "https://pixabay.com/users/1026205/",
    "url": "https://pixabay.com/photos/computer-macbook-tablet-editing-767781/",
    "alt": "Laptop with photo editing on a clean desk with graphics tablet and lamp.",
    "query": "indian graphic designer stylus tablet"
  },
  "online-reputation-management-card": {
    "id": 5207277,
    "photographer": "Tumisu",
    "photographerUrl": "https://pixabay.com/users/148124/",
    "url": "https://pixabay.com/photos/review-opinion-feedback-stars-5207277/",
    "alt": "Business hand choosing four-star rating for customer feedback and service quality.",
    "query": "indian customer review five stars smartphone"
  },
  "home-process": {
    "id": 1284667,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/sticky-notes-note-notice-board-1284667/",
    "alt": "Colorful handwritten sticky notes on a wall for brainstorming and planning.",
    "query": "indian sticky notes planning wall"
  },
  "blog-meta-vs-google": {
    "id": 1478822,
    "photographer": "freephotocc",
    "photographerUrl": "https://pixabay.com/users/2275370/",
    "url": "https://pixabay.com/photos/laptop-coffee-notebook-pen-glasses-1478822/",
    "alt": "Modern desk workspace with laptop, notebook, coffee, phone and glasses.",
    "query": "indian comparing smartphone laptop desk"
  },
  "blog-cost": {
    "id": 7702634,
    "photographer": "F1Digitals",
    "photographerUrl": "https://pixabay.com/users/1568321/",
    "url": "https://pixabay.com/photos/money-savings-credit-card-count-7702634/",
    "alt": "Yellow piggy bank with Indian rupees and calculator for savings",
    "query": "indian calculator budget desk"
  },
  "case-d2c-fashion": {
    "id": 1850082,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/hangers-clothing-shopping-market-1850082/",
    "alt": "Clothing on wooden hangers in a boutique with soft blurred background.",
    "query": "indian fashion clothing store"
  },
  "case-clinic": {
    "id": 563429,
    "photographer": "DarkoStojanovic",
    "photographerUrl": "https://pixabay.com/users/638422/",
    "url": "https://pixabay.com/photos/doctor-medical-medicine-health-563429/",
    "alt": "Female dentist in mask and goggles with instrument in a modern clinic.",
    "query": "indian doctor clinic reception"
  },
  "case-b2b-saas": {
    "id": 1836990,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/laptop-notebook-business-charts-1836990/",
    "alt": "Laptop with analytics dashboard and notebook on a clean office desk.",
    "query": "indian software dashboard laptop"
  },
  "case-real-estate": {
    "id": 5339245,
    "photographer": "RandyJost",
    "photographerUrl": "https://pixabay.com/users/4341842/",
    "url": "https://pixabay.com/photos/architecture-real-estate-property-5339245/",
    "alt": "Bright historic empty room with parquet floor and large windows.",
    "query": "indian apartment interior living room"
  },
  "case-restaurant": {
    "id": 2940553,
    "photographer": "freestocks-photos",
    "photographerUrl": "https://pixabay.com/users/7014431/",
    "url": "https://pixabay.com/photos/food-drinks-people-adult-alone-2940553/",
    "alt": "Woman using smartphone while relaxing with coffee in a cozy cafe.",
    "query": "indian cafe table smartphone coffee"
  },
  "about-story": {
    "id": 594090,
    "photographer": "StartupStockPhotos",
    "photographerUrl": "https://pixabay.com/users/690514/",
    "url": "https://pixabay.com/photos/startup-meeting-brainstorming-594090/",
    "alt": "Team meeting in office with notes, laptop and coffee",
    "query": "indian colleagues working together office"
  },
  "about-team": {
    "id": 1868728,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/concept-man-papers-person-plan-1868728/",
    "alt": "Back view of a man brainstorming before a wall of notes and sketches.",
    "query": "indian team brainstorming whiteboard"
  },
  "seo-hero": {
    "id": 594132,
    "photographer": "StartupStockPhotos",
    "photographerUrl": "https://pixabay.com/users/690514/",
    "url": "https://pixabay.com/photos/office-startup-business-home-office-594132/",
    "alt": "Business professional writing in a notebook beside a laptop at a modern desk.",
    "query": "indian marketing team office laptops"
  },
  "meta-ads-support": {
    "id": 865091,
    "photographer": "picjumbo_com",
    "photographerUrl": "https://pixabay.com/users/2130229/",
    "url": "https://pixabay.com/photos/office-desk-smartphone-modern-865091/",
    "alt": "Modern black office desk with smartphone and laptop.",
    "query": "indian flat lay smartphone social media"
  },
  "google-ads-support": {
    "id": 1280537,
    "photographer": "freephotocc",
    "photographerUrl": "https://pixabay.com/users/2275370/",
    "url": "https://pixabay.com/photos/cup-of-coffee-laptop-office-macbook-1280537/",
    "alt": "Top view of laptop and black coffee on a wooden workspace desk.",
    "query": "indian keyboard coffee desk top view"
  },
  "landing-pages-funnels-hero": {
    "id": 4702060,
    "photographer": "This_is_Engineering",
    "photographerUrl": "https://pixabay.com/users/11384528/",
    "url": "https://pixabay.com/photos/woman-work-office-whiteboard-4702060/",
    "alt": "Smiling businesswoman by a whiteboard during an office presentation.",
    "query": "indian ux designers whiteboard"
  },
  "analytics-tracking-support": {
    "id": 1433427,
    "photographer": "AS_Photography",
    "photographerUrl": "https://pixabay.com/users/1546875/",
    "url": "https://pixabay.com/photos/digital-marketing-technology-1433427/",
    "alt": "Tablet with analytics dashboard on desk in a modern workspace",
    "query": "indian charts graphs desk top view"
  },
  "ecommerce-marketing-hero": {
    "id": 5619201,
    "photographer": "tianya1223",
    "photographerUrl": "https://pixabay.com/users/4833799/",
    "url": "https://pixabay.com/photos/store-stacks-shelves-stock-5619201/",
    "alt": "Long warehouse aisle with tall racks, boxes and inventory in a distribution center.",
    "query": "indian online store warehouse packages"
  },
  "social-media-management-hero": {
    "id": 8683196,
    "photographer": "danielchrisman",
    "photographerUrl": "https://pixabay.com/users/43288080/",
    "url": "https://pixabay.com/photos/podcast-video-broadcast-record-8683196/",
    "alt": "Smiling podcast host recording an interview in a cozy home studio.",
    "query": "indian content creators studio"
  },
  "social-media-management-support": {
    "id": 2208045,
    "photographer": "LUM3N",
    "photographerUrl": "https://pixabay.com/users/1066559/",
    "url": "https://pixabay.com/photos/fashion-accessories-handbag-2208045/",
    "alt": "Flat lay travel outfit with leather bag, boots, camera and accessories.",
    "query": "indian camera phone props flat lay"
  },
  "content-marketing-hero": {
    "id": 4081842,
    "photographer": "expresswriters",
    "photographerUrl": "https://pixabay.com/users/11995773/",
    "url": "https://pixabay.com/photos/influencer-writing-girl-woman-4081842/",
    "alt": "Young woman working on a laptop on wooden floor by a white brick wall.",
    "query": "indian writers coffee shop laptop"
  },
  "content-marketing-support": {
    "id": 2850091,
    "photographer": "6689062",
    "photographerUrl": "https://pixabay.com/users/6689062/",
    "url": "https://pixabay.com/photos/journal-write-blank-pages-notes-2850091/",
    "alt": "Open lined notebook with blue pen on a rustic wooden desk.",
    "query": "indian notebook pen top view"
  },
  "video-editing-design-hero": {
    "id": 1850469,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/photography-studio-photo-shoot-1850469/",
    "alt": "Professional photo studio with softboxes, strobes and backdrop indoors.",
    "query": "indian video production studio"
  },
  "website-design-development-hero": {
    "id": 4795762,
    "photographer": "yeiferr",
    "photographerUrl": "https://pixabay.com/users/13554766/",
    "url": "https://pixabay.com/photos/computer-laptop-tech-blue-computer-4795762/",
    "alt": "Modern desk with laptop showing code in a clean office.",
    "query": "indian web developers office"
  },
  "influencer-marketing-hero": {
    "id": 7726802,
    "photographer": "u_ojq9rdzqq7",
    "photographerUrl": "https://pixabay.com/users/32941868/",
    "url": "https://pixabay.com/photos/camera-photographer-photography-7726802/",
    "alt": "Moody low-key photo of a photographer holding a camera in a dark studio.",
    "query": "indian photographer studio lighting"
  },
  "home-why-us": {
    "id": 594091,
    "photographer": "StartupStockPhotos",
    "photographerUrl": "https://pixabay.com/users/690514/",
    "url": "https://pixabay.com/photos/meeting-brainstorming-business-594091/",
    "alt": "Colleagues brainstorming at a table with laptop and drinks in a modern office.",
    "query": "indian diverse business team discussing office"
  },
  "home-cta": {
    "id": 925806,
    "photographer": "StockSnap",
    "photographerUrl": "https://pixabay.com/users/894430/",
    "url": "https://pixabay.com/photos/office-desk-business-working-925806/",
    "alt": "Modern desk workspace with laptop, phone and coffee mug.",
    "query": "indian business owner laptop modern office window"
  },
  "case-coaching": {
    "id": 5059837,
    "photographer": "Tumisu",
    "photographerUrl": "https://pixabay.com/users/148124/",
    "url": "https://pixabay.com/photos/webinar-online-virtual-meeting-5059837/",
    "alt": "Laptop on blue table with woman on video call for online learning and webinar.",
    "query": "indian online class teacher video call"
  },
  "seo-support": {
    "id": 2785979,
    "photographer": "Goumbik",
    "photographerUrl": "https://pixabay.com/users/3752482/",
    "url": "https://pixabay.com/photos/chart-graph-finance-financial-data-2785979/",
    "alt": "Top view of desk with laptop, coffee, charts and resume in office setting.",
    "query": "indian business report charts paper desk"
  },
  "landing-pages-funnels-support": {
    "id": 791029,
    "photographer": "kaboompics",
    "photographerUrl": "https://pixabay.com/users/1013994/",
    "url": "https://pixabay.com/photos/technology-laptop-keyboard-computer-791029/",
    "alt": "Woman using laptop at wooden desk with tablet and smartphone.",
    "query": "indian design sketch notebook tablet"
  },
  "analytics-tracking-hero": {
    "id": 10503579,
    "photographer": "sakibmia24",
    "photographerUrl": "https://pixabay.com/users/57634147/",
    "url": "https://pixabay.com/photos/man-computer-trading-statistics-10503579/",
    "alt": "Professional trader analyzing stock market charts on dual monitors in a modern office.",
    "query": "indian data analyst monitors charts office"
  },
  "ecommerce-marketing-support": {
    "id": 1850613,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/notebook-typing-coffee-computer-1850613/",
    "alt": "Top view of hands typing on laptop with notebook, coffee, and sunglasses on wooden desk.",
    "query": "indian shopping bags laptop desk top view"
  },
  "email-marketing-hero": {
    "id": 593371,
    "photographer": "StartupStockPhotos",
    "photographerUrl": "https://pixabay.com/users/690514/",
    "url": "https://pixabay.com/photos/entrepreneur-start-up-man-planning-593371/",
    "alt": "Young man working on a laptop in a modern office lounge.",
    "query": "indian man working laptop office window"
  },
  "website-design-development-support": {
    "id": 1483974,
    "photographer": "Monoar_CGI_Artist",
    "photographerUrl": "https://pixabay.com/users/2240009/",
    "url": "https://pixabay.com/photos/laptop-workstation-browsing-tablet-1483974/",
    "alt": "Modern workspace with laptop, tablet and headphones on a white desk.",
    "query": "indian web designer sketch layout desk"
  },
  "online-reputation-management-hero": {
    "id": 3700116,
    "photographer": "athree23",
    "photographerUrl": "https://pixabay.com/users/6195572/",
    "url": "https://pixabay.com/photos/board-chalk-feedback-review-study-3700116/",
    "alt": "Chalkboard feedback concept with smiley faces and checked box",
    "query": "indian customer satisfaction survey smiling customers"
  },
  "landing-pages-funnels-card": {
    "id": 2607615,
    "photographer": "StockSnap",
    "photographerUrl": "https://pixabay.com/users/894430/",
    "url": "https://pixabay.com/photos/office-work-business-workspace-2607615/",
    "alt": "Top view of desk with UI and UX wireframes in a notebook.",
    "query": "indian ux wireframe sketch paper"
  },
  "ecommerce-marketing-card": {
    "id": 5467838,
    "photographer": "Tumisu",
    "photographerUrl": "https://pixabay.com/users/148124/",
    "url": "https://pixabay.com/photos/woman-entrepreneur-owner-business-5467838/",
    "alt": "Confident woman in an elegant clothing boutique.",
    "query": "indian small business owner packing orders"
  },
  "influencer-marketing-card": {
    "id": 4371566,
    "photographer": "Feraguz",
    "photographerUrl": "https://pixabay.com/users/9445172/",
    "url": "https://pixabay.com/photos/filming-cellular-camera-video-4371566/",
    "alt": "Smartphone on tripod recording woman in a modern office.",
    "query": "indian young woman recording video smartphone tripod"
  },
  "video-editing-design-support": {
    "id": 2303851,
    "photographer": "LUM3N",
    "photographerUrl": "https://pixabay.com/users/1066559/",
    "url": "https://pixabay.com/photos/workplace-office-desk-keyboard-2303851/",
    "alt": "Minimal pink desk with keyboard, mouse, headphones and notebook.",
    "query": "indian video editor desk keyboard mouse"
  },
  "email-marketing-support": {
    "id": 1867758,
    "photographer": "Pexels",
    "photographerUrl": "https://pixabay.com/users/2286921/",
    "url": "https://pixabay.com/photos/computer-desk-typing-laptop-1867758/",
    "alt": "Hands typing on a laptop at a clean desk in a modern workspace.",
    "query": "indian typing laptop keyboard hands top view"
  },
  "whatsapp-marketing-hero": {
    "id": 869669,
    "photographer": "Foundry",
    "photographerUrl": "https://pixabay.com/users/923783/",
    "url": "https://pixabay.com/photos/phone-technology-mobile-internet-869669/",
    "alt": "Over-the-shoulder view of a person holding a smartphone at a desk.",
    "query": "indian woman texting smartphone office"
  },
  "whatsapp-marketing-support": {
    "id": 431230,
    "photographer": "niekverlaan",
    "photographerUrl": "https://pixabay.com/users/80788/",
    "url": "https://pixabay.com/photos/smartphone-phone-typing-key-in-431230/",
    "alt": "Hands holding a smartphone with blank black screen on white background.",
    "query": "indian man typing message phone"
  },
  "full-stack-development-support": {
    "id": 2558220,
    "photographer": "StockSnap",
    "photographerUrl": "https://pixabay.com/users/894430/",
    "url": "https://pixabay.com/photos/code-coding-programming-html-2558220/",
    "alt": "Developer coding on a laptop in a modern office workspace.",
    "query": "indian laptop code programming desk night"
  },
  "crm-automation-support": {
    "id": 925900,
    "photographer": "StockSnap",
    "photographerUrl": "https://pixabay.com/users/894430/",
    "url": "https://pixabay.com/photos/business-working-laptop-macbook-925900/",
    "alt": "Laptop and tablet with charts, data, and calendar on a desk.",
    "query": "indian customer data tablet office desk"
  },
  "branding-logo-design-support": {
    "id": 1209519,
    "photographer": "1681551",
    "photographerUrl": "https://pixabay.com/users/1681551/",
    "url": "https://pixabay.com/photos/art-paint-water-colors-desk-artist-1209519/",
    "alt": "Blank watercolor paper with palettes and brushes on a wooden desk.",
    "query": "indian color palette swatches designer desk"
  },
  "contact-side": {
    "id": 8754751,
    "photographer": "Telesolutionscallcentr",
    "photographerUrl": "https://pixabay.com/users/43827948/",
    "url": "https://pixabay.com/photos/call-center-call-center-services-8754751/",
    "alt": "Smiling customer service agent with headset in a modern call center office",
    "query": "indian call center office agents working"
  },
  "full-stack-development-hero": {
    "id": 6521720,
    "photographer": "Innovalabs",
    "photographerUrl": "https://pixabay.com/users/22783312/",
    "url": "https://pixabay.com/photos/software-developer-web-developer-6521720/",
    "alt": "Programmer working at night with code on screen in a modern office.",
    "query": "indian software developers team working"
  },
  "crm-automation-hero": {
    "id": 10503597,
    "photographer": "sakibmia24",
    "photographerUrl": "https://pixabay.com/users/57634147/",
    "url": "https://pixabay.com/photos/office-collaboration-technology-10503597/",
    "alt": "Business team collaborating in a modern office meeting with digital dashboards.",
    "query": "indian sales team meeting office laptops"
  },
  "branding-logo-design-hero": {
    "id": 3129361,
    "photographer": "ClickerHappy",
    "photographerUrl": "https://pixabay.com/users/324082/",
    "url": "https://pixabay.com/photos/brushes-painter-work-shop-bowl-3129361/",
    "alt": "Colorful paintbrushes in a splattered jar in an art studio with soft bokeh.",
    "query": "indian creative designers working studio"
  },
  "influencer-marketing-support": {
    "id": 1927265,
    "photographer": "trinhkien91",
    "photographerUrl": "https://pixabay.com/users/2878579/",
    "url": "https://pixabay.com/photos/night-camera-photographer-photo-1927265/",
    "alt": "Woman photographer with camera on tripod on a night city street with bokeh lights.",
    "query": "indian camera tripod ring light desk"
  }
};
