import React, { Fragment, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import moment from "moment";
import RescheduleRequest from "./RescheduleRequest";
import ReturnedToWork from "./ReturnedToWork";
import AppointmentDetails from "./AppointmentDetails";

function ScheduleEvent({ event, onClose }) {
  const [type, setType] = useState("");

  const handleSubmit = () => {
    onClose();
  };

  const workSearchValues = [
    {
      date: "6/29/2024",
      value: 2,
      min: 2,
    },
    {
      date: "6/22/2024",
      value: 2,
      min: 2,
    },
    {
      date: "6/15/2024",
      value: 3,
      min: 4,
    },
  ];

  const getTitle = () => {
    switch (type) {
      case "reschedule":
        return "Reschedule Request";
      case "returnToWork":
        return "Details of return to work";
      case "appointmentDetails":
        return "Appointment Details";
      case "noShow":
        return "";

      default:
        return "";
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack width="75%" spacing={2}>
              <Stack direction="row" spacing={4}>
                <Stack direction={"row"} spacing={1}>
                  <Typography className="label-text">Weeks Field:</Typography>
                  <Typography>3</Typography>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <Typography className="label-text">
                    Orientation Date:
                  </Typography>
                  <Typography>6/27/2024 - 0 Reschedules</Typography>
                </Stack>
              </Stack>
              <Stack sx={{ fontWeight: 600 }}>
                <Link href="https://us02web.zoom.us/j/7651023436?pwd=MOdGMIO1TFVROXIxYWRRNRQ2drQwrz09">
                  https://us02web.zoom.us/j/7651023436?pwd=MOdGMIO1TFVROXIxYWRRNRQ2drQwrz09
                </Link>
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <Typography className="label-text">Meeting ID:</Typography>
                    <Typography>7651023436</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography className="label-text">Passcode:</Typography>
                    <Typography>771877</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Typography className="label-text">Dial:</Typography>
                    <Typography>
                      +1 646 931 2860 US +1 929 205 6099 US (New York)
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" padding={1.5} spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => setType("reschedule")}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setType("returnToWork")}
                  >
                    Returned to Work
                  </Button>
                </Stack>
                <Button
                  variant="contained"
                  sx={{ height: "fit-content" }}
                  onClick={() => setType("appointmentDetails")}
                >
                  Appointment Details
                </Button>
                <Button
                  variant="contained"
                  sx={{ height: "fit-content" }}
                  onClick={() => setType("noShow")}
                >
                  No Show
                </Button>
              </Stack>
            </Stack>

            <Stack width="20%" alignItems="flex-end" spacing={0.5}>
              <Stack direction="row" fullWidth spacing={4}>
                <Stack width="80%">
                  <Typography className="label-text">Work Search</Typography>
                </Stack>
                <Stack width="20%">
                  <Typography className="label-text">Min</Typography>
                </Stack>
              </Stack>
              {workSearchValues.map((x, index) => (
                <Stack direction="row" fullWidth key={index} spacing={4}>
                  <Stack width="80%" direction="row" spacing={1.5}>
                    <Typography
                      style={{ textDecoration: "underline" }}
                      className="label-text"
                    >
                      {x.date}:
                    </Typography>
                    <Typography>{x.value}</Typography>
                  </Stack>
                  <Stack width="20%">
                    <Typography>{x.min}</Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack mt={2}>
            <Typography fontWeight={600} fontSize={"1rem"} color="primary">
              {getTitle()}
            </Typography>
          </Stack>
          <Divider sx={{ marginY: 1 }} />
          {type === "reschedule" && (
            <Stack>
              <RescheduleRequest onCancel={() => setType("")} />
            </Stack>
          )}
          {type === "returnToWork" && (
            <Stack>
              <ReturnedToWork onCancel={() => setType("")} />
            </Stack>
          )}
          {type === "appointmentDetails" && (
            <Stack>
              <AppointmentDetails onCancel={() => setType("")} />
            </Stack>
          )}
          {type === "noShow" && <Stack></Stack>}
        </Stack>
      </DialogContent>
    </>
  );
}

export default ScheduleEvent;
