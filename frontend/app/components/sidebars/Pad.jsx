import React from "react";
import { Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function Pad(handleCreatePadClick) {
  return (
    <div className="lg:flex justify-between">
      <div className="lg:w-full">
        <div className=" px-1 rounded-t-lg mb-2"></div>
        <Button
          className="w-full text-center bg-yellow-500 text-black transition-colors rounded-lg hover:bg-yellow-700 hover:text-white mb-3"
          onClick={handleCreatePadClick}
        >
          <FontAwesomeIcon icon={faPlus} className="icon" />
          &nbsp;
          <span>Add</span>
        </Button>
      </div>
    </div>
  );
}

export default Pad;
