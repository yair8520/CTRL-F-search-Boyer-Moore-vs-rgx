import { TextField } from "@mui/material";
import React from "react";
import { InputFieldProps } from "./InputFieldProps";

export const InputField = ({
  onChange,
  errorMessage,
  value,
}: InputFieldProps) => {
  return (
    <TextField
      value={value}
      multiline
      className="inputfield"
      maxRows={4}
      label="search..."
      error={!!errorMessage}
      helperText={errorMessage}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
