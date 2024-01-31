import { MemberEntity } from './Member';
import { ProjectEntity } from './Project';

export class CommuneEntity {
  private _id: number;
  private _name: string;
  private _description: string;
  private members: MemberEntity[];
  private projects: ProjectEntity[];

  constructor({
    id,
    name,
    description,
    creator,
  }: {
    id: number;
    name: string;
    description: string;
    creator: MemberEntity;
  }) {
    this._id = id;
    this._name = name;
    this._description = description;
    this.members = [creator];
    this.projects = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  addMember(member: MemberEntity): void {
    // TODO: how to find among existing members better
    const foundMember = this.members.find(
      (m) => member.getId() === m.getId()
    );
    // const index = this.members.indexOf(member);
    if (!foundMember) {
      this.members.push(member);
    }
  }

  removeMember(member: MemberEntity): void {
    // TODO: how to find among existing members better
    const index = this.members.findIndex(
      (m) => member.getId() === m.getId()
    );
    // const index = this.members.indexOf(member);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }

  getMembers(): MemberEntity[] {
    return this.members;
  }

  addProject(project: ProjectEntity): void {
    this.projects.push(project);
  }

  removeProject(project: ProjectEntity): void {
    // const index = this.projects.indexOf(project);
    const index = this.projects.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  getProjects(): ProjectEntity[] {
    return this.projects;
  }
}
