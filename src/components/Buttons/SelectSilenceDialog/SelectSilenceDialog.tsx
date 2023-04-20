import './SelectSilenceDialog.scss';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";

export interface SelectSilenceDialogProps {
  isOpen: boolean;
  oldValue: number;
  onClose: (newValue: number) => void;
}

function SelectSilenceDialog(props: SelectSilenceDialogProps) {
  const [newValue, setNewValue] = useState<number>(props.oldValue);

  const handleClose = (returnValue: number) => {
    props.onClose(returnValue);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={() => handleClose(props.oldValue)}>
        <DialogTitle>Edit Silence</DialogTitle>
        <DialogContent className="select-silence-dialog-content">
          <DialogContentText>
            Input the new duration of silence
          </DialogContentText>
          <TextField
            id="select"
            label="Seconds"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            inputProps={{ inputMode: "numeric", min: "1", max: "60" }}
            variant="standard"
            value={newValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewValue(parseFloat(event.target.value));
            }}
          />
        </DialogContent>
        <DialogActions className="select-silence-dialog-actions">
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClose(-1)}
          >
            Remove
          </Button>
          <div style={{flex: '1 0 0'}} />
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleClose(props.oldValue)}
          >
            Cancel
          </Button>
          <Button variant="outlined" onClick={() => handleClose(newValue)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SelectSilenceDialog;
