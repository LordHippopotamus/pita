import Tables from "./_components/Tables";

const Project = ({ params }: { params: { id: string } }) => {
  return (
    <div className="my-4">
      <Tables projectId={params.id} />
    </div>
  );
};

export default Project;
