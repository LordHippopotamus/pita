import { authOptions } from "@/lib";
import { promises as fs } from "fs";
import { getServerSession } from "next-auth";
import path from "path";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw Error("Unauthorized");
  return session.user;
};

const loadFileInfo = async (file: string) => {
  const user = await getUser();

  const filePath = path.join(process.env.STORAGE_DIR as string, user.id, file);

  return await fs.stat(filePath);
};

const Storage = async ({
  searchParams,
}: {
  searchParams: { file?: string };
}) => {
  if (!searchParams.file) return;

  const user = await getUser();
  const fileInfo = await loadFileInfo(searchParams.file);

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
        <b className="font-bold">last access:</b>&nbsp;
        <span className="tracking-widest p-2 bg-slate-100 block rounded">
          {fileInfo.atime.toLocaleString()}
        </span>
      </li>
      <li className="flex items-center">
        <b className="font-bold">last modification:</b>&nbsp;
        <span className="tracking-widest p-2 bg-slate-100 block rounded">
          {fileInfo.mtime.toLocaleString()}
        </span>
      </li>
      <li className="flex items-center">
        <b className="font-bold">created at:</b>&nbsp;
        <span className="tracking-widest p-2 bg-slate-100 block rounded">
          {fileInfo.birthtime.toLocaleString()}
        </span>
      </li>
      <a
        href={`/api/storage/${user.id}/${searchParams.file}`}
        target="_blank"
        className="text-center mt-2 transition py-2 px-6 rounded-md text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
      >
        Download Link
      </a>
    </ul>
  );
};

export default Storage;
