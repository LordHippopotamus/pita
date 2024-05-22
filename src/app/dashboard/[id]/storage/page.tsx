import { authOptions } from "@/lib";
import { promises as fs } from "fs";
import { getServerSession } from "next-auth";
import path from "path";

const loadFileInfo = async (file: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw Error("Unauthorized");

  const filePath = path.join(
    process.env.STORAGE_DIR as string,
    session.user.id,
    file
  );
  return await fs.stat(filePath);
};

const Storage = async ({
  searchParams,
}: {
  searchParams: { file?: string };
}) => {
  if (!searchParams.file) return;

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
    </ul>
  );
};

export default Storage;
