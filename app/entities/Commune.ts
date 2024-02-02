import { ZodError, z } from 'zod';
import { EntityValidationError } from '../lib/EntityError';

type ValidatedFields = 'name' | 'description';

export class CommuneValidationError extends EntityValidationError<ValidatedFields> {
  constructor(errors: Record<ValidatedFields, string | undefined>) {
    super('commune entity', errors);
  }
}

export type CommuneEntityProps = {
  id?: number;
  name: string;
  description: string;
};

export class CommuneEntity {
  private id?: number;
  private name: string;
  private description: string;

  private constructor({ id, name, description }: CommuneEntityProps) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static create(props: CommuneEntityProps) {
    const projectSchema = z.object({
      name: z
        .string()
        .min(1, { message: 'Commune must have a name' }),
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

      throw new CommuneValidationError({
        name: errors.title?.[0],
        description: errors.description?.[0],
      });
    }

    return new CommuneEntity(props);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getDescription() {
    return this.description;
  }

  setDescription(value: string) {
    this.description = value;
  }
}
