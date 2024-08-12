import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { reschedulingReasonsListURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";

function RescheduleRequest({ onCancel }) {
  // const reasons = [
  //   { id: "1", name: "Reason 1" },
  //   { id: "2", name: "Reason 2" },
  //   { id: "3", name: "Reason 3" },
  // ];

  const issueTypes = [
    {
      nmiId: 1,
      nmiDesc: "Ability",
    },
    {
      nmiId: 2,
      nmiDesc: "Actively Seeking Work",
    },
    {
      nmiId: 49,
      nmiDesc: "Attending Training",
    },
    {
      nmiId: 55,
      nmiDesc: "Expected return to work",
    },
  ];

  const [rescheduleTo, setRescheduleTo] = useState("");
  const [reasonForRescheduling, setReasonForRescheduling] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [staffNotes, setStaffNotes] = useState("");
  const [reasons, setReasons] = useState([{}]);

  console.log("reschedulingReasonsListURL-->", reschedulingReasonsListURL);
  useEffect(() => {
    async function fetchRescheduleReasonsListData() {
      const data =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(reschedulingReasonsListURL)
          : "";
      setReasons(data?.map((d) => ({ id: d.alvId, name: d.alvShortDecTxt })));
    }
    fetchRescheduleReasonsListData();
  }, []);

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
      <Typography className="label-text" marginTop={"8px !important"}>
        Create issues, if any, based on the information associated with this
        request:
      </Typography>
      <Stack spacing={2}>
        {/* {[1,2,3].map((issue, index) => ( */}
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  // checked={!!issue.createdIssue}
                  onChange={
                    (e) => []
                    // handleIssueChange(index, "createdIssue", e.target.value)
                  }
                  name="createdIssue"
                  sx={{ py: 0 }}
                />
              }
              label={"issueType:"}
            />
            <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
              <Select
                label="Reason for rescheduling"
                value={reasonForRescheduling}
                onChange={(e) => setReasonForRescheduling(e.target.value)}
                required
                labelId="reschedule-request-dropdown"
              >
                {issueTypes.map((issue) => (
                  <MenuItem key={issue.nmiId} value={issue.nmiDesc}>
                    {issue.nmiDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography>- Issue Sub:</Typography>
            <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
              {/* <InputLabel>Issue Sub</InputLabel> */}
              <Select
                // value={issue.issueSub}
                onChange={
                  (e) => []
                  // handleIssueChange(index, "issueSub", e.target.value)
                }
                // label="Issue Sub"
              >
                <MenuItem key={"sub"} value={"Sub 1"}>
                  Sub 1
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        {/* ))} */}
        <Stack
          direction="row"
          justifyContent={"center"}
          sx={{ mt: "0px !important" }}
        >
          <Button variant="text" onClick={() => {}}>
            + Add more
          </Button>
        </Stack>
      </Stack>
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
