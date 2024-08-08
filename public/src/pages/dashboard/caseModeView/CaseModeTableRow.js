import React from "react";
import { TableCell, TableRow, Radio, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  lineHeight: "1rem",
}));

const CaseModeTableRow = ({ row }) => {
  return (
    <TableRow>
      <StyledTableCell padding="checkbox">
        <Radio size="small" />
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
