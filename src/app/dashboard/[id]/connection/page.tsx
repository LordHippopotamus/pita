import { getXataClient } from "@/xata";

const Settings = async ({ params }: { params: { id: string } }) => {
  const xata = getXataClient();

  const project = await xata.db.projects.filter({ id: params.id }).getFirst();

  if (!project) throw new Error(`project with id ${params.id} does not exist`);

  return (
    <div className="rounded-md shadow-md p-4 bg-white">
      <h3 className="text-xl font-bold text-rose-500 text-center">
        Connection
      </h3>
      <ul className="flex flex-col gap-2 mt-2">
        <li className="flex items-center">
          <span className="font-bold">host:&nbsp;</span>
          <span className="block bg-slate-100 p-2 rounded tracking-widest select-all">
            {process.env.PGHOST}
          </span>
        </li>
        <li className="flex items-center">
          <span className="font-bold">port:&nbsp;</span>
          <span className="block bg-slate-100 p-2 rounded tracking-widest select-all">
            {process.env.PGPORT}
          </span>
        </li>
        <li className="flex items-center">
          <span className="font-bold">database:&nbsp;</span>
          <span className="block bg-slate-100 p-2 rounded tracking-widest select-all">
            {project?.db_name}
          </span>
        </li>
        <li className="flex items-center">
          <span className="font-bold">user:&nbsp;</span>
          <span className="block bg-slate-100 p-2 rounded tracking-widest select-all">
            {project?.db_user}
          </span>
        </li>
        <li className="flex items-center">
          <span className="font-bold">password:&nbsp;</span>
          <span className="block bg-slate-100 p-2 rounded tracking-widest select-all">
            {project?.db_pass}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
