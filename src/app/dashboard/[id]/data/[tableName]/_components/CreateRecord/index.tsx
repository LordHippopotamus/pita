"use client";

import { Button } from "@/components/ui";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { createRecord } from "../../actions";
import CreateRecordForm from "./CreateRecordForm";

const CreateRecord = ({
  projectId,
  tableName,
  schema,
}: {
  projectId: string;
  tableName: string;
  schema: {
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
        className="flex justify-center items-center gap-2"
        aria-label="create project"
      >
        <PlusIcon className="w-6" />
        Create
      </Button>
      <Transition appear show={open} as={Fragment}>
        <Dialog onClose={handleClose}>
          <div>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <div className="fixed w-full bottom-0 px-4">
                <Dialog.Panel className="bg-white rounded-t-lg shadow-lg pt-4">
                  <Dialog.Title className="text-2xl text-center">
                    Create Record
                  </Dialog.Title>
                  <div
                    className="max-h-[80vh] overflow-y-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <CreateRecordForm
                      schema={schema}
                      loading={loading}
                      error={error}
                      onSubmit={handleSubmit}
                      onClose={handleClose}
                    />
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateRecord;
