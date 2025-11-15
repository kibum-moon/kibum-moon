
export interface NavItem {
  id: string;
  name: string;
}

export interface Experience {
  date: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface Publication {
  authors: string[];
  year: number;
  title: string;
  journal: string;
  doi: string;
  link: string;
}

export interface Patent {
  authors: string[];
  year: number;
  title: string;
  number: string;
}

export interface Presentation {
  authors: string[];
  date: string;
  title: string;
  conference: string;
  location: string;
}

export interface Award {
    year: string;
    title: string;
    description: string;
}
