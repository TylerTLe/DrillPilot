import React from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileImport,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { AiOutlineClose } from "react-icons/ai";
import drillpilot from "../../public/drillpilot.png";

const TopNavbar = ({
  handleNewDesignClick,
  handleImportClick,
  handleExportClick,
  graphData,
  burgerClick,
}) => {
  const isGraphDataEmpty = graphData.length === 0;

  return (
    <div className="w-full h-full">
      <div className="max-w-[1240px] w-full h-full">
        <div className="flex items-center justify-between w-full">
          <Image src={drillpilot} width={300} height={300} alt="sunsab logo" />

          <div
            onClick={burgerClick}
            className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer mr-3"
          >
            <AiOutlineClose />
          </div>
        </div>

        <div>
          <div className="bg-gray-100 px-1 rounded-t-lg">
            <p className="w-full text-base font-semibold">Survey</p>
          </div>

          <div className="bg-gray-100 lg:flex mb-4 rounded-b-lg gap-4">
            <div className="w-full p-1">
              <Button
                className="w-full text-center bg-yellow-500 text-black hover:bg-yellow-700 transition-colors rounded-lg"
                onClick={() => handleNewDesignClick("survey")}
              >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                <span>New Design</span>
              </Button>
            </div>

            <div className="w-full p-1">
              <Button
                className="w-full text-center bg-yellow-500/50 text-black/50 transition-colors rounded-lg"
                onClick={() => handleImportClick("survey")}
              >
                <FontAwesomeIcon icon={faFileImport} />
                &nbsp;
                <span>Import</span>
              </Button>
            </div>

            <div className="w-full p-1">
              <Button
                className={
                  !isGraphDataEmpty
                    ? "w-full text-center bg-yellow-500 text-black transition-colors rounded-lg hover:bg-yellow-700"
                    : "w-full text-center bg-yellow-500 text-black transition-colors rounded-lg opacity-50"
                }
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
      </div>
    </div>
  );
};

export default TopNavbar;
