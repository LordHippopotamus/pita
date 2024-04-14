"use client";

import { ActionButton } from "@/components/business";
import { Button, Input, Toggle } from "@/components/ui";
import { Dialog } from "@headlessui/react";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createRow } from "../actions";

const initialState = {
  ok: true,
  message: "",
};

const CreateRow = ({
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
  const [state, formAction] = useFormState(createRow, initialState);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (state.ok && state.message) return handleClose();
  }, [state]);

  return (
    <>
      <Button onClick={handleOpen} variant="text" aria-label="create project">
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
            className="mt-2 relative flex flex-col gap-2"
            method="POST"
            action={(formData) => {
              formData.append("projectId", projectId);
              formData.append("tableName", tableName);
              return formAction(formData);
            }}
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

export default CreateRow;
