import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notif() {
  function notify() {
    toast.dark("Copied to clipboard!");
  }

  return (
    <>
      <div className="Notif">
        <div className="btn-group">
          <button className="btn" onClick={notify}>
            click me
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}