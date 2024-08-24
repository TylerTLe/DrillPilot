import React, { useCallback } from "react";
import Image from "next/image";
import drillpilot from "../../public/drillpilot.svg";
import Well from "./sidebars/Well";
import WellView from "./sidebars/WellView";
import Survey from "./sidebars/Survey";
import Pad from "./sidebars/Pad";
import Fracture from "./sidebars/Fracture";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({
  handleNewSurveyDesignClick,
  handleImportClick,
  handleExportClick,
  handleWellClick,
  handlePadClick,
  handleFractureClick,
  handleFractureImportClick,
  handleCreatePadClick,
  graphData,
  areButtonsEnabled,
  padData,
  wellData,
  selectedPadId,
  handleAddPad,
  setSelectedPad,
  setSelectedWell,
  onEditWell,
  onDeleteWell,
  onEditPad,
  onDeletePad,
  isSurveyDesigned,
  onToggleWellVisibility,
}) {
  const isGraphDataEmpty = graphData.length === 0;
  const handleAddWellClick = useCallback(() => {
    handleWellClick();
  }, [handleWellClick]);

  const handleAddPadClick = useCallback(() => {
    handleAddPad();
  }, [handleAddPad]);

  return (
    <div className="w-full h-full">
      <div className="max-w-[1240px] w-full h-full flex flex-col bg-[#FDFDFD] rounded-lg border-black border-2 p-2">
        <div className="flex justify-center">
          <Image src={drillpilot} width={200} height={200} alt="sunsab logo" />
        </div>
        <Survey
          isWellDesigned={areButtonsEnabled}
          handleNewDesignClick={handleNewSurveyDesignClick}
          handleImportClick={handleImportClick}
          handleExportClick={handleExportClick}
          isGraphDataEmpty={isGraphDataEmpty}
        />
        <Fracture
          isSurveyDesigned={isSurveyDesigned}
          handleFractureClick={handleFractureClick}
          handleFractureImportClick={handleFractureImportClick}
        />
        <div className="grow border-black border-2 rounded-lg mt-3 p-2">
          <div className=" px-1 rounded-t-lg mb-2">
            <p className="w-full text-base font-semibold ">Pads</p>
          </div>
          <button
            className="w-full text-center bg-yellow-500 transition-colors rounded-lg hover:bg-yellow-700 hover:text-white mb-2 p-1 text-black"
            onClick={() => handleCreatePadClick()}
          >
            <FontAwesomeIcon icon={faPlus} className="icon" />
            &nbsp;
            <span>Add Pad</span>
          </button>
          <Well
            isWellDesigned={areButtonsEnabled}
            handleAddWellClick={handleAddWellClick}
            handleCreatePadClick={handleCreatePadClick}
          />
          <WellView
            wellData={wellData}
            padData={padData}
            selectedPadId={selectedPadId}
            setSelectedPad={setSelectedPad}
            setSelectedWell={setSelectedWell}
            onEditWell={onEditWell}
            onDeleteWell={onDeleteWell}
            onEditPad={onEditPad}
            onDeletePad={onDeletePad}
            onToggleWellVisibility={onToggleWellVisibility}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
