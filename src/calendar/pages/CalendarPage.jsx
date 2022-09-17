import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, Fabdelete } from "../"
import { localizer, getMessages } from '../../helpers'
import { useEffect, useState } from 'react'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'


export const CalendarPage = () => {

  const {user} = useAuthStore();
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent, startLoadingEvent, activeEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user.id === event.user.id)
    const isActiveEvent = ( activeEvent && activeEvent.id === event.id );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: isActiveEvent ? 1 : 0.8,
      color:'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = () => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvent();
  }, [])

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <Fabdelete />

    </>
  )
}
