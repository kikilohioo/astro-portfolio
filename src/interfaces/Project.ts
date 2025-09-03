export interface Project {
  data: {
    title: string;
    description: string;
    detailsLink: string;
    demoLink: string;
    image: string;
    demo: string;
    repo: string;
    year: number;
    startDate: string;
    endDate: string;
    contributions: string[];
    technologies: string;
    links: string[];
    skills: string;
  };
  slug: string;
}
