import { ProjectEntity } from './Project';
import { RoleEntity } from './Role';

export type MemberEntityProps = {
  id: number;
  name: string;
  bio?: string;
  roles?: Map<ProjectEntity, RoleEntity>;
};
export class MemberEntity {
  private id: number;
  private name: string;
  private bio?: string;
  private roles: Map<ProjectEntity, RoleEntity>;

  // TODO: do we need the communes data here?
  // private joinedCommunes: CommuneEntity[];

  constructor({ id, name, bio, roles }: MemberEntityProps) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.roles = roles ?? new Map();
    // this.joinedCommunes = [];
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getBio() {
    return this.bio;
  }
  /* 
  joinCommune(commune: CommuneEntity): void {
    this.joinedCommunes.push(commune);
    commune.addMember(this);
  }

  leaveCommune(commune: CommuneEntity): void {
    const index = this.joinedCommunes.indexOf(commune);
    if (index !== -1) {
      this.joinedCommunes.splice(index, 1);
      commune.removeMember(this);
    }
  }

  getJoinedCommunes(): CommuneEntity[] {
    return this.joinedCommunes;
  }
    */

  assignRole(project: ProjectEntity, role: RoleEntity): void {
    this.roles.set(project, role);
  }

  removeRole(project: ProjectEntity, role: RoleEntity): void {
    this.roles.delete(project);
  }

  getRoles(): Map<ProjectEntity, RoleEntity> {
    return this.roles;
  }

  // Check if the member can edit title and description in a specific project
  hasRightsToEdit(project: ProjectEntity): boolean {
    if (this.roles.has(project)) {
      const role = this.roles.get(project);
      return role!.hasRightsToEdit();
    }
    return false;
  }
}
