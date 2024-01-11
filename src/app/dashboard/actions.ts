"use server";

import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";
import { Client } from "pg";

const xata = getXataClient();

export const createProject = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name");
    const password = formData.get("password");
    const owner = formData.get("owner");

    if (
      !name ||
      !password ||
      !owner ||
      typeof name !== "string" ||
      typeof password !== "string" ||
      typeof owner !== "string"
    )
      throw new Error("Project name or database password are not provided");

    const db_name = (owner + name).toLowerCase();

    const res = await xata.db.projects.filter({ db_name }).getFirst();
    if (res) throw new Error("А project with this name already exists");

    await xata.db.projects.create({
      name,
      db_name,
      db_pass: password,
      owner,
      db_user: db_name,
    });
    const client = new Client();
    await client.connect();
    await client.query(`create user ${db_name} with password '${password}'`);
    await client.query(`create database ${db_name} with owner ${db_name}`);
    await client.end();
    revalidatePath("/dashboard");
    return {
      ok: true,
      message: `A project with name ${name} has been created`,
    };
  } catch (e: any) {
    return { ok: false, message: e.message };
  }
};
