import { getClientForProject } from "@/lib";

const loadColumsInfo = async (projectId: string, tableName: string) => {
  const client = await getClientForProject(projectId);

  await client.connect();
  const data = await client.query<{
    column_name: string;
    data_type: string;
    is_nullable: string;
    column_default: string | null;
  }>(
    `SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = '${tableName}'`
  );
  await client.end();
  return data.rows;
};

const TableCard = async ({
  projectId,
  tableName,
}: {
  projectId: string;
  tableName: string;
}) => {
  const columns = await loadColumsInfo(projectId, tableName);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h4 className="text-lg font-bold text-center text-rose-500 border-b border-slate-200 pb-2">
        {tableName}
      </h4>
      <ul className="flex flex-col">
        {columns.map((el) => (
          <li
            key={el.column_name}
            className="leading-4 border-b border-slate-200 py-2"
          >
            <div className="flex justify-between items-center gap-4">
              <span className="font-semibold ">{el.column_name}</span>
              <span className="text-xs tracking-wider">{el.data_type}</span>
            </div>
            {el.is_nullable === "NO" && (
              <div className="mt-1">
                <span className="text-xs tracking-wider">Not Null</span>
              </div>
            )}
            {!!el.column_default && (
              <div className="text-xs">
                <span className="tracking-wider">Default: </span>
                <span>{el.column_default}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableCard;
