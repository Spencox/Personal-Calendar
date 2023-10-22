  // jQuery to wait for all elements to load before DOM elements are selected 
  $(function () {
    // calendar hour elements
    const cal9amEl = $('#hour-09');
    const cal10amEl = $('#hour-10');
    const cal11amEl = $('#hour-11');
    const cal12pmEl = $('#hour-12');
    const cal1pmEl = $('#hour-13');
    const cal2pmEl = $('#hour-14');
    const cal3pmEl = $('#hour-15');
    const cal4pmEl = $('#hour-16');
    const cal5pmEl = $('#hour-17');
    // save button
    const calendarEl = $('.container-lg');

    // variables
    const workDayElArr = [cal9amEl, cal10amEl,  cal11amEl, cal12pmEl, cal1pmEl, cal2pmEl, cal3pmEl, cal4pmEl, cal5pmEl ]

    // helper functions
    function getTime() {
      var currentTime = dayjs();
      return currentTime
    }
    
    // remove time class from element
    function clearTimeClass(hrObjEl) {
      let updateObjClass = hrObjEl;
      updateObjClass.hasClass('past') ? updateObjClass.removeClass('past'): updateObjClass.hasClass('present') ? updateObjClass.removeClass('present'):updateObjClass.removeClass('future')
      return updateObjClass
    }

    // set hour status
    function setHourStatus(hrObj){
      let currentHour = getTime().format('HH');
      if (currentHour > 9 && currentHour < 18) {
        if (currentHour == hrObj.hour) {
          clearTimeClass(hrObj.id);
          hrObj.id.addClass('present');
        } else if ( hrObj.hour > currentHour) {
          hrObj.id.addClass('future');
        } else {
          clearTimeClass(hrObj.id)
          hrObj.id.addClass('past');
        }
      } else {
        clearTimeClass(hrObj.id)
        hrObj.id.addClass('future');
      }      
    }

    // function to create workDay object to contain all data for day
    function createHours(hrElementArr) {
      const workHours = [];
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
      }
      console.log(workHours);
    }
  
    createHours(workDayElArr);

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    function saveCalendarContent() {
      console.log("Made it to save function")
      var saveBtnPushed = $(event.target.id);
      console.log(saveBtnPushed);

    }
    
    // Event listener for save buttons
    calendarEl.on('click', '.saveBtn', function() {
      var hrId = $(this).closest('.time-block').attr('id'); // investigate better way
      console.log(hrId);
    });


  
    

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    function displayTime() {
      var currentCalendarDay = getTime().format('MMMM D, YYYY');
      $('#currentDay').text(currentCalendarDay);
      return currentCalendarDay
    }
    //setInterval(displayTime, 1000);
    displayTime();
  });

