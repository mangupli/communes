import {
  InferInsertModel,
  InferSelectModel,
  relations,
} from 'drizzle-orm';
import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  primaryKey,
  boolean,
} from 'drizzle-orm/pg-core';

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  partOfCommune: boolean('part_of_commune').default(false).notNull(),
  password: text('password').notNull(),
  bio: text('bio'),
  // role: text("role").$type<"member" | "candidate">(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const membersRelations = relations(members, ({ many }) => ({
  initiatedProjects: many(projects),
}));

export const communes = pgTable('communes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  distrTypeId: integer('distr_type_id').references(
    () => propertyDistributionTypes.id
  ),
  initiatorId: integer('initiator_id')
    .notNull()
    .references(() => members.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  distrType: one(propertyDistributionTypes, {
    fields: [projects.distrTypeId],
    references: [propertyDistributionTypes.id],
  }),
  initiator: one(members, {
    fields: [projects.initiatorId],
    references: [members.id],
  }),
}));

export const propertyDistributionTypes = pgTable(
  'property_distribution_types',
  {
    id: serial('id').primaryKey(),
    type: text('title').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const propertyDistributionTypesRelations = relations(
  propertyDistributionTypes,
  ({ many }) => ({
    projects: many(projects),
  })
);

export const membersToCommunes = pgTable(
  'members_to_communes',
  {
    memberId: integer('member_id')
      .notNull()
      .references(() => members.id),
    communeId: integer('commune_id')
      .notNull()
      .references(() => communes.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.memberId, table.communeId] }),
    // pkWithCustomName: primaryKey({
    //   name: 'custom_name',
    //   columns: [table.memberId, table.communeId],
    // }),
  })
);

export const membersToProjects = pgTable(
  'members_to_projects',
  {
    memberId: integer('member_id')
      .notNull()
      .references(() => members.id),
    projectId: integer('project_id')
      .notNull()
      .references(() => projects.id),
    role: text('role'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.memberId, table.projectId] }),
    // pkWithCustomName: primaryKey({
    //   name: 'custom_name',
    //   columns: [table.memberId, table.projectId],
    // }),
  })
);

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;
export type Commune = InferSelectModel<typeof communes>;
export type NewCommune = InferInsertModel<typeof communes>;
export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;
export type PropertyDistributionType = InferSelectModel<
  typeof propertyDistributionTypes
>;
export type NewPropertyDistributionType = InferInsertModel<
  typeof propertyDistributionTypes
>;
