import React, { useEffect, useReducer, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Stack,
  Typography,
  TextField,
  Button,
  DialogContent,
  DialogActions,
  Checkbox,
  FormGroup,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import moment from "moment";
import {
  appointmentStaffListURL,
  appointmentAvailableURL,
  appointmentAvailableSaveURL,
} from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { CookieNames, getCookieItem } from "../../../utils/cookies";
import { availableEventSchema } from "../../../helpers/Validation";


function AvailableEvent({ event, onClose }) {
  const [appointmentStaffList, setAppointmentStaffList] = useState([]);
  const [claimantsList, setClaimantsList] = useState([]);
  const [convertedFormat, setConvertedFormat] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const startDate = moment(event.start).format("M/D/YYYY [at] h:mm a");
    const endDate = moment(event.end).format("h:mm a");
    setConvertedFormat(`${startDate} to ${endDate}`);
  }, [event]);

  const formik = useFormik({
    initialValues: {
      claimant: "",
      claimantId: "",
      staffNotes: "",
      informedCmtInd: "N",
      status: "",
      informedConveyedBy: [],
      caseManagerId: "",
    },
    validationSchema: availableEventSchema,
    onSubmit: async (values) => {
      const payload = {
        rsicId: event?.id,
        claimId: values?.claimantId,
        informedCmtInd: values?.informedCmtInd,
        informedConveyedBy: values?.informedConveyedBy,
        staffNotes: values?.staffNotes,
      };
      console.log("payload",payload);
      try {
        await client.post(appointmentAvailableSaveURL, payload);
        onClose();
      } catch (err) {
        setErrors(err);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    async function fetchAppointmentStaffListData() {
      try {
        const data = await client.get(appointmentStaffListURL);
        setAppointmentStaffList(data);
      } catch (err) {
        console.error("Error in fetchAppointmentStaffListData", err);
      }
    }
    fetchAppointmentStaffListData();
  }, []);

  useEffect(() => {
    async function fetchClaimantListData() {
      try {
        let userId;
        if (formik?.values?.claimant === "Local Office") {
          userId = -1;
        } else if (formik?.values?.claimant === "Case Manager") {
          userId = formik?.values?.caseManagerId;
        } else {
          userId = getCookieItem(CookieNames.USER_ID);
        }
        const payload = {
          rsicId: event?.id,
          userId: formik?.values?.claimant === "Local Office" ? -1 : userId,
          status: formik?.values?.status,
        };
        console.log("payload--->", payload);
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(appointmentAvailableURL)
            : await client.post(appointmentAvailableURL, payload);
        setClaimantsList(data);
      } catch (err) {
        console.error("Error in fetchClaimantListData", err);
      }
    }
    if (formik?.values?.status && formik?.values?.claimant) {
      fetchClaimantListData();
    }
  }, [
    formik?.values?.status,
    formik?.values?.claimant,
    formik?.values?.caseManagerId,
  ]);

  const { values, setFieldValue } = formik;
  return (
    <form onSubmit={formik.handleSubmit}>
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
            <RadioGroup
              row
              name="claimant"
              value={values.claimant}
              onChange={(e) => setFieldValue("claimant", e.target.value)}
            >
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
            <FormControl size="small" sx={{ width: "30%" }}>
              <Select
                value={values.caseManagerId}
                onChange={(e) => setFieldValue("caseManagerId", e.target.value)}
              >
                {appointmentStaffList.map((staff) => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.caseManagerId && (
                <FormHelperText error>
                  {formik.errors.caseManagerId}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
          {formik.errors.claimant && (
            <FormHelperText error>{formik.errors.claimant}</FormHelperText>
          )}

          {/* Status Section (Now using Radio buttons) */}
          <Stack direction="row" alignItems="center">
            <Typography sx={{ minWidth: "100px" }} className="label-text">
              Status:
            </Typography>
            <RadioGroup
              row
              name="status"
              value={values.status}
              onChange={(e) => setFieldValue("status", e.target.value)}
            >
              {[
                { name: "All pending scheduling", value: "ALL" },
                { name: "Scheduled beyond 21 days", value: "ScheduleBeyond21" },
                { name: "No Shows", value: "NoShow" },
                { name: "Scheduled", value: "Scheduled" },
                { name: "Wait listed", value: "WaitListed" },
              ].map((status) => (
                <FormControlLabel
                  key={status?.name}
                  value={status?.value}
                  control={<Radio />}
                  label={status?.name}
                />
              ))}
            </RadioGroup>
          </Stack>
          {formik.errors.status && (
            <FormHelperText error>{formik.errors.status}</FormHelperText>
          )}

          {/* Claimant Selection */}
          <FormControl size="small" sx={{ width: "60%" }}>
            <InputLabel>List of Claimants</InputLabel>
            <Select
              label="List of Claimants"
              value={values.claimantId}
              onChange={(e) => setFieldValue("claimantId", e.target.value)}
            >
              {claimantsList.map((claimant) => (
                <MenuItem key={claimant.id} value={claimant.id}>
                  {claimant.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.errors.claimantId && (
            <FormHelperText error>{formik.errors.claimantId}</FormHelperText>
          )}

          {/* Notes */}
          <TextField
            size="small"
            label="Staff Notes, if any"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            name="staffNotes"
            value={values.staffNotes}
            onChange={formik.handleChange}
          />

          {/* Claimant Portal Checkbox */}
          <Stack direction="row" alignItems={"center"} py={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.informedCmtInd === "Y"}
                  onChange={(e) =>
                    setFieldValue(
                      "informedCmtInd",
                      e.target.checked ? "Y" : "N"
                    )
                  }
                />
              }
              label={
                <Typography className="label-text">
                  Informed claimant on phone to check Claimant portal for
                  details of newly scheduled appointment
                </Typography>
              }
            />
          </Stack>
          {formik.errors.informedCmtInd && (
            <FormHelperText error>
              {formik.errors.informedCmtInd}
            </FormHelperText>
          )}

          {/* Information Conveyed Section */}
          <Stack direction="row" alignItems="center">
            <Typography sx={{ minWidth: "150px" }} className="label-text">
              Information Conveyed:
            </Typography>
            <FormGroup row>
              {["phone", "person", "email"].map((method, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={values.informedConveyedBy.includes(method)}
                      onChange={(e) =>
                        setFieldValue(
                          "informedConveyedBy",
                          e.target.checked
                            ? [...values.informedConveyedBy, method]
                            : values.informedConveyedBy.filter(
                                (m) => m !== method
                              )
                        )
                      }
                    />
                  }
                  label={`Via ${method}`}
                />
              ))}
            </FormGroup>
          </Stack>
          {formik.errors.informedConveyedBy && (
            <FormHelperText error>
              {formik.errors.informedConveyedBy}
            </FormHelperText>
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
        </Stack>
      </DialogContent>

      <DialogActions sx={{ margin: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
}

export default AvailableEvent;
