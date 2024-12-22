// Add shared types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'recent' | 'ongoing' | 'past';
  technologies: string[];
  demoLink: string;
  githubLink: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
} 