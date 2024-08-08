import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const schema = yup.object().shape({
  company: yup
    .string()
    .required("Company is required. Please enter your company's name."),
  state: yup.string().required("State is required. Please select a state."),
  city: yup.string().required("City is required. Please enter the city."),
  jobTitle: yup
    .string()
    .required("Job title is required. Please enter your job title."),
  startDate: yup
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
      (value) => /^\d+(\.\d{1,2})?$/.test(value),
    ),
  workSchedule: yup
    .string()
    .required("Work schedule is required. Please select a work schedule."),
  workMode: yup
    .string()
    .required("Work mode is required. Please select a work mode."),
});

function ReturnedToWork({ onCancel }) {
  const states = [
    { id: "1", name: "State 1" },
    { id: "2", name: "State 2" },
    { id: "3", name: "State 3" },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    onCancel();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Controller
              name="company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Company"
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl size="small">
                  <InputLabel id="state-dropdown">*State</InputLabel>
                  <Select
                    {...field}
                    label="*State"
                    error={!!errors.state}
                    variant="outlined"
                    sx={{ width: "120px" }}
                    labelId="state-dropdown"
                  >
                    {states.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors.state && (
              <FormHelperText error>{errors.state.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*City"
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="*Start Date"
                  disablePast
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="jobTitle"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="*Job Title"
                  size="small"
                  variant="outlined"
                  fullWidth
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Work Schedule:</Typography>
            <Controller
              name="workSchedule"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                >
                  <FormControlLabel
                    value="fulltime"
                    control={<Radio size="small" />}
                    label="Full time"
                  />
                  <FormControlLabel
                    value="partTime"
                    control={<Radio size="small" />}
                    label="Part time"
                  />
                </RadioGroup>
              )}
            />
            {errors.workSchedule && (
              <Typography color="error" variant="body2" align="left">
                {errors.workSchedule.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Work Mode:</Typography>
            <Controller
              name="workMode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                >
                  <FormControlLabel
                    value="onsite"
                    control={<Radio size="small" />}
                    label="Onsite"
                  />
                  <FormControlLabel
                    value="remote"
                    control={<Radio size="small" />}
                    label="Remote"
                  />
                  <FormControlLabel
                    value="hybrid"
                    control={<Radio size="small" />}
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
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" type="submit">
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
        </Grid>
      </form>
    </LocalizationProvider>
  );
}

export default ReturnedToWork;
