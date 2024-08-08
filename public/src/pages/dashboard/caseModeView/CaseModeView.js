import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import CaseModeTableRow from "./CaseModeTableRow";
import { caseModeViewURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  // textAlign: "center",
  lineHeight: "1rem",
}));

const CaseModeView = ({ selectedStage }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getCaseModeViewData(selectedStage);
  }, [selectedStage]);

  const getCaseModeViewData = async (stage) => {
    try {
      const response = await client.get(caseModeViewURL);
      const filteredData = response.filter(
        (caseMode) => caseMode.stage.toLowerCase() === stage.toLowerCase(),
      );
      setRows(filteredData);
    } catch (error) {
      console.error("Failed to fetch case mode view", error);
    }
  };

  return (
    <Box sx={{ paddingTop: 3, paddingBottom: 2 }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 750 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Claimant</StyledTableCell>
              <StyledTableCell>BYE</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell># Weeks</StyledTableCell>
              <StyledTableCell>Follow-up</StyledTableCell>
              <StyledTableCell>Indicators</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <CaseModeTableRow key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaseModeView;
