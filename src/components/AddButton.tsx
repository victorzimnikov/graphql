import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface Props {
  readonly onConfirm: () => void;
}

export function AddButton({ onConfirm }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    const saveHandler = () => {
      onConfirm();
      setShowConfirm(false);
    };

    return (
      <Stack direction="row" spacing={1}>
        <Button sx={{ flex: 1, color: "green" }} onClick={saveHandler}>
          Save
        </Button>
        <Button sx={{ flex: 1, color: "red" }} onClick={() => setShowConfirm(false)}>
          Cancel
        </Button>
      </Stack>
    );
  }

  return (
    <Stack>
      <Button onClick={() => setShowConfirm(true)}>Add</Button>
    </Stack>
  );
}
