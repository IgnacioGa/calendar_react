import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { statusOptions } from "../store";


export const AppRouter = () => {

    // const authStatus = statusOptions.notAuthenticated;

    const {status, checkAuthToken} = useAuthStore();

    useEffect(() => {
      checkAuthToken();
    }, [])
    

    if(status === statusOptions.checking){
        return (
            <h3>Loading ...</h3>
        )
    }
    
    return (
    <Routes>
        {
            
            (status === statusOptions.notAuthenticated)
            ? (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
              )
            : (
                <>
                    <Route path="/" element={<CalendarPage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            )
        }
    </Routes>
    )
}
