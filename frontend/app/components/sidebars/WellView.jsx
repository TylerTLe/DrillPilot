import React, { useState, useCallback, useEffect } from "react";
import { Box } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

function WellView({
  wellData,
  padData,
  selectedPadId,
  setSelectedPad,
  setSelectedWell, // Ensure this is received as a prop
  onEditWell,
  onDeleteWell,
  onEditPad,
  onDeletePad,
  onToggleWellVisibility,
}) {
  const [selectedWellId, setSelectedWellId] = useState(null);
  const [editWellId, setEditWellId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPadId, setEditPadId] = useState(null);
  const [editPadTitle, setEditPadTitle] = useState("");
  const [visibleWells, setVisibleWells] = useState({});

  useEffect(() => {
    if (wellData.length > 0 && selectedWellId === null) {
      const lastWellId = wellData[wellData.length - 1].id;
      handleWellClick(lastWellId);
    }

    // Initialize visibleWells state with all wells set to visible
    const initialVisibleWells = wellData.reduce((acc, well) => {
      acc[well.id] = well.isVisible !== undefined ? well.isVisible : true;
      return acc;
    }, {});
    setVisibleWells(initialVisibleWells);
  }, [wellData, selectedWellId]);

  const handlePadClick = (id) => {
    setSelectedPad(id);
  };

  const handleWellClick = useCallback(
    (id) => {
      setSelectedWellId(id);
      setSelectedWell(id);
      console.log(id, "Selected well");
    },
    [setSelectedWell]
  );

  const handleEditWellClick = (id, title) => {
    setEditWellId(id);
    setEditTitle(title);
  };

  const handleSaveWellClick = () => {
    if (editTitle.trim() !== "") {
      onEditWell(editWellId, editTitle);
      setEditWellId(null);
    }
  };

  const handleDeleteWellClick = (id) => {
    onDeleteWell(id);
  };

  const handleEditPadClick = (id, title) => {
    setEditPadId(id);
    setEditPadTitle(title);
  };

  const handleSavePadClick = () => {
    if (editPadTitle.trim() !== "") {
      onEditPad(editPadId, editPadTitle);
      setEditPadId(null);
    }
  };

  const handleDeletePadClick = (id) => {
    onDeletePad(id);
  };

  const handleKeyDown = (e) => {
    if (editWellId && e.key === "Enter") {
      handleSaveWellClick();
    } else if (editPadId && e.key === "Enter") {
      handleSavePadClick();
    }
  };

  const toggleWellVisibility = (id) => {
    setVisibleWells((prevState) => {
      const newVisibility = { ...prevState, [id]: !prevState[id] };
      onToggleWellVisibility(id, newVisibility[id]); // Call the parent function to update graph data
      return newVisibility;
    });
  };

  return (
    <Box className="p-2 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-gray-100 px-1 rounded-t-lg mb-2">
        <p className="w-full text-base font-semibold">Pads and Wells</p>
      </div>
      {padData && padData.length > 0 ? (
        padData.map((pad) => (
          <div key={pad.id}>
            <div
              className={`p-2 rounded mb-2 cursor-pointer flex justify-between items-center ${
                selectedPadId === pad.id ? "bg-yellow-500" : "bg-gray-200"
              }`}
              onClick={() => handlePadClick(pad.id)}
            >
              {editPadId === pad.id ? (
                <input
                  type="text"
                  value={editPadTitle}
                  onChange={(e) => setEditPadTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="p-1 border border-gray-300 rounded"
                />
              ) : (
                <p className="font-bold">{pad.title}</p>
              )}
              <div className="flex space-x-2">
                {editPadId === pad.id ? (
                  <FontAwesomeIcon
                    icon={faSave}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSavePadClick();
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPadClick(pad.id, pad.title);
                    }}
                  />
                )}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePadClick(pad.id);
                  }}
                />
              </div>
            </div>
            {selectedPadId === pad.id &&
              wellData
                .filter((well) => well.padId === pad.id)
                .map((well) => (
                  <div
                    key={well.id}
                    onClick={() => handleWellClick(well.id)}
                    className={`p-2 rounded cursor-pointer flex justify-between items-center ml-4 m-2 ${
                      selectedWellId === well.id ? "bg-yellow-500" : "bg-white"
                    }`}
                  >
                    {editWellId === well.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <p>{well.title}</p>
                    )}
                    <div className="flex space-x-2">
                      {editWellId === well.id ? (
                        <FontAwesomeIcon
                          icon={faSave}
                          className="text-gray-600 hover:text-gray-800 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveWellClick();
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-gray-600 hover:text-gray-800 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditWellClick(well.id, well.title);
                          }}
                        />
                      )}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWellClick(well.id);
                        }}
                      />
                    </div>
                  </div>
                ))}
          </div>
        ))
      ) : (
        <p>No pads have been added yet.</p>
      )}
    </Box>
  );
}

export default WellView;
