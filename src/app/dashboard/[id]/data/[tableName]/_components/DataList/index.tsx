import { getClientForProject } from "@/lib";
import CreateRecord from "../CreateRecord";

const loadData = async (projectId: string, tableName: string) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  const tables = await client.query<{ id: string; [key: string]: string }>(
    `SELECT * FROM ${tableName}`
  );
  await client.end();
  return tables.rows;
};

const loadSchema = async (projectId: string, tableName: string) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  const tables = await client.query<{ column_name: string; data_type: string }>(
    `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${tableName}'`
  );
  await client.end();
  return tables.rows;
};

const trim = (str: string, length: number = 50) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

const DataList = async ({
  projectId,
  tableName,
}: {
  projectId: string;
  tableName: string;
}) => {
  const data = await loadData(projectId, tableName);
  const schema = await loadSchema(projectId, tableName);

  return (
    <div className="flex gap-2">
      <CreateRecord
        projectId={projectId}
        tableName={tableName}
        schema={schema}
      />
      {data.map((el) => (
        <article
          className="bg-white p-4 rounded-md shadow-md max-w-64"
          key={el.id}
        >
          <ul>
            {Object.keys(el)
              .filter((el) => el !== "id")
              .map((key) => (
                <li key={key}>
                  <b className="font-bold tracking-wider">{key}:</b>{" "}
                  {trim(String(el[key]))}
                </li>
              ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default DataList;
