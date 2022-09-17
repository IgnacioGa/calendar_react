import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {calendarApi} from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import { useAuthStore } from "./useAuthStore";


export const useCalendarStore = () => {

    const {events, activeEvent} = useSelector(state => state.calendar)
    const dispatch = useDispatch();

    const {user} = useAuthStore();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        // TODO: UpdateEvents

        if(calendarEvent.id){
            // actualizando
            try {
                await calendarApi.put(`/events/${calendarEvent.id}/`,calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            } catch (error) {
                const {data} = error.response
                Swal.fire('Error on save', data[0], 'error')
            }
        }else {
            //creando
            try {
                const {data} = await calendarApi.post('/events/', {...calendarEvent, user});
                dispatch(onAddNewEvent({...calendarEvent, id: data.id, user }))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}/`)
            dispatch(dispatch(onDeleteEvent()));
            return;
        } catch (error) {
            const {data} = error.response
            Swal.fire('Error on delete', data[0], 'error')
        }
    }

    const startLoadingEvent = async() => {
        try {
            const {data} = await calendarApi.get('/events/');
            const events = convertEventsToDateEvents(data);
            dispatch(onLoadEvents(events))

        } catch (error) {
            console.log(error)
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvent,
    }

}