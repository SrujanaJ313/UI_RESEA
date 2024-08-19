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
  RadioGroup,
  Radio,
} from "@mui/material";
import {
  reschedulingReasonsListURL,
  reschedulingToURL,
  rescheduleSaveURL,
} from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import IssueSubIssueType from "../../../components/issueSubIssueType";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { STATES } from "../../../helpers/Constants";
import InputAdornment from "@mui/material/InputAdornment";
import { CookieNames, getCookieItem } from "../../../utils/cookies";
import { rescheduleValidationSchema } from "../../../helpers/Validation";

function RescheduleRequest({ onCancel, event }) {
  const [reasons, setReasons] = useState([{}]);
  const [rescheduleReasons, setRescheduleReasons] = useState([{}]);
  const [errors, setErrors] = useState([]);
  const states = STATES;
  let rescheduleReason = "";
  // const validationSchema = Yup.object({
  //   rescheduleTo: Yup.string().required("Reschedule to is required"),
  //   mode: Yup.object({
  //     selectedPrefMtgModeInPerson: Yup.boolean(),
  //     selectedPrefMtgModeVirtual: Yup.boolean(),
  //   }).test(
  //     "at-least-one",
  //     "At least one mode must be selected",
  //     (value) =>
  //       value.selectedPrefMtgModeInPerson || value.selectedPrefMtgModeVirtual
  //   ),
  //   reasonForRescheduling: Yup.string().required(
  //     "Reason for rescheduling is required"
  //   ),
  //   tempSuspendedInd: Yup.string()
  //     .oneOf(["Y"], "You must check Placeholder Meeting")
  //     .required("You must check Placeholder Meeting"),
  //   lateSchedulingReason: Yup.string().when("rescheduleTo", {
  //     is: (rescheduleTo) => {
  //       rescheduleReason = rescheduleReasons.find(
  //         (r) => r.newRsicId === Number(rescheduleTo)
  //       );
  //       return (
  //         rescheduleTo !== "" && rescheduleReason?.nonComplianceInd === "Y"
  //       );
  //     },
  //     then: () => Yup.string().required("Reason for scheduling is required"),
  //   }),
  //   staffNotes: Yup.string(),
  //   appointmentDate: Yup.date().when("reasonForRescheduling", {
  //     is: (reasonForRescheduling) =>
  //       ["3159", "3160", "3163"].includes(reasonForRescheduling),
  //     then: () => Yup.date().required("Appointment Date is required"),
  //   }),
  //   appointmentTime: Yup.string().when("reasonForRescheduling", {
  //     is: (reasonForRescheduling) =>
  //       ["3159", "3160", "3163"].includes(reasonForRescheduling),
  //     then: () => Yup.string().required("Appointment Time is required"),
  //   }),
  //   entityCity: Yup.string().when("reasonForRescheduling", {
  //     is: (reasonForRescheduling) =>
  //       ["3159", "3160"].includes(reasonForRescheduling),
  //     then: () => Yup.string().required("City is required"),
  //   }),
  //   entityState: Yup.string().when("reasonForRescheduling", {
  //     is: (reasonForRescheduling) =>
  //       ["3159", "3160"].includes(reasonForRescheduling),
  //     then: () => Yup.string().required("State is required"),
  //   }),
  //   entityName: Yup.string().when("reasonForRescheduling", {
  //     is: (reasonForRescheduling) => reasonForRescheduling === "3163",
  //     then: () => Yup.string().required("Employer Name is required"),
  //   }),
  //   entityTeleNumber: Yup.string()
  //     .matches(/^\d{10}$/, "Telephone number must be exactly 10 digits")
  //     .when("reasonForRescheduling", {
  //       is: (reasonForRescheduling) => reasonForRescheduling === "3163",
  //       then: () => Yup.string().required("Contact Number is required"),
  //     }),
  //   jobTitle: Yup.string().when("reasonForRescheduling", {
  //     is: (reasonForRescheduling) => reasonForRescheduling === "3163",
  //     then: () =>
  //       Yup.string()
  //         .required("Job Title is required")
  //         .matches(
  //           /^[a-zA-Z0-9\s]*$/,
  //           "Job Title cannot contain special characters"
  //         ),
  //   }),
  //   issues: Yup.array().of(
  //     Yup.object().shape({
  //       issueType: Yup.object().required("Issue Type is required"),
  //       subIssueType: Yup.object().required("Sub Issue Type is required"),
  //       issueStartDate: Yup.date().required("Start Date is required"),
  //       issueEndDate: Yup.date().required("End Date is required"),
  //     })
  //   ),
  //   partFullTimeInd: Yup.string().required(
  //     "Work schedule is required. Please select a work schedule."
  //   ),
  // });

  const convertTimeToHoursMinutes = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return time;
  };

  const convertISOToMMDDYYYY = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  };

  const formik = useFormik({
    initialValues: {
      rescheduleTo: "",
      mode: {
        selectedPrefMtgModeInPerson: false,
        selectedPrefMtgModeVirtual: false,
      },
      reasonForRescheduling: "",
      lateSchedulingReason: "",
      staffNotes: "",
      appointmentDate: null,
      appointmentTime: null,
      entityCity: null,
      entityState: null,
      entityName: "",
      entityTeleNumber: "",
      tempSuspendedInd: "",
      partFullTimeInd: "",
      jobTitle: "",
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
    validationSchema: () =>
      rescheduleValidationSchema(rescheduleReasons, rescheduleReason),
    onSubmit: async (values) => {
      const userId = getCookieItem(CookieNames.USER_ID);
      const selectedPrefMtgModeInPerson =
        values?.mode?.selectedPrefMtgModeInPerson;
      const selectedPrefMtgModeVirtual =
        values?.mode?.selectedPrefMtgModeVirtual;
      const appointmentTime = convertTimeToHoursMinutes(
        values?.appointmentTime
      );
      const appointmentDate = convertISOToMMDDYYYY(values?.appointmentDate);
      const nmiParentAndChildList = values.issues.map((issue) => ({
        parentNmiId: issue.issueType.nmiId,
        childNmiId: issue.subIssueType.nmiId,
        issueStartDt: convertISOToMMDDYYYY(issue.issueStartDate),
        issueEndDt: convertISOToMMDDYYYY(issue.issueEndDate),
      }));
      try {
        const payload = {
          userId: userId,
          oldRsicId: event.id,
          newRsicId: rescheduleReason.newRsicId,
          selectedPrefMtgModeInPerson: selectedPrefMtgModeInPerson ? "I" : "",
          selectedPrefMtgModeVirtual: selectedPrefMtgModeVirtual ? "V" : "",
          reasonForRescheduling: values.reasonForRescheduling,
          staffNotes: values.staffNotes,
          lateSchedulingReason: values.lateSchedulingReason,
          nmiParentAndChildList,
          entityCity: [3159, 3160].includes(values.reasonForRescheduling)
            ? values.entityCity
            : "",
          entityState: [3159, 3160].includes(values.reasonForRescheduling)
            ? values.entityState
            : "",
          entityName: [3163].includes(values.reasonForRescheduling)
            ? values.entityName
            : "",
          entityTeleNumber: [3163].includes(values.reasonForRescheduling)
            ? values.entityTeleNumber
            : "",
          jobTitle: [3163].includes(values.reasonForRescheduling)
            ? values.jobTitle
            : "",
          partFullTimeInd: values.partFullTimeInd,
          appointmentTime,
          appointmentDate,
        };
        console.log("Form Values", payload);
        await client.post(rescheduleSaveURL, payload);
        // onCancel();
      } catch (err) {
        setErrors(err);
      }
    },
  });

  useEffect(() => {
    async function fetchRescheduleReasonsListData() {
      try {
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(reschedulingReasonsListURL)
            : await client.get(`${reschedulingReasonsListURL}/526`);
        setReasons(data?.map((d) => ({ id: d.alvId, name: d.alvShortDecTxt })));
      } catch (err) {
        console.error("Error in fetchRescheduleReasonsListData", err);
      }
    }
    fetchRescheduleReasonsListData();
  }, []);

  useEffect(() => {
    async function fetchRescheduleToListData() {
      try {
        const payload = {
          oldRsicId: event.id,
          meetingModeInperson: formik.values.mode.selectedPrefMtgModeInPerson
            ? "I"
            : "",
          meetingModeVirtual: formik.values.mode.selectedPrefMtgModeVirtual
            ? "V"
            : "",
        };
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(reschedulingToURL)
            : await client.post(reschedulingToURL, payload);
        setRescheduleReasons(data);
      } catch (err) {
        console.error("Error in fetchRescheduleToListData", err);
      }
    }
    fetchRescheduleToListData();
  }, [
    event.id,
    formik.values.mode.selectedPrefMtgModeInPerson,
    formik.values.mode.selectedPrefMtgModeVirtual,
  ]);

  console.log("errors->", formik.errors);
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

  rescheduleReason = rescheduleReasons?.find(
    (r) => r.newRsicId === formik.values.rescheduleTo
  );
  // console.log("formik values-->", formik.values);
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
                      value={formik.values.selectedPrefMtgModeInPerson}
                      checked={formik.values.selectedPrefMtgModeInPerson}
                      onChange={handleCheckboxChange}
                      onBlur={formik.handleBlur}
                      name="selectedPrefMtgModeInPerson"
                    />
                  }
                  label="In person"
                />
                {event?.type !== "initial appointment" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={formik.values.mode.selectedPrefMtgModeVirtual}
                        checked={formik.values.selectedPrefMtgModeVirtual}
                        onChange={handleCheckboxChange}
                        onBlur={formik.handleBlur}
                        name="selectedPrefMtgModeVirtual"
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
            {formik.errors.mode && (
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
                {rescheduleReasons?.map((reason) => {
                  return (
                    <MenuItem
                      key={reason.newRsicId}
                      value={reason.newRsicId}
                      style={{
                        color: reason.nonComplianceInd === "Y" ? "red" : "",
                      }}
                    >
                      {`${reason?.rsicCalEventDate}, ${reason?.rsicCalEventStartTime}, ${reason?.rsicCalEventStartTime}`}
                    </MenuItem>
                  );
                })}
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
                sx={{ width: "45%" }}
              >
                {reasons.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.reasonForRescheduling && (
                <FormHelperText error>
                  {formik.errors.reasonForRescheduling}
                </FormHelperText>
              )}
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
                    disablePast
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
                    disablePast
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

            <Stack direction="row" spacing={2}>
              <FormControl style={{ width: "12rem", marginLeft: 10 }}>
                <TextField
                  label="*Job Title"
                  size="small"
                  variant="outlined"
                  name="jobTitle"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.jobTitle && (
                  <FormHelperText error>
                    {formik.errors.jobTitle}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </>
        ) : null}

        {rescheduleReason?.nonComplianceInd === "Y" && (
          <Stack direction={"column"} spacing={2}>
            <TextField
              name="lateSchedulingReason"
              label="*Reason for Scheduling beyond 21 days"
              size="small"
              value={formik.values.lateSchedulingReason}
              onChange={formik.handleChange}
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              error={
                formik.touched.lateSchedulingReason &&
                Boolean(formik.errors.lateSchedulingReason)
              }
              helperText={
                formik.touched.lateSchedulingReason &&
                formik.errors.lateSchedulingReason
              }
            />
          </Stack>
        )}
        <Stack direction={"column"} spacing={2}>
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

          <FormControl
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                width: "15%",
                alignSelf: "center",
              }}
            >
              *Work Schedule:
            </Typography>
            <RadioGroup
              row
              name="partFullTimeInd"
              value={formik.values.partFullTimeInd}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="F"
                control={<Radio />}
                label="Full time"
              />
              <FormControlLabel
                value="P"
                control={<Radio />}
                label="Part time"
              />
            </RadioGroup>
            {formik.errors.partFullTimeInd && (
              <FormHelperText error sx={{ alignSelf: "center" }}>
                {formik.errors.partFullTimeInd}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Typography className="label-text" marginTop={"8px !important"}>
          Create issues, if any, based on the information associated with this
          request:
        </Typography>
        <Stack spacing={2}>
          <IssueSubIssueType formik={formik} />
        </Stack>

        {errors?.errorDetails?.length && (
          <Stack mt={1} direction="column" useFlexGap flexWrap="wrap">
            {errors.errorDetails.map((error) => (
              <div>
                <span className="errorMsg">*{error?.errorCode[0]}</span>
              </div>
            ))}
          </Stack>
        )}

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
