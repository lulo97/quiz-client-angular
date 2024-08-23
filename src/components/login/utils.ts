export interface IUser {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  fullname: string;
  biography: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const empty_user: IUser = {
  id: "",
  userName: "",
  normalizedUserName: "",
  email: "",
  normalizedEmail: "",
  emailConfirmed: false,
  passwordHash: "",
  securityStamp: "",
  concurrencyStamp: "",
  phoneNumber: null,
  phoneNumberConfirmed: false,
  twoFactorEnabled: false,
  lockoutEnd: null,
  lockoutEnabled: false,
  accessFailedCount: 0,
  fullname: "",
  biography: null,
  imageUrl: "",
  createdAt: "",
  updatedAt: "",
};
