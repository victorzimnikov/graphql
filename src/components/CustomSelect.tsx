import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

import { AddButton } from "./AddButton";
import { AutocompleteValue } from "@mui/material";

type InputProps<T> = Omit<
  AutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  "renderInput"
>;

export interface CustomSelectProps<T> extends InputProps<T> {
  readonly label: string;
  readonly onAdd: (value: string) => void;
  readonly onSelectValue: (
    value: AutocompleteValue<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  ) => void;
}

export function CustomSelect<T>({ label, onAdd, onSelectValue, ...props }: CustomSelectProps<T>) {
  const [inputValue, setInputValue] = useState("");

  const addHandler = () => onAdd(inputValue);

  return (
    <Autocomplete
      {...props}
      sx={{ width: "300px" }}
      noOptionsText={<AddButton onConfirm={addHandler} />}
      onChange={(_, value) => onSelectValue(value)}
      onInputChange={(_, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
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
