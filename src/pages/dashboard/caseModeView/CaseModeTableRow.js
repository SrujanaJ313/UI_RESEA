import React, { useState } from "react";
import { TableCell, TableRow, Radio, Stack, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  lineHeight: "1rem",
}));

const CaseModeTableRow = ({ row, selectedRow, setSelectedRow }) => {
  return (
    <TableRow key={row?.caseNum}>
      <StyledTableCell padding="checkbox">
        <FormControlLabel
          value={row?.caseNum}
          control={<Radio />}
          label=""
          checked={row?.caseNum === selectedRow.caseNum}
          onChange={() => {
            // const row = rows?.find((r) => r.caseNum === Number(e.target.value));
            setSelectedRow(row);
          }}
        />
      </StyledTableCell>
      //Don't Copy Below Changes, copy only above changes
      <StyledTableCell>{row.claimant}</StyledTableCell>
      <StyledTableCell>{row.bye}</StyledTableCell>
      <StyledTableCell>{row.stage}</StyledTableCell>
      <StyledTableCell sx={{ color: row.statusColor }}>
        {row.status} ({row.statusNumber})
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
