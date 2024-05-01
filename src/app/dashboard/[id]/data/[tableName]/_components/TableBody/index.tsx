import { getClientForProject } from "@/lib";
import TableCell from "./TableCell";

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
            <TableCell
              content={item[column_name]}
              column={column_name}
              key={column_name}
              id={item.id}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
