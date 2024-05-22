import { getServerSession } from "next-auth";
import { authOptions } from "@/lib";
import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/24/outline";

const loadFiles = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw Error("Unauthorized");

  const folderPath = path.join(
    process.env.STORAGE_DIR as string,
    session.user.id
  );

  try {
    return await fs.readdir(folderPath);
  } catch (e: any) {
    return [];
  }
};

const StorageLayout = async ({ children }: { children: React.ReactNode }) => {
  const files = await loadFiles();

  return (
    <div className="rounded-md shadow-md p-4 bg-white w-fit">
      <h3 className="text-xl font-bold text-rose-500 text-center mb-4">
        Storage
      </h3>
      <div className="flex gap-4">
        <ul className="flex flex-col gap-2 max-h-screen overflow-y-auto">
          {!files.length && "No files"}
          {files.map((el) => (
            <li key={el}>
              <Link
                href={"?file=" + el}
                className="flex items-center gap-1 hover:bg-rose-50 p-4 rounded cursor-pointer"
              >
                <DocumentIcon className="w-6 h-6" />
                {el}
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </div>
  );
};

export default StorageLayout;
