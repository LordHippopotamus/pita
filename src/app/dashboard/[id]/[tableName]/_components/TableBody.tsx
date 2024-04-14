import { getClientForProject } from "@/lib";

const loadRows = async (projectId: string, tableName: string) => {
  const client = await getClientForProject(projectId);

  await client.connect();
  const tables = await client.query(`SELECT * FROM ${tableName}`);
  await client.end();
  return tables.rows;
};

const TableBody = async ({
  projectId,
  tableName,
  columns,
}: {
  projectId: string;
  tableName: string;
  columns: {
    column_name: string;
  }[];
}) => {
  const rows = await loadRows(projectId, tableName);

  if (!rows.length) return;

  return (
    <tbody>
      {rows.map((item) => (
        <tr key={item.id}>
          {columns.map(({ column_name }) => (
            <td key={column_name} className="border border-slate-300">
              {String(item[column_name])}
            </td>
          ))}
          <td className="border border-slate-300" />
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
