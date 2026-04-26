export interface User {
  userId?: number | string;
  id?: number | string;
  fullName?: string;
  name?: string;
  role?: string;
  depSerial?: number;
}

export interface CanLeave {
  canLeave: () => boolean;
}
