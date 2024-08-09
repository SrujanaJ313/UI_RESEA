import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  FormHelperText,
  InputLabel,
  FormControl,
  Typography,
  Button,
  Stack,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { STATES } from "../../../helpers/Constants";
import { returnedToWorkSaveURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { CookieNames, getCookieItem } from "../../../utils/cookies";

const schema = yup.object().shape({
  empName: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]*$/,
      "Job title should not contain special characters."
    )
    .required("Company is required. Please enter your company's name."),
  empWorkLocState: yup
    .string()
    .required("State is required. Please select a state."),
  empWorkLocCity: yup
    .string()
    .required("City is required. Please enter the city."),
  exactJobTitle: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]*$/,
      "Job title should not contain special characters."
    )
    .required("Job title is required. Please enter your job title."),
  employmentStartDt: yup
    .date()
    .required("Start date is required. Please select a valid date.")
    .typeError("Start date is required. Please select a valid date."),
  hourlyPayRate: yup
    .number()
    .required("Hourly pay rate is required. Please enter the hourly pay rate.")
    .max(999.99, "Hourly pay rate must be less than or equal to 999.99.")
    .typeError("Hourly pay rate must be a valid number.")
    .test(
      "is-decimal",
      "Hourly pay rate must have at most two decimal places.",
      (value) => /^\d+(\.\d{1,2})?$/.test(value)
    ),
  partFullTimeInd: yup
    .string()
    .required("Work schedule is required. Please select a work schedule."),
  workMode: yup
    .string()
    .required("Work mode is required. Please select a work mode."),
  jms890Ind: yup.string(),
  jmsReferralInd: yup.string(),
  checkboxes: yup.string().when(["jms890Ind", "jmsReferralInd"], {
    is: (jms890Ind, jmsReferralInd) =>
      jms890Ind !== "Y" && jmsReferralInd !== "Y",
    then: () => yup.string().required("please select one of above checkboxes"),
    otherwise: () => yup.string(),
  }),
  jmsCloseGoalsInd: yup
    .string()
    .oneOf(["Y"], "please select the checkbox")
    .required(),
  jmsCaseNotesInd: yup
    .string()
    .oneOf(["Y"], "please select the checkbox")
    .required(),
  jmsCloseIEPInd: yup
    .string()
    .oneOf(["Y"], "please select the checkbox")
    .required(),
  jmsResumeOffInd: yup
    .string()
    .oneOf(["Y"], "please select the checkbox")
    .required(),
  epChecklistUploadInd: yup
    .string()
    .oneOf(["Y"], "please select the checkbox")
    .required(),
});

function ReturnedToWork({ onCancel, event }) {
  const states = STATES;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function convertISOToMMDDYYYY(isoString) {
    const date = new Date(isoString);
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  }

  const onSubmit = async (data) => {
    const employmentStartDt = convertISOToMMDDYYYY(data.employmentStartDt);
    const userId = getCookieItem(CookieNames.USER_ID);
    const payload = {
      ...data,
      employmentStartDt,
      rsicId: event.rsicId,
      userId,
    };
    console.log("payload", { payload });
    try {
      await client.post(returnedToWorkSaveURL, payload);
    } catch (err) {
      console.log("error occured while saving", err);
    }
    onCancel();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={2}>
            <Controller
              name="empName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Company"
                  size="small"
                  variant="outlined"
                  sx={{ width: "49%" }}
                  error={!!errors.empName}
                  helperText={errors.empName?.message}
                />
              )}
            />
            <Controller
              name="employmentStartDt"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="*Start Date"
                  className="return-to-work-start-date"
                  // disablePast
                  sx={{ width: "160px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      error={!!errors.employmentStartDt}
                      helperText={errors.employmentStartDt?.message}
                    />
                  )}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Controller
              name="empWorkLocCity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*City"
                  size="small"
                  variant="outlined"
                  error={!!errors.empWorkLocCity}
                  helperText={errors.empWorkLocCity?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="empWorkLocState"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  size="small"
                  fullWidth
                  error={!!errors.empWorkLocState}
                >
                  <InputLabel id="state-dropdown">*State</InputLabel>
                  <Select
                    {...field}
                    label="*State"
                    variant="outlined"
                    labelId="state-dropdown"
                    sx={{ width: "160px" }}
                  >
                    {states.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.id}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.empWorkLocState && (
                    <FormHelperText>
                      {errors.empWorkLocState.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Controller
              name="exactJobTitle"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Job Title"
                  size="small"
                  variant="outlined"
                  sx={{ width: "49%" }}
                  error={!!errors.exactJobTitle}
                  helperText={errors.exactJobTitle?.message}
                />
              )}
            />
            <Controller
              name="hourlyPayRate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Hourly Pay Rate"
                  size="small"
                  variant="outlined"
                  type="number"
                  inputProps={{
                    inputMode: "decimal",
                    step: "0.01",
                    max: 999.99,
                    pattern: "\\d+\\.?\\d{0,2}",
                  }}
                  sx={{ width: "160px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!errors.hourlyPayRate}
                  helperText={errors.hourlyPayRate?.message}
                />
              )}
            />
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={1} flex={1} direction={"row"} alignItems={"center"}>
              <Typography className="label-text" sx={{width:"14%"}}>Work Schedule:</Typography>
              <Controller
                name="partFullTimeInd"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="work-schedule-group-label"
                  >
                    <FormControlLabel
                      value="F"
                      control={<Radio size="small" sx={{ py: 0 }} />}
                      label="Full time"
                    />
                    <FormControlLabel
                      value="P"
                      control={<Radio size="small" sx={{ py: 0 }} />}
                      label="Part time"
                    />
                  </RadioGroup>
                )}
              />
              {errors.partFullTimeInd && (
                <Typography color="error" variant="body2" align="left">
                  {errors.partFullTimeInd.message}
                </Typography>
              )}
            </Stack>
            <Stack spacing={1} flex={1} direction={"row"} alignItems={"center"}>
              <Typography className="label-text" sx={{width:"14%"}}>Work Mode:</Typography>
              <Controller
                name="workMode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="work-mode-group-label"
                  >
                    <FormControlLabel
                      value="9329"
                      control={<Radio size="small" sx={{ py: 0 }} />}
                      label="Onsite"
                    />
                    <FormControlLabel
                      value="9328"
                      control={<Radio size="small" sx={{ py: 0 }} />}
                      label="Remote"
                    />
                    <FormControlLabel
                      value="9330"
                      control={<Radio size="small" sx={{ py: 0 }} />}
                      label="Hybrid"
                    />
                  </RadioGroup>
                )}
              />
              {errors.workMode && (
                <Typography color="error" variant="body2" align="left">
                  {errors.workMode.message}
                </Typography>
              )}
            </Stack>

            <Stack spacing={3.5} flex={1} direction={"row"} alignItems={"center"}>
              <Typography className="label-text" sx={{width:"14%"}}>
                Staff Notes, if any:
              </Typography>

              <Controller
                name="staffNotes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => field.onChange(e.target.value)}
                    multiline
                    rows={2}
                  />
                )}
              />
              {errors.workMode && (
                <Typography color="error" variant="body2" align="left">
                  {errors.staffNotes.message}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Typography className="label-text" color={"primary"}>
            Please check off each of the items listed below that you have
            completed in JMS
          </Typography>
          <FormGroup>
            <Stack direction="row" spacing={3}>
              <Stack>
                <FormControlLabel
                  control={
                    <Controller
                      name="jms890Ind"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="A non-direct placement recorded in JMS"
                />
                {errors.checkboxes && (
                  <Typography color="error" variant="body2" align="top">
                    {errors.checkboxes.message}
                  </Typography>
                )}
                <FormControlLabel
                  control={
                    <Controller
                      name="jmsCloseGoalsInd"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="Goals have been closed in JMS"
                />
                {errors.jmsCloseGoalsInd && (
                  <Typography color="error" variant="body2" align="top">
                    {errors.jmsCloseGoalsInd.message}
                  </Typography>
                )}
                <FormControlLabel
                  control={
                    <Controller
                      name="jmsCaseNotesInd"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="Case notes recorded in JMS"
                />
                {errors.jmsCaseNotesInd && (
                  <Typography color="error" variant="body2" align="top">
                    {errors.jmsCaseNotesInd.message}
                  </Typography>
                )}
                <FormControlLabel
                  control={
                    <Controller
                      name="epChecklistUploadInd"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="Copy of EP and Checklist uploaded into JMS"
                />
                {errors.epChecklistUploadInd && (
                  <Typography color="error" variant="body2" align="top">
                    {errors.epChecklistUploadInd.message}
                  </Typography>
                )}
              </Stack>
              <Stack>
                <FormControlLabel
                  control={
                    <Controller
                      name="jmsReferralInd"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="JMS referral was recorded in JMS"
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="jmsCloseIEPInd"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="IEP has been closed in JMS"
                />
                {errors.jmsCloseIEPInd && (
                  <Typography color="error" variant="body2" align="top">
                    {errors.jmsCloseIEPInd.message}
                  </Typography>
                )}

                <FormControlLabel
                  control={
                    <Controller
                      name="jmsResumeOffInd"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="Claimant’s resume has been taken offline in JMS"
                />
                {errors.jmsResumeOffInd && (
                  <Typography color="error" variant="body2" align="top">
                    {errors.jmsResumeOffInd.message}
                  </Typography>
                )}
              </Stack>
              {/* <Stack alignSelf="center">
                <FormControlLabel
                  control={
                    <Controller
                      name="epChecklistUploadInd"
                      control={control}
                      defaultValue="N"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value === "Y"}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? "Y" : "N")
                          }
                          sx={{ py: 0 }}
                        />
                      )}
                    />
                  }
                  label="Copy of EP and Checklist uploaded into JMS"
                />
                {errors.epChecklistUploadInd && (
                  <Typography color="error" variant="body2" align="top">
                    {errors.epChecklistUploadInd.message}
                  </Typography>
                )}
              </Stack> */}
            </Stack>
          </FormGroup>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}

export default ReturnedToWork;
