/**
 * Candify team, shown on the About page as one list from top to bottom, in
 * the order below (the founder is first). Add one entry per person, with
 * their approval.
 *
 * Photos go in /public/team/ — write only the file name in `photo`
 * (e.g. photo: 'jane-doe.jpg'). Leave it out to show initials instead.
 * Links with an empty url are not shown.
 */
export interface TeamLink {
  label: string
  url: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: string
  links?: TeamLink[]
}

export const team: TeamMember[] = [
  {
    name: 'Manoj Jadhav',
    role: 'Co-Founder & Creative Director',
    photo: 'manoj-jadhav.jpg',
    bio: 'Manoj is the Co-Founder and Creative Director of Candify Studio, bringing over 7+ years of experience in branding, product design, digital illustration, and creative strategy. Based in India, he specializes in crafting memorable brand identities, intuitive digital experiences, and custom visual systems that help startups and growing businesses stand out. His expertise spans branding, custom illustrations, icon design, motion design direction, design systems, and product strategy. With a passion for blending creativity with functionality, Manoj leads the creative vision at Candify Studio, collaborating closely with clients and the team to transform ambitious ideas into impactful digital products and memorable brand experiences.',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/illustratorgraphicsdesigner/' },
      { label: 'Instagram', url: 'https://www.instagram.com/mjdesign___/' },
      { label: 'Behance', url: 'https://www.behance.net/mmjdsgn22c3' },
      { label: 'X (Twitter)', url: 'https://x.com/mmjdsgn' },
    ],
  },
  {
    name: 'Prathik Chaudhri',
    role: 'Co-Founder & Chief Product Officer',
    photo: 'prathik-chaudhri.jpg',
    bio: 'Prathik is the Co-Founder and Chief Product Officer at Candify Studio, bringing over 15 years of experience in product strategy, design leadership, and startup growth. Based in India, he works closely with founders to transform ambitious ideas into scalable digital products through design thinking, systems-level problem solving, and user-centered product strategy. His expertise spans product management, UX strategy, product-market fit, startup consulting, business positioning, and cross-functional leadership. Passionate about empowering founders, Prathik combines strategic vision with practical execution, helping startups build meaningful products, strengthen their market presence, and scale with confidence.',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/prathikchaudhri/' },
      { label: 'Behance', url: 'https://www.behance.net/PratikChaudhri' },
    ],
  },
  {
    name: 'Ehtishaam Shaikh',
    role: 'Motion Graphics Designer',
    photo: 'ehtishaam-shaikh.jpg',
    bio: 'Ehtishaam is a Senior Video Editor & Motion Graphics Designer and a trusted creative force within the Candify Studio team. Based in India, he brings over 4+ years of experience in producing engaging video content that blends storytelling with impactful visuals. His expertise spans video editing, motion graphics, YouTube content, brand videos, promotional content, and visual storytelling, helping businesses communicate their message with clarity and creativity. With a keen eye for pacing, animation, and cinematic storytelling, Ehtishaam transforms ideas into polished, high-quality content that captivates audiences across digital platforms.',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ehtishaam-shaikh/' },
      { label: 'Behance', url: 'https://www.behance.net/EhtishaamShaikh' },
    ],
  },
  {
    name: 'Tatyana Tkachenko',
    role: 'Motion Designer',
    photo: 'tatyana-tkachenko.jpg',
    bio: 'Tatyana is a 2D Motion Designer and a creative member of the Candify Studio team. Based in Armenia, she brings over 3 years of experience in crafting expressive animations that combine storytelling with thoughtful design. Her expertise includes 2D motion graphics, character animation, explainer videos, brand animations, and visual storytelling, helping transform complex ideas into engaging visual experiences. With a strong eye for movement, timing, and detail, Tatyana creates animations that elevate brands and deliver memorable experiences across digital platforms.',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tatyana-tkachenko-168bb9352/' },
    ],
  },
  {
    name: 'Abhishek Ranjan',
    role: 'Software Engineer & Google Ads Expert',
    photo: 'abhishek-ranjan.jpg',
    bio: 'Abhishek is a Software Engineer and an integral contributor to the Candify Studio team. Based in India, he brings over 6+ years of experience in building scalable, high-performance digital products with a strong focus on clean architecture and modern development practices. His expertise includes High-Level Design (HLD), Low-Level Design (LLD), full-stack web development, React.js, Java, .NET, Flutter, and system architecture. Driven by continuous learning and problem-solving, Abhishek delivers reliable, scalable solutions that transform innovative ideas into exceptional digital experiences.',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/abhishek-ranjan-mnnit/' },
    ],
  },
]
