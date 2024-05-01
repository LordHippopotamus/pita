import { getClientForProject } from "@/lib";
import Link from "next/link";

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

const Data = async ({ params }: { params: { id: string } }) => {
  const tables = await loadTables(params.id);
  return (
    <div>
      <ul className="flex gap-2 flex-wrap mr-4">
        {tables.map((el) => (
          <li key={el.table_name}>
            <Link
              className="block bg-white hover:bg-rose-50 active:bg-rose-100 p-4 transition rounded-lg shadow-md"
              href={`/dashboard/${params.id}/data/${el.table_name}`}
            >
              {el.table_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
