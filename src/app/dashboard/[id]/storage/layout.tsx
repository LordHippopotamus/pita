import { getServerSession } from "next-auth";
import { authOptions } from "@/lib";
import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/24/outline";
import UploadFile from "./UploadFile";
import { redirect } from "next/navigation";
import { s3 } from "@/lib/s3";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const loadFiles = async (projectId: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/signin");

  try {
    const res = await s3.send(
      new ListObjectsCommand({ Bucket: session.user.id + projectId })
    );
    if (!res.Contents) return [];
    return res.Contents.map((el) => el.Key);
  } catch (e: any) {
    return [];
  }
};

const StorageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const files = await loadFiles(params.id);

  return (
    <div className="rounded-md shadow-md p-4 bg-white w-fit">
      <h3 className="text-xl font-bold text-rose-500 text-center mb-4">
        Storage
      </h3>
      <div className="flex gap-4">
        <div>
          <UploadFile />
          <ul className="flex flex-col gap-2 max-h-screen overflow-y-auto mt-2">
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
        </div>
        {children}
      </div>
    </div>
  );
};

export default StorageLayout;
