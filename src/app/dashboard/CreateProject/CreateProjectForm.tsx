"use client";

import { Button, Input } from "@/components/ui";
import { createProject } from "../actions";
import { useSession } from "next-auth/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CreateProjectForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession({ required: true });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user) return;
    try {
      setLoading(true);
      await createProject(name, password, session.user.id);
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="Name"
          className="w-full mt-2"
          required
        />
        Enter a name of the project
      </label>
      <label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          minLength={6}
          placeholder="Database Password"
          className="w-full mt-2"
          required
        />
        Enter a database password
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
        <Button disabled={loading} variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
