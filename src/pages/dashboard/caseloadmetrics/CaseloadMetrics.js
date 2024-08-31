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
// Constants for stage labels
const STAGES = [
  "Initial",
  "First 1-on-1s",
  "Second 1-on-1s",
  // "Third 1-on-1s",
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
    const [items, setItems] = useState("Myself");
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
            : await client.get(`${caseloadMetricsURL}/${userId}`);
        // const response = await client.get(caseloadMetricsURL);
        // const response = [
        //   {
        //     "firstOneOnOneLabel": "1st 1-on-1",
        //     "firstOneOnOneValue": 15,
        //     "secondOneOnOneLabel": "2nd 1-on-1",
        //     "secondOneOnOneValue": 10,
        //     "thirdOneOnOneLabel": "3rd 1-on-1",
        //     "thirdOneOnOneValue": 5,
        //     "followUpLabel": "Follow-ups",
        //     "followUpValue": 12,
        //     "highPriorityLabel": "HI Priority",
        //     "highPriorityValue": 6
        //   }
        // ]

        setCaseloadMetrics(response[0]);
      } catch (error) {
        console.error("Failed to fetch caseload metrics", error);
      }
    };

    useEffect(() => {
      if (caseloadMetrics) {
        // const labels = Object.keys(caseloadMetrics).filter((key) =>
        //   key.includes("Label")
        // );
        setMetricLabels(Object.keys(keyMapping));
        // const values = Object.keys(caseloadMetrics).filter((key) =>
        //   key.includes("Value")
        // );

        setMetricValues(Object.values(keyMapping));
      }
    }, [caseloadMetrics]);

    const handleSwitchView = useCallback(
      (event) => {
        event.preventDefault();
        onSwitchView(event);
      },
      [onSwitchView],
    );

    const handleItemsSelection = (event) => {
      setItems(event.target.value);
    };

    const handleCellClick = (index) => {
      const stage = STAGES[index] || STAGES[0];
      setSelectedStage(stage);
      // onChange(caseloadMetrics[metricLabels[index]]);
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
                // value={"Myself"}
                value={items}
                onChange={handleItemsSelection}
                label="Items Assigned To"
              >
                <MenuItem value="Myself">Myself</MenuItem>
                <MenuItem value="Jyothi">Jyothi</MenuItem>
                <MenuItem value="Anand">Anand</MenuItem>
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
            zIndex: "10"
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
  },
);

export default CaseloadMetrics;
