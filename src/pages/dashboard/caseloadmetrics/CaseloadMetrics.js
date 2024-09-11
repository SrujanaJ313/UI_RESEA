import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Typography,
  Link,
  Stack,
  ButtonBase,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import client from "../../../helpers/Api";
import { caseloadMetricsURL } from "../../../helpers/Urls";
import { CookieNames, getCookieItem } from "../../../utils/cookies";
import { appointmentStaffListURL } from "../../../helpers/Urls";
import {
  getMsgsFromErrorCode,
  sortAlphabetically,
} from "../../../helpers/utils";

const STAGES = [
  "Initial",
  "First 1-on-1s",
  "Second 1-on-1s",
  "Follow-ups",
  "HI Priority",
  "Failed",
  "Delayed",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  textAlign: "center",
  lineHeight: "10px",
}));

const ContentCell = styled(TableCell)(({ theme }) => ({
  color: "#000000",
  fontWeight: 600,
  textAlign: "center",
  lineHeight: "10px",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
}));

const CaseloadMetrics = React.memo(
  ({ showCalendarView, onSwitchView, onChange }) => {
    const [selectedStage, setSelectedStage] = useState(STAGES[0]);
    const [caseloadMetrics, setCaseloadMetrics] = useState({});
    const [metricLabels, setMetricLabels] = useState([]);
    const [metricValues, setMetricValues] = useState([]);
    const [items, setItems] = useState([]);
    const [appointmentStaffList, setAppointmentStaffList] = useState([]);
    console.log("Items", items);
    const userId = getCookieItem(CookieNames.USER_ID);
    const keyMapping = {
      init: "initialInterview",
      "1stSub": "firstSubInterview",
      "2ndSub": "secondSubInterview",
      "Follow-up": "followUp",
      "HI Priority": "hiPriority",
      Failed: "failed",
      Delayed: "delayed",
    };

    useEffect(() => {
      getCaseloadMetrics();
    }, [items]);

    const getCaseloadMetrics = async () => {
      try {
        const response =
          process.env.REACT_APP_ENV === "mockserver"
            ? await client.get(caseloadMetricsURL)
            : items !== userId
            ? await client.get(`${caseloadMetricsURL}/${items}`)
            : await client.get(`${caseloadMetricsURL}/${userId}`);
        setCaseloadMetrics(response);
      } catch (error) {
        console.error("Failed to fetch caseload metrics", error);
      }
    };

    useEffect(() => {
      if (caseloadMetrics) {
        setMetricLabels(Object.keys(keyMapping));
        setMetricValues(Object.values(keyMapping));
      }
    }, [caseloadMetrics]);
    useEffect(() => {
      async function fetchAppointmentStaffListData() {
        try {
          const data = await client.get(appointmentStaffListURL);
          const sortedData = sortAlphabetically(data);
          setAppointmentStaffList(sortedData);
        } catch (errorResponse) {
          const newErrMsgs = getMsgsFromErrorCode(
            `GET:${process.env.REACT_APP_APPOINTMENT_STAFF_LIST}`,
            errorResponse
          );
          setErrors(newErrMsgs);
        }
      }
      fetchAppointmentStaffListData();
    }, []);

    const handleSwitchView = useCallback(
      (event) => {
        event.preventDefault();
        onSwitchView(event);
      },
      [onSwitchView]
    );

    const handleItemsSelection = (event) => {
      setItems(event.target.value);
    };

    const handleCellClick = (index) => {
      const stage = STAGES[index] || STAGES[0];
      setSelectedStage(stage);
      onChange(caseloadMetrics[keyMapping[metricLabels[index]]]);
    };
    return (
      <Box sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
        <Stack direction="row" spacing={2}>
          <Stack
            direction="row"
            style={{ marginTop: "0.5rem", width: "20rem" }}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="select-source-label">
                Items Assigned To
              </InputLabel>
              <Select
                labelId="select-source-label"
                size="small"
                value={items}
                onChange={handleItemsSelection}
                label="Items Assigned To"
              >
                {appointmentStaffList.map((staff) => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 400 }}
              aria-label="caseload metrics table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  {metricLabels.map((label, index) => (
                    <StyledTableCell key={index}>
                      {/* {caseloadMetrics[label]} */}
                      {label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {metricValues.map((value, index) => {
                    let cellColor = "inherit";
                    if (index === metricValues.length - 2) {
                      cellColor = "orange";
                    } else if (index === metricValues.length - 1) {
                      cellColor = "red";
                    }

                    return (
                      <ContentCell key={index} sx={{ color: cellColor }}>
                        <ButtonBase onClick={() => handleCellClick(index)}>
                          <StyledBox>{caseloadMetrics[value]}</StyledBox>
                        </ButtonBase>
                      </ContentCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>

        <Box
          sx={{
            mt: "21px",
            position: "absolute",
            right: "8px",
            zIndex: "10",
          }}
        >
          <Link
            href="#"
            underline="always"
            color="#183084"
            onClick={handleSwitchView}
          >
            {showCalendarView
              ? "Switch Caseload mode view"
              : "Switch to Interview Calendar View"}
          </Link>
        </Box>

        {!showCalendarView && (
          <Stack direction="row" justifyContent="flex-start" spacing={1}>
            <Typography className="label-text">Stage:</Typography>
            <Typography>{selectedStage}</Typography>
          </Stack>
        )}
      </Box>
    );
  }
);

export default CaseloadMetrics;
