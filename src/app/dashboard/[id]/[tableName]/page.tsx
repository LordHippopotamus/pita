import { getClientForProject } from "@/lib";
import CreateColumn from "./_components/CreateColumn";
import CreateRow from "./_components/CreateRow";
import TableBody from "./_components/TableBody";

const loadColumns = async (projectId: string, tableName: string) => {
  const client = await getClientForProject(projectId);

  await client.connect();
  const tables = await client.query<{ column_name: string }>(`SELECT column_name
  FROM information_schema.columns
  WHERE table_name = '${tableName}'`);
  await client.end();
  return tables.rows;
};

const Table = async ({
  params,
}: {
  params: { id: string; tableName: string };
}) => {
  const columns = await loadColumns(params.id, params.tableName);

  return (
    <table className="border border-slate-300">
      <thead>
        <tr>
          {columns.map((el) => (
            <th
              key={el.column_name}
              scope="col"
              className="border border-slate-300 p-2"
            >
              {el.column_name}
            </th>
          ))}
          <th className="border border-slate-300" scope="col">
            <CreateColumn projectId={params.id} tableName={params.tableName} />
          </th>
        </tr>
      </thead>
      <TableBody
        projectId={params.id}
        tableName={params.tableName}
        columns={columns}
      />
      <tfoot>
        <tr>
          <td
            className="border border-slate-300 text-center"
            scope="row"
            colSpan={columns.length + 1}
          >
            <CreateRow
              projectId={params.id}
              tableName={params.tableName}
              columns={columns}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
