import { getClientForProject } from "@/lib";
import TableCard from "./_components/TableCard";

const loadTables = async (projectId: string) => {
  const client = await getClientForProject(projectId);

  await client.connect();
  const data = await client.query<{
    table_name: string;
  }>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  );
  await client.end();
  return data.rows;
};

const Schema = async ({ params }: { params: { id: string } }) => {
  const tables = await loadTables(params.id);

  return (
    <div>
      <ul className="flex gap-2 flex-wrap mr-4">
        {tables.map((el) => (
          <li key={el.table_name}>
            <TableCard projectId={params.id} tableName={el.table_name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schema;
