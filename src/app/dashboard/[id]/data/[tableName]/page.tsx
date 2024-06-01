import DataList from "./_components/DataList";

const Table = async ({
  params,
}: {
  params: { id: string; tableName: string };
}) => {
  return (
    <div className="w-fit">
      <DataList projectId={params.id} tableName={params.tableName} />
    </div>
  );
};

export default Table;
