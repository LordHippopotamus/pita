"use client";

import { Button } from "@/components/ui";
import { useState } from "react";
import { uploadFile } from "./actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("Invalid result type"));
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};

const UploadFile = () => {
  const [file, setFile] = useState<null | File>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const params = useParams<{ id: string }>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;

    const base64 = await fileToBase64(file);

    try {
      setLoading(true);
      await uploadFile(params.id, { name: file.name, body: base64 });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="relative min-w-48 cursor-pointer border border-dashed border-slate-300 p-2 rounded mr-1">
          <input
            type="file"
            name="file"
            className="absolute z-[-1] block w-0 h-0 opacity-0"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
          <span className={!file ? "text-slate-300" : ""}>
            {file ? file.name : "Select File"}
          </span>
        </label>
        <Button disabled={loading}>Upload</Button>
      </form>
      {error && (
        <div className="flex items-center text-rose-500 gap-1 mt-2">
          <ExclamationCircleIcon className="w-6 h-6" />
          Error: {error}
        </div>
      )}
    </>
  );
};

export default UploadFile;
