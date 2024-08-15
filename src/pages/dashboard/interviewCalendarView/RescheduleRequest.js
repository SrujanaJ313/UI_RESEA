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
import IssueSubIssueType from "../../../components/issueSubIssueType";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

function RescheduleRequest({ onCancel }) {
  const validationSchema = Yup.object({
    rescheduleTo: Yup.string().required("Reschedule to is required"),
    mode: Yup.string().required("Mode is required"),
    reasonForRescheduling: Yup.string().required(
      "Reason for rescheduling is required"
    ),
    additionalDetails: Yup.string().required("Additional details are required"),
    issues: Yup.array().of(
      Yup.object().shape({
        issueChecked: Yup.string().required('issue need to be Checked'),
        issueType: Yup.object().required("Issue Type is required"),
        subIssueType: Yup.object().required("Sub Issue Type is required"),
        issueStartDate: Yup.date().required("Start Date is required"),
        issueEndDate: Yup.date().required("End Date is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      rescheduleTo: "",
      mode: "",
      reasonForRescheduling: "",
      additionalDetails: "",
      staffNotes: "",
      issues: [
        {
          id: uuidv4(),
          issueChecked: false,
          issueType: "",
          subIssueType: "",
          issueStartDate: null,
          issueEndDate: null,
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Values", values);
      onCancel();
    },
  });

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
              label="*Reschedule to"
              size="small"
              value={formik.values.rescheduleTo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              name="rescheduleTo"
              error={
                formik.touched.rescheduleTo &&
                Boolean(formik.errors.rescheduleTo)
              }
              helperText={
                formik.touched.rescheduleTo && formik.errors.rescheduleTo
              }
              sx={{ width: "40%" }}
            />
            <FormControl
              sx={{ width: "30%", display: "flex", flexDirection: "row" }}
            >
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
                value={formik.values.mode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="in person"
                  error={formik.touched.mode && Boolean(formik.errors.mode)}
                  helperText={formik.touched.mode && formik.errors.mode}
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
              *Reason for rescheduling
            </InputLabel>
            <Select
              label="*Reason for rescheduling"
              value={formik.values.reasonForRescheduling}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="reasonForRescheduling"
              error={
                formik.touched.reasonForRescheduling &&
                Boolean(formik.errors.reasonForRescheduling)
              }
              helperText={
                formik.touched.reasonForRescheduling &&
                formik.errors.reasonForRescheduling
              }
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

        {formik.values.reasonForRescheduling === 3159 ||
        formik.values.reasonForRescheduling === 3160 ? (
          <>
            <Typography className="label-text" marginTop={"8px !important"}>
              Please provide below details:
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Date*"
                size="small"
                value={formik.values.additionalDetails}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="additionalDetails"
                variant="outlined"
                fullWidth
                error={
                  formik.touched.additionalDetails &&
                  Boolean(formik.errors.additionalDetails)
                }
                helperText={
                  formik.touched.additionalDetails &&
                  formik.errors.additionalDetails
                }
              />
              <TextField
                label="Time*"
                size="small"
                value={formik.values.staffNotes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="staffNotes"
                variant="outlined"
                fullWidth
                error={
                  formik.touched.staffNotes && Boolean(formik.errors.staffNotes)
                }
                helperText={
                  formik.touched.staffNotes && formik.errors.staffNotes
                }
              />
            </Stack>
          </>
        ) : null}

        <Stack direction={"column"} spacing={2}>
          <TextField
            name="additionalDetails"
            label="*Additional details, if any"
            size="small"
            value={formik.values.additionalDetails}
            onChange={formik.handleChange}
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            error={
              formik.touched.additionalDetails &&
              Boolean(formik.errors.additionalDetails)
            }
            helperText={
              formik.touched.additionalDetails &&
              formik.errors.additionalDetails
            }
          />
          <TextField
            name="staffNotes"
            label="Staff Notes, if any"
            size="small"
            value={formik.values.staffNotes}
            onChange={formik.handleChange}
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
