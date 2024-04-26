import Tables from "./_components/Tables";

const DataLayout = ({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) => {
  return (
    <div className="my-4 flex gap-2 max-w-full mr-2">
      <Tables projectId={params.id} />
      <div className="max-w-full overflow-x-auto bg-white rounded-md p-4 self-start shadow-md">
        {children}
      </div>
    </div>
  );
};

export default DataLayout;
