import React from "react";
import { Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileImport,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

function Survey({
  isWellDesigned,
  handleNewDesignClick,
  handleImportClick,
  handleExportClick,
  isGraphDataEmpty,
}) {
  return (
    <div className="border-black border-2 rounded-lg mt-3 p-2">
      <div className="bg-gray-100 px-1 rounded-t-lg">
        <p className="w-full text-base font-semibold">
          Survey
        </p>
      </div>

      <div className="bg-gray-100 lg:flex justify-evenly mb-4 rounded-b-lg gap-1">
        <div className="w-full lg:w-[30%] p-1">
          <Button
            className={`w-full text-center ${
              isWellDesigned
                ? "bg-yellow-500 text-black hover:bg-yellow-700"
                : "bg-yellow-500/50 text-black/50"
            } transition-colors rounded-lg`}
            onClick={() => handleNewDesignClick("survey")}
            disabled={!isWellDesigned}
          >
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;
            <span>New Design</span>
          </Button>
        </div>

        <div className="w-full lg:w-[30%] p-1">
          <Button
            className={`w-full text-center ${
              isWellDesigned
                ? "bg-yellow-500 text-black hover:bg-yellow-700"
                : "bg-yellow-500/50 text-black/50"
            } transition-colors rounded-lg`}
            onClick={() => handleImportClick("survey")}
            disabled={!isWellDesigned}
          >
            <FontAwesomeIcon icon={faFileImport} />
            &nbsp;
            <span>Import</span>
          </Button>
        </div>

        <div className="w-full lg:w-[30%] p-1 mb-1">
          <Button
            className={`w-full text-center ${
              isGraphDataEmpty
                ? "bg-yellow-500 text-black opacity-50"
                : "bg-yellow-500 text-black hover:bg-yellow-700"
            } transition-colors rounded-lg`}
            onClick={() => handleExportClick("survey")}
            disabled={isGraphDataEmpty}
          >
            <FontAwesomeIcon icon={faFileExport} />
            &nbsp;
            <span>Export</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Survey;
