import { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Box from "@mui/material/Box";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AvailableEvent from "./AvailableEvent";
import CustomModal from "../../../components/customModal/CustomModal";
import ScheduleEvent from "./ScheduleEvent";
import { calendarDetailsURL } from "../../../helpers/Urls";
import client from "../../../helpers/Api";
import { CookieNames, getCookieItem } from "../../../utils/cookies";

const localizer = momentLocalizer(moment);

function InterviewCalendarView() {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState();
  const [events, setEvents] = useState([]);

  const showEventInfo = (event) => {
    if (
      event.type === "FirstSubsequentAppointment" ||
      event.type === "SecondSubsequentAppointment" ||
      event.type === "InitialAppointment" ||
      (event.type === "Available" &&
        moment.duration(moment(event.start).diff(moment())).asMinutes() > 15)
    ) {
      setEvent(event);
      setOpen(true);
    }
  };

  useEffect(() => {
    const start = moment().startOf("week").add(1, "days").format("MM/DD/YYYY");
    const end = moment().endOf("week").subtract(1, "days").format("MM/DD/YYYY");
    getCalendarEvents(start, end);
  }, []);

  const getCalendarEvents = async (start, end) => {
    try {
      const payload = {
        userId: Number(getCookieItem(CookieNames.USER_ID)),
        startDt: start,
        endDt: end,
      };

      const response = process.env.REACT_APP_ENV === "mockserver"? await client.get(calendarDetailsURL, payload): await client.post(calendarDetailsURL, payload);
      const data = response.map((event) => {
        const startDate = new Date(event.appointmentDt);
        const startHours = parseInt(event.startTime.substring(0, 2));
        const startMinutes = parseInt(event.startTime.substring(3, 5));

        if (event.startTime.endsWith("PM")) {
          startDate.setHours(startHours + 12, startMinutes, 0);
        } else {
          startDate.setHours(startHours, startMinutes, 0);
        }

        const endDate = new Date(event.appointmentDt);
        const endHours = parseInt(event.endTime.substring(0, 2));
        const endMinutes = parseInt(event.endTime.substring(3, 5));

        if (event.endTime.endsWith("PM")) {
          endDate.setHours(endHours + 12, endMinutes, 0);
        } else {
          endDate.setHours(endHours, endMinutes, 0);
        }
        return {
          id: event.rsicId,
          title: event.label,
          start: startDate,
          end: endDate,
          appointmentType: event.appointmentType,
          type: event.type,
        };
      });
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch case mode view", error);
    }
  };

  const eventPropGetter = (event) => {
    let backgroundColor = "#CAD5DA";
    let color = "black";

    if (event.type === "TimeOff") {
      backgroundColor = "#fbe3d6";
    } else if (event.type === "StateHoliday") {
      backgroundColor = "#bfbdbf";
    } else if (event.type === "Available") {
      color = "red";
      backgroundColor = "#F8F9F8";
    } else {
      if (moment(event.end) - moment(event.start) === 3600000) {
        backgroundColor = "#dcebf6";
      } else if (moment(event.end) - moment(event.start) === 5400000) {
        backgroundColor = "#DDDBD2";
      } else {
        backgroundColor = "#c2f1c9";
      }
    }
    return {
      style: {
        backgroundColor,
        color,
        fontSize: "1rem",
        textAlign: "center",
        height: "auto",
      },
    };
  };

  const formats = {
    eventTimeRangeFormat: () => {
      return "";
    },
  };

  const getTitle = () => {
    if (event.title.toLowerCase() === "available") {
      return "Available";
    } else {
      return `Initial Appointment: ${event.title} - BYE: ${moment(
        event.start,
      ).format("MM/DD/YYYY")}`;
    }
  };

  const onRangeChange = useCallback((range) => {
    const start = moment(range[0]).format("MM/DD/YYYY");
    const end = moment(range[range.length - 1]).format("MM/DD/YYYY");
    getCalendarEvents(start, end);
  }, []);

  return (
    <Box sx={{
      paddingTop: 1,
      paddingBottom: 2,
      transform: "scaleY(0.9)",
      position: "relative",
      top: "-1.5rem"
    }}>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="work_week"
        events={events}
        style={{ height: "90vh" }}
        onSelectEvent={(event) => showEventInfo(event)}
        showMultiDayTimes={false}
        onRangeChange={onRangeChange}
        step={30}
        formats={formats}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0)}
        eventPropGetter={eventPropGetter}
        views={{
          month: false,
          week: false,
          work_week: true,
          day: false,
          agenda: false,
        }}
      />

      {open && event && (
        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          title={getTitle()}
          maxWidth={"md"}
        >
          {event && event.title.toLowerCase() === "available" ? (
            <>
              <AvailableEvent event={event} onClose={() => setOpen(false)} />
            </>
          ) : (
            <>
              <ScheduleEvent event={event} onClose={() => setOpen(false)} />
            </>
          )}
        </CustomModal>
      )}
    </Box>
  );
}

export default InterviewCalendarView;
