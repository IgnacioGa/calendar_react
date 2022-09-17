import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks"


export const FabAddNew = () => {

  const {openDateModal} = useUiStore();
  const {setActiveEvent} = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: '#fafafa',
        user: {
          id: 123,
          name: 'Nacho!'
        }
    })
    openDateModal();
  }

  return (
    <button onClick={handleClickNew} className="btn btn-primary fab">
        <i className="fas fa-plus"></i>
    </button>
  )
}
