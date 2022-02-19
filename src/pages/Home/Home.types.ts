export type Repos = {
  id: number;
  name: string;
  created_at: Date;
  language: string;
  topics: [];
  html_url: string;
  description: string;
  forks: number;
  license?: {
    key: string;
  }
};
