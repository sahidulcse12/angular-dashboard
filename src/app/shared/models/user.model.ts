export interface User {
  userId?: number;
  id?: number;
  fullName?: string;
  name?: string;
  role?: string;
  depSerial?: number;
}

export interface CanLeave {
  canLeave: () => boolean;
}
