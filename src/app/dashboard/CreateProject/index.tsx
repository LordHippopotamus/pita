"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui";
import CreateProjectForm from "./CreateProjectForm";

const CreateProject = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="!px-4 shadow-md"
        aria-label="create project"
      >
        <PlusIcon className="w-8" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        className="w-full max-w-72 sm:max-w-96 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-lg shadow-lg"
      >
        <Dialog.Panel>
          <Dialog.Title className="text-2xl text-center">
            Create Project
          </Dialog.Title>
          <CreateProjectForm onClose={handleClose} />
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default CreateProject;
