export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  owner?: { id: number; name: string };
}
