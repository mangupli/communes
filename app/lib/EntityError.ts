export type ValidatedFields = string;

export abstract class EntityValidationError<
  T extends ValidatedFields
> extends Error {
  private errors: Record<T, string | undefined>;

  constructor(
    entityName: string,
    errors: Record<T, string | undefined>
  ) {
    super(`An error occurred validating ${entityName}`);
    this.errors = errors;
  }

  getErrors(): Record<T, string | undefined> {
    return this.errors;
  }
}
