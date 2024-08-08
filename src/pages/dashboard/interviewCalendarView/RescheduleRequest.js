import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function RescheduleRequest({ onCancel }) {
  const reasons = [
    { id: "1", name: "Reason 1" },
    { id: "2", name: "Reason 2" },
    { id: "3", name: "Reason 3" },
  ];

  const [rescheduleTo, setRescheduleTo] = useState("");
  const [reasonForRescheduling, setReasonForRescheduling] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [staffNotes, setStaffNotes] = useState("");

  const handleSubmit = () => {
    onCancel();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Reschedule to"
          size="small"
          value={rescheduleTo}
          onChange={(e) => setRescheduleTo(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="reschedule-request-dropdown">
            Reason for rescheduling *
          </InputLabel>
          <Select
            label="Reason for rescheduling"
            value={reasonForRescheduling}
            onChange={(e) => setReasonForRescheduling(e.target.value)}
            required
            labelId="reschedule-request-dropdown"
          >
            {reasons.map((reason) => (
              <MenuItem key={reason.id} value={reason.id}>
                {reason.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Additional details, if any"
          size="small"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          variant="outlined"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Staff Notes, if any"
          size="small"
          value={staffNotes}
          onChange={(e) => setStaffNotes(e.target.value)}
          variant="outlined"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RescheduleRequest;
