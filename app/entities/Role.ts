export type RoleEntityProps = {
  name: string;
  description?: string;
  canEdit: boolean;
};

export class RoleEntity {
  private name: string;
  private description?: string;
  private canEdit: boolean;

  private constructor({
    name,
    description,
    canEdit = true,
  }: RoleEntityProps) {
    this.name = name;
    this.description = description;
    this.canEdit = canEdit;
  }

  hasRightsToEdit() {
    return this.canEdit;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  static create(props: RoleEntityProps) {
    return new RoleEntity(props);
  }
}
