const baseApiUrl =
  process.env.NODE_ENV === "local"
    ? ""
    : `${process.env.REACT_APP_BASE_API_URL}`;

const validateJWTURL = `${baseApiUrl}${process.env.REACT_APP_VALIDATE_JWT}`;
const refreshTokenURL = `${baseApiUrl}${process.env.REACT_APP_REFRESH_TOKEN_URL}`;
const accessTokenURL = `${baseApiUrl}${process.env.REACT_APP_ACCESS_TOKEN_URL}`;
const footerURL = `${baseApiUrl}${process.env.REACT_APP_FOOTER_URL}`;

const caseloadMetricsURL = `${baseApiUrl}${process.env.REACT_APP_CASELOAD_METRICS}`;
const caseModeViewURL = `${baseApiUrl}${process.env.REACT_APP_CASELOAD}`;
const additionalDetailsURL = `${baseApiUrl}${process.env.REACT_APP_ADDITIONAL_DETAILS}`;
const returnedToWorkSaveURL = `${baseApiUrl}${process.env.REACT_APP_RETURNED_TO_WORK_SAVE}`;
const calendarDetailsURL = `${baseApiUrl}${process.env.REACT_APP_CALENDAR_DETAILS}`;
const reschedulingReasonsListURL = `${baseApiUrl}${process.env.REACT_APP_RESCHEDULING_REASONS_LIST}`;
const reschedulingIssueListURL = `${baseApiUrl}${process.env.REACT_APP_RESCHEDULING_ISSUE_LIST}`;
const reschedulingToURL = `${baseApiUrl}${process.env.REACT_APP_RESCHEDULING_TO}`;
const rescheduleSaveURL = `${baseApiUrl}${process.env.REACT_APP_RESCHEDULE_SAVE}`;
const switchModeReasonsURL = `${baseApiUrl}${process.env.REACT_APP_SWITCH_MODE}`;
const switchModeSaveURL = `${baseApiUrl}${process.env.REACT_APP_SWITCH_SAVE}`;
const appointmentStaffListURL = `${baseApiUrl}${process.env.REACT_APP_APPOINTMENT_STAFF_LIST}`;
const appointmentAvailableURL = `${baseApiUrl}${process.env.REACT_APP_APPOINTMENT_AVAILABLE}`;
const appointmentAvailableSaveURL = `${baseApiUrl}${process.env.REACT_APP_APPOINTMENT_SAVE}`;
const caseManagerAvailabilityURL = `${baseApiUrl}${process.env.REACT_APP_REASSIGN_CASE_MANAGER_AVAILABILITY}`;
const reassignReasonsURL = `${baseApiUrl}${process.env.REACT_APP_REASSIGN_REASONS}`;
const reassignCaseOfficeNameURL = `${baseApiUrl}${process.env.REACT_APP_REASSIGN_CASE_OFFICE_NAME}`;
const reassignSaveURL = `${baseApiUrl}${process.env.REACT_APP_REASSIGN_SAVE}`;

export {
  baseApiUrl,
  validateJWTURL,
  refreshTokenURL,
  accessTokenURL,
  footerURL,
  caseloadMetricsURL,
  caseModeViewURL,
  additionalDetailsURL,
  returnedToWorkSaveURL,
  calendarDetailsURL,
  reschedulingReasonsListURL,
  reschedulingIssueListURL,
  reschedulingToURL,
  rescheduleSaveURL,
  switchModeReasonsURL,
  switchModeSaveURL,
  appointmentStaffListURL,
  appointmentAvailableURL,
  appointmentAvailableSaveURL,
  caseManagerAvailabilityURL,
  reassignReasonsURL,
  reassignCaseOfficeNameURL,
  reassignSaveURL
};
