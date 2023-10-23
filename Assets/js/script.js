  // jQuery to wait for all elements to load before DOM elements are selected 
  $(function () {
  
    // save button
    const calendarEl = $('.container-lg');

    // variables
    const workDayElArr = ['#hour-09', '#hour-10',  '#hour-11', '#hour-12', '#hour-13', '#hour-14', '#hour-15', '#hour-16', '#hour-17']
    let workHours = [];

    // helper function to get current time
    function getTime() {
      var currentTime = dayjs();
      return currentTime
    }

    // helper function to iterate through workHours array of objects
    function cycleWorkHours(workHrsArr) {
      for(const hour of workHrsArr) {
        workHours.push(hour);
        setHourStatus(hour);
      }
    }

    // helper function retrieve data from localstorage
    function getStoredData(){
      let currentCalendar = JSON.parse(localStorage.getItem("Daily Calendar"));
      return currentCalendar
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
   
    // Event listener for save buttons
    calendarEl.on('click', '.saveBtn', function() {
      var hrId = $(this).closest('.time-block').attr('id');
      // find the textArea content
      var scheduleMsg = $(this).closest('.time-block').find('.description').val();
      // save to object
      saveCalendarContent(hrId, scheduleMsg);
    });

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

    // function writes to local storage when textarea saved
    function saveCalendarContent(hrId, scheduleMsg) {
      hrId = "#" + hrId;
      // find the object with the id
      let updateHr = workHours.find(obj => obj.id === hrId);
      // set scheduled_event to value
      updateHr.scheduled_event = scheduleMsg;
      // write to local storage
      localStorage.setItem("Daily Calendar" , JSON.stringify(workHours));
    }

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