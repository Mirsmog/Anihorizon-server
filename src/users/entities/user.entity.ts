import { Comment, Profile, Review, Role } from '@prisma/client';

export class UserEntity {
  id: string;
  email: string;
  name: string;
  role: Role;
  password: string;
  comments?: Comment[];
  reviews?: Review[];
  profile?: Profile;
  createdAt: Date;
  updatedAt: Date;
}
