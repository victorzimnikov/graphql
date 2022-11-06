import React from "react";
import { useField } from "formik";
import FormControl from "@mui/material/FormControl";

import { ErrorText } from "./ErrorText";
import { RelationsSelect } from "./RelationsSelect";

interface Props {
  readonly name: string;
}

export function RelationSelectField({ name }: Props) {
  const [field, meta, helpers] = useField(name);

  const error = meta.touched ? meta.error : undefined;

  return (
    <FormControl>
      <RelationsSelect
        value={field.value}
        onChange={(_, reason) => {
          helpers.setTouched(true);
          helpers.setValue(reason);
        }}
      />
      {!!error && <ErrorText text={error} />}
    </FormControl>
  );
}
