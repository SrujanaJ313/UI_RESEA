import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { v4 as uuidv4 } from "uuid";
import { reschedulingIssueListURL } from "../../helpers/Urls";
import client from "../../helpers/Api";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";

const IssueSubIssueType = ({ formik }) => {
  const [issueTypes, setIssueTypes] = useState([]);
  const [subIssueTypes, setSubIssueTypes] = useState([]);
  useEffect(() => {
    const fetchIssueTypes = async () => {
      try {
        const payload = {
          parentNmiId: 0,
          module: "resea",
          page: "reschedule",
        };
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(reschedulingIssueListURL)
            : await client.post(reschedulingIssueListURL, payload);
        setIssueTypes(data);
      } catch (err) {
        console.error("Error in fetchIssueTypes", err);
      }
    };
    fetchIssueTypes();
  }, []);

  const fetchSubIssueTypes = async (issueId) => {
    try {
      const payload = {
        parentNmiId: issueId,
        module: "resea",
        page: "reschedule",
      };
      const data =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(reschedulingIssueListURL)
          : await client.post(reschedulingIssueListURL, payload);
      setSubIssueTypes(data);
    } catch (err) {
      console.error("Error in fetchSubIssueTypes", err);
    }
  };

  const addIssue = () => {
    formik.setFieldValue("issues", [
      ...formik.values.issues,
      {
        id: uuidv4(),
        issueChecked: false,
        issueType: "",
        subIssueType: "",
        issueStartDate: null,
      },
    ]);
  };

  const handleRemoveClick = (id) => {
    const updatedIssues = formik.values.issues.filter(
      (issue) => issue.id !== id
    );
    formik.setFieldValue("issues", updatedIssues);
  };

  const handleFieldChange = (id, field, value) => {
    const updatedIssues = formik.values.issues.map((issue) =>
      issue.id === id ? { ...issue, [field]: value } : issue
    );
    formik.setFieldValue("issues", updatedIssues);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        {formik.values.issues.map((element) => (
          <Stack
            key={element.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
              <InputLabel id="IssueType">*Issue Type</InputLabel>
              <Select
                label="Issue Type"
                value={element.issueType.nmiDesc}
                onChange={(e) => {
                  const issueType = issueTypes.find(
                    (i) => i.nmiDesc === e.target.value
                  );
                  handleFieldChange(element.id, "issueType", issueType);
                  fetchSubIssueTypes(issueType.nmiId);
                }}
                required
              >
                {issueTypes?.map((issue) => (
                  <MenuItem key={issue.nmiId} value={issue.nmiDesc}>
                    {issue.nmiDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
              <InputLabel id="IssueSubType">*Issue SubType</InputLabel>
              <Select
                label="Issue SubType"
                value={element.subIssueType.nmiDesc}
                onChange={(e) => {
                  const subIssueType = subIssueTypes.find(
                    (s) => s.nmiDesc === e.target.value
                  );
                  handleFieldChange(element.id, "subIssueType", subIssueType);
                }}
              >
                {subIssueTypes?.map((subIssue) => (
                  <MenuItem key={subIssue.nmiId} value={subIssue.nmiDesc}>
                    {subIssue.nmiDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl style={{ width: "9rem", marginLeft: 10 }}>
                <DatePicker
                  label="*Start Date"
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  value={element.issueStartDate}
                  onChange={(date) => {
                    handleFieldChange(element.id, "issueStartDate", date);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" variant="outlined" />
                  )}
                />
              </FormControl>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl style={{ width: "9rem", marginLeft: 10 }}>
                <DatePicker
                  label="*End Date"
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  value={element.issueEndDate}
                  onChange={(date) => {
                    handleFieldChange(element.id, "issueEndDate", date);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" variant="outlined" />
                  )}
                />
              </FormControl>
            </LocalizationProvider>
            <IconButton
              sx={{ padding: "0px", marginRight: "20px !important" }}
              onClick={() => handleRemoveClick(element.id)}
              disabled={element.id === formik.values.issues[0].id}
            >
              <RemoveCircleIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="text" type="Button" onClick={addIssue}>
            + Add more
          </Button>
        </Stack>
        {formik?.errors?.issues?.length && (
          <Stack mt={1} direction="column" useFlexGap flexWrap="wrap">
            {formik?.errors.issues.map((error) => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="errorMsg">{error?.issueType}</span>
                <span className="errorMsg">{error?.subIssueType}</span>
                <span className="errorMsg">{error?.issueStartDate}</span>
                <span className="errorMsg">{error?.issueEndDate}</span>
              </div>
            ))}
          </Stack>
        )}
      </Stack>
    </form>
  );
};

export default IssueSubIssueType;
