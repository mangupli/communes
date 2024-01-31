export class RoleEntity {
  private _name: string;
  private _description?: string;
  private _canEdit: boolean;

  constructor({
    name,
    description,
    canEdit = false,
  }: {
    name: string;
    description?: string;
    canEdit: boolean;
  }) {
    this._name = name;
    this._description = description;
    this._canEdit = canEdit;
  }

  get canEdit() {
    return this._canEdit;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }
}
