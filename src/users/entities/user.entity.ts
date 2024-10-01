import { Comment, Profile, Review, Role } from '@prisma/client';

export class User {
  id: string;
  email: string;
  name: string;
  role: Role;
  comments?: Comment[];
  reviews?: Review[];
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}
