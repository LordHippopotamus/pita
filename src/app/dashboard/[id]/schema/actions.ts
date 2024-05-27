"use server";

import { getClientForProject } from "@/lib";
import { revalidatePath } from "next/cache";

export const createTable = async (projectId: string, name: string) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await client.query(`CREATE TABLE ${name} (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY
  )`);
  await client.end();

  revalidatePath("/dashboard/[id]", "page");
};

export const createColumn = async ({
  projectId,
  tableName,
  columnName,
  type,
  notNull,
  defaultValue,
}: {
  projectId: string;
  tableName: string;
  columnName: string;
  type: string;
  notNull: boolean;
  defaultValue: string;
}) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  await client.query(
    `alter table ${tableName} add column ${columnName} ${type} ${
      notNull ? "not null" : ""
    } ${defaultValue && "default '" + defaultValue + "'"}`
  );
  await client.end();
  // TODO: wrong revalidate path
  revalidatePath("/dashboard/[id]/[tableName]");
};
