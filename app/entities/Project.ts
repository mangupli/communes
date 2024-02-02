import { ZodError, z } from 'zod';
import { MemberEntity } from './Member';
import { RoleEntity } from './Role';
import { EntityValidationError } from '../lib/EntityError';

type ValidatedFields = 'title' | 'description';

export class ProjectValidationError extends EntityValidationError<ValidatedFields> {
  constructor(errors: Record<ValidatedFields, string | undefined>) {
    super('project entity', errors);
  }
}

export type ProjectEntityProps = {
  id?: number;
  title: string;
  description: string;
  roles?: RoleEntity[];
  members?: Map<MemberEntity, RoleEntity>;
};

export class ProjectEntity {
  private id?: number;
  private title: string;
  private description: string;
  private roles: RoleEntity[];
  private members: Map<MemberEntity, RoleEntity>;

  private constructor({
    id,
    title,
    description,
    roles,
    members,
  }: ProjectEntityProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.roles = roles ?? [];
    this.members = members ?? new Map();
  }

  static create(props: ProjectEntityProps) {
    const projectSchema = z.object({
      title: z
        .string()
        .min(1, { message: 'Project title is required' }),
      description: z.string().min(6, {
        message: 'Description should be at least 6 characters',
      }),
    });

    try {
      projectSchema.parse(props);
    } catch (err) {
      const error = err as ZodError;
      const errors = error.flatten().fieldErrors;
      console.log(errors);

      throw new ProjectValidationError({
        title: errors.title?.[0],
        description: errors.description?.[0],
      });
    }

    return new ProjectEntity(props);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.title;
  }

  setName(value: string) {
    this.title = value;
  }

  getDescription() {
    return this.description;
  }

  setDescription(value: string) {
    this.description = value;
  }

  getRoles(): RoleEntity[] {
    return this.roles;
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
