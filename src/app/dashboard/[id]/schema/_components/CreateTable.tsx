"use client";

import { Button, Input } from "@/components/ui";
import { Dialog } from "@headlessui/react";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { createTable } from "../actions";
import { useParams } from "next/navigation";

const CreateTable = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) return;
    setLoading(true);
    try {
      await createTable(projectId, name);
      setOpen(false);
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => setName(""), [open]);
  useEffect(() => setError(null), [name]);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="shadow-md flex justify-center self-start gap-1"
        aria-label="create project"
      >
        <PlusIcon className="w-6" />
        Create Table
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        className="w-full max-w-72 sm:max-w-96 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-lg shadow-lg"
      >
        <Dialog.Panel>
          <Dialog.Title className="text-2xl text-center">
            Create Table
          </Dialog.Title>
          <form className="mt-2" onSubmit={handleSubmit}>
            <label>
              <Input
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2"
                required
              />
              Enter a name of the table
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
              <Button
                disabled={loading || !!error}
                variant="text"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button disabled={loading || !!error} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default CreateTable;
