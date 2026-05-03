import { useState, useRef, useEffect } from 'react';

const GUIDES = {
  dropshipping: {
    emoji: '🛍️', title: 'DROPSHIPPING', income: '$1K–$50K/mo', startup: '$200–$1,000',
    intro: "Dropshipping is one of the fastest ways to start generating income online. You sell products without ever touching inventory — your supplier ships directly to your customer. Here's your step-by-step blueprint:",
    steps: [
      { n: '01', t: 'Pick a Winning Niche', d: 'Go where passion meets profit: health, beauty, fitness, pets, or home goods. Use TikTok search + Google Trends to validate demand. Avoid saturated markets like phone cases unless you have a unique angle.' },
      { n: '02', t: 'Build Your Store', d: 'Shopify ($29/mo) is the gold standard — launch in 24 hours. Make it look like a BRAND, not a generic store. Pick a clean theme, write compelling product descriptions, and add trust badges.' },
      { n: '03', t: 'Find Reliable Suppliers', d: 'Source from AliExpress, Spocket (US/EU suppliers for faster shipping), or CJ Dropshipping. Look for 4.5+ star ratings, 500+ orders on the product, and ePacket or DHL shipping options.' },
      { n: '04', t: 'Automate Your Fulfillment', d: 'Install DSers or AutoDS. When a customer orders, it auto-sends to your supplier. You literally wake up and orders are being processed. Set this up before you run any ads.' },
      { n: '05', t: 'Drive Traffic — Start Free', d: 'TikTok organic is your best friend when starting out. Make 3–5 short videos showcasing the product solving a problem. One viral video can generate $5K+ in sales overnight.' },
      { n: '06', t: 'Scale With Paid Ads', d: 'Once you have a proven product, invest in TikTok Ads or Facebook Ads. Start at $20–50/day. Kill losing ad sets in 3 days. Scale winners by 20% every 3 days. NEVER scale a losing product.' },
      { n: '07', t: 'Build Your Email List', d: 'Use Klaviyo to capture emails and set up automated flows: welcome series, abandoned cart, and post-purchase. Email marketing alone can add 20–30% to your monthly revenue.' },
    ],
    tips: ['Your brand matters more than the product — invest in logos and packaging', 'Test 5–10 products before calling it quits on a niche', 'US/EU suppliers cost more but convert better — customers pay for speed', 'Hire a VA to handle customer service as you scale'],
    tools: ['Shopify', 'DSers or AutoDS', 'Minea (product research)', 'Klaviyo (email)', 'TikTok Ads Manager'],
  },
  smma: {
    emoji: '📱', title: 'SOCIAL MEDIA MARKETING AGENCY', income: '$2K–$30K/mo', startup: '$0–$500',
    intro: "SMMA is the hustle where you get paid to manage social media for local businesses. They need customers. You know how to get attention online. That gap = your income. Here's how to build your agency:",
    steps: [
      { n: '01', t: 'Pick Your Niche Market', d: 'Don\'t try to serve everyone. Pick: restaurants, gyms, real estate agents, dentists, or salons. Niche agencies close clients 5x easier. Become the go-to expert for that one industry.' },
      { n: '02', t: 'Learn the Service You Offer', d: 'Master one platform first — Instagram, TikTok, or Facebook Ads. Watch 50 hours of free YouTube content. Run ads for yourself or a friend\'s business to build a portfolio case study.' },
      { n: '03', t: 'Build Your Portfolio', d: 'Offer to work with 1–2 local businesses for FREE or at cost for 30 days. Document everything: before/after metrics, follower growth, leads generated. Screenshots become your sales weapon.' },
      { n: '04', t: 'Cold Outreach at Scale', d: 'Send 50–100 DMs per day to local business owners. Use Instagram, Facebook, or email. Message: "I help [niche] get [X result]. I worked with [reference] and got [result]. Can I show you a quick demo?" Keep it SHORT.' },
      { n: '05', t: 'Close Clients on Discovery Calls', d: 'Get on a 30-min Zoom call. Ask about their pain points, current marketing, and goals. Present your solution. Offer a 30-day pilot for $500–$1,500. Make it a no-brainer with a guarantee.' },
      { n: '06', t: 'Deliver Killer Results', d: 'Overpromise on care, deliver on results. Show weekly reports. Celebrate every win with your client. A happy client will refer 2–3 more clients to you — your best sales tool is results.' },
      { n: '07', t: 'Raise Rates & Delegate', d: 'Once you hit $5K/mo, hire a content creator or ad specialist on Upwork. You focus on sales and client relationships. Your agency runs while you grow it.' },
    ],
    tips: ['Never take on a client you can\'t get results for — your reputation is everything', '$1,500–$3,000/month retainer per client is standard', 'Specialize in ONE platform to become the clear expert', 'Use GoHighLevel to automate client reporting and save hours weekly'],
    tools: ['GoHighLevel (CRM)', 'Canva (content)', 'Meta Ads Manager', 'Later or Buffer (scheduling)', 'Loom (client reports)'],
  },
  amazon: {
    emoji: '📦', title: 'AMAZON FBA', income: '$3K–$100K/mo', startup: '$2,000–$10,000',
    intro: "Amazon FBA lets you sell products using Amazon's warehouses and shipping network. Amazon handles storage, packaging, shipping, and even customer service. You focus on finding winning products and marketing.",
    steps: [
      { n: '01', t: 'Research Profitable Products', d: 'Use Helium 10 or Jungle Scout. Target products with $5K–$50K/month in sales, under 300 reviews on top listings, and a margin of at least 30%. Price range $15–$60 is the sweet spot.' },
      { n: '02', t: 'Source From Manufacturers', d: 'Use Alibaba.com to find suppliers in China. Order samples from 3–5 manufacturers. Negotiate pricing at volume. Target a product cost that\'s 25% or less of your selling price.' },
      { n: '03', t: 'Brand Your Product', d: 'Add your logo and custom packaging. This takes your product from commodity to brand. Apply for Amazon Brand Registry after you get a trademark ($250 with LegalZoom).' },
      { n: '04', t: 'Create a Killer Listing', d: 'Invest in professional product photography ($200–$500). Write a keyword-optimized title. Add bullet points that address customer pain points. Use all 7 image slots. A+ Content = more sales.' },
      { n: '05', t: 'Launch & Rank', d: 'Start with Amazon PPC (pay-per-click ads) at $30–$50/day. Use a launch strategy: price competitively, run promotions, and get your first 15–20 reviews through follow-up emails (Jungle Scout\'s tool).' },
      { n: '06', t: 'Optimize & Automate', d: 'Check metrics weekly: ACoS, conversion rate, ranking. Turn off keywords that don\'t convert. Replenish inventory before you run out (stockouts kill rankings). Use tools to automate pricing.' },
      { n: '07', t: 'Expand Your Catalog', d: 'Once your first product hits $10K/month, launch product #2. Use your existing brand credibility. Brands with 5+ products on Amazon are valued at 3–4x annual revenue when you exit.' },
    ],
    tips: ['Avoid electronics, fragile items, or seasonal products when starting', 'Keep 3 months of inventory to avoid stockouts', 'Your reviews are your biggest asset — protect them aggressively', 'Study your top competitors\' listings religiously'],
    tools: ['Helium 10 (research)', 'Alibaba (sourcing)', 'Amazon Seller Central', 'Jungle Scout', 'Viral Launch'],
  },
  clothing: {
    emoji: '👕', title: 'CLOTHING BRAND', income: '$500–$50K/mo', startup: '$500–$5,000',
    intro: "A clothing brand is one of the most powerful businesses you can build — it's a lifestyle, a movement, a community. The most successful brands don't sell clothes, they sell identity. Here's how to build yours:",
    steps: [
      { n: '01', t: 'Define Your Brand DNA', d: 'What does your brand STAND FOR? Grind culture? Streetwear? Spiritual? Define your target customer completely: age, lifestyle, values, music they listen to. Your brand voice is born here.' },
      { n: '02', t: 'Start Small With Print on Demand', d: 'Use Printful or Printify to test designs with ZERO inventory risk. Sell hoodies, tees, and hats. Validate which designs people actually buy before investing in bulk inventory.' },
      { n: '03', t: 'Create Killer Designs', d: 'Use Canva or hire a designer on Fiverr ($50–$200). Study what\'s trending on Urban Outfitters, Supreme, and your favorite streetwear brands. Your first 5 designs should represent your core message.' },
      { n: '04', t: 'Build Your Store', d: 'Shopify is the move. Buy a clean domain ($12/year). Use a minimal theme that puts your brand front and center. Write product descriptions that tell a story, not just list specs.' },
      { n: '05', t: 'Build Hype on Social', d: 'Instagram + TikTok are your billboards. Post the lifestyle, not just the product. Behind-the-scenes, styling videos, real customer posts. Use hashtags strategically. Build the audience BEFORE the launch.' },
      { n: '06', t: 'Launch With a Drop Strategy', d: 'Limited drops create urgency. Announce "LIMITED DROP — 50 pieces only" and watch people scramble. First drop doesn\'t have to be perfect — it has to SHIP. Revenue builds confidence.' },
      { n: '07', t: 'Collaborate & Scale', d: 'Partner with local artists, influencers, or complementary brands for collab drops. Each collab introduces you to a new audience. This is how small brands go viral without ad spend.' },
    ],
    tips: ['Quality control: order samples of everything before selling to customers', 'A $29 Shopify store looks more professional than an Etsy shop', 'Micro-influencers (5K–50K followers) have better engagement than celebrities', 'Customer photos are your best marketing — always repost with permission'],
    tools: ['Printful or Printify', 'Shopify', 'Canva', 'Later (scheduling)', 'Klaviyo (email marketing)'],
  },
  realestate: {
    emoji: '🏠', title: 'REAL ESTATE', income: '$5K–$100K+/deal', startup: '$0–$10,000',
    intro: "Real estate is the #1 wealth-building vehicle in America. Whether you have money or not, there's a strategy for you. Wholesaling lets you get started with almost no capital. Here's the full roadmap:",
    steps: [
      { n: '01', t: 'Choose Your Entry Strategy', d: 'No money? Start with wholesaling (find deals, sell contracts). Have $50K? House hack (buy a duplex, live in one unit, rent the other). Have credit? BRRRR (Buy, Rehab, Rent, Refinance, Repeat).' },
      { n: '02', t: 'Learn Your Market', d: 'Pick ONE city or metro area. Learn the neighborhoods: which areas are appreciating, where investors buy, what ARV (After Repair Value) looks like. Drive the area. Know it like a local.' },
      { n: '03', t: 'Find Motivated Sellers', d: 'Use Driving for Dollars (photograph distressed properties), PropStream for data, direct mail campaigns, and cold calling. Motivated sellers = people who NEED to sell: divorce, foreclosure, inheritance, landlord burnout.' },
      { n: '04', t: 'Analyze Every Deal', d: 'Formula: ARV × 70% – Repair Costs = Max Offer Price. Never overpay. Use Redfin and Zillow for comps. Build relationships with 2–3 local investors who can give you real repair cost estimates.' },
      { n: '05', t: 'Make Offers & Negotiate', d: 'This is a numbers game — you\'ll make 30+ offers for every 1 you close. Be confident. Present your offer with proof of funds (use a partner or transactional funding). Reject 95% of what\'s offered — stick to your numbers.' },
      { n: '06', t: 'Build Your Team', d: 'You need: a real estate attorney, a title company, a contractor, and 2–3 cash buyers. Your cash buyer list is GOLD — investors who can close in 7–14 days with no financing contingencies.' },
      { n: '07', t: 'Close & Collect', d: 'Assign your contract to a buyer for $5K–$20K assignment fee (wholesaling) or rehab and flip for $30K–$80K profit. Every deal teaches you something. Deal #5 will be smoother than Deal #1.' },
    ],
    tips: ['Your first deal is the hardest — it gets much easier', 'Never use your own money until you understand the market', 'The best real estate investors talk to sellers, not scroll listings', 'PropStream is the single best tool for finding motivated sellers ($99/mo)'],
    tools: ['PropStream (data)', 'DealMachine (driving for dollars)', 'DocuSign (contracts)', 'BatchLeads (skip tracing)', 'BiggerPockets (community)'],
  },
  photography: {
    emoji: '📸', title: 'PHOTOGRAPHY BUSINESS', income: '$1K–$20K/mo', startup: '$500–$3,000',
    intro: "Photography is one of the most accessible creative businesses — and also one that people will happily pay premium prices for when you position yourself correctly. Here's how to turn your camera into a cash machine:",
    steps: [
      { n: '01', t: 'Choose Your Niche', d: 'Wedding (highest pay, $2K–$10K per event), portraits, real estate (steady demand, $150–$400/shoot), newborns, products, or events. Pick ONE to master first. Real estate photography is the easiest to scale consistently.' },
      { n: '02', t: 'Build a Portfolio Fast', d: 'Offer free or discounted sessions to 5–10 friends, family members, or local businesses. Be selective — only show your BEST 20 images. Quality over quantity every time. One great shot beats 100 mediocre ones.' },
      { n: '03', t: 'Set Up Your Business', d: 'Create an LLC ($50–$150), get business insurance, and open a business bank account. Build a simple website on Squarespace or Pixieset — show your portfolio, services, and a contact form.' },
      { n: '04', t: 'Price Yourself Correctly', d: 'Research what photographers in your city charge. Start at 70% of that rate. Include your time, editing hours, and gear depreciation. Most beginners undercharge by 50% — it kills your business before it starts.' },
      { n: '05', t: 'Market Where Clients Are', d: 'Instagram and Pinterest drive photography clients. Post consistently. Tag locations. For real estate: call every realtor in your city. For weddings: be active in wedding Facebook groups and list on Thumbtack.' },
      { n: '06', t: 'Master Your Editing Workflow', d: 'Lightroom presets cut your editing time by 70%. Deliver within 48–72 hours. Faster delivery = more referrals. Use Pixieset or ShootProof to deliver galleries professionally.' },
      { n: '07', t: 'Create Passive Income Streams', d: 'Sell Lightroom presets on Etsy ($10–$50 each). License your best photos on Shutterstock and Getty. Teach photography workshops. These streams add $500–$3K/month on top of shoots.' },
    ],
    tips: ['A $1,200 Sony a6000 or Canon M50 gets the job done — gear is an excuse', 'Your first 10 clients will come from your personal network', 'Referrals are your #1 source of clients — always ask for them', 'Pricing yourself too low signals low quality to clients'],
    tools: ['Lightroom (editing)', 'Pixieset (galleries)', 'Honeybook (client management)', 'Later (Instagram)', 'Thumbtack (lead generation)'],
  },
  freelance: {
    emoji: '💻', title: 'FREELANCING (DESIGN/DEV)', income: '$2K–$20K/mo', startup: '$0',
    intro: "Freelancing lets you turn skills you already have into immediate income. No startup costs, no inventory, no waiting — you can land your first client this week. Here's the blueprint:",
    steps: [
      { n: '01', t: 'Identify Your Skill Stack', d: 'What can you do: web design, graphic design, video editing, copywriting, coding, SEO? If you\'re a beginner, pick ONE skill and spend 30 days learning it at an expert level via YouTube and practice projects.' },
      { n: '02', t: 'Build a Lean Portfolio', d: '3–5 great portfolio pieces beats 20 average ones. Create mock projects if you have no client work. A web designer can redesign a local restaurant\'s site (unpaid) and include it in their portfolio.' },
      { n: '03', t: 'Create Profiles on Upwork & Fiverr', d: 'Fill out every field. Use a professional photo. Write a bio that speaks to client results, not your background. Fiverr works great for quick gigs. Upwork is better for ongoing contracts.' },
      { n: '04', t: 'Start With Competitive Pricing', d: 'Price just below market to get initial reviews. Once you have 5+ reviews, raise rates 20–30%. Every 10 great reviews = another rate increase. The goal is $75–$150/hour long term.' },
      { n: '05', t: 'Master Your Outreach', d: 'Cold outreach beats waiting for inbound. Email local businesses, message LinkedIn professionals, DM on Instagram. Send 20 proposals per day until you hit $5K/month. Then you\'ll have more inbound than you can handle.' },
      { n: '06', t: 'Deliver & Over-Deliver', d: 'Always deliver early. Always communicate proactively. One great client who refers you to 5 others is worth 20 one-time clients. Treat every project like it could 10x your career.' },
      { n: '07', t: 'Productize Your Service', d: 'Create a "done-for-you" package at a fixed price. "Complete brand identity for $2,500" is easier to sell than "hourly design work." Packaged services let you scale without trading time for money.' },
    ],
    tips: ['Your first 3 clients are the hardest — work harder for them than any client after', 'Specialize: "e-commerce web designer" earns more than "web designer"', 'Testimonials are pure gold — request one after every successful project', 'Never work without a contract or deposit — 50% upfront is standard'],
    tools: ['Upwork & Fiverr', 'Notion (project management)', 'Stripe (payments)', 'Calendly (scheduling)', 'Loom (client communication)'],
  },
  food: {
    emoji: '🍽️', title: 'FOOD BUSINESS', income: '$1K–$30K/mo', startup: '$200–$5,000',
    intro: "Everyone eats — which means your potential customer base is literally everyone. From meal prep to catering to food trucks, the food business can be started from your kitchen. Here's your roadmap:",
    steps: [
      { n: '01', t: 'Validate Your Concept', d: 'Cook for 5–10 people you know and get brutally honest feedback. Post your food on Instagram. See what gets the most engagement. The market will tell you what to sell before you invest a dime.' },
      { n: '02', t: 'Get Legal (Cottage Law)', d: 'Most states have cottage food laws that let you sell homemade food without a commercial kitchen. Research your state\'s rules. You may need a food handler\'s permit ($15–$50). LLC formation comes when you scale.' },
      { n: '03', t: 'Start With Meal Prep', d: 'Meal prep is the lowest barrier to entry: cook Sunday, deliver Monday. Target gym-goers, busy professionals, and parents. Charge $10–$15 per meal. 20 meals = $200–$300 weekly income with minimal investment.' },
      { n: '04', t: 'Build Your Customer Base', d: 'Sell to your network first. Post on Facebook Marketplace, Nextdoor, and local Instagram hashtags. Every customer is a potential recurring client AND a referral source. Retention > acquisition.' },
      { n: '05', t: 'Expand to Catering & Events', d: 'Once you\'ve got 20+ weekly meal prep clients, add event catering. Birthday parties, corporate lunches, and weddings pay $500–$5,000 per event. This is where real money is made.' },
      { n: '06', t: 'Scale With a Ghost Kitchen', d: 'Rent a commercial kitchen by the hour ($15–$35/hr) to scale production. Partner with DoorDash, Uber Eats, and GrubHub for additional revenue channels. Ghost kitchens have no dining room overhead.' },
      { n: '07', t: 'Build Your Brand', d: 'Name your business. Create a logo. Build an Instagram with mouth-watering photos. A strong brand = premium pricing. People pay more for food that looks professional and has a story behind it.' },
    ],
    tips: ['Instagram food photos generate 10x more catering inquiries', 'Start with a signature dish — master one thing before expanding the menu', 'Food safety certification ($30–$100) builds serious customer trust', 'Partner with local gyms or offices for recurring corporate meal contracts'],
    tools: ['Square (payments)', 'Canva (branding/menus)', 'HoneyBook (event contracts)', 'DoorDash Merchant (delivery)', 'Wix (simple website)'],
  },
  cleaning: {
    emoji: '🧹', title: 'CLEANING BUSINESS', income: '$2K–$20K/mo', startup: '$100–$500',
    intro: "The cleaning business is the most underrated hustle on the planet. Low competition, high demand, repeat customers, and you can start with almost no money. Here's how to build a cleaning empire:",
    steps: [
      { n: '01', t: 'Start With Residential Cleaning', d: 'Residential cleaning (homes, apartments) is the easiest to start. Charge $100–$200 per clean. Two cleans a day = $200–$400/day. 5 days a week = $1,000–$2,000/week. That\'s $52K–$104K/year.' },
      { n: '02', t: 'Get Your Supplies', d: 'Basic start kit: microfiber cloths, multi-surface cleaner, vacuum, mop, rubber gloves. Total cost: $80–$150. As you grow, upgrade to commercial equipment. Many clients will let you use their vacuum.' },
      { n: '03', t: 'Price Your Services', d: 'Standard residential: $100–$200 per clean. Deep clean: $200–$400. Move-out clean: $250–$500. Commercial office: $150–$500/cleaning. Bill bi-weekly for consistent cash flow.' },
      { n: '04', t: 'Get Your First Clients', d: 'Post on Nextdoor (free, hyper-local), Facebook Marketplace, and Craigslist. Text every person you know. Ask if they need cleaning or know someone who does. Your first 5 clients come from your personal network.' },
      { n: '05', t: 'Deliver Exceptional Quality', d: 'Leave the home cleaner than the client imagined. Leave a small token (folded toilet paper, a thank-you note, a small sachet). These details turn a $120 cleaning into a 5-star review and a referral.' },
      { n: '06', t: 'Add Commercial Contracts', d: 'Commercial cleaning (offices, gyms, restaurants) pays $500–$5,000/month on recurring contracts. Reach out to local businesses directly. One commercial contract can replace 10 residential cleanings.' },
      { n: '07', t: 'Hire & Scale', d: 'When you\'re fully booked, hire a cleaner at $15–$20/hour. You charge $150/clean. They earn $60. You profit $90 for scheduling their time. Repeat with multiple cleaners across multiple markets.' },
    ],
    tips: ['Ask every happy client for a Google Review — 10 reviews = steady inbound leads', 'Before-and-after photos on Instagram generate serious inquiries', 'Offer a discount to clients who refer 2 friends — word of mouth is king', 'Reliability is your #1 product — always show up, always be on time'],
    tools: ['Jobber (scheduling & invoicing)', 'Square (payments)', 'Google My Business (reviews)', 'Nextdoor (marketing)', 'QuickBooks (accounting)'],
  },
  content: {
    emoji: '🎬', title: 'CONTENT CREATION', income: '$1K–$100K+/mo', startup: '$0–$500',
    intro: "Content creation is the new media empire. You don't need a TV deal or a studio — you need a phone, a perspective, and consistency. People who go all-in on content are building generational wealth. Here's how:",
    steps: [
      { n: '01', t: 'Find Your Content Niche', d: 'Niche down hard. "Personal finance for 20-somethings" beats "personal finance." "Plant-based recipes for athletes" beats "cooking." Your niche becomes your brand. Pick something you can talk about for 5 years.' },
      { n: '02', t: 'Choose Your Platform(s)', d: 'TikTok: fastest to grow (0–100K in 90 days is possible). YouTube: best for long-term revenue and search traffic. Instagram: best for brand deals. Start on ONE platform and dominate before expanding.' },
      { n: '03', t: 'Post With Consistency', d: 'The algorithm rewards consistency above everything. Post daily on TikTok, 3–5x/week on YouTube Shorts, 4–7x/week on Instagram. Set a 90-day commitment before you evaluate your results.' },
      { n: '04', t: 'Study Your Analytics', d: 'After 30 days, look at your 5 best-performing videos. What made them work? Hook? Topic? Format? Double down on what works, ruthlessly cut what doesn\'t. Data > opinions.' },
      { n: '05', t: 'Monetize Early With Affiliates', d: 'Join Amazon Associates, ShareASale, or your niche\'s affiliate programs. Add affiliate links in bio. Recommend products authentically. Even 1K followers can earn $200–$500/month in affiliate commissions.' },
      { n: '06', t: 'Land Brand Deals', d: 'At 10K followers, brands will pay $200–$1,000 per post. At 100K, $2,000–$10,000 per deal. Reach out to brands you genuinely use — pitch your engagement rate, not just follower count.' },
      { n: '07', t: 'Build Your Own Products', d: 'The most profitable creators sell their own: digital courses, ebooks, memberships, or merchandise. Your audience trusts you — that trust converts at 5–20% for the right offer. This is where $10K+ months happen.' },
    ],
    tips: ['Your first 100 videos are your practice — don\'t judge yourself on early content', 'Hooks in the first 3 seconds determine your entire video performance', 'Repurpose one idea across all platforms — work smarter, not harder', 'Engage in comments on large accounts in your niche — free organic traffic'],
    tools: ['CapCut (editing, free)', 'TubeBuddy (YouTube SEO)', 'Later (scheduling)', 'Gumroad (digital products)', 'Beacons (link in bio)'],
  },
  trucking: {
    emoji: '🚛', title: 'TRUCKING BUSINESS', income: '$5K–$30K/mo', startup: '$1,000–$20,000',
    intro: "Trucking is infrastructure — America literally can't run without it. With a CDL and hustle, you can build a trucking operation that generates serious wealth. Here's the roadmap:",
    steps: [
      { n: '01', t: 'Get Your CDL', d: 'Class A CDL opens the most doors. CDL school costs $3,000–$7,000 and takes 3–8 weeks. Some companies pay for your CDL in exchange for a 1-year commitment (Werner, Prime, CR England). This is the fastest path.' },
      { n: '02', t: 'Drive for a Carrier First', d: 'Spend 1–2 years driving for a major carrier (Amazon Relay, Werner, J.B. Hunt). Learn the industry, regulations, routes, and business. You\'re getting paid to learn — take it seriously.' },
      { n: '03', t: 'Get Your Authority', d: 'Apply for your MC (Motor Carrier) number through FMCSA — takes 20–25 days and costs $300. Get your DOT number (free). Get $1M liability and $100K cargo insurance ($5K–$15K/year). You are now your own business.' },
      { n: '04', t: 'Find Loads on Freight Boards', d: 'Load boards like DAT, Truckstop.com, and Amazon Relay are your marketplace. Start by booking loads at spot rates. As you build broker relationships, you\'ll access better rates and consistent freight.' },
      { n: '05', t: 'Build Broker Relationships', d: 'Direct relationships with freight brokers = better rates + consistent work. Call 10 brokers every week. Ask for their preferred carriers. Deliver on time every time and you\'ll have more work than you can handle.' },
      { n: '06', t: 'Buy or Lease Your Truck', d: 'Lease a truck through a carrier program to minimize upfront costs. Own your truck when you can qualify for financing — a 2018+ Freightliner Cascadia runs $60K–$120K. Own beats lease for long-term wealth.' },
      { n: '07', t: 'Add a Second Truck', d: 'Hire a driver at $0.45–$0.65/mile. You earn $1.20–$2.50/mile from loads. The spread = profit. One additional truck running 10K miles/month = $5,000–$10,000 in monthly profit. Scale to a fleet.' },
    ],
    tips: ['ELDT training (Entry Level Driver Training) is now mandatory — budget for it', 'Fuel cards (EFS, Comdata) save $0.30–$0.50/gallon on diesel', 'Your ELD (Electronic Logging Device) compliance is non-negotiable — get a reliable one', 'Amazon Relay has consistent freight and fast payment — great for owner-operators starting out'],
    tools: ['DAT Load Board', 'Amazon Relay', 'Rigbooks (accounting)', 'Samsara (ELD + GPS)', 'QuickBooks Self-Employed'],
  },
  barbershop: {
    emoji: '✂️', title: 'BARBER / BEAUTY BUSINESS', income: '$3K–$20K/mo', startup: '$500–$5,000',
    intro: "Barbering is a recession-proof business — people always need haircuts. And with the right positioning, you can turn a chair into a six-figure empire. Here's how to build your beauty business:",
    steps: [
      { n: '01', t: 'Get Licensed', d: 'Barber license takes 1,500 hours (typically 9–12 months) at a barber school ($5,000–$15,000). Cosmetology license takes 1,000–2,300 hours. Some states let you test out faster. This is your foundation — don\'t skip it.' },
      { n: '02', t: 'Build Your Clientele From Day One', d: 'Before you\'re even licensed, start building your audience. Create a TikTok/Instagram showing your skills. Use school clients as practice and content. Follow successful barbers and study their content strategy.' },
      { n: '03', t: 'Start at a Barbershop (Booth Rent)', d: 'Rent a booth ($200–$600/week) at an established shop to build clientele without the overhead of owning a shop. Use the existing foot traffic while you grow your personal brand.' },
      { n: '04', t: 'Master the Art of Booking', d: 'Set up Booksy or StyleSeat. Require deposits ($15–$25) to eliminate no-shows. Post your availability consistently. A fully booked chair at $35/cut × 10 cuts/day = $350/day × 5 days = $1,750/week.' },
      { n: '05', t: 'Premium Pricing Strategy', d: 'Raise prices gradually as you build reputation. Add-on services (beard lineup, edge-up, hot towel) add $10–$20 per ticket. Specialty services (designs, color) command $75–$200+. Premium pricing signals premium quality.' },
      { n: '06', t: 'Build Your Brand on Social', d: 'Post every cut that\'s fire. Before-and-afters perform incredibly well on Instagram and TikTok. Tag your city. Use local hashtags. One viral video can fully book your calendar for weeks.' },
      { n: '07', t: 'Open Your Own Shop', d: 'After 3–5 years of building clientele and saving capital, open your own shop. Booth rental income from other barbers ($200–$600/week each) can cover your entire overhead. Your chair becomes pure profit.' },
    ],
    tips: ['Your Instagram is your portfolio — invest in a good phone camera', 'Loyalty programs (10th cut free) dramatically increase retention', 'Sell barber products from your chair — Bevel, Cremo, or private label products add $500–$1K/month', 'Host pop-up cuts at events for exposure and new clients'],
    tools: ['Booksy (booking)', 'Square (payments)', 'StyleSeat (marketplace)', 'Canva (content)', 'Instagram (marketing)'],
  },
  personaltraining: {
    emoji: '💪', title: 'PERSONAL TRAINING', income: '$2K–$20K/mo', startup: '$200–$1,000',
    intro: "Personal training turns your passion for fitness into a business that transforms lives — and your bank account. Here's how to go from working out for free to charging premium rates for your expertise:",
    steps: [
      { n: '01', t: 'Get Certified', d: 'NASM, ACE, or ISSA certification ($400–$700) is the industry standard. Study while you work your current job. Takes 3–6 months. CPR/AED certification ($50) is also required. Your cert is your credibility.' },
      { n: '02', t: 'Train Your Network First', d: 'Offer 4 free sessions to 5 friends or family members in exchange for honest feedback and a testimonial. Document their transformations. Before-and-after photos are your most powerful marketing asset.' },
      { n: '03', t: 'Set Your Rates', d: 'In-person: $50–$150/session depending on your city and experience. Online coaching: $150–$500/month. Group training: $20–$40/person (6–10 people = $120–$400/hour). Online is where you scale without limits.' },
      { n: '04', t: 'Build Your Social Presence', d: 'Document your own fitness journey. Share client transformations (with permission). Post workout videos, nutrition tips, and motivational content daily. Instagram and TikTok are your primary lead generation tools.' },
      { n: '05', t: 'Rent Gym Time or Go Mobile', d: 'Many gyms offer trainer rental space for $20–$50/hour. Alternatively, go mobile — train clients at their homes or in parks. Zero overhead means higher margins. Add online clients for maximum scale.' },
      { n: '06', t: 'Create Signature Programs', d: 'Build a "12-Week Transformation" or "90-Day Shred" program. Package it as a signature offer at a premium price. Clients pay for results and structure, not just workouts. A $500 program vs. $60/session — which scales?' },
      { n: '07', t: 'Launch Online Coaching', d: 'Online coaching is how you 10x your income without 10x\'ing your time. Use TrainHeroic or TrueCoach to deliver programming. Charge $200–$500/month per client. 20 online clients = $4K–$10K/month while you sleep.' },
    ],
    tips: ['Niche down: "fat loss for moms over 40" earns more than "personal training"', 'Video testimonials convert 5x better than text testimonials', 'Nutrition coaching is highly valued — get certified in nutrition fundamentals', 'Referral programs: give clients a free week for every new client they send'],
    tools: ['TrueCoach (online training)', 'MyFitnessPal (nutrition tracking)', 'Calendly (booking)', 'Canva (content graphics)', 'PayPal or Stripe (payments)'],
  },
  trading: {
    emoji: '📈', title: 'TRADING & INVESTING', income: 'Varies — $500–$50K+/mo', startup: '$1,000–$25,000',
    intro: "Trading is one of the most misunderstood wealth tools. It's not gambling — it's skill development applied to markets. Here's an honest roadmap to building a trading income:",
    steps: [
      { n: '01', t: 'Start With Education, Not Money', d: 'Spend 90 days learning before you risk one dollar. Study: candlestick patterns, support/resistance, risk management, and market structure. Warrior Trading, Investopedia, and YouTube have everything you need — free.' },
      { n: '02', t: 'Paper Trade First', d: 'Use a paper trading account (ThinkorSwim, webull paper trading) to practice with fake money. Trade for 60–90 days and track every trade in a journal. Do NOT touch real money until you\'re consistently profitable on paper.' },
      { n: '03', t: 'Master One Setup', d: 'Don\'t try to learn every strategy. Master ONE: Opening Range Breakout, VWAP strategy, or momentum trading. Specialists consistently beat generalists in trading. One edge, applied consistently, beats 10 mediocre setups.' },
      { n: '04', t: 'Start Small With Real Capital', d: 'Begin with $1,000–$5,000. Risk maximum 1–2% per trade. Preserve capital above all else. Most traders lose because they over-leverage. Your job is to NOT LOSE first, then learn to WIN.' },
      { n: '05', t: 'Trade With Rules, Never Emotions', d: 'Define EVERY rule before entering: entry, target, stop loss. If price doesn\'t hit your entry level — pass. Most of trading success comes from what you DON\'T trade. Discipline over desire. Always.' },
      { n: '06', t: 'Review & Improve Consistently', d: 'Every Friday, review all trades from the week. What worked? What didn\'t? Was it the setup or the execution? The traders who journal consistently improve 10x faster than those who wing it.' },
      { n: '07', t: 'Scale Gradually', d: 'After 6 months of profitable trading, scale your position sizes by 25%. Prove profitability at each level before scaling. 1% gain on $10K = $100. 1% on $100K = $1,000. The math rewards patience and skill.' },
    ],
    tips: ['Trading is a profession that takes 1–3 years to develop — be patient', 'Never trade money you can\'t afford to lose', 'A 5% monthly return is elite — focus on consistency not home runs', 'The best traders know when NOT to trade — protect your capital first'],
    tools: ['ThinkorSwim (charting)', 'Tradervue (trade journal)', 'Finviz (stock scanner)', 'StockBeep (alerts)', 'Bookmap (order flow)'],
  },
};

const detect = (msg) => {
  const m = msg.toLowerCase();
  if (/drop.?ship|dsers|aliexpress|shopify/i.test(m)) return 'dropshipping';
  if (/smma|social media market|agency|smm|manage.*social/i.test(m)) return 'smma';
  if (/amazon|fba|wholesale.*amazon/i.test(m)) return 'amazon';
  if (/cloth|brand|fashion|hoodie|streetwear|apparel|merch/i.test(m)) return 'clothing';
  if (/real estate|house|flip|property|airbnb|rental|wholesal/i.test(m)) return 'realestate';
  if (/photo|camera|portrait|shoot|wedding.*photo/i.test(m)) return 'photography';
  if (/freelanc|web design|graphic design|cod(e|ing)|developer|programming/i.test(m)) return 'freelance';
  if (/food|cook|cater|meal prep|restaurant|cuisine/i.test(m)) return 'food';
  if (/clean|maid|janitorial|housekeep/i.test(m)) return 'cleaning';
  if (/content|youtube|tiktok|instagram.*creat|influenc/i.test(m)) return 'content';
  if (/truck|cdl|freight|haul/i.test(m)) return 'trucking';
  if (/barber|hair|salon|nail|beauty/i.test(m)) return 'barbershop';
  if (/personal train|gym|fitness coach|workout|pt\b/i.test(m)) return 'personaltraining';
  if (/trade|stock|forex|crypto|invest|bitcoin|market/i.test(m)) return 'trading';
  return null;
};

const SUGGESTIONS = [
  'Dropshipping', 'SMMA', 'Amazon FBA', 'Clothing Brand', 'Real Estate',
  'Photography', 'Freelancing', 'Food Business', 'Cleaning Business',
  'Content Creation', 'Trucking', 'Barber/Beauty', 'Personal Training', 'Trading',
];

const MOTIVATIONAL = [
  "Every empire started with one decision. What's yours going to be?",
  "The grind you put in today is the story you tell tomorrow.",
  "You don't need permission to be wealthy. You just need to start.",
  "Excuses don't pay bills. Actions do.",
  "Most people are one hustle away from changing their life forever.",
];

const GENERIC_RESPONSE = `I'm your **HustleBot** — built to help you build. 💪

Tell me what you're working on or want to start, and I'll give you a step-by-step blueprint.

**Type things like:**
- "I want to start dropshipping"
- "Help me with my clothing brand"
- "How do I start in real estate?"
- "I'm a barber and want to grow"

Or pick a hustle from the suggestions below 👇`;

function BotMessage({ msg }) {
  const isGuide = msg.type === 'guide';
  if (!isGuide) {
    return (
      <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)' }}>
        {msg.text.split('**').map((part, i) =>
          i % 2 === 1 ? <strong key={i} style={{ color: 'var(--gold)' }}>{part}</strong> : part
        )}
      </div>
    );
  }
  const g = msg.guide;
  return (
    <div style={{ fontSize: 13, color: 'var(--text)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 28 }}>{g.emoji}</span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.05em', color: 'var(--gold)' }}>{g.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Income potential: <span style={{ color: 'var(--green)' }}>{g.income}</span> · Start with: {g.startup}
          </div>
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{g.intro}</p>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>YOUR BLUEPRINT</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {g.steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--gold)' }}>{s.n}</div>
              {i < g.steps.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 16, background: 'rgba(245,166,35,0.2)', marginTop: 4 }} />}
            </div>
            <div style={{ paddingBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: 14, background: 'rgba(0,200,150,0.06)', border: '1px solid rgba(0,200,150,0.15)', borderRadius: 8 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--green)', marginBottom: 8 }}>PRO TIPS</div>
        {g.tips.map((t, i) => (
          <div key={i} style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 8, marginBottom: 5 }}>
            <span style={{ color: 'var(--gold)' }}>→</span>{t}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: 14, background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 8 }}>TOOLS YOU NEED</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {g.tools.map(t => (
            <span key={t} style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', fontSize: 11, color: 'var(--gold)', fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic' }}>
        Want me to go deeper on any of these steps? Just ask! 💡
      </div>
    </div>
  );
}

export default function HustleBot() {
  const [msgs, setMsgs] = useState([
    { id: 1, role: 'bot', text: GENERIC_RESPONSE, type: 'text' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const quoteRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text, type: 'text' };
    setMsgs(m => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const key = detect(text);
      if (key && GUIDES[key]) {
        setMsgs(m => [...m, { id: Date.now() + 1, role: 'bot', type: 'guide', guide: GUIDES[key] }]);
      } else {
        const q = quoteRef.current % MOTIVATIONAL.length;
        quoteRef.current++;
        setMsgs(m => [...m, {
          id: Date.now() + 1, role: 'bot', type: 'text',
          text: `I didn't catch your exact hustle — but I hear you. 🔥\n\n**${MOTIVATIONAL[q]}**\n\nTell me more specifically what business you want to build, or pick from the suggestions below and I'll give you a full blueprint!`,
        }]);
      }
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '0 0 20px', borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
        <div className="section-eyebrow">AI ASSISTANT</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
          <div>
            <h1 className="section-title">HUSTLE<span>BOT</span></h1>
            <p className="section-desc">Tell me your hustle in plain English. I'll build you a complete roadmap.</p>
          </div>
          <div style={{ padding: '8px 16px', background: 'var(--green-dim)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 999, fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            ONLINE
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8, scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {msgs.map(msg => (
            <div key={msg.id} className="animate-slide-up" style={{ display: 'flex', gap: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', maxWidth: '95%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.role === 'bot' && (
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>⚡</div>
              )}
              <div style={{ padding: '14px 16px', borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: msg.role === 'user' ? 'linear-gradient(135deg, #FFD700, #F5A623)' : 'var(--bg-elevated)', border: msg.role === 'bot' ? '1px solid var(--border)' : 'none', color: msg.role === 'user' ? '#000' : 'inherit', fontWeight: msg.role === 'user' ? 600 : 400, fontSize: 14 }}>
                {msg.role === 'user' ? msg.text : <BotMessage msg={msg} />}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
              <div style={{ padding: '14px 20px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px 16px 16px 16px', display: 'flex', gap: 6, alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', animation: `pulse-gold 1.4s ${i * 0.2}s ease-in-out infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick suggestions */}
      <div style={{ padding: '14px 0 0' }}>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', marginBottom: 8 }}>QUICK START</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {SUGGESTIONS.map(s => (
            <button key={s} className="chip" onClick={() => sendMessage(`Tell me about ${s}`)}>{s}</button>
          ))}
        </div>
        {/* Input */}
        <div style={{ display: 'flex', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
          <input
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Type your hustle or ask anything... (e.g. 'dropshipping', 'I sell clothes')"
            style={{ flex: 1 }}
          />
          <button className="btn btn-gold" onClick={() => sendMessage(input)} disabled={!input.trim() || typing}>
            Send ⚡
          </button>
        </div>
      </div>
    </div>
  );
}
