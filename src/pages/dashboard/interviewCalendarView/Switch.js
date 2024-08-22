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
  //   FormControlLabel,
  //   FormGroup,
  FormHelperText,
} from "@mui/material";
import { switchModeReasonsURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { useFormik } from "formik";
import IssueSubIssueType from "../../../components/issueSubIssueType";
import { v4 as uuidv4 } from "uuid";
// import * as Yup from "yup";

// import { CookieNames, getCookieItem } from "../../../utils/cookies";
// import { rescheduleValidationSchema } from "../../../helpers/Validation";

function Switch({ onCancel, event }) {
  console.log("event--->", event);
  const [errors, setErrors] = useState([]);
  const [switchModeReasons, setSwitchReasons] = useState([]);

  useEffect(() => {
    async function fetchSwitchModeReasons() {
      try {
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(switchModeReasonsURL)
            : await client.get(`${switchModeReasonsURL}/${event?.appointmentType}`);
        setSwitchReasons(
          data?.map((d) => ({ id: d.alvId, name: d.alvShortDecTxt }))
        );
      } catch (err) {
        console.error("Error in fetchRescheduleReasonsListData", err);
      }
    }
    fetchSwitchModeReasons();
  }, []);

  const formik = useFormik({
    initialValues: {
      reasonForSwitchingMode: "",
      additionalDetails: "",
      staffNotes: "",
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
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Form Values", values);
        // await client.post(rescheduleSaveURL, payload);
        onCancel();
      } catch (err) {
        setErrors(err);
      }
    },
  });

  console.log("reasonForSwitchingMode", formik.values.reasonForSwitchingMode);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"column"} justifyContent={"space-between"}>
            <FormControl size="small" fullWidth>
              <InputLabel id="reschedule-request-dropdown">
                *Reason for switching meeting mode
              </InputLabel>
              <Select
                label="*Reschedule to"
                value={formik.values.reasonForSwitchingMode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="reasonForSwitchingMode"
                sx={{ width: "50%" }}
              >
                {switchModeReasons?.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.name}
                  </MenuItem>
                ))}
              </Select>
              {formik?.errors?.reasonForSwitchingMode && (
                <FormHelperText error>
                  {formik.errors.reasonForSwitchingMode}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>

          <Stack direction={"column"} spacing={2}>
            {formik?.values?.reasonForSwitchingMode === 5696 && (
              <TextField
                name="additionalDetails"
                label="Additional Details, if any"
                size="small"
                value={formik.values.additionalDetails}
                onChange={formik.handleChange}
                variant="outlined"
                multiline
                rows={3}
                fullWidth
              />
            )}
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

          {errors?.errorDetails?.length && (
            <Stack mt={1} direction="column" useFlexGap flexWrap="wrap">
              {errors?.errorDetails.map((error) => (
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
      </Stack>
    </form>
  );
}

export default Switch;
