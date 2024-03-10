import CreateTable from "./CreateTable";
import { getClientForProject } from "@/lib";
import Link from "next/link";

const loadTables = async (projectId: string) => {
  const client = await getClientForProject(projectId);

  await client.connect();
  const tables = await client.query<{ table_name: string }>(`SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public';
  `);
  await client.end();
  return tables.rows;
};

const Tables = async ({ projectId }: { projectId: string }) => {
  const tables = await loadTables(projectId);

  return (
    <aside className="bg-white p-4 rounded-r-md shadow-md min-w-32 w-fit flex flex-col gap-2">
      <ul>
        {tables.map((el) => (
          <li key={el.table_name}>
            <Link
              href={`/dashboard/${projectId}/${el.table_name}`}
              className="block transition py-2 px-6 rounded-md hover:bg-rose-50 active:bg-rose-100"
            >
              {el.table_name}
            </Link>
          </li>
        ))}
      </ul>
      <CreateTable projectId={projectId} />
    </aside>
  );
};

export default Tables;
