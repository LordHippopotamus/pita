import { getXataClient } from "@/xata";
import { Client } from "pg";

export const getClientForProject = async (projectId: string) => {
  const xata = getXataClient();

  const project = await xata.db.projects.filter({ id: projectId }).getFirst();

  if (!project) throw new Error(`project with id ${projectId} does not exist`);

  const host = process.env.PGHOST;
  const port = Number(process.env.PGPORT);

  return new Client({
    host,
    port,
    user: project.db_user,
    database: project.db_name,
    password: project.db_pass,
  });
};
