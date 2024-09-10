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
  Button,
  Stack,
  DialogContent,
  Typography,
} from "@mui/material";
import CaseModeTableRow from "./CaseModeTableRow";
import { caseModeViewURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import ReAssignCase from "./ReAssignCase";
import CustomModal from "../../../components/customModal/CustomModal";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  // textAlign: "center",
  lineHeight: "1rem",
}));

const CaseModeView = ({ selectedStage }) => {
  const [rows, setRows] = useState([]);
  const [type, setType] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCaseModeViewData(selectedStage);
  }, [selectedStage]);

  const getCaseModeViewData = async (stage) => {
    try {
      const response = await client.get(caseModeViewURL);
      const filteredData = response.filter(
        (caseMode) => caseMode.stage.toLowerCase() === stage.toLowerCase()
      );
      setRows(filteredData);
    } catch (error) {
      console.error("Failed to fetch case mode view", error);
    }
  };

  const getTitle = () => {
    if (type === "reassign") {
      return `Case: ${"Frank Tiles"} - BYE: ${moment(new Date()).format(
        "MM/DD/YYYY"
      )}`;
    }
  };

  return (
    <>
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
      <CustomModal title={getTitle()} open={open} maxWidth="md">
        <DialogContent dividers sx={{ paddingBottom: 1 }}>
          <Stack>
            {type && (
              <Stack mt={2}>
                <Typography fontWeight={600} fontSize={"1rem"} color="primary">
                  ReAssign Case
                </Typography>
              </Stack>
            )}
            {type === "reassign" && (
              <Stack>
                {/* <ReAssignCase onCancel={() => setType("")} event={event} /> */}
                <ReAssignCase onCancel={() => setOpen(false)} />
              </Stack>
            )}
          </Stack>
        </DialogContent>
      </CustomModal>

      <div style={{display:"flex", justifyContent:"flex-end"}}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
          setType("reassign");
        }}
      >
        ReAssign Page
      </Button>
      </div>
    </>
  );
};

export default CaseModeView;
