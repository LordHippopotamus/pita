"use server";

import { getXataClient } from "@/xata";
import { revalidatePath } from "next/cache";
import { Client } from "pg";

const xata = getXataClient();

export const createProject = async (
  name: string,
  db_pass: string,
  owner: string
) => {
  const db_name = (owner + name).toLowerCase();
  const db_user = (owner + name).toLowerCase();

  const client = new Client();
  await client.connect();
  await client.query(`CREATE USER ${db_name} WITH PASSWORD '${db_pass}'`);
  await client.query(`CREATE DATABASE ${db_name} WITH OWNER ${db_user}`);
  await client.end();

  const res = await xata.db.projects.filter({ db_name }).getFirst();
  if (res) throw new Error("А project with this name already exists");

  await xata.db.projects.create({
    name,
    db_name,
    db_pass,
    owner,
    db_user,
  });

  revalidatePath("/dashboard");
};
