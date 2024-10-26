import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CalendarPicker.module.css';

const CalendarPicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.calendarWrapper}>
      <DatePicker 
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
      />
    </div>
  );
};

export default CalendarPicker;
