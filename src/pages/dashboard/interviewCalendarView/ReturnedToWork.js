import React, { useState } from "react";
import { useFormik } from "formik";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { STATES } from "../../../helpers/Constants";
import { returnedToWorkSaveURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { CookieNames, getCookieItem } from "../../../utils/cookies";

function isDateValid(dateStr) {
  const inputDate = new Date(dateStr);
  const currentDate = new Date();
  return inputDate <= currentDate;
}

function convertISOToMMDDYYYY(isoString) {
  const date = new Date(isoString);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

function ReturnedToWork({ onCancel, event }) {
  const [errors, setErrors] = useState([]);
  const states = STATES;

  const formik = useFormik({
    initialValues: {
      empName: "",
      empWorkLocState: "",
      empWorkLocCity: "",
      exactJobTitle: "",
      employmentStartDt: "",
      hourlyPayRate: "",
      partFullTimeInd: "",
      workMode: "",
      jms890Ind: "N",
      jmsCaseNotesInd: "N",
      jmsCloseGoalsInd: "N",
      jmsCloseIEPInd: "N",
      jmsReferralInd: "N",
      jmsResumeOffInd: "N",
      epChecklistUploadInd: "N",
      staffNotes: "",
    },
    // validate: (values) => {
    //   const errors = {};

    //   if (!values.empName) {
    //     errors.empName =
    //       "Company is required. Please enter your company's name.";
    //   } else if (!/^[a-zA-Z0-9 ]*$/.test(values.empName)) {
    //     errors.empName = "Job title should not contain special characters.";
    //   }

    //   if (!values.empWorkLocState) {
    //     errors.empWorkLocState = "State is required. Please select a state.";
    //   }

    //   if (!values.empWorkLocCity) {
    //     errors.empWorkLocCity = "City is required. Please enter the city.";
    //   }

    //   if (!values.exactJobTitle) {
    //     errors.exactJobTitle =
    //       "Job title is required. Please enter your job title.";
    //   } else if (!/^[a-zA-Z0-9 ]*$/.test(values.exactJobTitle)) {
    //     errors.exactJobTitle =
    //       "Job title should not contain special characters.";
    //   }

    //   if (!values.employmentStartDt) {
    //     errors.employmentStartDt =
    //       "Start date is required. Please select a valid date.";
    //   } else if (isNaN(new Date(values.employmentStartDt).getTime())) {
    //     errors.employmentStartDt =
    //       "Start date is required. Please select a valid date.";
    //   }

    //   if (!values.hourlyPayRate) {
    //     errors.hourlyPayRate =
    //       "Hourly pay rate is required. Please enter the hourly pay rate.";
    //   } else if (!/^\d+(\.\d{1,2})?$/.test(values.hourlyPayRate)) {
    //     errors.hourlyPayRate =
    //       "Hourly pay rate must have at most two decimal places.";
    //   } else if (Number(values.hourlyPayRate) > 999.99) {
    //     errors.hourlyPayRate =
    //       "Hourly pay rate must be less than or equal to 999.99.";
    //   }

    //   if (!values.partFullTimeInd) {
    //     errors.partFullTimeInd =
    //       "Work schedule is required. Please select a work schedule.";
    //   }

    //   if (!values.workMode) {
    //     errors.workMode = "Work mode is required. Please select a work mode.";
    //   }

    //   if (isDateValid(values.employmentStartDt)) {
    //     const jmsCheckboxes = [
    //       // "jms890Ind",
    //       "jmsCaseNotesInd",
    //       "jmsCloseGoalsInd",
    //       "jmsCloseIEPInd",
    //       // "jmsReferralInd",
    //       "jmsResumeOffInd",
    //       "epChecklistUploadInd",
    //     ];

    //     jmsCheckboxes.forEach((field) => {
    //       if (values[field] === "N") {
    //         errors[field] = "Please select the checkbox.";
    //       }
    //     });

    //     if (values.jms890Ind === "N" && values.jmsReferralInd === "N") {
    //       errors.jms890Ind = errors.jmsReferralInd =
    //         "One of jms890Ind or jmsReferralInd must be checked";
    //     }
    //   }

    //   return errors;
    // },
    onSubmit: async (values) => {
      let payload = {};
      const isFutureDate = isDateValid(values.employmentStartDt);
      const defaultCheckboxValues = {
        jms890Ind: "N",
        jmsCaseNotesInd: "N",
        jmsCloseGoalsInd: "N",
        jmsCloseIEPInd: "N",
        jmsReferralInd: "N",
        jmsResumeOffInd: "N",
      };
      const employmentStartDt = convertISOToMMDDYYYY(values.employmentStartDt);
      const userId = getCookieItem(CookieNames.USER_ID);

      if (!isFutureDate) {
        payload = {
          ...values,
          employmentStartDt,
          rsicId: event.id,
          ...defaultCheckboxValues,
          userId: Number(userId),
          workMode: Number(values.workMode),
        };
      } else {
        payload = {
          ...values,
          employmentStartDt,
          rsicId: event.id,
          userId: Number(userId),
          workMode: Number(values.workMode),
        };
      }

      console.log("payload", { payload });
      try {
        await client.post(returnedToWorkSaveURL, payload);
        onCancel();
      } catch (err) {
        setErrors(err);
      }
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="*Company"
              size="small"
              variant="outlined"
              sx={{ width: "49%" }}
              name="empName"
              value={formik.values.empName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.empName && Boolean(formik.errors.empName)}
              helperText={formik.touched.empName && formik.errors.empName}
            />
            <DatePicker
              label="*Start Date"
              className="return-to-work-start-date"
              sx={{ width: "160px" }}
              value={formik.values.employmentStartDt}
              onChange={(date) =>
                formik.setFieldValue("employmentStartDt", date)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  variant="outlined"
                  error={
                    formik.touched.employmentStartDt &&
                    Boolean(formik.errors.employmentStartDt)
                  }
                  helperText={
                    formik.touched.employmentStartDt &&
                    formik.errors.employmentStartDt
                  }
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="*City"
              size="small"
              variant="outlined"
              name="empWorkLocCity"
              value={formik.values.empWorkLocCity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.empWorkLocCity &&
                Boolean(formik.errors.empWorkLocCity)
              }
              helperText={
                formik.touched.empWorkLocCity && formik.errors.empWorkLocCity
              }
              fullWidth
            />
            <FormControl
              size="small"
              fullWidth
              error={
                formik.touched.empWorkLocState &&
                Boolean(formik.errors.empWorkLocState)
              }
            >
              <InputLabel id="state-dropdown">*State</InputLabel>
              <Select
                label="*State"
                variant="outlined"
                labelId="state-dropdown"
                name="empWorkLocState"
                value={formik.values.empWorkLocState}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "160px" }}
              >
                {states.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.id}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.empWorkLocState &&
                formik.errors.empWorkLocState && (
                  <FormHelperText>
                    {formik.errors.empWorkLocState}
                  </FormHelperText>
                )}
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="*Job Title"
              size="small"
              variant="outlined"
              name="exactJobTitle"
              value={formik.values.exactJobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.exactJobTitle &&
                Boolean(formik.errors.exactJobTitle)
              }
              helperText={
                formik.touched.exactJobTitle && formik.errors.exactJobTitle
              }
              // fullWidth
              sx={{ width: "49%" }}
            />
            <TextField
              label="*Hourly Pay Rate"
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              name="hourlyPayRate"
              value={formik.values.hourlyPayRate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.hourlyPayRate &&
                Boolean(formik.errors.hourlyPayRate)
              }
              helperText={
                formik.touched.hourlyPayRate && formik.errors.hourlyPayRate
              }
            />
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <FormControl
              component="fieldset"
              error={
                formik.touched.partFullTimeInd &&
                Boolean(formik.errors.partFullTimeInd)
              }
              sx={{
                width: "49%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  width: "30%",
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
              {formik.touched.partFullTimeInd &&
                formik.errors.partFullTimeInd && (
                  <FormHelperText>
                    {formik.errors.partFullTimeInd}
                  </FormHelperText>
                )}
            </FormControl>

            <FormControl
              component="fieldset"
              error={formik.touched.workMode && Boolean(formik.errors.workMode)}
              sx={{
                width: "49%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  width: "30%",
                  alignSelf: "center",
                }}
              >
                *Work Mode:
              </Typography>
              <RadioGroup
                row
                name="workMode"
                value={formik.values.workMode}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Onsite"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Remote"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Hybrid"
                />
              </RadioGroup>
              {formik.touched.workMode && formik.errors.workMode && (
                <FormHelperText>{formik.errors.workMode}</FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={{ width: "15%" }}>Staff notes, if any:</Typography>
            <TextField
              label="Staff Notes"
              size="small"
              variant="outlined"
              name="staffNotes"
              value={formik.values.staffNotes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              multiline
              rows={4}
            />
          </Stack>
          {isDateValid(formik.values.employmentStartDt) && (
            <Stack
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Stack sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.jms890Ind === "Y"}
                        onChange={() =>
                          formik.setFieldValue(
                            "jms890Ind",
                            formik.values.jms890Ind === "N" ? "Y" : "N"
                          )
                        }
                      />
                    }
                    label="A non-direct placement recorded in JMS"
                  />
                  {formik.errors.jms890Ind && (
                    <FormHelperText error>
                      {formik.errors.jms890Ind}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.jmsReferralInd === "Y"}
                        onChange={() =>
                          formik.setFieldValue(
                            "jmsReferralInd",
                            formik.values.jmsReferralInd === "N" ? "Y" : "N"
                          )
                        }
                      />
                    }
                    label="JMS referral was recorded in JMS"
                  />
                  {formik.errors.jmsReferralInd && (
                    <FormHelperText error>
                      {formik.errors.jmsReferralInd}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Stack sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.jmsCloseGoalsInd === "Y"}
                        onChange={() =>
                          formik.setFieldValue(
                            "jmsCloseGoalsInd",
                            formik.values.jmsCloseGoalsInd === "N" ? "Y" : "N"
                          )
                        }
                      />
                    }
                    label="Goals have been closed in JMS"
                  />
                  {formik.errors.jmsCloseGoalsInd && (
                    <FormHelperText error>
                      {formik.errors.jmsCloseGoalsInd}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.jmsCloseIEPInd === "Y"}
                        onChange={() =>
                          formik.setFieldValue(
                            "jmsCloseIEPInd",
                            formik.values.jmsCloseIEPInd === "N" ? "Y" : "N"
                          )
                        }
                      />
                    }
                    label="IEP has been closed in JMS"
                  />
                  {formik.errors.jmsCloseIEPInd && (
                    <FormHelperText error>
                      {formik.errors.jmsCloseIEPInd}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Stack sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.jmsCaseNotesInd === "Y"}
                        onChange={() =>
                          formik.setFieldValue(
                            "jmsCaseNotesInd",
                            formik.values.jmsCaseNotesInd === "N" ? "Y" : "N"
                          )
                        }
                      />
                    }
                    label="Case notes recorded in JMS"
                  />
                  {formik.errors.jmsCaseNotesInd && (
                    <FormHelperText error>
                      {formik.errors.jmsCaseNotesInd}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.jmsResumeOffInd === "Y"}
                        onChange={() =>
                          formik.setFieldValue(
                            "jmsResumeOffInd",
                            formik.values.jmsResumeOffInd === "N" ? "Y" : "N"
                          )
                        }
                      />
                    }
                    label="Claimant's resume has been taken offline in JMS"
                  />
                  {formik.errors.jmsResumeOffInd && (
                    <FormHelperText error>
                      {formik.errors.jmsResumeOffInd}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Stack sx={{ width: "50%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.epChecklistUploadInd === "Y"}
                        onChange={() =>
                          formik.setFieldValue(
                            "epChecklistUploadInd",
                            formik.values.epChecklistUploadInd === "N"
                              ? "Y"
                              : "N"
                          )
                        }
                      />
                    }
                    label="Copy of EP and Checklist uploaded into JMS"
                  />
                  {formik.errors.epChecklistUploadInd && (
                    <FormHelperText error>
                      {formik.errors.epChecklistUploadInd}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>
            </Stack>
          )}

          {errors?.errorDetails?.length && (
            <Stack mt={1} direction="column" useFlexGap flexWrap="wrap">
              {errors.errorDetails.map((error) => (
                <div>
                  <span className="errorMsg">*{error?.errorCode[0]}</span>
                </div>
              ))}
            </Stack>
          )}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button variant="contained" color="primary" type="submit">
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
