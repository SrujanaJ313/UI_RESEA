export const validationMessages = {
  lookup: {
    mslRequired: "MSL is required",
    employerRequired: "Employer UI Acct # is required",
    claimantRequired: "Claimant SSN is required",
    masslayoffStartDateRequired: "Start Date is required",
    masslayoffEndDateMin: "End date can't be before Start date",
    recallStartDateRequired: "Start Date is required",
    recallEndDateMin: "End date can't be before Start date",
  },
};
export const serverErrorMessages = {
  lookupReqDTO: {
    claimantssn: {
      errorcode1: "claimantssn errorcode1 msg",
      errorcode2: "claimantssn errorcode2 msg",
      errorcode3: "claimantssn errorcode3 msg",
    },
    startDate: {
      errorcode1: "startDate errorcode1 msg",
      errorcode2: "startDate errorcode2 msg",
      errorcode3: "startDate errorcode3 msg",
    },
  },
  errorcode1: "errorcode1 msg",
  errorcode2: "errorcode2 msg",
  errorcode3: "errorcode3 msg",
  defaultErrorMsg: "Internal, please contact administrator",
};

export const SOURCE_CODES = {
  CLONED: "Cloned",
  CLAIMANT_WORK_HISTORY: "Claimant work history",
  STAFF_ENTERED: "Staff entered",
  UPLOADED: "Uploaded",
};

export const STATUS_CODES = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
};

export const ERROR_CODES_MAPPER = {
  reasonCodes: {
    "method.not.supported": "Requested HTTP method is not supported.",
    "not.fount": "Requested resource not found.",
    "validation.error": "Invalid date found in the request.",
    "file.processing.failed": "An error occurred during file processing.",
    "internal.error":
      "An error occurred while processing your request. Please try again or contact the administrator for assistance.",
    "parser.error": "An error occurred while parsing the data.",
    "db.resource.not.available":
      "Resource requested is not found in the database.",
  },
  default: {
    400: "An validation error occurred while processing your request. Please try again or contact the administrator for assistance.",
    401: "Authentication Failed.",
    404: "Requested resource not found.",
    405: "Requested HTTP method is not supported.",
    500: "An error occurred while processing your request. Please try again or contact the administrator for assistance.",
    default:
      "An error occurred while processing your request. Please try again or contact the administrator for assistance.",
  },
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_HEADERS_URL}`
] = {
  "alcId.mandatory": "ALC ID is mandatory",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_LIST_URL}`
] = {
  "alcId.mandatory": "ALC ID is mandatory",
  "active.not-valid-value": "Active value is not valid",
};
ERROR_CODES_MAPPER[
  `GET:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM__DETAILS_URL}`
] = {
  "alvId.mandatory": "ALV ID is Mandatory",
  "alvId.notFound": "ALV ID is invalid/not found",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_SAVE_URL}`
] = {
  "alvId.notFound": "ALV ID is invalid/not available",
  "alvEdit.inActive": "Inactive ALV cannot be edited",
  "displayOnCd.inValid": "Invalid Display On Code/Conbination",
  "displayOn.mandatory": "Please select valid Display On options",
  "alvId.mandatory": "ALV ID is Mandatory",
  "modificationType.mandatory": "Please select Modification Type",
  "modificationType.not-valid-value": "Please select valid Modification Type",
  "name.mandatory": "Please enter valid ALV Name",
  "alvDecipher.mandatory": "Please select valid ALV Decipher value",
  "comments.mandatory": "User Comments is Mandatory",
  "alvDecipher.inValid": "ALV does not have Decipher",
  "name.inValid":
    "Please enter a valid Name. Name should not exceed 50 characters.",
  "spanishName.inValid":
    "Please enter a valid Spanish Name. Spanish Name should not exceed 200 characters.",
  "description.inValid":
    "Please enter a valid Description. Description should not exceed 1000 characters.",
  "comments.inValid":
    "Generated User Comments total length is exceeding 4000 characters",
  "alvEdit.reactivateInvalid": "Active ALV cannot be Reactivated",
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_DROPDOWN_ACCORDIAN_ITEM_REORDER_URL}`
] = {
  "alvId.mandatory": "ALV ID is Mandatory",
  "alvSortOrderNbr.mandatory": "ALV Sort Order is mandatory",
};
ERROR_CODES_MAPPER[`GET:${process.env.REACT_APP_ALV_DISPLAY_ON_LIST}`] = {};

ERROR_CODES_MAPPER[
  `GET:${process.env.REACT_APP_OTHER_CONFIG_BUSINESS_UNIT_DROPDOWN_URL}`
] = {};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_INDIVIDUAL_PARAM_TYPES_LIST_URL}`
] = {
  "parCategoryCd.mandatory": "Parameter Category Cd value is not valid",
  "active.not-valid-value": "Active value is not valid",
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_INDIVIDUAL_PARAM_TYPES_SEARCH_URL}`
] = {
  "parCategoryCd.mandatory": "Parameter Category Cd value is not valid",
  "parSubCategoryCd.mandatory": "Parameter Sub Category Cd value is not valid",
  "active.not-valid-value": "Active value is not valid",
};

ERROR_CODES_MAPPER[`POST:${process.env.REACT_APP_INDIVIDUAL_PARAM_LIST_URL}`] =
  {
    "parCategoryCd.mandatory": "Parameter Category Cd value is not valid",
    "active.not-valid-value": "Active value is not valid",
  };
ERROR_CODES_MAPPER[
  `GET:${process.env.REACT_APP_INDIVIDUAL_PARAM_DETAILS_URL}`
] = {
  "parId.mandatory": "Parameter ID is Mandatory",
  "parId.notFound": "Parameter is invalid/not found",
};
ERROR_CODES_MAPPER[`POST:${process.env.REACT_APP_INDIVIDUAL_PARAM_SAVE_URL}`] =
  {
    "parId.mandatory": "Parameter ID is Mandatory",
    "modificationType.mandatory": "Modification Type is Mandatory",
    "modificationDt.mandatory": "Modification Date is Mandatory",
    "name.mandatory": "Please enter valid Parameter Name",
    "parRemarks.mandatory": "Parameter Remarks is Mandatory.",
    "numericValue.notnull": "Parameter numeric value is required.",
    "numericValue.notAllowed": "Parameter cannot have numeric value.",
    "textValue.notnull": "Parameter text value is mandatory.",
    "textValue.notAllowed": "Parameter cannot have text value.",
    "textValue.dateNotAllowed": "Parameter text value cannot be date.",
    "dateValue.notnull": "Parameter date value is mandatory.",
    "dateValue.notAllowed": "Parameter cannot have date value.",
    "parameterEdit.inActive": "Inactive Parameter cannot be edited",
    "parameterReactivate.inActive":
      "Inactive Parameter with past End Date cannot be re-instated",
    "changeAsOfDt.inValid":
      "Change As of Date is Invalid. Change As of Date has to be a future date.",
    "parEndDt.inValid":
      "Parameter End Date is Invalid. Parameter End Date has to be a future date.",
    "reinstateDt.inValid":
      "Reinstate Date is Invalid. Reinstate Date has to be a future date.",
    "changeAsOfDt.inValidEffDt":
      "Change As of Date is Invalid. Change As of Date cannot be on or prior to Start/Effective Date of Parameter.",
    "parEndDt.inValidEffDt":
      "Parameter End Date is Invalid. Parameter End Date cannot be on or prior to Start/Effective Date of Parameter.",
    "reinstateDt.inValidEffDt":
      "Reinstate Date is Invalid. Reinstate Date cannot be on or prior to Start/Effective Date of Parameter.",
    "modificationType.not-valid-value": "Please select valid Modification Type",
    "parReinstate.inValidDate":
      "Parameter can only be re-instated with valid future date",
    "parReinstate.activeExists":
      "Parameter cannot be Reinstated, parameter that this entry pertains to is currently active",
    "parDelete.notAllowed":
      "Parameter is not a future entry and cannot be deleted.",
    "parEndDate.notAllowed": "Inactive Parameter cannot be end-dated.",
    "parEndDate.inValid":
      "Parameter End date has to be a valid future date that is after the current Effective Date of the parameter entry",
    "effectiveUntilDt.inValid":
      "Effective until cannot be prior to Effective As Of Date",
    "effectiveUntilDt.mandatory": "Effective until Date is mandatory",
    "effectiveUntilDt.notAllowed":
      "Effective until is not allowed when changing an Open-Ended parameter",
    "parChange.notAllowed":
      "Parameter change is not allowed. Please modify at-least one attribute of the parameter.",
    "changeAsOfDt.inValidExpired":
      "Change As of Date is Invalid. Change As of Date has to be prior to Expiration Date of the parameter being modified.",
    "effectiveUntilDt.inValidExpired":
      "Effective Until Date is Invalid. Effective Until date cannot be prior to Expiration Date of the parameter being modified.",
    "name.inValid":
      "Please enter a valid parameter name. Parameter name should not exceed 60 characters.",
    "numericValue.inValid":
      "Please enter a valid parameter numeric value. Parameter Numeric Value should be a 15 digits with 4 decimal points.",
    "textValue.inValid":
      "Please enter a valid parameter alpha value. Parameter alpha value should not exceed 100 characters.",
    "comments.inValid":
      "Generated User Comments total length is exceeding 4000 characters",
  };
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_URL}`
] = {
  "active.not-valid-value": "Active value is not valid",
};
ERROR_CODES_MAPPER[
  `GET:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_DETAILS_URL}`
] = {
  "wsccId.mandatory": "Work Search Requirement ID is mandatory",
  "wsccId.notFound": "Work Search Requirement is invalid/not found",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_SAVE_URL}`
] = {
  "wsccId.mandatory": "Work Search Requirement ID is mandatory",
  "modificationType.mandatory": "Modification Type is Mandatory",
  "modificationDate.mandatory": "Modification Date is Mandatory",
  "comments.mandatory": "User Comments is Mandatory",
  "requirementEdit.inActive":
    "Inactive Work Search Requirement cannot be edited",
  "configurationDate.inValid":
    "Configuration Date is Invalid. Configuration date has to be a future date.",
  "startDate.inValid":
    "Start Date is Invalid. Start date has to be a future date.",
  "configurationDate.inValidEffDt":
    "Configuration Date is Invalid. Configuration date cannot be on or prior to Start/Effective Date of Work Search Requirement.",
  "startDate.inValidEffDt":
    "Start Date is Invalid. Start date cannot be on or prior to current Start/Effective Date of Work Search Requirement.",
  "configurationDate.inValidExp":
    "Configuration Date is Invalid. Configuration date cannot be greater than Expiration Date of Work Search Requirement.",
  "startDate.inValidExp":
    "Start Date is Invalid. Start date cannot be greater than Expiration Date of Work Search Requirement.",
  "initialClaim.inValid": "Initial Claim Value has to be two digit integer",
  "additionalClaim.inValid":
    "Additional Claim Value has to be two digit integer",
  "incrementFrequency.inValid":
    "Increment Frequency Value has to be two digit integer",
  "incrementVal.inValid": "Increment Value has to be two digit integer",
  "comments.inValid":
    "Generated User Comments total length is exceeding 4000 characters",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_URL}`
] = {
  "active.not-valid-value": "Active value is not valid",
};
ERROR_CODES_MAPPER[
  `GET:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_DETAILS_URL}`
] = {
  "wswcId.mandatory": "Work Search Waiver ID is mandatory",
  "wswcId.notFound": "Work Search Waiver is invalid/not found",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_SAVE_URL}`
] = {
  "wswcId.mandatory": "Work Search Waiver ID is mandatory",
  "modificationType.mandatory": "Modification Type is Mandatory",
  "modificationDate.mandatory": "Modification Date is Mandatory",
  "comments.mandatory": "User Comments is Mandatory",
  "waiverEdit.inActive": "Inactive Work Search Waiver cannot be edited",
  "waiverReactivate.inActive":
    "Invalid Reactivate Date. Reactivate Date should be greater than end date of waiver.",
  "waiverReactivate.active": "Active Work Search Waiver cannot be reactivated",
  "configurationDate.inValid":
    "Configuration Date is Invalid. Configuration date has to be a future date.",
  "endDate.inValid": "End Date is Invalid. End date has to be a future date.",
  "startDate.inValid":
    "Start Date is Invalid. Start date has to be a future date.",
  "deactivateDate.inValid":
    "Deactivate Date is Invalid. Deactivate date has to be a future date.",
  "reactivateDate.inValid":
    "Reactivate Date is Invalid. Reactivate date has to be a future date.",
  "configurationDate.inValidEffDt":
    "Configuration Date is Invalid. Configuration date cannot be on or prior to Start/Effective Date of Waiver.",
  "endDate.inValidEffDt":
    "End Date is Invalid. End date cannot be on or prior to Start/Effective Date of Waiver.",
  "startDate.inValidEffDt":
    "Start Date is Invalid. Start date cannot be on or prior to Start/Effective Date of Waiver.",
  "deactivateDate.inValidEffDt":
    "Deactivate Date is Invalid. Deactivate date cannot be on or prior to Start/Effective Date of Waiver.",
  "reactivateDate.inValidEffDt":
    "Reactivate Date is Invalid. Reactivate date cannot be on or prior to Start/Effective Date of Waiver.",
  "configurationDate.inValidExp":
    "Configuration Date is Invalid. Configuration date cannot be greater than Expiration Date of Waiver.",
  "startDate.inValidExp":
    "Start Date is Invalid. Start date cannot be greater than Expiration Date of Waiver.",
  "comments.inValid":
    "Generated User Comments total length is exceeding 4000 characters",
};
ERROR_CODES_MAPPER[
  `DELETE:${process.env.REACT_APP_INDIVIDUAL_PARAM_DELETE_URL}`
] = {
  "parId.mandatory": "Parameter ID is Mandatory",
  "parDelete.notAllowed":
    "Parameter is not a future entry. Parameter cannot be deleted.",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_SUB_TABLE_URL}`
] = {
  "wsccId.mandatory": "Work Search Requirement ID is mandatory",
  "active.not-valid-value": "Active value is not valid",
};
ERROR_CODES_MAPPER[
  `DELETE:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_REQ_DELETE_URL}`
] = {
  "wsccId.mandatory": "Work Search Requirement ID is mandatory",
  "wsccDelete.notAllowed":
    "Work Search Requirement is not a future entry. Work Search Requirement cannot be deleted.",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_SUB_TABLE_URL}`
] = {
  "wswcId.mandatory": "Work Search Waiver ID is mandatory",
  "active.not-valid-value": "Active value is not valid",
};
ERROR_CODES_MAPPER[
  `DELETE:${process.env.REACT_APP_OTHER_CONFIG_WORK_SEARCH_WAIVERS_DELETE_URL}`
] = {
  "wswcId.mandatory": "Work Search Waiver ID is mandatory",
  "wswcDelete.notAllowed":
    "Work Search Waiver is not a future entry. Work Search Waiver cannot be deleted.",
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_OTHER_CONFIG_INVESTICASE_SAVE_URL}`
] = {
  "spaId.mandatory": "Investicase ID is mandatory",
  "modificationType.mandatory": "Modification Type is Mandatory",
  "modificationDate.mandatory": "Modification Date is Mandatory",
  // "comments.mandatory": "User Comments is Mandatory",
  // "requirementEdit.inActive":
  //   "Inactive Work Search Requirement cannot be edited",
  "configurationDate.inValid":
    "Configuration Date is Invalid. Configuration date has to be a future date.",
  "startDate.inValid":
    "Start Date is Invalid. Start date has to be a future date.",
  "configurationDate.inValidEffDt":
    "Configuration Date is Invalid. Configuration date cannot be on or prior to Start/Effective Date of Investicase.",
  "startDate.inValidEffDt":
    "Start Date is Invalid. Start date cannot be on or prior to current Start/Effective Date of Investicase.",
  "configurationDate.inValidExp":
    "Configuration Date is Invalid. Configuration date cannot be greater than Expiration Date of Investicase.",
  "endDate.inValidExp":
    "End Date is Invalid. End date cannot be greater than Expiration Date of Investicase.",
  "reinstateDate.inValidExp":
    "Reinstate Date is Invalid. Reinstate date cannot be greater than Expiration Date of Investicase.",
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_SWITCH_SAVE}`
] = {
  "switchmeetingmode.reason.mandatory": "Reason for switching meeting mode is mandatory",
  "change.reason.text.exceeds_limit": "Reason for switching meeting mode exceeds character limit, please limit to 1000 characters",
  "currentmeetingmode.mandatory":"Current Meeting mode is mandatory",
  "meetingModeChgReasonTxt.mandatory":"Please enter the description for switching meeting mode",
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_RETURNED_TO_WORK_SAVE}`
] = {
  "empStartDt.mandatory": "Employment Start Date is mandatory",
  "companyName.mandatory": "Company Name is mandatory",
  "jobTitle.mandatory":"Job Title is mandatory",
  "workSchedule.mandatory":"Work Schedule is mandatory",
  "hourlyPayRate.mandatory":"Hourly Pay Rate is mandatory",
  "state.mandatory":"State is mandatory",
  "city.mandatory":"City is mandatory",
  "workMode.mandatory":"Work Mode is mandatory",
  "staffNotes.exceeds_limit":"Staff Notes exceeds character limit, please limit to 4000 characters",
  "jms890IndAnjmsReferralInd.bothEmpty":"Either Non-Direct placement Recorded or JMS Referral Recorded should be checked",
  "jmsCompletedItems.checkedOff":"For future start date, None of the items listed for JMS completed should not be checked.",
  "jmsCompletedItems.checkedNotOff":"For past start date, JMS completed checklist should be checked.",
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_RESCHEDULE_SAVE}`
] = {
  "nonCompliance.indicator.mandatory":"Non Compliance Indicator is mandatory",
  "reschedule.reason.mandatory": "Reschedule Reason is mandatory",
  "lateSchedulingNotes.exceeds_limit": "Late Notes exceeds character limit, please limit to 4000 characters",
  "preferredMeetingMode.bothNotChecked": "Either In-Person or Virtual should be checked",
  "appointmentDate.mandatory": "Appointment Date is mandatory",
  "appointmentTime.mandatory": "Appointment Time is mandatory",
  "entityCity.mandatory": "City is mandatory",
  "entityState.mandatory": "State is mandatory",
  "entityName.mandatory": "Employer name is mandatory",
  "entityTeleNumber.mandatory": "Employer telephone number is mandatory",
  "jobTitle.mandatory": "Job title is mandatory",
  "partFullTimeInd.mandatory": "Part time/Full time indicator is mandatory",
};

ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_APPOINTMENT_SAVE}`
] = {
  "rsicId.notAvailable": "Appointment Slot is not Available",
  "for.lof.invalid": "User does not have access to For Local Office option",
  "for.mgr.invalid":"User does not have access to For Case Manager option",
  "claimId.mandatory":"Please select a claimant for scheduling the appointment",
  "informedCmtInd.mandatory":"Please inform claimant and select Informed Claimant to check claimant portal",
  "informedConveyedBy.mandatory":"Please check option by which information was conveyed to claimant",
};
ERROR_CODES_MAPPER[
  `POST:${process.env.REACT_APP_REASSIGN_SAVE}`
] = {
  "eventld.notAvailable": "Appointment is no longer available for scheduling. Please select another appointment",
  "eventld.mismatch" : "Case Stage and Apponinment Selected do not match. Please select appropriate appointment",
  "caseOffice.mandatory": "Please select lookup case manager availability office",
  "caseld.mandatory" : "Case ID is mandatory",
  "eventld.mandatory" : "Event ID is mandatory"
};