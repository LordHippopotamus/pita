import { authOptions } from "@/lib";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/auth/signin");
  return session.user;
};

const loadFileInfo = async (projectId: string, file: string) => {
  const user = await getUser();

  const res = await s3.send(
    new GetObjectCommand({ Bucket: user.id + projectId, Key: file })
  );

  return {
    size: res.ContentLength as number,
    lastModified: res.LastModified as Date,
  };
};

const Storage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { file?: string };
}) => {
  if (!searchParams.file) return;

  const user = await getUser();
  const fileInfo = await loadFileInfo(params.id, searchParams.file);

  return (
    <ul className="flex flex-col gap-1 border border-slate-300 p-4 rounded-md h-fit">
      <li className="flex items-center">
        <b className="font-bold">name:</b>&nbsp;
        <span className="tracking-widest p-2 bg-slate-100 block rounded">
          {searchParams.file}
        </span>
      </li>
      <li className="flex items-center">
        <b className="font-bold">size:</b>&nbsp;
        <span className="tracking-widest p-2 bg-slate-100 block rounded">
          {fileInfo.size}B
        </span>
      </li>
      <li className="flex items-center">
        <b className="font-bold">last modification:</b>&nbsp;
        <span className="tracking-widest p-2 bg-slate-100 block rounded">
          {fileInfo.lastModified.toLocaleString()}
        </span>
      </li>
      <a
        href={`/api/storage/${user.id}/${params.id}/${searchParams.file}`}
        target="_blank"
        className="text-center mt-2 transition py-2 px-6 rounded-md text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
      >
        Download Link
      </a>
    </ul>
  );
};

export default Storage;
