import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = (props) => {
  const onCloseHandler = () => {
    props.onClickHandler(null);
  };
  return createPortal(
    <>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
            </div>
            <div className="modal-body">{props.message}</div>
            <div className="modal-footer">
              <button
                onClick={onCloseHandler}
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
