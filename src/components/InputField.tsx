import React from "react";
import { useField } from "formik";
import FormControl from "@mui/material/FormControl";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { ErrorText } from "./ErrorText";

interface Props {
  readonly name: string;
  readonly inputProps?: TextFieldProps;
}

export function InputField({ name, inputProps }: Props) {
  const [field, meta] = useField(name);

  const error = meta.touched ? meta.error : undefined;

  return (
    <FormControl>
      <TextField
        {...inputProps}
        {...field}
        InputProps={{
          autoComplete: "off",
          error: !!error,
          ...inputProps?.InputProps,
        }}
      />
      {!!error && <ErrorText text={error} />}
    </FormControl>
  );
}
