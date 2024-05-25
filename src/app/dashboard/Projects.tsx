import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib";
import { PrismaClient } from "@prisma/client";

const loadProjects = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw redirect("/auth/signin");

  const prisma = new PrismaClient();
  return await prisma.project.findMany({
    where: { ownerId: { equals: session.user.id } },
  });
};

const Projects = async () => {
  const projects = await loadProjects();

  return (
    <ul className="flex flex-wrap gap-4">
      {projects.map((el) => (
        <li key={el.id}>
          <Link
            href={"/dashboard/" + el.id}
            className="flex items-center bg-white hover:bg-rose-50 active:bg-rose-100 p-4 transition rounded-lg shadow-md"
          >
            {el.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
