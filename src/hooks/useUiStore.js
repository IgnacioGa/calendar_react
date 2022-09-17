import { useDispatch, useSelector } from "react-redux"
import { onOpenDateModal, onCloseModal } from "../store";


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen} = useSelector(state => state.ui)
    
    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }
    
    const closeDateModal = () => {
        dispatch(onCloseModal())
    }
     
    return {
        //properties
        isDateModalOpen,
        
        //methods
        openDateModal,
        closeDateModal,
    }
}