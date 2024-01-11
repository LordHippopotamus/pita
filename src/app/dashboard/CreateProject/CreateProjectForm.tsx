"use client";

import { Input } from "@/components/ui";
import { createProject } from "../actions";
import { useSession } from "next-auth/react";
import { ActionButton } from "@/components/business";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const initialState = {
  ok: true,
  message: "",
};

const CreateProjectForm = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession({ required: true });
  const [state, formAction] = useFormState(createProject, initialState);

  useEffect(() => {
    if (state.ok && state.message) return onClose();
  }, [state, onClose]);

  return (
    <form
      className="mt-2"
      action={(formData) => {
        if (!session?.user) return;
        formData.append("owner", session.user.id);
        return formAction(formData);
      }}
      method="POST"
    >
      <label>
        <Input
          name="name"
          placeholder="Name"
          className="w-full mt-2"
          required
        />
        Enter a name of the project
      </label>
      <label>
        <Input
          name="password"
          type="password"
          minLength={6}
          placeholder="Database Password"
          className="w-full mt-2"
          required
        />
        Enter a database password
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
        <ActionButton variant="text" onClick={onClose}>
          Cancel
        </ActionButton>
        <ActionButton type="submit">Create</ActionButton>
      </div>
    </form>
  );
};

export default CreateProjectForm;
