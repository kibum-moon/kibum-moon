
import React, { useState, useEffect, useRef } from 'react';
import type { NavItem, Experience, Publication, Patent, Presentation, Award } from './types';
import { MailIcon, LinkIcon, ArrowRightIcon } from './components/Icons';

// --- DATA FROM CV ---

const navItems: NavItem[] = [
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'publications', name: 'Publications' },
    { id: 'patents', name: 'Patents' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'teaching', name: 'Teaching' },
];

const researchExperience: Experience[] = [
    { date: 'Jan 2023 — Present', role: 'Graduate Researcher', company: 'Laboratory for Relational Cognition – Georgetown University', description: 'PI: Dr. Adam Green', technologies: [] },
    { date: 'Aug 2022 — Present', role: 'Graduate Researcher', company: 'Digital Health and Happiness Lab – Georgetown University', description: 'PI: Dr. Kostadin Kushlev', technologies: [] },
    { date: 'Feb 2019 — Sep 2019', role: 'Clinical Researcher', company: 'Student Counseling Center – Korea University', description: 'PI: Dr. Young-gun Ko', technologies: [] },
    { date: 'Feb 2019 — Sep 2019', role: 'Post-Master Research Associate', company: 'Mentoring Counseling Center – Korea University', description: '', technologies: [] },
    { date: 'Sep 2015 — Feb 2018', role: 'Master Student Researcher', company: 'The Happiness Lab – Korea University', description: 'PI: Dr. Young-gun Ko', technologies: [] },
];

const professionalExperience: Experience[] = [
    { date: 'Oct 2022 — Present', role: 'Graduate Research Affiliate', company: 'Office of Assessment and Decision Support – Georgetown University', description: '', technologies: [] },
    { date: 'Oct 2019 — Feb 2022', role: 'Full-time Data Scientist', company: 'Data Hub Team, Office of Digital Information – Korea University', description: '', technologies: [] },
];

const publications: Publication[] = [
  { authors: ['Moon, K.', 'Green, A. E.', '& Kushlev, K.'], year: 2025, title: 'Homogenizing Effect of Large Language Models (LLMs) on Creative Diversity: An Empirical Comparison of Human and ChatGPT Writing.', journal: 'Computers in Human Behavior: Artificial Humans, 100207.', doi: '10.1016/j.chbah.2025.100207', link: 'https://doi.org/10.1016/j.chbah.2025.100207' },
  { authors: ['King, D.', 'Moon, K.', '& Kushlev, K.'], year: 2025, title: 'Time-Specific Digital Detox Interventions: Effects and Effectiveness Among College Students.', journal: 'Technology, Mind, and Behavior, 6(3).', doi: '10.1037/tmb0000173', link: 'https://doi.org/10.1037/tmb0000173' },
  { authors: ['Lee, R.', 'Larson, O.', 'Dhaliwal, S.', 'Moon, K.', 'Gerardy, B.', 'de Chazal, P.', '... & Gehrman, P.'], year: 2025, title: 'Comparative analysis of sleep physiology using qualitative and quantitative criteria for insomnia symptoms.', journal: 'Sleep, zsae301.', doi: '10.1093/sleep/zsae301', link: 'https://doi.org/10.1093/sleep/zsae301' },
  { authors: ['Kim, S.', 'Dunn, N.', 'Moon, K.', 'Casement, M.D.', 'Nam, Y.', 'Yeom, J.', 'Cho, C.H.', 'Lee, H.J.'], year: 2024, title: 'Childhood Maltreatment and Suicide Attempts in Major Depression and Bipolar Disorders in South Korea: A prospective Nationwide Cohort Study.', journal: 'Journal of Affective Disorders.', doi: '10.1016/j.jad.2024.06.012', link: 'https://doi.org/10.1016/j.jad.2024.06.012' },
  { authors: ['Kim, H.', 'Kim, J.', 'Moon, K.', 'Jeong, J.', 'Ko, Y.G.'], year: 2023, title: 'Study Examines Difference between Communal Narcissism and Altruism in Korean College Students Using Close-Other Reports.', journal: 'Korean Journal of Clinical Psychology, 42(3), 82-93.', doi: '10.15842/kjcp.2023.42.3.004', link: 'https://doi.org/10.15842/kjcp.2023.42.3.004' },
  { authors: ['Kim, J.', 'Moon, K.', 'Kim, S.', 'Kim, H.', '& Ko, Y. G.'], year: 2023, title: 'The Relationship between Mental Representations of Self and Social Evaluation: Examining the Validity and Usefulness of Visual Proxies of Self-Image.', journal: 'Frontiers in Psychology, 13, 8361.', doi: '10.3389/fpsyg.2022.937905', link: 'https://doi.org/10.3389/fpsyg.2022.937905' },
];

const patents: Patent[] = [
    { authors: ['Moon, K.', 'Lee, J.', 'Lee, S.', 'Han, S.', 'Kwon, H.', 'Han, J.', 'Kim, G.T.'], year: 2022, title: 'System and Method for Recommending Related Courses Based on Graph Data and Recording Medium for Performing the Same.', number: '10-2557827' },
    { authors: ['Moon, K.', 'Lee, J.', 'Lee, S.', 'Han, S.', 'Kwon, H.', 'Han, J.', 'Kim, G.T.'], year: 2022, title: 'System and Method for Integrated Recommendation of Learning Activities Based on Keywords of Interest Using Academic Domain Embedding and Recording Medium for Performing the Same.', number: '10-2540417' },
    { authors: ['Moon, K.', 'Lee, J.', 'Lee, S.', 'Han, S.', 'Kwon, H.', 'Han, J.', 'Kim, G.T.'], year: 2021, title: 'System and Method for Recommendation Major Based on Keywords of Interests by Users and Computer Program for the Same.', number: '10-2691360' },
];

const presentations: Presentation[] = [
    { authors: ['Moon, K.', 'Johnson, D.', 'Beaty, R. E.', 'Kushlev, K.', 'Patterson, J. D.', 'Green, A. E.'], date: '2025, March 13-15', title: 'AI Creativity Assessment and AI-driven Homogenization in College Admissions.', conference: 'Annual Conference of The Society for the Psychology of Aesthetics, Creativity, and the Arts (Division 10 of the American Psychological Association)', location: 'New Haven, CT' },
    { authors: ['Moon, K.', 'Kushlev, K.', 'Patterson, J. D.', 'Beaty, R. E.', 'Green, A. E.'], date: '2024, April 11-12', title: 'A Computational Approach to Creativity: Fostering Success and Equity in College Admissions.', conference: 'Annual Conference of the Society for the Neuroscience of Creativity (SfNC)', location: 'Toronto, Canada' },
    { authors: ['Moon, K.', 'Patterson, J. D.', 'Kushlev, K.', 'Beaty, R. E.', 'Green, A. E.'], date: '2024, February 8', title: 'A Computational Approach to Creativity: Fostering Success and Equity in College Admissions.', conference: 'The Computational Social Psychology Preconference at the Annual Convention of the Society for Personality and Social Psychology', location: 'San Diego, CA' },
    { authors: ['Moon, K.', 'Kronthal, E.', 'Green, A. E.', 'Kushlev, K.'], date: '2024, April 11-12', title: 'Human-Generated Content Achieves More Divergence in Aggregate than LLM-Generated Content: An Empirical Comparison of Human and ChatGPT Creativity.', conference: 'Annual Conference of the Society for the Neuroscience of Creativity (SfNC)', location: 'Toronto, Canada' },
];

const teaching: Experience[] = [
    { date: 'Fall 2025', role: 'AI & Data Driven Psychology', company: 'Georgetown University', description: 'Main Instructor', technologies: [] },
    { date: 'Spring 2025', role: 'Digital Well-being', company: 'Georgetown University', description: 'Teaching Tutorials', technologies: [] },
    { date: 'Fall 2024', role: 'Social Psychology', company: 'Georgetown University', description: 'Teaching Fellow', technologies: [] },
    { date: 'Spring 2024', role: 'Physiological Psychology', company: 'Georgetown University', description: 'Teaching Fellow', technologies: [] },
    { date: 'Fall 2023', role: 'Research Methods & Statistics', company: 'Georgetown University', description: 'Recitation Instructor', technologies: [] },
    { date: 'Spring 2023', role: 'Psychological Disorders', company: 'Georgetown University', description: 'Teaching Fellow', technologies: [] },
    { date: 'Spring 2017 – 2019', role: 'Life Designing and Self Understanding', company: 'Korea University', description: 'Co-Instructor', technologies: [] },
    { date: '2018 – 2020', role: 'R Programming and Advanced Statistics Workshops', company: 'Workshop Hosting', description: 'Main Instructor', technologies: [] },
];

const skills = {
    "Statistical Software & Programming Languages": ["R", "Python", "SQL", "JavaScript", "Linux", "Git", "MATLAB", "SPSS", "STATA", "JAMOVI", "M-Plus"],
    "Statistical Analysis": ["Multilevel models (MLM)", "structural equation models (SEM)", "RI-CLMP", "factor analyses", "generalized regression models", "social network analyses", "actor-partner interdependent models (APIM)", "ecological diversity analyses", "Bayesian analyses", "bootstrapping"],
    "Machine Learning & Deep Learning Frameworks": ["Natural Language Processing (NLP)", "Dimension reduction", "predictive modeling", "time serial analyses", "graph analytics", "network representation learning", "recommendation system", "Pytorch", "Tensorflow", "Scikit-learn", "Stellargraph", "Gensim", "Tidymodels"],
    "Data Visualization Tools": ["R Shiny", "Plotly/Dash", "Gephi", "Tableau", "Power BI", "Adobe Photoshop", "Illustrator"]
};

// --- HELPER COMPONENTS (defined outside main component) ---

interface NavLinkProps {
  id: string;
  name: string;
  isActive: boolean;
}
const NavLink: React.FC<NavLinkProps> = ({ id, name, isActive }) => (
  <li key={id}>
    <a className="group flex items-center py-3" href={`#${id}`}>
      <span className={`nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 ${isActive ? 'w-16 bg-slate-200' : ''}`} />
      <span className={`nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 ${isActive ? 'text-slate-200' : ''}`}>
        {name}
      </span>
    </a>
  </li>
);

interface PublicationCardProps {
    pub: Publication;
}
const PublicationCard: React.FC<PublicationCardProps> = ({ pub }) => (
    <li className="mb-12">
        <div className="group relative grid grid-cols-8 gap-4 transition-all sm:items-center sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
            <div className="z-10 col-span-8">
                <p className="text-sm font-semibold text-slate-200">
                    {pub.title}
                </p>
                <p className="mt-2 text-sm leading-normal">
                    {pub.authors.map((author, index) => (
                        <span key={index} className={author.includes('Moon, K.') ? 'font-bold text-slate-200' : ''}>
                            {author}{index < pub.authors.length - 1 ? ' ' : ''}
                        </span>
                    ))} ({pub.year})
                </p>
                 <p className="mt-2 text-sm italic">{pub.journal}</p>
                <a
                    className="mt-2 inline-flex items-center text-sm font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read more about ${pub.title} (opens in a new tab)`}
                >
                    <LinkIcon className="mr-1 h-4 w-4" />
                    <span>{pub.doi}</span>
                </a>
            </div>
        </div>
    </li>
);

interface ExperienceCardProps {
    exp: Experience;
}
const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp }) => (
    <li className="mb-12">
        <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">{exp.date}</header>
            <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                        <span className="inline-block font-bold">{exp.role}</span>
                        <span className="text-slate-500"> · </span>
                        <span className="inline-block">{exp.company}</span>
                    </div>
                </h3>
                <p className="mt-2 text-sm leading-normal">{exp.description}</p>
            </div>
        </div>
    </li>
);

interface SectionHeaderProps {
    title: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{title}</h2>
    </div>
);


// --- MAIN APP COMPONENT ---

export default function App() {
    const [activeNav, setActiveNav] = useState('about');
    const sections = useRef<Map<string, HTMLElement | null>>(new Map());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveNav(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' } 
        );

        const currentSections = sections.current;
        currentSections.forEach((section) => {
            if(section) observer.observe(section);
        });

        return () => {
             currentSections.forEach((section) => {
                if(section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
                {/* --- LEFT / HEADER --- */}
                <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">Kibum Moon</h1>
                        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">Ph.D. Student in Psychology at Georgetown University</h2>
                        <p className="mt-4 max-w-xs leading-normal">I build data-driven models to understand human psychology in the digital age.</p>
                        
                        <div className="mt-4 flex items-center space-x-4">
                            <a href="mailto:km1735@georgetown.edu" className="flex items-center text-sm hover:text-teal-300">
                                <MailIcon className="h-5 w-5 mr-1.5"/> km1735@georgetown.edu
                            </a>
                            <a href="https://kibum-moon.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-teal-300">
                                <LinkIcon className="h-5 w-5 mr-1.5"/> kibum-moon.netlify.app
                            </a>
                        </div>

                        <nav className="nav hidden lg:block" aria-label="In-page jump links">
                            <ul className="mt-16 w-max">
                                {navItems.map(item => <NavLink key={item.id} {...item} isActive={activeNav === item.id} />)}
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* --- RIGHT / MAIN CONTENT --- */}
                <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
                    
                    {/* --- ABOUT --- */}
                    <section id="about" ref={el => sections.current.set('about', el)} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                       <SectionHeader title="About" />
                        <p className="mb-4">
                            As a Ph.D. student in Psychology at Georgetown University, my research lies at the intersection of technology, creativity, and mental well-being. I explore how digital environments and emerging technologies like Large Language Models shape human behavior and psychological states.
                        </p>
                        <p className="mb-4">
                            My work combines computational methods with clinical and counseling psychology to address challenges such as the impact of digital detoxes, the nuances of online learning, and the potential for AI to both enhance and homogenize creativity.
                        </p>
                        <p>
                            I am passionate about leveraging data-driven insights to foster psychological health and equity in an increasingly digital world.
                        </p>
                    </section>

                    {/* --- EXPERIENCE --- */}
                    <section id="experience" ref={el => sections.current.set('experience', el)} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                        <SectionHeader title="Experience" />
                        <div>
                            <h3 className="text-lg font-bold text-slate-200 mb-4">Research Experience</h3>
                            <ul className="group/list">
                               {researchExperience.map((exp, i) => <ExperienceCard key={i} exp={exp} />)}
                            </ul>
                            <h3 className="text-lg font-bold text-slate-200 mt-12 mb-4">Professional Experience</h3>
                             <ul className="group/list">
                               {professionalExperience.map((exp, i) => <ExperienceCard key={i} exp={exp} />)}
                            </ul>
                        </div>
                    </section>

                    {/* --- PUBLICATIONS --- */}
                    <section id="publications" ref={el => sections.current.set('publications', el)} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                        <SectionHeader title="Publications" />
                        <ul className="group/list">
                            {publications.map((pub, i) => <PublicationCard key={i} pub={pub} />)}
                        </ul>
                    </section>
                    
                    {/* --- PATENTS --- */}
                    <section id="patents" ref={el => sections.current.set('patents', el)} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                        <SectionHeader title="Patents" />
                        <ul className="group/list">
                            {patents.map((pat, i) => (
                                <li key={i} className="mb-12">
                                     <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                         <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">{pat.year}</header>
                                        <div className="z-10 sm:col-span-6">
                                            <h3 className="font-medium leading-snug text-slate-200">{pat.title}</h3>
                                            <p className="mt-2 text-sm">{pat.authors.map((a,i) => <span key={i} className={a.includes('Moon, K.') ? 'font-bold text-slate-200' : ''}>{a}{i < pat.authors.length - 1 ? ', ' : ''}</span>)}</p>
                                            <p className="mt-2 text-sm">Patent Number: {pat.number}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                    
                     {/* --- PRESENTATIONS --- */}
                    <section id="presentations" ref={el => sections.current.set('presentations', el)} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                        <SectionHeader title="Conference Presentations" />
                        <ul className="group/list">
                            {presentations.map((p, i) => (
                                <li key={i} className="mb-12">
                                     <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                         <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">{p.date}</header>
                                        <div className="z-10 sm:col-span-6">
                                            <h3 className="font-medium leading-snug text-slate-200">{p.title}</h3>
                                            <p className="mt-2 text-sm">{p.conference}, {p.location}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                    
                    {/* --- TEACHING --- */}
                    <section id="teaching" ref={el => sections.current.set('teaching', el)} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                        <SectionHeader title="Teaching" />
                        <ul className="group/list">
                            {teaching.map((exp, i) => <ExperienceCard key={i} exp={exp} />)}
                        </ul>
                    </section>

                    {/* --- SKILLS --- */}
                     <section id="skills" ref={el => sections.current.set('skills', el)} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
                        <SectionHeader title="Skills" />
                        {Object.entries(skills).map(([category, skillList]) => (
                            <div key={category} className="mb-8">
                                <h3 className="font-bold text-slate-200 mb-2">{category}</h3>
                                <div className="flex flex-wrap">
                                    {skillList.map(skill => (
                                        <div key={skill} className="mr-1.5 mt-2">
                                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">{skill}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
}
