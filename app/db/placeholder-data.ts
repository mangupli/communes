import bcrypt from 'bcrypt';
import {
  type NewProject,
  type NewMember,
  type NewPropertyDistributionType,
  NewCommune,
} from './schema';

export const newMembers: NewMember[] = [
  {
    id: 1,
    name: 'mangupli',
    email: 'lisamangupli@gmail.com',
    phone: '@lisamangupli',
    password: bcrypt.hashSync('12345', 10),
    partOfCommune: true,
  },
];

export const newCommunes: NewCommune[] = [
  {
    id: 1,
    title: '42 bastards',
  },
];

export const newProjects: NewProject[] = [
  {
    id: 1,
    title: 'CommuneConnect',
    description:
      "CommuneConnect is your go-to app for creating and collaborating on projects with like-minded individuals. Join or form your commune, work on shared passions, and make decisions together. It's where ideas meet action, effortlessly.",
    initiatorId: 1,
    distrTypeId: 1,
  },
];

export const newMembersOnProjects = [
  {
    memberId: 1,
    projectId: 1,
    role: 'initiator',
  },
];

export const newMembersToCommunes = [
  {
    memberId: 1,
    communeId: 1,
  },
];

export const distrTypes: NewPropertyDistributionType[] = [
  {
    id: 1,
    type: 'Equal',
  },
  {
    id: 2,
    type: 'Role based',
  },
];
