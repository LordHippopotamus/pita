"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProject = async (
  name: string,
  db_pass: string,
  owner: string
) => {
  const db_name = (owner + name).toLowerCase();
  const db_user = (owner + name).toLowerCase();

  const prisma = new PrismaClient();
  await prisma.$queryRawUnsafe(
    `CREATE USER ${db_name} WITH PASSWORD '${db_pass}'`
  );
  await prisma.$queryRawUnsafe(
    `CREATE DATABASE ${db_name} WITH OWNER ${db_user}`
  );
  await prisma.project.create({
    data: {
      name,
      db_name,
      db_pass,
      ownerId: owner,
      db_user,
    },
  });

  revalidatePath("/dashboard");
};
