import "./Timetable.css";
import React, { useState, useEffect } from 'react';

export default function App() {

  const Period_Settings = [
    {
      period: 1,
      from: {hour: 8, minute: 40},
      to: {hour: 9, minute: 25}
    },
    {
      period: 2,
      from: {hour: 9, minute: 29},
      to: {hour: 10, minute: 14}
    },
    {
      period: 3,
      from: {hour: 10, minute: 18},
      to: {hour: 11, minute: 3}
    },
    {
      period: 4,
      from: {hour: 11, minute: 7},
      to: {hour: 11, minute: 52}
    },
    {
      period: 5,
      from: {hour: 11, minute: 56},
      to: {hour: 12, minute: 41}
    },
    {
      period: 6,
      from: {hour: 12, minute: 45},
      to: {hour: 13, minute: 20}
    },
    {
      period: 7,
      from: {hour: 13, minute: 22},
      to: {hour: 14, minute: 7}
    },
    {
      period: 8,
      from: {hour: 14, minute: 10},
      to: {hour: 14, minute: 55}
    },
    
  ]

  const InBounds = (StartHr, StartMin, NowHr, NowMin, EndHr, EndMin) => {
    if (NowHr >= StartHr && NowHr <= EndHr) {
      console.log("Yes Hr")
      if (NowMin >= StartMin && NowMin <= EndMin){
        console.log("Yes Min")
        return true
      } else {
        return false
      }
    }
  }

  
  function getCurrentPeriod(currentHr,currentMin){
    const HoursToMinute = (x) => {return x*60};
    let candidatePeriods = Period_Settings.filter((index) => (HoursToMinute(index.from.hour) + index.from.minute <= HoursToMinute(currentHr) + currentMin) && (HoursToMinute(index.to.hour) + index.to.minute >=HoursToMinute(currentHr) + currentMin));
    
    if (candidatePeriods.length == 1) {
      return candidatePeriods[0].period;
    } else if (candidatePeriods.length > 1) {
      return "Error: Multiple Periods selected"
    } else {
      return "Out of Bounds"
    }
  }


  const PeriodDefaultColor = "#ffffff";
  const PeriodHighlightColor = "rgb(0,180,180)";
  const PeriodErrorColor = "rgb(255,0,0)";
  function HighlightPeriod(SelectedPeriod) {
    const PeriodElements = document.querySelectorAll(".Periods");
    if (SelectedPeriod == "Error"){
      PeriodElements.forEach((E) => {
        if (E !== SelectedPeriod) {
          E.style.backgroundColor = PeriodErrorColor;
        }
      })
      return
    }

    PeriodElements.forEach((E) => {
      if (E !== SelectedPeriod) {
        E.style.backgroundColor = PeriodDefaultColor;
        E.style.color = "black";
      }
    })
    SelectedPeriod.style.backgroundColor = PeriodHighlightColor;
    SelectedPeriod.style.color = "white";
  }
  
  function UpdateCurrentView(){
    const CurrentTime = new Date();
    const CurrentHour = CurrentTime.getHours();
    const CurrentMinute = CurrentTime.getMinutes();
    console.log("CH"+CurrentHour + "CM" + CurrentMinute);
    const PeriodNumber = getCurrentPeriod(CurrentHour, CurrentMinute);

    if (PeriodNumber == "Out of Bounds") {
      console.log("Out of Bounds");
      HighlightPeriod("Error");
      return
    }
    if (PeriodNumber == "Error: Multiple Periods selected") {
      console.log("Error: Multiple Periods selected");
      HighlightPeriod("Error");
      return
    }
    
    const PeriodElement = document.querySelector(`.Period${PeriodNumber}`)
    if (PeriodElement) {
      HighlightPeriod(PeriodElement);
    }
  }

  setInterval(UpdateCurrentView, 60000); // Autoupdate every minute

   useEffect(() => {
      // call api or anything
      UpdateCurrentView();
   });
  
  return (
    <>
    <button className="p-6 bg-green-100" onClick={() => UpdateCurrentView()}>Update</button>
    <table>
      <thead>
        <tr className="Table-Head">
          <th>Period / Description</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        <tr className="Periods Period1">
          <td>Period 1</td>
          <td>8:40 AM</td>
          <td>9:25 AM</td>
          <td>45 minutes</td>
        </tr>
        <tr className="Periods Period2">
          <td>Period 2</td>
          <td>9:29 AM</td>
          <td>10:14 AM</td>
          <td>45 minutes</td>
        </tr>
        <tr className="Periods Period3">
          <td>Period 3</td>
          <td>10:18 AM</td>
          <td>11:03 AM</td>
          <td>45 minutes</td>
        </tr>
        <tr className="Periods Period4">
          <td>Period 4</td>
          <td>11:07 AM</td>
          <td>11:52 AM</td>
          <td>45 minutes</td>
        </tr>
        <tr className="Periods Period5">
          <td>Period 5</td>
          <td>11:56 AM</td>
          <td>12:41 PM</td>
          <td>45 minutes</td>
        </tr>
        <tr className="Periods Period6">
          <td>Period 6</td>
          <td>12:45 PM</td>
          <td>1:20 PM</td>
          <td>35 minutes</td>
        </tr>
        <tr className="Periods Period7">
          <td>Period 7</td>
          <td>1:22 PM</td>
          <td>2:07 PM</td>
          <td>45 minutes</td>
        </tr>
        <tr className="Periods Period8">
          <td>Period 8</td>
          <td>2:10 PM</td>
          <td>2:55 PM</td>
          <td>45 minutes</td>
        </tr>
      </tbody>
    </table>
    </>
  );
}
