import React, { useState } from "react";
import { TableCell, TableRow, Radio, Stack, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  lineHeight: "1rem",
}));

const CaseModeTableRow = ({ row }) => {
  // const [selectedRow, setSelectedRow] = useState(null);
  // console.log("selectedRow-->", selectedRow);
  return (
    <TableRow key={row?.caseNum}>
      <StyledTableCell padding="checkbox">
        {/* <Radio
          size="small"
          checked={selectedRow === row?.caseNum}
          onClick={() => setSelectedRow(row?.caseNum)}
          value={selectedRow?.caseNum}
        /> */}
        <FormControlLabel
          value={row?.caseNum}
          control={<Radio />}
          label="" 
        />
      </StyledTableCell>
      <StyledTableCell>
        <Stack spacing={1.5} direction="row">
          {`${row.claimant} - ${row.claimantId}`}
        </Stack>
      </StyledTableCell>
      <StyledTableCell>{row.bye}</StyledTableCell>
      <StyledTableCell sx={{ color: row.statusColor }}>
        <Stack spacing={1.5} direction="row">
          {`${row.status} (${row.statusNumber})`}
        </Stack>
      </StyledTableCell>
      <StyledTableCell>{row.weeks}</StyledTableCell>
      <StyledTableCell sx={{ color: row.followUpColor }}>
        {row.followUp}
      </StyledTableCell>
      <StyledTableCell sx={{ color: row.indicatorColor }}>
        {row.indicators}
      </StyledTableCell>
    </TableRow>
  );
};

export default CaseModeTableRow;
