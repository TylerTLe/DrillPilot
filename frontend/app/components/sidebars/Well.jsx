import React from "react";
import { Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function Well({ isWellDesigned, handleAddWellClick }) {
  return (
    <div className="lg:flex justify-between">
      <div className="lg:w-full">
        <Button
          className="w-full text-center bg-yellow-500 transition-colors rounded-lg hover:bg-yellow-700 hover:text-white mb-2 p-1 text-black"
          onClick={handleAddWellClick}
        >
          <FontAwesomeIcon icon={faPlus} className="icon" />
          &nbsp;
          <span>Add Well</span>
        </Button>
      </div>
    </div>
  );
}

export default Well;

{
  /* <div className="lg:w-[33%] p-1">
        <Button
          className={`w-full text-center ${
            isWellDesigned
              ? "bg-yellow-500 text-black hover:bg-yellow-700 hover:text-white"
              : "bg-yellow-500/50 text-black/50"
          } transition-colors rounded-lg`}
          disabled={true} // change when making edit button
        >
          <FontAwesomeIcon icon={faEdit} className="icon" />
          &nbsp;
          <span>Edit</span>
        </Button>
      </div>

      <div className="lg:w-[33%] p-1">
        <Button
          className={`w-full text-center ${
            isWellDesigned
              ? "bg-yellow-500 text-black hover:bg-yellow-700 hover:text-white"
              : "bg-yellow-500/50 text-black/50"
          } transition-colors rounded-lg`}
          disabled={true} // change when making remove button
        >
          <FontAwesomeIcon icon={faTrash} className="icon" />
          &nbsp;
          <span>Remove</span>
        </Button>
      </div>
    </div> */
}
