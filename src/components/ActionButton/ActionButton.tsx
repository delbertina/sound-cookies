import './ActionButton.scss';
import { Button } from "@mui/material";
import React from "react";

export interface ActionButtonProps {
  buttonText: string;
  buttonSelected: boolean;
  buttonClicked: () => void;
}

function ActionButton(props: ActionButtonProps) {
  
    return (
      <Button
        variant="contained"
        onClick={() => props.buttonClicked()}
        className="action-button"
        color={props.buttonSelected ? 'success' : 'info'}
      >
        {props.buttonText}
      </Button>
    );
  }

  export default ActionButton