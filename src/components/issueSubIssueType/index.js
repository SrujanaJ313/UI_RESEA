import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { v4 as uuidv4 } from "uuid";
import {
  reschedulingIssueTypesListURL,
  reschedulingSubIssueListURL,
} from "../../helpers/Urls";
import client from "../../helpers/Api";

const IssueSubIssueType = ({ formik }) => {
  console.log('formik errors', formik.errors.issues)
  const [issueTypes, setIssueTypes] = useState([]);
  const [subIssueTypes, setSubIssueTypes] = useState([]);
  useEffect(() => {
    const fetchIssueTypes = async () => {
      try{
        const data =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(reschedulingIssueTypesListURL)
            : await client.get(reschedulingIssueTypesListURL);
        setIssueTypes(data);
      }catch(err){
        console.error('Error in fetchIssueTypes', err);
      }
    };
    fetchIssueTypes();
  }, []);

  const fetchSubIssueTypes = async (issueId) => {
    try{
      const data =
        process.env.REACT_APP_ENV === "mockserver"
          ? await client.get(reschedulingSubIssueListURL)
          : await client.get(`${reschedulingSubIssueListURL}/${issueId}`);
      setSubIssueTypes(data);
    }catch(err){
      console.error('Error in fetchSubIssueTypes', err);
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

  const handleFieldChange = (id, field, value) => {
    const updatedIssues = formik.values.issues.map((issue) =>
      issue.id === id ? { ...issue, [field]: value } : issue
    );
    formik.setFieldValue("issues", updatedIssues);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          {formik.values.issues.map((element) => (
            <Stack
              key={element.id}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={element.issueChecked}
                    onChange={(e) =>
                      handleFieldChange(
                        element.id,
                        "issueChecked",
                        e.target.checked
                      )
                    }
                    name="issueChecked"
                    sx={{ py: 0 }}
                  />
                }
                label={"Issue Type:"}
              />
              <FormControl
                variant="outlined"
                sx={{ minWidth: 200 }}
                size="small"
              >
                <Select
                  label="Issue Type"
                  value={element.issueType.nmiDesc}
                  onChange={(e) => {
                    const issueType = issueTypes.find(i => i.nmiDesc === e.target.value);
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

              <Typography>- Issue Sub:</Typography>

              <FormControl
                variant="outlined"
                sx={{ minWidth: 200 }}
                size="small"
              >
                <Select
                  value={element.subIssueType.nmiDesc}
                  onChange={(e) =>{
                    const subIssueType = subIssueTypes.find(s => s.nmiDesc === e.target.value);
                    handleFieldChange(
                      element.id,
                      "subIssueType",
                      subIssueType
                    )}
                  }
                >
                  {subIssueTypes?.map((subIssue) => (
                    <MenuItem key={subIssue.nmiId} value={subIssue.nmiDesc}>
                      {subIssue.nmiDesc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <DatePicker
                label="*Start Date"
                value={element.issueStartDate}
                onChange={(date) => {
                  handleFieldChange(element.id, "issueStartDate", date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    variant="outlined"
                  />
                )}
              />
              <DatePicker
                label="*End Date"
                value={element.issueEndDate}
                onChange={(date) => {
                  handleFieldChange(element.id, "issueEndDate", date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            </Stack>
          ))}
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="text" type="Button" onClick={addIssue}>
              + Add more
            </Button>
          </Stack>
          {formik?.errors?.issues?.length  && (
            <Stack mt={1} direction="column" useFlexGap flexWrap="wrap">
              {formik?.errors.issues.map((error) => (
                <div style={{display:'flex', flexDirection:'column'}}>
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
    </LocalizationProvider>
  );
};

export default IssueSubIssueType;
