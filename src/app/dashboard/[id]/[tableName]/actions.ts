"use server";

import { getClientForProject } from "@/lib";
import { revalidatePath } from "next/cache";

export const createColumn = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name");
    const type = formData.get("type[id]");
    const notNull = !!formData.get("notNull");
    const defaultValue = formData.get("defaultValue");
    const projectId = formData.get("projectId");
    const tableName = formData.get("tableName");

    if (
      !name ||
      !type ||
      !projectId ||
      !tableName ||
      typeof name !== "string" ||
      typeof type !== "string" ||
      typeof projectId !== "string" ||
      typeof tableName !== "string"
    )
      throw new Error("Validation error");

    const client = await getClientForProject(projectId);
    await client.connect();
    await client.query(
      `alter table ${tableName} add column ${name} ${type} ${
        notNull ? "not null" : ""
      } ${defaultValue && "default '" + defaultValue + "'"}`
    );
    await client.end();

    revalidatePath("/dashboard/[id]/[tableName]");

    return {
      ok: true,
      message: `A column with name ${name} has been created`,
    };
  } catch (e: any) {
    return { ok: false, message: e.message };
  }
};

export const createRow = async (state: any, formData: FormData) => {
  try {
    const projectId = formData.get("projectId");
    const tableName = formData.get("tableName");
    const data = Object.fromEntries(formData);
    delete data.projectId;
    delete data.tableName;

    if (
      !projectId ||
      !tableName ||
      typeof projectId !== "string" ||
      typeof tableName !== "string"
    )
      throw new Error("Validation error");

    const client = await getClientForProject(projectId);
    await client.connect();
    const query = `insert into ${tableName} (${Object.keys(data).join(
      ", "
    )}) values (${Object.values(data)
      .map((el) => `'${el}'`)
      .join(", ")})`;
    await client.query(query);
    await client.end();

    revalidatePath("/dashboard/[id]/[tableName]");

    return {
      ok: true,
      message: `A row has been created`,
    };
  } catch (e: any) {
    return { ok: false, message: e.message };
  }
};
