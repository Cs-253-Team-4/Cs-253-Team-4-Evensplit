import React, { useState, useEffect } from 'react';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


function App() {

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const fetchEventData = () => {
    fetch('http://localhost:1337/api/getEvents', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        }
    }).then(res => {
      return res.json()
    }).then(data => {
      var i;
      var events = [];
      for(i=0;i<data.events.length;i++){
        events.push({id: data.events[i]._id, title: data.events[i].name, start: data.events[i].start_time.replace(/T.*$/, ''), end: data.events[i].end_time.replace(/T.*$/, '')});
      }
      setCurrentEvents(events);

    })
  }

  useEffect(() => {
    if(window.localStorage.getItem('token') == null || window.localStorage.getItem('user') == null) window.location.href="/"
    fetchEventData()
  }, []);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events);
  }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
      </li>
    )
  }

    return (
      <div className='demo-app'>
        <Navbar/>
        {/* {this.renderSidebar()} */}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={currentEvents} 
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // you can update a remote database when these fire:
            eventAdd={async (e) => {
              var start_time = e.event.start;
              var end_time = e.event.end;
              start_time.setDate(start_time.getDate()+1);
              end_time.setDate(end_time.getDate()+1);
              await fetch('http://localhost:1337/api/addEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                  },
                body: JSON.stringify({
                  name: e.event.title,
                  start_time: start_time,
                  end_time: end_time,
                  description: "Description goes here",
                  relevant_tags: "Relevant Tags go here",
              }),
              }).then(res => {
                return res.json()
              }).then(data => {
                if(data.status == 'error') window.location.href = "/";
              })
            }}
            //eventChange={function(){}}
            eventRemove={async (e) => {
              await fetch('http://localhost:1337/api/deleteEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                  },
                body: JSON.stringify({
                  eventId: e.event.id,
              }),
              }).then(res => {
                return res.json()
              }).then(data => {
                if(data.status == 'error' && data.error != 'unauthorized access') window.location.href = "/";
                window.location.reload();
              })
            }}
           />
           <Footer/>
        </div>
      </div>

    )
}

export default App;
 