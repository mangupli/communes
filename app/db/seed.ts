import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { db, sql } from '.';
import {
  distrTypes,
  newCommunes,
  newMembers,
  newMembersOnProjects,
  newMembersToCommunes,
  newProjects,
} from './placeholder-data';
import {
  type Member,
  members,
  PropertyDistributionType,
  propertyDistributionTypes,
  projects,
  Project,
  membersToProjects,
  Commune,
  communes,
  membersToCommunes,
} from './schema';

async function seed() {
  /*   const insertedDistrTypes: PropertyDistributionType[] = await db
    .insert(propertyDistributionTypes)
    .values(distrTypes)
    .returning();
  console.log(
    `Seeded ${insertedDistrTypes.length} property distribution types`
  ); */

  /*   const insertedMembers: Member[] = await db
    .insert(members)
    .values(newMembers)
    .returning();
  console.log(`Seeded ${insertedMembers.length} members`); */

  const insertedCommunes: Commune[] = await db
    .insert(communes)
    .values(newCommunes)
    .returning();
  console.log(`Seeded ${insertedCommunes.length} communes`);

  const insertedMembersToCommunes = await db
    .insert(membersToCommunes)
    .values(newMembersToCommunes)
    .returning();

  console.log(
    `Seeded ${insertedMembersToCommunes.length} members in communes`
  );

/*   const insertedProjects: Project[] = await db
    .insert(projects)
    .values(newProjects)
    .returning();
  console.log(`Seeded ${insertedProjects.length} projects`);

  const insertedMembersOnProject = await db
    .insert(membersToProjects)
    .values(newMembersOnProjects)
    .returning();

  console.log(
    `Seeded ${insertedMembersOnProject.length} members on projects`
  ); */

  await sql.end();
}

seed().catch(async (err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
  await sql.end();
});
