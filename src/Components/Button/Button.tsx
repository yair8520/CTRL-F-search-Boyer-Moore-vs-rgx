import { Button } from "@mui/material";
import React from "react";
import { AppButtonProps } from "./ButtonProps";

export const AppButton = ({
  disabled = false,
  text,
  onPress,
}: AppButtonProps) => {
  return (
    <Button variant="contained" disabled={disabled} onClick={() => onPress?.()}>
      {text}
    </Button>
  );
};
