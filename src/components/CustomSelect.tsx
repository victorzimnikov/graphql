import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AutocompleteValue } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

import { AddButton } from "./AddButton";
import { InputProps } from "@mui/material/Input";

type BaseProps<T> = Omit<
  AutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  "renderInput"
>;

export interface CustomSelectProps<T> extends BaseProps<T> {
  readonly label: string;
  readonly onAdd: (value: string) => void;
  readonly InputProps?: Partial<InputProps>;
  readonly onSelectValue: (
    value: AutocompleteValue<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  ) => void;
}

export function CustomSelect<T>({
  label,
  onAdd,
  onSelectValue,
  InputProps,
  ...props
}: CustomSelectProps<T>) {
  const [inputValue, setInputValue] = useState("");

  const addHandler = () => onAdd(inputValue);

  return (
    <Autocomplete
      {...props}
      noOptionsText={<AddButton onConfirm={addHandler} />}
      onChange={(_, value) => onSelectValue(value)}
      onInputChange={(_, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            ...InputProps,
            endAdornment: (
              <React.Fragment>
                {props.loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
