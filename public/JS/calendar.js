import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';

let ec = new Calendar({
    target: document.getElementById('ec'),
    props: {
        plugins: [TimeGrid],
        options: {
            view: 'timeGridWeek',
            events: [
                // your list of events
            ]
        }
    }
});