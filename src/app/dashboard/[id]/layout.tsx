"use client";

import {
  CircleStackIcon,
  Cog6ToothIcon,
  CubeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const items = [
  { label: "Data", url: "data" },
  { label: "Schema", url: "schema" },
  { label: "Storage", url: "storage" },
  { label: "Connection", url: "connection" },
];

const ProjectLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.split("/").length === 3) {
      router.push(`/dashboard/${params.id}/${items[0].url}`);
    }
  }, [pathname, router, params.id]);

  return (
    <div className="my-4 flex gap-4 max-w-full">
      <aside>
        <ul className="bg-white p-4 rounded-r-md shadow-md min-w-32 w-fit flex flex-col gap-2 h-fit">
          {items.map((el) => (
            <li key={el.url}>
              <Link
                aria-disabled={pathname.includes(el.url)}
                tabIndex={pathname.includes(el.url) ? -1 : undefined}
                href={`/dashboard/${params.id}/${el.url}`}
                className={`flex gap-1 items-center transition py-2 px-6 rounded-md ${
                  pathname.includes(el.url)
                    ? "text-rose-500 pointer-events-none"
                    : "hover:bg-rose-50 active:bg-rose-100"
                }`}
              >
                {el.url === "data" ? (
                  <TableCellsIcon className="w-6" />
                ) : el.url === "schema" ? (
                  <CubeIcon className="w-6" />
                ) : el.url === "storage" ? (
                  <CircleStackIcon className="w-6" />
                ) : (
                  <Cog6ToothIcon className="w-6" />
                )}

                {el.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="max-w-full grow self-start mr-4">{children}</div>
    </div>
  );
};

export default ProjectLayout;
