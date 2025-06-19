// types/api.d.ts
export interface Course {
  id: number;
  title: string;
  description: string;
  duration?: string;
  fee?: number;
  requirements?: string;
}