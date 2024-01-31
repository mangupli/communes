import { MemberEntity } from './Member';
import { RoleEntity } from './Role';

export class ProjectEntity {
  private _id: number;
  private _title: string;
  private _description: string;
  private roles: RoleEntity[];
  private members: Map<MemberEntity, RoleEntity>;

  constructor({
    id,
    title,
    description,
    initiator,
  }: {
    id: number;
    title: string;
    description: string;
    initiator: MemberEntity;
  }) {
    this._id = id;
    this._title = title;
    this._description = description;
    this.roles = [];
    this.members = new Map();

    const initiatorRole = new RoleEntity({
      name: 'Initiator',
      description: 'Project initiator with full rights',
      canEdit: true,
    });
    this.addRole(initiatorRole);
    this.assignRole(initiator, initiatorRole);
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  addRole(role: RoleEntity): void {
    this.roles.push(role);
  }

  removeRole(role: RoleEntity): void {
    const index = this.roles.indexOf(role);
    if (index !== -1) {
      this.roles.splice(index, 1);
    }
  }

  getRoles(): RoleEntity[] {
    return this.roles;
  }

  assignRole(member: MemberEntity, role: RoleEntity): void {
    if (!this.members.has(member)) {
      this.members.set(member, role);
      member.assignRole(this, role);
    }
  }

  removeMember(member: MemberEntity): void {
    if (this.members.has(member)) {
      const role = this.members.get(member);
      this.members.delete(member);
      member.removeRole(this, role!);
    }
  }

  getMembersAndRoles(): Map<MemberEntity, RoleEntity> {
    return this.members;
  }
}
