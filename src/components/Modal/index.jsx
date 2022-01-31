import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <section className="modal">{children}</section>,
    document.querySelector("#modal")
  );
}

export default Modal;
