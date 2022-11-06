import React from "react";
import { useField } from "formik";
import FormControl from "@mui/material/FormControl";

import { ErrorText } from "./ErrorText";
import { PositionsSelect } from "./PositionsSelect";

interface Props {
  readonly name: string;
}

export function PositionSelectField({ name }: Props) {
  const [field, meta, helpers] = useField(name);

  const error = meta.touched ? meta.error : undefined;

  return (
    <FormControl>
      <PositionsSelect
        value={field.value}
        onSelectValue={(value) => {
          helpers.setTouched(true);
          helpers.setValue(value);
        }}
      />
      {!!error && <ErrorText text={error} />}
    </FormControl>
  );
}
