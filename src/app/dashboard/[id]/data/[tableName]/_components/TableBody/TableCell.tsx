"use client";

import { useEffect, useRef, useState } from "react";
import { changeRecord } from "../../actions";
import { useParams } from "next/navigation";

const TableCell = ({
  column,
  content,
  id,
}: {
  column: string;
  content: any;
  id: string;
}) => {
  const { id: projectId, tableName } = useParams<{
    id: string;
    tableName: string;
  }>();
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (!editing || !ref.current) return;
      if (ref.current.contains(event.target as Node | null)) return;

      setPending(true);
      await changeRecord(projectId, tableName, column, ref.current.value, id);
      setPending(false);
      setEditing(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [column, editing, id, projectId, ref, tableName]);

  return (
    <td
      onDoubleClick={() => setEditing(!editing)}
      className="border border-slate-300"
    >
      {editing ? (
        <input
          autoFocus
          disabled={pending}
          ref={ref}
          defaultValue={String(content)}
          className={`focus:outline outline-rose-500 ${
            pending ? "text-slate-300" : ""
          }`}
        />
      ) : (
        String(content)
      )}
    </td>
  );
};
export default TableCell;
