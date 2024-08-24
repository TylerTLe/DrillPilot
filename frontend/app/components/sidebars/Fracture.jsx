import React from "react";
import { Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";

function Fracture({
  handleFractureClick,
  handleFractureImportClick,
  isSurveyDesigned,
}) {
  return (
    <div className="border-black border-2 rounded-lg mt-3 p-2">
      <div className="bg-gray-100 px-1 rounded-t-lg">
        <p className="w-full text-base font-semibold">Fractures</p>
      </div>

      <div className="bg-gray-100 lg:flex mb-4 rounded-b-lg gap-4">
        <div className="w-full lg:w-[100%] p-1">
          <Button
            className={`w-full text-center transition-colors rounded-lg ${
              isSurveyDesigned
                ? "bg-yellow-500 text-black hover:bg-yellow-700"
                : "bg-yellow-500 text-black opacity-50"
            }`}
            disabled={!isSurveyDesigned}
            onClick={handleFractureClick}
          >
            <FontAwesomeIcon icon={faPlus} className="icon" />
            &nbsp;
            <span>New Design</span>
          </Button>
        </div>
      
      </div>
    </div>
  );
}

export default Fracture;
