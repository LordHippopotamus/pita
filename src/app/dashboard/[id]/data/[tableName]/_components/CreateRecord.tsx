"use client";

import { Button, Input, Toggle } from "@/components/ui";
import { Dialog } from "@headlessui/react";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createRecord } from "../actions";

const CreateRecord = ({
  projectId,
  tableName,
  columns,
}: {
  projectId: string;
  tableName: string;
  columns: {
    column_name: string;
    data_type: string;
  }[];
}) => {
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
      await createRecord({
        projectId,
        tableName,
        data: Object.fromEntries(formData),
      });
      setOpen(false);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        className="w-full flex justify-center"
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
            Create a row
          </Dialog.Title>
          <form
            onSubmit={handleSubmit}
            className="mt-2 relative flex flex-col gap-2"
          >
            {columns.map((el) => (
              <div key={el.column_name}>
                {(el.data_type === "text" || el.data_type === "uuid") && (
                  <div>
                    <label htmlFor={el.column_name}>
                      <span className="font-bold">{el.column_name}</span>
                      &nbsp;
                      <span className="text-sm">{el.data_type}</span>
                    </label>
                    <Input
                      name={el.column_name}
                      id={el.column_name}
                      className="w-full"
                    />
                  </div>
                )}
                {el.data_type === "integer" && (
                  <div>
                    <label htmlFor={el.column_name}>
                      <span className="font-bold">{el.column_name}</span>
                      &nbsp;
                      <span className="text-sm">{el.data_type}</span>
                    </label>
                    <Input
                      name={el.column_name}
                      id={el.column_name}
                      type="number"
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
                {el.data_type === "real" && (
                  <div>
                    <label htmlFor={el.column_name}>
                      <span className="font-bold">{el.column_name}</span>
                      &nbsp;
                      <span className="text-sm">{el.data_type}</span>
                    </label>
                    <Input
                      name={el.column_name}
                      type="number"
                      step="any"
                      className="w-full"
                    />
                  </div>
                )}
                {el.data_type === "boolean" && (
                  <div className="flex gap-2">
                    <label>
                      <span className="font-bold">{el.column_name}</span>
                      &nbsp;
                      <span className="text-sm">{el.data_type}</span>
                    </label>
                    <Toggle name={el.column_name} />
                  </div>
                )}
                {el.data_type === "timestamp with time zone" && (
                  <div>
                    <label>
                      <span className="font-bold">{el.column_name}</span>
                      &nbsp;
                      <span className="text-sm">{el.data_type}</span>
                    </label>
                    <Input
                      name={el.column_name}
                      type="datetime-local"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}

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

export default CreateRecord;
