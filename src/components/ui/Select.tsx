"use state";

import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { MenuItem } from "@/components/ui";

const Select = ({
  items,
  name,
}: {
  items: { id: string; label: string }[];
  name?: string;
}) => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <Listbox name={name} value={selected} onChange={setSelected}>
      <Listbox.Button className="w-full border border-slate-300 p-2 rounded-md text-left">
        {selected.label}
      </Listbox.Button>

      <Listbox.Options className="absolute mt-1 bg-white w-full shadow-md border border-slate-300 p-2 rounded-md flex flex-col gap-1 z-10">
        {items.map((el) => (
          <Listbox.Option
            as={MenuItem}
            className="text-left"
            key={el.id}
            value={el}
          >
            {el.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default Select;
