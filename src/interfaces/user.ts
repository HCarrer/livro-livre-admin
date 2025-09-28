export interface User {
  email?: string | null;
  name?: string | null;
  profilePicture?: string | null;
  createdAt?: Date | null;
  token?: string | null;
  hasClosedWelcomeBanner?: boolean | null;
  updatedAt?: Date | null;
}
