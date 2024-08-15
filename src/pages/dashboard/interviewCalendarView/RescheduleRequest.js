import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { reschedulingReasonsListURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { STATES } from "../../../helpers/Constants";
import IssueSubIssueType from "../../../components/issueSubIssueType";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

function RescheduleRequest({ onCancel }) {
  const formik = useFormik({
    initialValues: {
      issues: [
        {
          id: uuidv4(),
          issueChecked: false,
          issueType: "",
          subIssueType: "",
          issueStartDate: null,
        },
      ],
    },
    onSubmit: (values) => {
      console.log("Form Values", values);
      onCancel();
    },
  });

  const states = STATES;
  const [rescheduleTo, setRescheduleTo] = useState("");
  const [reasonForRescheduling, setReasonForRescheduling] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [staffNotes, setStaffNotes] = useState("");
  const [reasons, setReasons] = useState([{}]);

  useEffect(() => {
    async function fetchRescheduleReasonsListData() {
      const data =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(reschedulingReasonsListURL)
          : await client.get(`${reschedulingReasonsListURL}/526`);
      setReasons(data?.map((d) => ({ id: d.alvId, name: d.alvShortDecTxt })));
    }
    fetchRescheduleReasonsListData();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <TextField
              label="Reschedule to"
              size="small"
              value={rescheduleTo}
              onChange={(e) => setRescheduleTo(e.target.value)}
              variant="outlined"
              required
              sx={{ width: "40%" }}
            />
            <FormControl sx={{width:"30%",display:'flex', flexDirection:'row'}}>
              <Typography
                sx={{
                  width: "20%",
                  alignSelf: "center",
                }}
              >
                *Mode:
              </Typography>
              <RadioGroup
                row
                name="mode"
                value={formik.values.workMode}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="in person"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="virtual"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
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
              sx={{ width: "50%" }}
            >
              {reasons.map((reason) => (
                <MenuItem key={reason.id} value={reason.id}>
                  {reason.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {reasonForRescheduling === 3159 || reasonForRescheduling === 3160 ? (
          <>
            <Typography className="label-text" marginTop={"8px !important"}>
              Please provide below details:
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Date*"
                size="small"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Time*"
                size="small"
                value={staffNotes}
                onChange={(e) => setStaffNotes(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="City*"
                size="small"
                value={staffNotes}
                onChange={(e) => setStaffNotes(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <FormControl size="small" fullWidth>
                <InputLabel id="state-dropdown">State*</InputLabel>
                <Select
                  label="State*"
                  variant="outlined"
                  labelId="state-dropdown"
                >
                  {states.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </>
        ) : null}

        <Stack direction={"column"} spacing={2}>
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
        </Stack>

        <Typography className="label-text" marginTop={"8px !important"}>
          Create issues, if any, based on the information associated with this
          request:
        </Typography>
        <Stack spacing={2}>
          <IssueSubIssueType formik={formik} />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default RescheduleRequest;
