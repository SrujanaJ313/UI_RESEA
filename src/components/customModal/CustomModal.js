import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import theme from "../../theme/theme";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#alert-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function CustomModal(props) {
  const {
    title,
    children,
    open,
    onClose,
    maxWidth = "sm",
    fullWidth = true,
    PaperProps,
  } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      disableEnforceFocus
      fullScreen={!!isMobile}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      PaperProps={PaperProps}
      sx={{
        zIndex: isMobile ? 1306 : 1300,
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            borderRadius: isMobile ? "0px" : theme.spacing(0.5),
          },
        },
        // "& .MuiDialogContent-root": {
        //     display: "flex",
        //     // padding: 0,
        //     overflowX: "hidden",
        //     ...(disableScroll && {
        //         overflow: "hidden",
        //     }),
        // },
        "& .MuiDialogActions-root": {
          padding: 0,
        },
        "& .MuiDialogTitle-root": {
          padding: theme.spacing(1.5, 4),
          borderBottom: `1px solid ${theme.palette.text.secondary}`,
        },
      }}
      transitionDuration={{
        enter: theme.transitions.duration.enteringScreen,
        exit: 0,
      }}
      onClose={onClose}
      PaperComponent={PaperComponent}
    >
      <DialogTitle
        id="alert-dialog-title"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ backgroundColor: "#d2dfee", color: "#162e83" }}
        style={{ padding: "0.25rem" }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-start"
          sx={{
            position: "relative",
          }}
        >
          <Typography
            variant="title1"
            whiteSpace="nowrap"
            color={"#162e83"}
            style={{
              fontWeight: "bold",
              fontSize: "0.9rem",
              padding: "0",
              paddingLeft: 16,
            }}
          >
            {title}
          </Typography>
        </Stack>
        {onClose ? (
          <IconButton
            size="small"
            aria-label="close"
            sx={{
              position: "absolute",
              right: "1rem",
              top: "0.2rem",
              color: "black",
              padding: "0",
              // color: (theme) => theme.palette.grey[500],
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      {children}
    </Dialog>
  );
}

export default CustomModal;
