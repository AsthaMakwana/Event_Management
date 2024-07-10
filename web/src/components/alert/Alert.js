import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {
  return (
    <div>
      <ToastContainer 
      limit={1}/>
    </div>
  );
}

export const showAlert = (type, msg) => {
  toast[type](msg, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default Alert;