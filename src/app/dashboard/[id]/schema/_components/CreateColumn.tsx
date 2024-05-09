"use client";

import { Button, Input, Select, Toggle, TextArea } from "@/components/ui";
import { Dialog } from "@headlessui/react";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { createColumn } from "../actions";
import { useParams } from "next/navigation";
import { dataTypes } from "@/lib/dataTypes";

const CreateColumn = ({ tableName }: { tableName: string }) => {
  const { id: projectId } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    try {
      await createColumn({
        projectId,
        tableName,
        columnName: formData.get("columnName") as string,
        type: formData.get("type[id]") as string,
        notNull: !!formData.get("notNull"),
        defaultValue: formData.get("defaultValue") as string,
      });
      setOpen(false);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => setError(null), [open]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        className="flex justify-center w-full"
        aria-label="create project"
      >
        <PlusIcon className="w-6" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        className="w-full max-w-72 sm:max-w-96 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-lg shadow-lg"
      >
        <Dialog.Panel>
          <Dialog.Title className="text-2xl text-center">
            Create a column
          </Dialog.Title>
          <form
            className="mt-2 relative flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <label>
              <Input
                name="columnName"
                placeholder="Name"
                className="w-full"
                required
              />
              Enter a name of the column
            </label>

            <label>
              <Select
                name="type"
                items={dataTypes.map((el) => ({
                  id: el.type,
                  label: el.label,
                }))}
              />
              Select a data type of the column
            </label>

            <Toggle name="notNull" label="Not Null" />

            <label>
              Default Value
              <TextArea
                name="defaultValue"
                placeholder="null"
                className="w-full min-h-20 max-h-48"
              />
            </label>

            {error && (
              <div className="border border-rose-500 bg-rose-50 p-4 mt-2 rounded-lg">
                <div className="flex items-center gap-1">
                  <ExclamationCircleIcon className="w-8 text-rose-500" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2 justify-end">
              <Button disabled={loading} variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default CreateColumn;
