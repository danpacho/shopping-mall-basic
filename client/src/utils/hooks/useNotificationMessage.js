import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customId = "custom-id-yes";

function useNotificationBar(message = "") {
    toast.success(`${message}`, {
        position: "bottom-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customId,
    });

    return (
        <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className={"z-20"}
        />
    );
}

export default useNotificationBar;
