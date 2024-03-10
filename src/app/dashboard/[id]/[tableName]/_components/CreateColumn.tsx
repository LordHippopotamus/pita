"use client";

import { ActionButton } from "@/components/business";
import { Button, Input, Select, Toggle, TextArea } from "@/components/ui";
import { Dialog } from "@headlessui/react";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createColumn } from "../actions";

const initialState = {
  ok: true,
  message: "",
};

const CreateColumn = ({
  projectId,
  tableName,
}: {
  projectId: string;
  tableName: string;
}) => {
  const [state, formAction] = useFormState(createColumn, initialState);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (state.ok && state.message) return handleClose();
  }, [state]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        className="flex justify-center"
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
            method="POST"
            action={(formData) => {
              formData.append("projectId", projectId);
              formData.append("tableName", tableName);
              return formAction(formData);
            }}
          >
            <label>
              <Input
                name="name"
                placeholder="Name"
                className="w-full"
                required
              />
              Enter a name of the column
            </label>

            <label>
              <Select
                name="type"
                items={[
                  { id: "text", label: "Text" },
                  { id: "real", label: "Real" },
                  { id: "integer", label: "Integer" },
                  { id: "boolean", label: "Boolean" },
                  { id: "uuid", label: "UUID" },
                  { id: "timestamp with time zone", label: "Timestamp" },
                ]}
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

            {!state.ok && (
              <div className="border border-rose-500 bg-rose-50 p-4 mt-2 rounded-lg">
                <div className="flex items-center gap-1">
                  <ExclamationCircleIcon className="w-8 text-rose-500" />
                  <span>{state.message}</span>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2 justify-end">
              <ActionButton variant="text" onClick={handleClose}>
                Cancel
              </ActionButton>
              <ActionButton type="submit">Create</ActionButton>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default CreateColumn;
