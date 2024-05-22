import { getClientForProject } from "@/lib";
import CreateRow from "./_components/CreateRecord";
import TableBody from "./_components/TableBody";
import { getLabelByType } from "@/lib/dataTypes";

const loadColumns = async (projectId: string, tableName: string) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  const tables = await client.query<{ column_name: string; data_type: string }>(
    `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${tableName}'`
  );
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
    <div className="bg-white p-4 rounded-md shadow-md w-fit">
      <table className="border border-slate-300">
        <thead>
          <tr>
            {columns.map((el) => (
              <th
                key={el.column_name}
                scope="col"
                className="border border-slate-300 p-2"
              >
                <div className="flex flex-col">
                  <span>{el.column_name}</span>
                  <span className="font-normal text-sm">
                    {getLabelByType(el.data_type)}
                  </span>
                </div>
              </th>
            ))}
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
    </div>
  );
};

export default Table;
