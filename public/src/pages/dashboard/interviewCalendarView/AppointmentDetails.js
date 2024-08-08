import React, { useState } from "react";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";

const SERVICES_TO_PERFORM = [
  {
    label: "Initial Assessment",
    value: "initial",
  },
  {
    label: "ERI 1-on-1",
    value: "eri",
  },
  {
    label: "JMS Job Referral",
    value: "jms",
  },
];

function AppointmentDetails({ onCancel }) {
  const reasons = [
    { id: "1", name: "Reason 1" },
    { id: "2", name: "Reason 2" },
    { id: "3", name: "Reason 3" },
  ];

  const [servicesPerformed, setServicesPerformed] = useState([]);
  const [activitiesPerformed, setActivitiesPerformed] = useState([]);
  const [otherDataCapture, setOtherDataCapture] = useState("");
  const [interviewerNotes, setInterviewerNotes] = useState("");

  const handleSubmit = () => {
    onCancel();
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row">
        <Stack width="30%">
          <Stack>
            <Typography className="label-text">
              <span className="required">*</span>Reschedule to:
            </Typography>
          </Stack>
          <Stack>
            <FormGroup>
              {SERVICES_TO_PERFORM?.map((item, idx) => (
                <div key={`${item.value}-${idx}`}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={servicesPerformed?.indexOf(item.value) > -1}
                        onChange={(event) => {
                          const selected = [...servicesPerformed];
                          if (event.target.checked) {
                            selected.push(item.value);
                          } else {
                            const index = selected.findIndex(
                              (x) => x === item.value,
                            );
                            if (index >= 0) {
                              selected.splice(index, 1);
                            }
                          }
                          setServicesPerformed(selected);
                        }}
                      />
                    }
                    label={item.label}
                  />
                </div>
              ))}
            </FormGroup>
          </Stack>
        </Stack>
        <Stack width="70%">
          <Stack>
            <Typography className="label-text">
              Activities performed by Claimant:
            </Typography>
          </Stack>
          <Stack width={1} paddingTop={2}>
            <Stack direction="row" spacing={3} width={1} alignItems={"center"}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activitiesPerformed?.indexOf("activeResume") > -1}
                    onChange={(event) => {
                      const selected = [...activitiesPerformed];
                      if (event.target.checked) {
                        selected.push("activeResume");
                      } else {
                        const index = selected.findIndex(
                          (x) => x === "activeResume",
                        );
                        if (index >= 0) {
                          selected.splice(index, 1);
                        }
                      }
                      setActivitiesPerformed(selected);
                    }}
                  />
                }
                label={"Active Resume"}
              />
              <Stack direction="row" spacing={2} width={"50%"}>
                <TextField
                  size="small"
                  label="Date"
                  // value={additionalDetails}
                  // onChange={(e) => setAdditionalDetails(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={2}
                  fullWidth
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Grid
        container
        spacing={2}
        sx={{
          ">.MuiGrid-item": {
            paddingLeft: "0px",
          },
        }}
      >
        <Grid item xs={12} sm={8} lg={9}>
          <TextField
            size="small"
            label="Interviewer Notes"
            value={interviewerNotes}
            onChange={(e) => setInterviewerNotes(e.target.value)}
            variant="outlined"
            multiline
            rows={2}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={9}>
          <TextField
            size="small"
            label="Other Data Capture"
            value={otherDataCapture}
            onChange={(e) => setOtherDataCapture(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
            fullWidth
          />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        paddingTop={2}
      >
        <Button variant="contained" onClick={() => handleSubmit()}>
          Complete Appointment
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}

export default AppointmentDetails;
