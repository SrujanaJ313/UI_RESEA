import React, { Fragment, useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import moment from "moment";

function AvailableEvent({ event, onClose }) {
  const claimants = [
    { id: "jsample", name: "Jack Sample" },
    { id: "jsmith", name: "Jack Smith" },
    { id: "ppenn", name: "Peter Penn" },
  ];

  const [claimant, setClaimant] = useState("");
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState(false);
  const [convertedFormat, setConvertedFormat] = useState("");

  const handleSubmit = () => {
    const formData = {
      claimant,
      notes,
      checked,
    };
    // onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    const startDate = moment(event.start).format("M/D/YYYY [at] h:mm a");
    const endDate = moment(event.end).format("h:mm a");

    setConvertedFormat(`${startDate} to ${endDate}`);
  }, [event]);

  return (
    <>
      <DialogContent dividers>
        <Fragment>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            marginBottom={"20px"}
          >
            <Stack direction={"row"} spacing={1}>
              <Typography className="label-text">Case Manager:</Typography>
              <Typography>Mary Peters</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Typography className="label-text">
                Initial Appointment Timeslot:
              </Typography>
              <Typography>{convertedFormat}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Stack width="70%">
              <FormControl size="small" sx={{ width: "40%" }}>
                <InputLabel id="claimant-select-label">
                  Claimant to be scheduled
                </InputLabel>
                <Select
                  labelId="claimant-select-label"
                  label="Claimant to be scheduled"
                  value={claimant}
                  size="small"
                  variant="outlined"
                  onChange={(e) => setClaimant(e.target.value)}
                >
                  {claimants.map((claimant) => (
                    <MenuItem key={claimant.id} value={claimant.id}>
                      {claimant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} alignItems={"center"} py={1}>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              sx={{ padding: 0 }}
            />
            <Typography className="label-text">
              Claimant has been asked to check Claimant portal for details of
              this last minute schedule
            </Typography>
          </Stack>

          <Stack direction="row">
            <Stack width="70%">
              <TextField
                size="small"
                label="Notes, if any"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                rows={3}
                variant="outlined"
              />
            </Stack>
          </Stack>
        </Fragment>
      </DialogContent>
      <DialogActions sx={{ margin: 2 }}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
}

export default AvailableEvent;
