"use client";

import { Button, Input, TextArea, Toggle } from "@/components/ui";
import { getLabelByType } from "@/lib/dataTypes";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const CreateRecordForm = ({
  schema,
  loading,
  error,
  onSubmit,
  onClose,
}: {
  schema: {
    column_name: string;
    data_type: string;
  }[];
  loading: boolean;
  error: string | null;
  onSubmit: React.FormEventHandler;
  onClose: React.MouseEventHandler;
}) => (
  <form onSubmit={onSubmit} className="mt-2 relative flex flex-col gap-2 p-4">
    {schema
      .filter((el) => el.column_name !== "id")
      .map((el) => (
        <div key={el.column_name}>
          {el.data_type === "text" && (
            <div>
              <label htmlFor={el.column_name}>
                <span className="font-bold">{el.column_name}</span>
                &nbsp;
                <span className="text-sm">{getLabelByType(el.data_type)}</span>
              </label>
              <TextArea
                name={el.column_name}
                id={el.column_name}
                className="w-full min-h-16 h-64"
              />
            </div>
          )}
          {(el.data_type === "uuid" ||
            el.data_type === "character varying") && (
            <div>
              <label htmlFor={el.column_name}>
                <span className="font-bold">{el.column_name}</span>
                &nbsp;
                <span className="text-sm">{getLabelByType(el.data_type)}</span>
              </label>
              <Input
                name={el.column_name}
                id={el.column_name}
                className="w-full"
              />
            </div>
          )}
          {el.data_type === "real" && (
            <div>
              <label htmlFor={el.column_name}>
                <span className="font-bold">{el.column_name}</span>
                &nbsp;
                <span className="text-sm">{getLabelByType(el.data_type)}</span>
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
                <span className="text-sm">{getLabelByType(el.data_type)}</span>
              </label>
              <Toggle name={el.column_name} />
            </div>
          )}
          {el.data_type === "timestamp with time zone" && (
            <div>
              <label>
                <span className="font-bold">{el.column_name}</span>
                &nbsp;
                <span className="text-sm">{getLabelByType(el.data_type)}</span>
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
      <Button disabled={loading} variant="text" onClick={onClose}>
        Cancel
      </Button>
      <Button disabled={loading} type="submit">
        Create
      </Button>
    </div>
  </form>
);

export default CreateRecordForm;
