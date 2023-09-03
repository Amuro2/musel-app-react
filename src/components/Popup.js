import React from "react";
import PropTypes from "prop-types";

const Popup = ({
  children,
  close,
}) => {
  return (
    <div className="flex flex-col items-center justify-center absolute z-20 top-0 left-0 w-full h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75" onClick={close}></div>

      <div className="flex flex-col gap-4 relative z-1 p-4 bg-white text-black">
        {children}

        <div className="flex justify-end">
          <button className="border px-1.5 py-px" onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func.isRequired,
};

export default Popup;
