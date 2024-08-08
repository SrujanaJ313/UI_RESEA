import * as yup from "yup";

const individualParametersSchema = (
  disableEffectiveUntil,
  isOpenEndedExist,
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

export {
  individualParametersSchema,
  dropdownListSchema,
  otherConfigWorkSearchRequirementsSchema,
  otherConfigWorkSearchWaiversSchema,
  otherConfigInvesticaseSchema,
  otherConfiInvesticaseSpideringEventsSchema,
};
