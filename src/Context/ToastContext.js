import { createContext, useState } from "react";
import MySnackbar from "../Componant/Snackbar";

export const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {

    // state
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");


    function showHideToast(ms) {
        setOpen(true)
        setMessage(ms)
        setTimeout(() => {
            setOpen(false)
        }, 2000);
    }
    return (
        <ToastContext.Provider value={{ showHideToast }}>
            <MySnackbar open={open} message={message} />
            {children}
        </ToastContext.Provider>
    )
}