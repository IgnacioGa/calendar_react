
import { useCalendarStore } from "../../hooks"


export const Fabdelete = () => {

  const {startDeletingEvent, hasEventSelected} = useCalendarStore();

  const handleDeleteEvent = () => {
    startDeletingEvent();
  }

  return (
    <button onClick={handleDeleteEvent} className="btn btn-danger fab-danger" style={{
      display: hasEventSelected ? '' : 'none'
    }}>
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
