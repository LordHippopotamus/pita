import { MenuItem } from "@/components/ui";
import CreateTable from "./CreateTable";
import { getClientForProject } from "@/lib";

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
      {tables.map((el) => (
        <MenuItem key={el.table_name}>{el.table_name}</MenuItem>
      ))}
      <CreateTable projectId={projectId} />
    </aside>
  );
};

export default Tables;
