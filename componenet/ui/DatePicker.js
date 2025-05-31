import React, { useState, useRef, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
  parse,
} from 'date-fns';

const DatePicker = ({selectedDate, setSelectedDate}) => {
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
 const monthRef = useRef();
  const yearRef = useRef();
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        monthRef.current &&
        !monthRef.current.contains(event.target)
      ) {
        setShowMonthDropdown(false);
      }
      if (
        yearRef.current &&
        !yearRef.current.contains(event.target)
      ) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2000, i), 'MMMM')
  );

  const yearOptions = Array.from({ length: 100 }, (_, i) => 1950 + i);
  console.log(selectedDate)

  const renderHeader = () => {
    return (
      <div className=" flex justify-between items-center p-2 bg-gray-200 z-21">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          &#8592;
        </button>
        <div className="flex items-center space-x-2">
         <div className="relative" ref={monthRef}>
  <button onClick={() => setShowMonthDropdown(!showMonthDropdown)}>
    {format(currentMonth, 'MMMM')}
  </button>
  {showMonthDropdown && (
    <div className="absolute bg-white shadow rounded z-10">
      {monthNames.map((month, idx) => (
        <div
          key={month}
          onClick={() => {
            setCurrentMonth(new Date(currentMonth.getFullYear(), idx, 1));
            setShowMonthDropdown(false);
          }}
          className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
        >
          {month}
        </div>
      ))}
    </div>
  )}
</div>

<div className="relative" ref={yearRef}>
  <button onClick={() => setShowYearDropdown(!showYearDropdown)}>
    {format(currentMonth, 'yyyy')}
  </button>
  {showYearDropdown && (
    <div className="absolute bg-white shadow rounded z-10 max-h-40 overflow-y-auto">
      {yearOptions.map((year) => (
        <div
          key={year}
          onClick={() => {
            setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
            setShowYearDropdown(false);
          }}
          className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
        >
          {year}
        </div>
      ))}
    </div>
  )}
</div>

        </div>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          &#8594;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold">
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`p-2 text-center cursor-pointer ${
              !isSameMonth(day, monthStart) ? 'text-gray-400' : ''
            } ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white rounded-full' : ''}`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            {format(day, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="w-80 mx-auto mt-10 border rounded shadow p-2 bg-white relative">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default DatePicker;
