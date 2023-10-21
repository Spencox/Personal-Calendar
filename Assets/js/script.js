  // jQuery to wait for all elements to load before DOM elements are selected 
  $(function () {
    // DOM elements
    const cal9amEl = $('#hour-9');
    const cal10amEl = $('#hour-10');
    const cal11amEl = $('#hour-11');
    const cal12pmEl = $('#hour-12');
    const cal1pmEl = $('#hour-13');
    const cal2pmEl = $('#hour-14');
    const cal3pmEl = $('#hour-15');
    const cal4pmEl = $('#hour-16');
    const cal5pmEl = $('#hour-17');

    // variables
    const workDay = [cal9amEl, cal10amEl,  cal11amEl, cal12pmEl, cal1pmEl, cal2pmEl, cal3pmEl, cal4pmEl, cal5pmEl ]
    let hourStatus =  {};

    // function setHourStatus() {
    //   for(let i = 0; i < workDay.length: ++i){
    //     hourStatus[] 
    //   }
    // }

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
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

  });

