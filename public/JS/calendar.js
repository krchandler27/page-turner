document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title,addEventButton",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    customButtons: {
      addEventButton: {
        text: "Add Event",
        click: function () {
          var dateStr = prompt("Enter a date in YYYY-MM-DD format");
          var date = new Date(dateStr + "T00:00:00"); // will be in local time

          if (!isNaN(date.valueOf())) {
            // valid?
            calendar.addEvent({
              title: "dynamic event",
              start: date,
              allDay: true,
            });
            alert("Great. Now, update your database...");
          } else {
            alert("Invalid date.");
          }
        },
      },
    },
    initialDate: new Date(),
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectable: true,
    selectMirror: true,
    selectHelper: true,
    select: function (arg) {
      var myModal = new bootstrap.Modal(
        document.getElementById("calendarModal"),
        {
          keyboard: false,
        }
      );
      myModal.toggle();
    //   arg.preventDefault();

      document.getElementById("saveButton").addEventListener("click", () => {
        const eventName = document.getElementById("eventName").value.trim();
        const startDate = moment(arg.start).format("YYYY-MM-DD");
        const endDate = moment(arg.end).format("YYYY-MM-DD");
        const allDay = moment(arg.allDay).format("YYYY-MM-DD");

        if(eventName) {
            calendar.addEvent({
                title: eventName,
                start: startDate,
                end: endDate,
                
            })
        }
        calendar.unselect()

        console.log(startDate);
        console.log(endDate);
        console.log(allDay);
      })
    },
    // select: function (arg) {
    //   var title = prompt("Event Title:");
    //   if (title) {
    //     calendar.addEvent({
    //       title: title,
    //       start: arg.start,
    //       end: arg.end,
    //       allDay: arg.allDay,
    //     })
    //   }
    //   console.log(moment(arg.start).format("YYYY-MM-DD"));
    //   calendar.unselect()
    // },
    eventClick: function (arg) {
      if (confirm("Are you sure you want to delete this event?")) {
        arg.event.remove();
      }
    },
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: "To Kill A Mockingbird",
        start: "2023-03-02",
        end: "2023-03-15",
        color: "red",
      },
      {
        title: "To Kill A Mockingbird: Discussion",
        start: "2023-03-15",
        color: "purple",
      },
      {
        title: "Frankenstein",
        start: "2023-03-16",
        end: "2023-03-29",
        color: "green",
      },
      {
        title: "Frankenstein: Discussion",
        start: "2023-03-29",
        color: "purple",
      },
      {
        title: "The Great Gatsby",
        start: "2023-03-30",
        end: "2023-04-12",
        color: "blue",
      },
      {
        title: "The Great Gatsby: Discussion",
        start: "2023-04-12",
        color: "purple",
      },
      

      // areas where "Meeting" must be dropped
      {
        groupId: "availableForMeeting",
        start: "2023-03-26T10:00:00",
        end: "2023-03-26T16:00:00",
        display: "background",
      },

      // red areas where no events can be dropped
      {
        start: "2023-03-24",
        end: "2023-03-28",
        overlap: false,
        display: "background",
        color: "#ff9f89",
      },
      {
        start: "2023-01-06",
        end: "2023-01-08",
        overlap: false,
        display: "background",
        color: "#ff9f89",
      },
    ],
  });

  calendar.render();
});
