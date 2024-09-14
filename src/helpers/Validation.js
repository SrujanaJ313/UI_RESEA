import * as yup from "yup";

const individualParametersSchema = (
  disableEffectiveUntil,
  isOpenEndedExist
) => {
  return yup.object().shape({
    modificationType: yup.string().required("Modification type is required"),
    updateDate: yup
      .date()
      .nullable()
      .when("modificationType", {
        is: "CHANGE",
        then: (schema) => schema.required("Update Date is required"),
      })
      .typeError("Invalid date. Please select or enter valid date"),
    endDate: yup
      .date()
      .nullable()
      .when("modificationType", {
        is: "ENDDATE",
        then: (schema) => schema.required("End Date is required"),
      })
      .typeError("Invalid date. Please select or enter valid date"),
    reinstateDate: yup
      .date()
      .nullable()
      .when("modificationType", {
        is: "REINSTATE",
        then: (schema) => schema.required("Reinstate Date is required"),
      })
      .typeError("Invalid date. Please select or enter valid date"),
    name: yup.string().required("Name is required"),
    numericValue: yup.string().when("numericType", {
      is: true,
      then: (schema) => schema.required("Numeric value is required"),
    }),
    textValue: yup.string().when("textType", {
      is: true,
      then: (schema) => schema.required("Text value is required"),
    }),
    dateValue: yup
      .date()
      .nullable()
      .when("dateType", {
        is: true,
        then: (schema) => schema.required("Date value is required"),
      })
      .typeError("Invalid date. Please select or enter valid date"),
    remarks: yup.string().required("Remarks is required"),
    effectiveUntil: yup
      .date()
      .nullable()
      .when("modificationType", {
        is: (modificationType) =>
          modificationType === "CHANGE" &&
          !disableEffectiveUntil &&
          isOpenEndedExist,
        then: (schema) =>
          schema.required("Effective until date value is required"),
      })
      .typeError("Invalid date. Please select or enter valid date"),
  });
};

const dropdownListSchema = yup.object().shape({
  modificationType: yup.string().required("Modification is required"),
  name: yup.string().required("Name is required"),
  alvDecipherCd: yup.string().when("alcDecipherLabel", {
    is: (alcDecipherLabel) => alcDecipherLabel,
    then: (schema) => schema.required("Required field"),
  }),
  displayOnList: yup.array().required("Select atleast one").min(1),
  comments: yup.string().required("Comments is required"),
});

const otherConfigWorkSearchRequirementsSchema = yup.object().shape({
  modificationType: yup.string().required("Modification is required"),
  configurationDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "CONFIGURATION",
      then: (schema) => schema.required("Configuration Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  startDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "STARTDATE",
      then: (schema) => schema.required("Start Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  initialClaim: yup.number().required("Initial Claim is required"),
  additionalClaim: yup.number().required("Additional Claim is required"),
  incrementFrequency: yup
    .number()
    .required("Incremental Frequency is required"),
  incrementVal: yup.number().required("Incremental value is required"),
  comments: yup.string().required("Comments is required"),
});

const otherConfigWorkSearchWaiversSchema = yup.object().shape({
  modificationType: yup.string().required("Modification is required"),
  configurationDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "CONFIGURATION",
      then: (schema) => schema.required("Configuration Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  startDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "STARTDATE",
      then: (schema) => schema.required("Start Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  endDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "ENDDATE",
      then: (schema) => schema.required("End Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  deactivateDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "DEACTIVATE",
      then: (schema) => schema.required("Deactivate Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  reactivateDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "REACTIVATE",
      then: (schema) => schema.required("Reactivate Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  reasonCd: yup.string().required("Incremental Frequency is required"),
  businessUnit: yup.string().required("Incremental value is required"),
  comments: yup.string().required("Comments is required"),
});

const otherConfigInvesticaseSchema = yup.object().shape({
  modificationType: yup.string().required("Modification is required"),
  modificationDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "CHANGE",
      then: (schema) => schema.required("Modification Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),

  endDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "ENDDATE",
      then: (schema) => schema.required("End Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  reinstateDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "REINSTATE",
      then: (schema) => schema.required("Reinstate Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  name: yup.string().required("name is required"),
  spaAttrWeight: yup.string().required("Weight is required"),
  spaRemarks: yup.string().required("Remarks is required"),
});

const otherConfiInvesticaseSpideringEventsSchema = yup.object().shape({
  modificationType: yup.string().required("Modification is required"),
  modificationDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "CHANGE",
      then: (schema) => schema.required("Modification Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),

  endDate: yup
    .date()
    .nullable()
    .when("modificationType", {
      is: "ENDDATE",
      then: (schema) => schema.required("End Date is required"),
    })
    .typeError("Invalid date. Please select or enter valid date"),
  score: yup.string().required("description is required"),
  description: yup.string().required("description is required"),
  detail: yup.string().required("details is required"),
  // investicaseActions: yup.string().required("InvestiCase Actions is required"),
});

const isDateValid = (dateStr) => {
  const inputDate = new Date(dateStr);
  const currentDate = new Date();
  return inputDate <= currentDate;
};

const returnToWorkValidationsSchema = (values) => {
  const errors = {};
  if (!values.empName) {
    errors.empName = "Company is required. Please enter your company's name.";
  } else if (!/^[a-zA-Z0-9 ]*$/.test(values.empName)) {
    errors.empName = "Job title should not contain special characters.";
  }

  if (!values.empWorkLocState) {
    errors.empWorkLocState = "State is required. Please select a state.";
  }

  if (!values.empWorkLocCity) {
    errors.empWorkLocCity = "City is required. Please enter the city.";
  }

  if (!values.exactJobTitle) {
    errors.exactJobTitle =
      "Job title is required. Please enter your job title.";
  } else if (!/^[a-zA-Z0-9 ]*$/.test(values.exactJobTitle)) {
    errors.exactJobTitle = "Job title should not contain special characters.";
  }

  if (!values.employmentStartDt) {
    errors.employmentStartDt =
      "Start date is required. Please select a valid date.";
  } else if (isNaN(new Date(values.employmentStartDt).getTime())) {
    errors.employmentStartDt =
      "Start date is required. Please select a valid date.";
  }

  if (!values.hourlyPayRate) {
    errors.hourlyPayRate =
      "Hourly pay rate is required. Please enter the hourly pay rate.";
  } else if (!/^\d+(\.\d{1,2})?$/.test(values.hourlyPayRate)) {
    errors.hourlyPayRate =
      "Hourly pay rate must have at most two decimal places.";
  } else if (Number(values.hourlyPayRate) > 999.99) {
    errors.hourlyPayRate =
      "Hourly pay rate must be less than or equal to 999.99.";
  }

  if (!values.partFullTimeInd) {
    errors.partFullTimeInd =
      "Work schedule is required. Please select a work schedule.";
  }

  if (!values.workMode) {
    errors.workMode = "Work mode is required. Please select a work mode.";
  }

  if (isDateValid(values.employmentStartDt)) {
    const jmsCheckboxes = [
      // "jms890Ind",
      "jmsCaseNotesInd",
      "jmsCloseGoalsInd",
      "jmsCloseIEPInd",
      // "jmsReferralInd",
      "jmsResumeOffInd",
      "epChecklistUploadInd",
    ];

    jmsCheckboxes.forEach((field) => {
      if (values[field] === "N") {
        errors[field] = "Please select the checkbox.";
      }
    });

    if (values.jms890Ind === "N" && values.jmsReferralInd === "N") {
      errors.jms890Ind = errors.jmsReferralInd =
        "One of jms890Ind or jmsReferralInd must be checked";
    }
  }

  return errors;
};

const rescheduleValidationSchema = yup.object({
  rescheduleTo: yup.string().required("Reschedule to is required"),
  mode: yup
    .object({
      selectedPrefMtgModeInPerson: yup.boolean(),
      selectedPrefMtgModeVirtual: yup.boolean(),
    })
    .test(
      "at-least-one",
      "At least one mode must be selected",
      (value) =>
        value.selectedPrefMtgModeInPerson || value.selectedPrefMtgModeVirtual
    ),
  reasonForRescheduling: yup
    .string()
    .required("Reason for rescheduling is required"),
  // tempSuspendedInd: yup
  //   .string()
  //   .oneOf(["Y"], "You must check Placeholder Meeting")
  //   .required("You must check Placeholder Meeting"),
  // lateSchedulingReason: yup.string().when("rescheduleTo", {
  //   is: (rescheduleTo) => {
  //     rescheduleReason = rescheduleReasons.find(
  //       (r) => r.newRsicId === Number(rescheduleTo)
  //     );
  //     return (
  //       rescheduleTo !== "" && rescheduleReason?.nonComplianceInd === "Y"
  //     );
  //   },
  //   then: () => yup.string().required("Reason for scheduling is required"),
  // }),
  staffNotes: yup.string(),
  appointmentDate: yup
    .date()
    .nullable()
    .when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160", "3163"].includes(reasonForRescheduling),
      then: () => yup.date().required("Appointment Date is required"),
    }),
  appointmentTime: yup
    .string()
    .nullable()
    .when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160", "3163"].includes(reasonForRescheduling),
      then: () => yup.string().required("Appointment Time is required"),
    }),
  entityCity: yup
    .string()
    .nullable()
    .when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160"].includes(reasonForRescheduling),
      then: () => yup.string().required("City is required"),
    }),
  entityState: yup
    .string()
    .nullable()
    .when("reasonForRescheduling", {
      is: (reasonForRescheduling) =>
        ["3159", "3160"].includes(reasonForRescheduling),
      then: () => yup.string().required("State is required"),
    }),
  entityName: yup.string().when("reasonForRescheduling", {
    is: (reasonForRescheduling) => reasonForRescheduling === "3163",
    then: () => yup.string().required("Employer Name is required"),
  }),
  entityTeleNumber: yup
    .string()
    .matches(/^\d{10}$/, "Telephone number must be exactly 10 digits")
    .when("reasonForRescheduling", {
      is: (reasonForRescheduling) => reasonForRescheduling === "3163",
      then: () => yup.string().required("Contact Number is required"),
    }),
  jobTitle: yup.string().when("reasonForRescheduling", {
    is: (reasonForRescheduling) => reasonForRescheduling === "3163",
    then: () =>
      yup
        .string()
        .required("Job Title is required")
        .matches(
          /^[a-zA-Z0-9\s]*$/,
          "Job Title cannot contain special characters"
        ),
  }),
  issues: yup.array().of(
    yup.object().shape({
      issueType: yup.object(),
      subIssueType: yup.object(),
      issueStartDate: yup.date().nullable().when(["issueType", "subIssueType"], {
        is: (issueType, subIssueType) => {
          return (
            Object.keys(issueType).length && Object.keys(subIssueType).length
          );
        },
        then: () => yup.date().required("Start Date is required"),
      }),
      issueEndDate: yup.date().nullable().when(["issueType", "subIssueType"], {
        is: (issueType, subIssueType) => {
          return (
            Object.keys(issueType).length && Object.keys(subIssueType).length
          );
        },
        then: () => yup.date().required("End Date is required"),
      }),
    })
  ),
  partFullTimeInd: yup.string().when("reasonForRescheduling", {
    is: (reasonForRescheduling) => reasonForRescheduling === "3163",
    then: () =>
      yup
        .string()
        .required("Work schedule is required. Please select a work schedule."),
  }),
});

const availableEventSchema = yup.object().shape({
  claimant: yup.string().required("For is required"),
  claimantId: yup.object().required("claimant is required"),
  staffNotes: yup.string().optional(),
  lateStaffNote: yup.string().when("claimantId", {
    is: (claimantId) => claimantId.beyondReseaDeadline === "Y",
    then: () => yup.string().required("lateStaffNote is required"),
  }),
  informedCmtInd: yup
    .string()
    .oneOf(["Y"], "Please Check Informed Claimant")
    .required("You must check Informed Claimant"),
  status: yup.string().required("Status is required"),
  informedConveyedBy: yup
    .array()
    .of(yup.string())
    .min(1, "At least one information conveyed method must be selected"),
  caseManagerId: yup.string().when("claimant", {
    is: (claimant) => claimant === "Case Manager",
    then: () => yup.string().required("Case Manager is required"),
  }),
});

const reAssignPageValidationSchema = yup.object({
  reassignReasonCd: yup
    .string()
    .required("Reason for Reassignment is required"),
  caseManagerAvl: yup
    .string()
    .required("Case Manager Availability is required"),
  localOffice: yup
    .string()
    .oneOf(["Y", "N"])
    .required("Look Up Case Manager Availability is required"),
});
export {
  individualParametersSchema,
  dropdownListSchema,
  otherConfigWorkSearchRequirementsSchema,
  otherConfigWorkSearchWaiversSchema,
  otherConfigInvesticaseSchema,
  otherConfiInvesticaseSpideringEventsSchema,
  returnToWorkValidationsSchema,
  isDateValid,
  rescheduleValidationSchema,
  availableEventSchema,
  reAssignPageValidationSchema,
};
