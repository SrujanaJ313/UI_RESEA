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
const calendarDetailsURL = `${baseApiUrl}${process.env.REACT_APP_CALENDAR_DETAILS}`;
export {
  baseApiUrl,
  validateJWTURL,
  refreshTokenURL,
  accessTokenURL,
  footerURL,
  caseloadMetricsURL,
  caseModeViewURL,
  calendarDetailsURL,
};
