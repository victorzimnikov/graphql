import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

export type CustomSelectProps<T> = Omit<
  AutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>,
  "renderInput"
>;

interface Props<T> extends CustomSelectProps<T> {
  readonly label: string;
  readonly onAdd: (value: string) => void;
}

export function CustomSelect<T>({ label, onAdd, ...props }: Props<T>) {
  const [inputValue, setInputValue] = useState("");

  const addClickHandler = () => onAdd(inputValue);

  return (
    <Autocomplete
      {...props}
      sx={{ width: 300 }}
      onInputChange={(_, value) => setInputValue(value)}
      noOptionsText={<Button onClick={addClickHandler}>Add</Button>}
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
