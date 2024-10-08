import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import PerformanceMetrics from "./performancemetrics/PerformanceMetrics";
import CaseloadMetrics from "./caseloadmetrics/CaseloadMetrics";
import CaseModeView from "./caseModeView/CaseModeView";
import InterviewCalendarView from "./interviewCalendarView";

const Dashboard = () => {
  const [isCalendarView, setIsCalendarView] = useState(true);
  const [stage, setStage] = useState("1st 1-on-1");

  const handleSwitchView = useCallback(() => {
    setIsCalendarView((prev) => !prev);
  }, []);

  const handleMetricChange = useCallback((selectedStage) => {
    setStage(selectedStage);
  }, []);

  return (
    <Box>
      <Grid container sx={{ border: "2px solid #000" }}>
        <Grid item xs={12} sm={3} xl={3}>
          <PerformanceMetrics />
        </Grid>
        <Grid item xs={12} sm={9} xl={9} maxHeight={"100%"} sx={{padding: 1}}>
          <Box>
            <CaseloadMetrics
              showCalendarView={isCalendarView}
              onSwitchView={handleSwitchView}
              onChange={handleMetricChange}
            />
            {isCalendarView ? (
              <InterviewCalendarView />
            ) : (
              <CaseModeView selectedStage={stage} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
