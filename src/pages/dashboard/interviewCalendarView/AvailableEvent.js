import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControl,
  Radio,
  InputLabel,
  Stack,
  Typography,
  TextField,
  FormGroup,
  Button,
  DialogContent,
  DialogActions,
} from "@mui/material";
import moment from "moment";
import {
  appointmentStaffListURL,
  // appointmentAvailableURL,
} from "../../../helpers/Urls";
import client from "../../../helpers/Api";
const validationSchema = Yup.object().shape({
  claimant: Yup.string().optional(),
  notes: Yup.string().optional(),
  checked: Yup.boolean().optional(),
  communicationMethods: Yup.array().of(Yup.string()).optional(),
});

function AvailableEvent({ event, onClose }) {
  const [appointmentStaffList, setAppointmentStaffList] = useState([]);
  const claimants = [
    { id: "jsample", name: "Jack Sample" },
    { id: "jsmith", name: "Jack Smith" },
    { id: "ppenn", name: "Peter Penn" },
  ];

  const [convertedFormat, setConvertedFormat] = useState("");

  useEffect(() => {
    const startDate = moment(event.start).format("M/D/YYYY [at] h:mm a");
    const endDate = moment(event.end).format("h:mm a");
    setConvertedFormat(`${startDate} to ${endDate}`);
  }, [event]);

  useEffect(() => {
    async function fetchAppointmentStaffListData() {
      try {
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(appointmentStaffListURL)
            : await client.get(appointmentStaffListURL);
        setAppointmentStaffList(data);
      } catch (err) {
        console.error("Error in fetchAppointmentStaffListData", err);
      }
    }
    fetchAppointmentStaffListData();
  }, []);

  return (
    <Formik
      initialValues={{
        claimant: "",
        notes: "",
        checked: false,
        communicationMethods: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission
        console.log(values);
        onClose();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <DialogContent dividers>
            <Stack spacing={2}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"row"} sx={{ width: "50%" }}>
                  <Typography className="label-text" sx={{ width: "30%" }}>
                    Case Manager:
                  </Typography>
                  <Typography>Mary Peters</Typography>
                </Stack>
                <Stack direction={"row"} sx={{ width: "50%" }}>
                  <Typography className="label-text" sx={{ width: "50%" }}>
                    Initial Appointment TimeSlot:
                  </Typography>
                  <Typography>{convertedFormat}</Typography>
                </Stack>
              </Stack>

              <Typography className="label-text">Show Claimants:</Typography>

              {/* For Section */}
              <Stack direction="row" alignItems="center">
                <Typography sx={{ minWidth: "100px" }} className="label-text">
                  For:
                </Typography>
                <Field name="claimant">
                  {({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="Mary Peters"
                        control={<Radio />}
                        label="Mary Peters"
                      />
                      <FormControlLabel
                        value="Local Office"
                        control={<Radio />}
                        label="For Local Office"
                      />
                      <FormControlLabel
                        value="Case Manager"
                        control={<Radio />}
                        label="For Case Manager"
                      />
                    </RadioGroup>
                  )}
                </Field>
                <FormControl size="small" sx={{ width: "30%" }}>
                  <Select
                    value={values.claimant}
                    onChange={(e) => setFieldValue("claimant", e.target.value)}
                  >
                    {appointmentStaffList.map((staff) => (
                      <MenuItem key={staff.id} value={staff.id}>
                        {staff.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Status Section */}
              <Stack direction="row" alignItems="center">
                <Typography sx={{ minWidth: "100px" }} className="label-text">
                  Status:
                </Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="All pending scheduling"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Scheduled beyond 21 days"
                  />
                  <FormControlLabel control={<Checkbox />} label="No Shows" />
                  <FormControlLabel control={<Checkbox />} label="Scheduled" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Wait listed"
                  />
                </FormGroup>
              </Stack>

              {/* Claimant Selection */}
              <FormControl size="small" sx={{ width: "60%" }}>
                <InputLabel id="claimant-select-label">
                  List of Claimants
                </InputLabel>
                <Select
                  labelId="claimant-select-label"
                  value={values.claimant}
                  onChange={(e) => setFieldValue("claimant", e.target.value)}
                >
                  {claimants.map((claimant) => (
                    <MenuItem key={claimant.id} value={claimant.id}>
                      {claimant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Notes */}
              <Field name="notes">
                {({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Staff Notes, if any"
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                  />
                )}
              </Field>

              {/* Claimant Portal Checkbox */}
              <Stack direction="row" alignItems={"center"} py={1}>
                <Field name="checked">
                  {({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label={
                        <Typography className="label-text">
                          Informed claimant on phone to check Claimant portal
                          for details of newly scheduled appointment
                        </Typography>
                      }
                    />
                  )}
                </Field>
              </Stack>

              {/* Information Conveyed Section */}
              <Stack direction="row" alignItems="center">
                <Typography sx={{ minWidth: "150px" }} className="label-text">
                  Information Conveyed:
                </Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.communicationMethods.includes("phone")}
                        onChange={(e) =>
                          setFieldValue(
                            "communicationMethods",
                            e.target.checked
                              ? [...values.communicationMethods, "phone"]
                              : values.communicationMethods.filter(
                                  (method) => method !== "phone"
                                )
                          )
                        }
                      />
                    }
                    label="On phone"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.communicationMethods.includes(
                          "inPerson"
                        )}
                        onChange={(e) =>
                          setFieldValue(
                            "communicationMethods",
                            e.target.checked
                              ? [...values.communicationMethods, "inPerson"]
                              : values.communicationMethods.filter(
                                  (method) => method !== "inPerson"
                                )
                          )
                        }
                      />
                    }
                    label="In person"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.communicationMethods.includes("email")}
                        onChange={(e) =>
                          setFieldValue(
                            "communicationMethods",
                            e.target.checked
                              ? [...values.communicationMethods, "email"]
                              : values.communicationMethods.filter(
                                  (method) => method !== "email"
                                )
                          )
                        }
                      />
                    }
                    label="Via email"
                  />
                </FormGroup>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ margin: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}

export default AvailableEvent;
