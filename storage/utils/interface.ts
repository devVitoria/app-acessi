export type User = {
  userId: number;
  name: string;
  email: string;
  cpf: string;
  createdAt: string;
  validated: boolean;
  exp: number;
  iat: number;
  token?: string;
};

export type UserStore = {
  user: User | null;
  setUser: (user: User) => Promise<void>;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
};
