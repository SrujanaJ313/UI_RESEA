import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";

import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

import { Button, FormControl, Select, MenuItem } from "@mui/material";
import { nmiListURL } from "../../../../helpers/Urls";
import client from "../../../../helpers/Api";

function Issues({ issueRows, setIssueRows }) {
  const [issues, setIssues] = useState([]);
  const [subIssues, setSubIssues] = useState({});

  const addNewRow = () => {
    const displayRows = [...issueRows];
    displayRows.push({
      issueType: "",
      issueSubType: "",
      startDate: null,
      endDate: null,
    });
    setIssueRows(displayRows);
  };

  useEffect(() => {
    fetchIssueList();
  }, []);

  const fetchIssueList = async () => {
    try {
      const body = {
        parentNmiId: 0,
        module: "resea",
        page: "appointmentDetails",
      };
      const response = await client.post(nmiListURL, body);
      setIssues(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSubIssuesList = async (issueTypeId) => {
    if (!subIssues[issueTypeId]) {
      try {
        const body = {
          parentNmiId: issueTypeId,
          module: "resea",
          page: "appointmentDetails",
        };
        const response = await client.post(nmiListURL, body);
        const subTypes = { ...subIssues };
        subTypes[issueTypeId] = response;
        setSubIssues(subTypes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleIssueTypeChange = (value, index) => {
    const rowData = [...issueRows];
    rowData[index].issueType = value;
    setIssueRows([...rowData]);
    fetchSubIssuesList(value);
  };

  const handleIssueSubTypeChange = (value, index) => {
    const rowData = [...issueRows];
    rowData[index].issueSubType = value;
    setIssueRows([...rowData]);
  };

  const handleDateChange = (value, index, type) => {
    const rowData = [...issueRows];
    rowData[index][type] = value;
    setIssueRows([...rowData]);
  };

  const handleRemoveClick = (index) => {
    const rowData = [...issueRows];
    rowData.splice(index, 1);
    setIssueRows([...rowData]);
  };

  return (
    <Stack>
      <Typography className="label-text">
        Create issues, if any, based on the information you gathered during this
        interview
      </Typography>

      <Stack mt={1.2}>
        {issueRows.map((row, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            flex={1}
            spacing={2}
            sx={{ mb: 1.2 }}
          >
            <FormControl sx={{ width: 150 }} size="small">
              <InputLabel>Issue Type</InputLabel>
              <Select
                size="small"
                label="Issue Type"
                placeholder="Issue Type"
                value={row.issueType}
                onChange={(event) =>
                  handleIssueTypeChange(event.target.value, index)
                }
              >
                {issues.map((issue) => (
                  <MenuItem key={issue.nmiId} value={issue.nmiId}>
                    {issue.nmiDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 150 }} size="small">
              <InputLabel>Issue Sub Type</InputLabel>
              <Select
                size="small"
                label="Issue Sub Type"
                value={row.issueSubType}
                onChange={(event) =>
                  handleIssueSubTypeChange(event.target.value, index)
                }
              >
                {subIssues[row.issueType]?.map((subIssue) => (
                  <MenuItem key={subIssue.nmiId} value={subIssue.nmiId}>
                    {subIssue.nmiDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FormControl style={{ width: "9rem", marginLeft: 10 }}>
                <DatePicker
                  name="start"
                  label="Start Date"
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  value={row.startDate}
                  onChange={(value) => {
                    handleDateChange(value, index, "startDate");
                  }}
                />
              </FormControl>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FormControl style={{ width: "9rem", marginLeft: 10 }}>
                <DatePicker
                  name="end"
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  label="End Date"
                  value={row.endDate}
                  onChange={(value) => {
                    handleDateChange(value, index, "endDate");
                  }}
                />
              </FormControl>
            </LocalizationProvider>
            <IconButton
              sx={{ padding: "0px", marginRight: "20px !important" }}
              onClick={() => handleRemoveClick(index)}
              disabled={issueRows.length === 1}
            >
              <RemoveCircleIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
        <Stack
          direction="row"
          justifyContent="end"
          sx={{ mt: "0px !important" }}
        >
          <Button sx={{ paddingY: 0 }} onClick={addNewRow}>
            + Add more
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Issues;