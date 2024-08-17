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
  Checkbox,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import {
  reschedulingReasonsListURL,
  reschedulingToURL,
} from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import IssueSubIssueType from "../../../components/issueSubIssueType";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { STATES } from "../../../helpers/Constants";
import InputAdornment from "@mui/material/InputAdornment";

function RescheduleRequest({ onCancel, event }) {
  const states = STATES;
  const validationSchema = Yup.object({
    rescheduleTo: Yup.string().required("Reschedule to is required"),
    mode: Yup.object({
      inPerson: Yup.boolean(),
      virtual: Yup.boolean(),
    }).test(
      "at-least-one",
      "At least one mode must be selected",
      (value) => value.inPerson || value.virtual
    ),
    reasonForRescheduling: Yup.string().required(
      "Reason for rescheduling is required"
    ),
    tempSuspendedInd: Yup.string()
    .oneOf(["Y"], "You must check Placeholder Meeting")
    .required("This field is required"),
    additionalDetails: Yup.string().required("Additional details are required"),
    staffNotes: Yup.string(),
    appointmentDate: Yup.date().when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160", "3163"].includes(reasonForRescheduling),
      then: () => Yup.date().required("Appointment Date is required"),
    }),
    appointmentTime: Yup.string().when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160", "3163"].includes(reasonForRescheduling),
      then: () => Yup.string().required("Appointment Time is required"),
      otherwise: (schema) => schema,
    }),
    entityCity: Yup.string().when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160"].includes(reasonForRescheduling),
      then: () => Yup.string().required("City is required"),
      otherwise: (schema) => schema,
    }),
    entityState: Yup.string().when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160"].includes(reasonForRescheduling),
      then: () => Yup.string().required("State is required"),
      otherwise: (schema) => schema,
    }),
    entityName: Yup.string().when("reasonForRescheduling", {
      is: (reasonForRescheduling) => reasonForRescheduling === "3163",
      then: () => Yup.string().required("Employer Name is required"),
      otherwise: (schema) => schema,
    }),
    entityTeleNumber: Yup.string()
      .matches(/^\d{10}$/, "Telephone number must be exactly 10 digits")
      .when("reasonForRescheduling", {
        is: (reasonForRescheduling) => reasonForRescheduling === "3163",
        then: () => Yup.string().required("Contact Number is required"),
        otherwise: (schema) => schema,
      }),
  });

  const formik = useFormik({
    initialValues: {
      rescheduleTo: "",
      mode: {
        inPerson: false,
        virtual: false,
      },
      reasonForRescheduling: "",
      additionalDetails: "",
      staffNotes: "",
      appointmentDate: null,
      appointmentTime: null,
      entityCity: "",
      entityState: "",
      entityName: "",
      entityTeleNumber: "",
      tempSuspendedInd: "",
      issues: [
        {
          id: uuidv4(),
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
  console.log("formik", formik.errors);
  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    if (name === "tempSuspendedInd") {
      formik.setFieldValue("tempSuspendedInd", checked === true ? "Y" : "N");
    } else {
      let selectedModes = { ...formik.values.mode };
      selectedModes[name] = checked;
      formik.setFieldValue("mode", selectedModes);
    }
  };

  const [reasons, setReasons] = useState([{}]);
  const [rescheduleReasons, setRescheduleReasons] = useState([{}]);

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

  useEffect(() => {
    async function fetchRescheduleToListData() {
      const payload = {
        oldRsicId: event.id,
        meetingModeInperson: formik.values.inPerson ? "I" : "",
        meetingModeVirtual: formik.values.virtual ? "V" : "",
      };
      const data =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(reschedulingToURL)
          : await client.post(reschedulingToURL, payload);
      setRescheduleReasons(data);
    }
    fetchRescheduleToListData();
  }, [formik.values.inPerson, formik.values.virtual]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"column"} justifyContent={"space-between"}>
            <FormControl
              sx={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <Typography
                sx={{
                  width: "20%",
                  alignSelf: "center",
                }}
              >
                *Preferred Meeting Modes:
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formik.values.inPerson}
                      checked={formik.values.inPerson}
                      onChange={handleCheckboxChange}
                      onBlur={formik.handleBlur}
                      name="inPerson"
                    />
                  }
                  label="In person"
                />
                {event.type !== "initial appointment" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={formik.values.mode.virtual}
                        checked={formik.values.virtual}
                        onChange={handleCheckboxChange}
                        onBlur={formik.handleBlur}
                        name="virtual"
                      />
                    }
                    label="Virtual"
                  />
                )}
              </FormGroup>
              <Typography
                sx={{
                  width: "20%",
                  alignSelf: "center",
                }}
              >
                (choose all that apply)
              </Typography>
            </FormControl>
            {formik.errors.rescheduleTo && (
              <FormHelperText error>{formik.errors.mode}</FormHelperText>
            )}
            <FormControl size="small" fullWidth>
              <InputLabel id="reschedule-request-dropdown">
                *Reschedule to
              </InputLabel>
              <Select
                label="*Reschedule to"
                value={formik.values.rescheduleTo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="rescheduleTo"
                sx={{ width: "50%" }}
              >
                {rescheduleReasons?.map((reason) => (
                  <MenuItem
                    key={reason.newRsicId}
                    value={reason.newRsicId}
                    className={
                      reason.nonComplianceInd === "Y" ? "errorMsg" : ""
                    }
                  >
                    {`${reason?.rsicCalEventDate}, ${reason?.rsicCalEventStartTime}, ${reason?.rsicCalEventStartTime}`}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.rescheduleTo && (
                <FormHelperText error>
                  {formik.errors.rescheduleTo}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Stack direction={"row"}>
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
                sx={{ width: "45%" }}
              >
                {reasons.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "55%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={formik.values.tempSuspendedInd}
                    checked={formik.values.tempSuspendedInd === "Y"}
                    onChange={handleCheckboxChange}
                    onBlur={formik.handleBlur}
                    name="tempSuspendedInd"
                  />
                }
                label="Placeholder Meeting -do not generate Notice"
              />
            {formik.errors.tempSuspendedInd && (
              <FormHelperText error>
                {formik.errors.tempSuspendedInd}
              </FormHelperText>
            )}
            </FormControl>
          </Stack>
        </Stack>

        {[3159, 3160].includes(formik.values.reasonForRescheduling) ? (
          <>
            <Typography className="label-text" marginTop={"8px !important"}>
              Please provide below details:
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                  <DatePicker
                    label="Date*"
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={formik.values.appointmentDate}
                    onChange={(value) =>
                      formik.setFieldValue("appointmentDate", value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        name="appointmentDate"
                      />
                    )}
                  />
                  {formik.errors.appointmentDate && (
                    <FormHelperText error>
                      {formik.errors.appointmentDate}
                    </FormHelperText>
                  )}
                </FormControl>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                  <TimePicker
                    label="Time*"
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={
                      formik.values.staffNotes
                        ? dayjs(formik.values.staffNotes)
                        : null
                    }
                    onChange={(value) =>
                      formik.setFieldValue(
                        "appointmentTime",
                        value ? value.toISOString() : ""
                      )
                    }
                    onBlur={formik.handleBlur}
                    name="appointmentTime"
                    inputFormat="HH:mm"
                    minutesStep={15}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  {formik.errors.appointmentTime && (
                    <FormHelperText error>
                      {formik.errors.appointmentTime}
                    </FormHelperText>
                  )}
                </FormControl>
              </LocalizationProvider>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                <TextField
                  label="*City"
                  size="small"
                  variant="outlined"
                  name="entityCity"
                  value={formik.values.entityCity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>
                  {formik.errors.entityCity}
                </FormHelperText>
              </FormControl>

              <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                <InputLabel id="state-dropdown">*State</InputLabel>
                <Select
                  label="*State"
                  variant="outlined"
                  labelId="state-dropdown"
                  name="entityState"
                  value={formik.values.entityState}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="small"
                  // error={
                  //   formik.touched.entityState &&
                  //   Boolean(formik.errors.entityState)
                  // }
                  // helperText={
                  //   formik.touched.entityState && formik.errors.entityState
                  // }
                >
                  {states.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.id}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {formik.errors.entityState}
                </FormHelperText>
              </FormControl>
            </Stack>
          </>
        ) : null}

        {[3163].includes(formik.values.reasonForRescheduling) ? (
          <>
            <Typography className="label-text" marginTop={"8px !important"}>
              Please provide below details:
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                  <DatePicker
                    label="Date*"
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={formik.values.appointmentDate}
                    onChange={formik.handleChange}
                    renderInput={(params) => (
                      <TextField {...params} size="small" variant="outlined" />
                    )}
                    name="appointmentDate"
                  />
                  {formik.errors.appointmentDate && (
                    <FormHelperText error>
                      {formik.errors.appointmentDate}
                    </FormHelperText>
                  )}
                </FormControl>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                  <TimePicker
                    label="Time*"
                    slotProps={{
                      textField: { size: "small" },
                    }}
                    value={
                      formik.values.staffNotes
                        ? dayjs(formik.values.staffNotes)
                        : null
                    }
                    onChange={(value) =>
                      formik.setFieldValue(
                        "appointmentTime",
                        value ? value.toISOString() : ""
                      )
                    }
                    onBlur={formik.handleBlur}
                    name="appointmentTime"
                    inputFormat="HH:mm"
                    minutesStep={15}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  {formik.errors.appointmentTime && (
                    <FormHelperText error>
                      {formik.errors.appointmentTime}
                    </FormHelperText>
                  )}
                </FormControl>
              </LocalizationProvider>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                <TextField
                  label="*Employer Name"
                  size="small"
                  variant="outlined"
                  name="entityName"
                  value={formik.values.entityName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.entityName && (
                  <FormHelperText error>
                    {formik.errors.entityName}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                <TextField
                  label="*Contact Number#"
                  size="small"
                  variant="outlined"
                  name="entityTeleNumber"
                  value={formik.values.entityTeleNumber}
                  onChange={(event) => {
                    const { value } = event.target;
                    if (/^\d{0,10}$/.test(value)) {
                      formik.setFieldValue("entityTeleNumber", value);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  // error={
                  //   formik.touched.entityTeleNumber &&
                  //   Boolean(formik.errors.entityTeleNumber)
                  // }
                  // helperText={
                  //   formik.touched.entityTeleNumber &&
                  //   formik.errors.entityTeleNumber
                  // }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+1</InputAdornment>
                    ),
                  }}
                />
                {formik.errors.entityTeleNumber && (
                  <FormHelperText error>
                    {formik.errors.entityTeleNumber}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </>
        ) : null}

        <Stack direction={"column"} spacing={2}>
          <TextField
            name="additionalDetails"
            label="*Reason for Scheduling beyond 21 days"
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
