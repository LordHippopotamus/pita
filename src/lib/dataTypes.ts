export const dataTypes = [
  { type: "text", label: "Rich Text" },
  { type: "character varying", label: "String" },
  { type: "real", label: "Number" },
  { type: "boolean", label: "Boolean" },
  { type: "timestamp with time zone", label: "Date" },
  { type: "uuid", label: "UUID" },
];

export const getLabelByType = (type: string) =>
  dataTypes.find((el) => el.type === type)?.label;
export const getTypeByLabel = (label: string) =>
  dataTypes.find((el) => el.label === label)?.type;
