  // jQuery to wait for all elements to load before DOM elements are selected 
  $(function () {
  
    // save button
    const calendarEl = $('.container-lg');

    // variables
    const workDayElArr = ['#hour-09', '#hour-10',  '#hour-11', '#hour-12', '#hour-13', '#hour-14', '#hour-15', '#hour-16', '#hour-17']
    let workHours = [];

    // helper functions
    function getTime() {
      var currentTime = dayjs();
      return currentTime
    }

    function cycleWorkHours(workHrsArr) {
      for(const hour of workHrsArr) {
        workHours.push(hour);
        setHourStatus(hour);
      }
    }

    // initialize calendar
    function init() {
      // set display time
      displayTime();
      // check local storage for events that need to be displayed
      const dayCheck = getTime().format('MMMM D, YYYY');
      const storedData =  getStoredData();
      if(storedData) {
        let storedCalendarDay = storedData[0].day;
        if (dayCheck === storedCalendarDay){
          // copy stored data to workHours 
          cycleWorkHours(storedData);
        } else {
          createHours(workDayElArr);
        }
      } else {
        createHours(workDayElArr);
      }
    }

    // function to create workDay object to contain all data for day
    function createHours(hrElementArr) {
      // fill object with 8 hours of data
      for(let i = 9; i < 18; ++i) {
        const hour = {
        day: dayjs().format('MMMM D, YYYY'),
        id: hrElementArr[i - 9],
        hour: i,
        scheduled_event: ""
        };
        setHourStatus(hour);
        workHours.push(hour);
        localStorage.setItem("Daily Calendar" , JSON.stringify(workHours));
      }
    }

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    // Event listener for save buttons
    calendarEl.on('click', '.saveBtn', function() {
      var hrId = $(this).closest('.time-block').attr('id');
      // find the textArea content
      var scheduleMsg = $(this).closest('.time-block').find('.description').val();
      // save to object
      saveCalendarContent(hrId, scheduleMsg);
    });

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?

    // remove time class from element
    function clearTimeClass(hrObjEl) {
      let updateObjClass = hrObjEl;
      // removes all color classes
      updateObjClass.hasClass('past') ? updateObjClass.removeClass('past'): updateObjClass.hasClass('present') ? updateObjClass.removeClass('present'):updateObjClass.removeClass('future')
      return updateObjClass
    }

    // set hour status
    function setHourStatus(hrObj){
      let currentHour = 12//----------------------getTime().format('HH');
      let hrObjSelectorEl = $(hrObj.id);
      let hrObjectTextareaEl = hrObjSelectorEl.closest('.time-block').find('.description');
      hrObjectTextareaEl.text(hrObj.scheduled_event);
      if (currentHour > 9 && currentHour < 18) {
        if (currentHour == hrObj.hour) {
          clearTimeClass(hrObjSelectorEl);
          hrObjSelectorEl.addClass('present');
        } else if (hrObj.hour > currentHour) {
          hrObjSelectorEl.addClass('future');
        } else {
          clearTimeClass(hrObjSelectorEl)
          hrObjSelectorEl.addClass('past');
        }
      } else {
        clearTimeClass(hrObjSelectorEl)
        hrObjSelectorEl.addClass('past');
      }      
    }

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    function getStoredData(){
      let currentCalendar = JSON.parse(localStorage.getItem("Daily Calendar"));
      return currentCalendar
    }    
    
    function saveCalendarContent(hrId, scheduleMsg) {
      hrId = "#" + hrId;
      // find the object with the id
      let updateHr = workHours.find(obj => obj.id === hrId);
      // set scheduled_event to value
      updateHr.scheduled_event = scheduleMsg;
      // write to local storage
      localStorage.setItem("Daily Calendar" , JSON.stringify(workHours));
    }
    
    // TODO: Add code to display the current date in the header of the page.

    // display time on top of schedule 
    function displayTime() {
      var currentCalendarDay = getTime().format('MMMM D, YYYY');
      $('#currentDay').text(currentCalendarDay);
      return currentCalendarDay
    }

    // update the schedule every minute
    setInterval(cycleWorkHours(workHours), 60000);

    // set up program
    init();
  });