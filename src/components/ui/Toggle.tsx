"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";

const Toggle = ({ label, name }: { label: string; name?: string }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">{label}</Switch.Label>
        <Switch
          name={name}
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-rose-500" : "bg-slate-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default Toggle;
