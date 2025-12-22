import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const MyCalendar = () => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={[]} // array of events
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);
export default MyCalendar;
