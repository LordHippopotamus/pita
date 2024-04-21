import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib";

const loadProjects = async () => {
  const xata = getXataClient();
  const session = await getServerSession(authOptions);
  if (!session?.user) throw redirect("/auth/signin");
  return await xata.db.projects.filter({ owner: session.user.id }).getAll();
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
