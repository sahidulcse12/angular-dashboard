export interface User {
  id: number;
  name: string;
  role: string;
}

export interface CanLeave{
  canLeave:()=>boolean;
}
