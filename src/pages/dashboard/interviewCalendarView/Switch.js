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
  FormHelperText,
} from "@mui/material";
import { switchModeReasonsURL, switchModeSaveURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { useFormik } from "formik";
import IssueSubIssueType from "../../../components/issueSubIssueType";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { CookieNames, getCookieItem } from "../../../utils/cookies";
import { rescheduleValidationSchema } from "../../../helpers/Validation";
import { convertISOToMMDDYYYY } from "../../../helpers/utils";
import { getMsgsFromErrorCode } from "../../../helpers/utils";

function Switch({ onCancel, event }) {
  const [errors, setErrors] = useState([]);
  const [switchModeReasons, setSwitchReasons] = useState([]);
  const validationSchema = Yup.object({
    reasonForSwitchMeetingMode: Yup.string().required(
      "Reason for switching meeting mode is required"
    ),
    meetingModeChgReasonTxt: Yup.string().when("reasonForSwitchMeetingMode", {
      is: (val) => val === "5696",
      then: () => Yup.string().required("Additional Details are required"),
    }),
    issues: Yup.array().of(
      Yup.object().shape({
        issueType: Yup.object().required("Issue Type is required"),
        subIssueType: Yup.object().required("Sub Issue Type is required"),
        issueStartDate: Yup.date().required("Start Date is required"),
        issueEndDate: Yup.date().required("End Date is required"),
      })
    ),
  });

  useEffect(() => {
    async function fetchSwitchModeReasons() {
      try {
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(switchModeReasonsURL)
            : await client.get(
                `${switchModeReasonsURL}?currentmeetingmode=${event?.appointmentType}`
              );
        setSwitchReasons(
          data?.map((d) => ({ id: d.alvId, name: d.alvShortDecTxt }))
        );
      } catch (errorResponse) {
        const newErrMsgs = getMsgsFromErrorCode(`GET:${process.env.REACT_APP_SWITCH_MODE}`,errorResponse)
        setErrors(newErrMsgs)
      }
    }
    fetchSwitchModeReasons();
  }, []);

  const formik = useFormik({
    initialValues: {
      reasonForSwitchMeetingMode: "",
      meetingModeChgReasonTxt: "",
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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const userId = getCookieItem(CookieNames.USER_ID);
      const issueDTOList = values.issues.map((issue) => ({
        nmiId: issue.issueType.nmiId,
        startDt: convertISOToMMDDYYYY(issue.issueStartDate),
        endDt: convertISOToMMDDYYYY(issue.issueEndDate),
        // parentNmiId: issue.issueType.nmiId,
        // childNmiId: issue.subIssueType.nmiId,
        // issueStartDt: convertISOToMMDDYYYY(issue.issueStartDate),
        // issueEndDt: convertISOToMMDDYYYY(issue.issueEndDate),
      }));
      try {
        const payload = {
          userId,
          rsicId: event?.id,
          currentMeetingMode: event?.appointmentType,
          reasonForSwitchMeetingMode: values?.reasonForSwitchMeetingMode,
          meetingModeChgReasonTxt: values?.meetingModeChgReasonTxt,
          staffNotes: values?.staffNotes,
          issueDTOList,
        };
        console.log("Form payload", payload);
        await client.post(switchModeSaveURL, payload);
        onCancel();
      } catch (errorResponse) {
        const newErrMsgs = getMsgsFromErrorCode(`POST:${process.env.REACT_APP_SWITCH_SAVE}`,errorResponse)
        setErrors(newErrMsgs)
      }
    },
    validateOnChange: false,
    validateOnBlur:false
  });
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
                value={formik.values.reasonForSwitchMeetingMode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="reasonForSwitchMeetingMode"
                sx={{ width: "50%" }}
              >
                {switchModeReasons?.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.name}
                  </MenuItem>
                ))}
              </Select>
              {formik?.errors?.reasonForSwitchMeetingMode && (
                <FormHelperText error>
                  {formik.errors.reasonForSwitchMeetingMode}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>

          <Stack direction={"column"} spacing={2}>
            {formik?.values?.reasonForSwitchMeetingMode === 5696 && (
              <TextField
                name="meetingModeChgReasonTxt"
                label="*Additional Details, if any"
                size="small"
                value={formik.values.meetingModeChgReasonTxt}
                onChange={formik.handleChange}
                variant="outlined"
                multiline
                rows={3}
                fullWidth
              />
            )}
            {formik?.errors?.meetingModeChgReasonTxt && (
              <FormHelperText error>
                {formik.errors.meetingModeChgReasonTxt}
              </FormHelperText>
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

          {errors?.length && (
            <Stack mt={1} direction="column" useFlexGap flexWrap="wrap">
             {errors.map((x) => (
                <div>
                  <span className="errorMsg">*{x}</span>
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
