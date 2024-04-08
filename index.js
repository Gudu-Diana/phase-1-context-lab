function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
    return record;
  }
  
  function createTimeOutEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
    return record;
  }
  
  function hoursWorkedOnDate(record, soughtDate) {
    const inEvent = record.timeInEvents.find(event => event.date === soughtDate);
    const outEvent = record.timeOutEvents.find(event => event.date === soughtDate);
  
    if (inEvent && outEvent) {
      return outEvent.hour - inEvent.hour;
    } else {
      return 0; // Handle missing events (consider logging or throwing an error)
    }
  }
  
  function wagesEarnedOnDate(record, dateSought) {
    const hours = hoursWorkedOnDate(record, dateSought);
    return hours * record.payPerHour;
  }
  
  function allWagesFor(record) {
    return record.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(record, date);
    }, 0);
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName);
  }
  
  function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce((totalPayroll, employeeRecord) => {
      return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
  }
  

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

