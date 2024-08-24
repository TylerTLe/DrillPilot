"use client";

import React, { useState, useCallback, useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import GraphView from "./components/GraphView";
import Sidebar from "./components/Sidebar";
import SurveyNewDesignModal from "./components/Modals/SurveyNewDesignModal";
import ImportModal from "./components/Modals/ImportModal";
import ExportModal from "./components/Modals/ExportModal";
import TopNavbar from "./components/TopNavbar";
import AddWellModal from "./components/Modals/AddWellModal";
import FractureNewDesignModal from "./components/Modals/FractureNewDesignModal";
import FractureImportModal from "./components/Modals/FractureImportModal";
import PadModal from "./components/Modals/PadModal";

function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("survey");

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importType, setImportType] = useState("survey");

  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState("survey");

  const openModal = useCallback((type) => {
    setModalType(type);
    setModalOpen(true);
  }, []);

  const openAddPadModal = useCallback(() => {
    openModal("pad");
  }, [openModal]);

  const handleAddPad = () => {
    setPadModalOpen(true);
  };

  const openImportModal = useCallback((type) => {
    setImportType(type);
    setImportModalOpen(true);
  }, []);

  const openExportModal = useCallback((type) => {
    setExportType(type);
    setExportModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setImportModalOpen(false);
    setExportModalOpen(false);
  }, []);

  return {
    modalOpen,
    modalType,
    importModalOpen,
    importType,
    exportModalOpen,
    exportType,
    openModal,
    openImportModal,
    openExportModal,
    closeModal,
  };
}

function App() {
  const [graphData, setGraphData] = useState([]);
  const [fractureData, setFractureData] = useState([]);

  const [pads, setPads] = useState([]);
  const [nextPadId, setNextPadId] = useState(1); // Start IDs from 1
  const [selectedPadId, setSelectedPadId] = useState(null);
  const [padValue, setPadValue] = useState("");

  const [wells, setWells] = useState([]);
  const [nextWellId, setNextWellId] = useState(1); // Start IDs from 1
  const [selectedWell, setSelectedWell] = useState(null);

  const [isClickBurger, setIsClickBurger] = useState(false);

  const {
    modalOpen,
    modalType,
    importModalOpen,
    importType,
    exportModalOpen,
    exportType,
    openModal,
    openImportModal,
    openExportModal,
    closeModal,
  } = useModal();

  const handlePadValue = (val) => {
    setPadValue(val);
  };

  const handleDataFromModal = useCallback(
    (incomingData) => {
      const updatedWells = wells.map((well) =>
        well.id === selectedWell?.id ? { ...well, surveys: incomingData } : well
      );
      setWells(updatedWells);

      // Combine survey data from wells in the selected pad
      const padWells = updatedWells.filter(
        (well) => well.padId === selectedPadId
      );

      // Separate each survey into its own series
      const allSurveys = padWells.map((well) => well.surveys);

      setGraphData(allSurveys);
    },
    [wells, selectedWell, selectedPadId]
  );

  const handleFractureDataFromModal = useCallback(
    (incomingData) => {
      const updatedWells = wells.map((well) =>
        well.id === selectedWell?.id
          ? { ...well, fractures: incomingData }
          : well
      );
      setWells(updatedWells);
      setFractureData(incomingData);

      // Combine fracture data from wells in the selected pad
      const padWells = updatedWells.filter(
        (well) => well.padId === selectedPadId
      );
      const allFractures = padWells.flatMap((well) => well.fractures || []);
      setFractureData(allFractures);
    },
    [wells, selectedWell, selectedPadId]
  );

  const handleClickBurger = useCallback(() => {
    setIsClickBurger((prev) => !prev);
  }, []);

  const openNewSurveyDesignModal = useCallback(() => {
    openModal("survey");
  }, [openModal]);

  const openAddWellModal = useCallback(() => {
    openModal("well");
  }, [openModal]);

  const openAddFractureModal = useCallback(() => {
    openModal("fracture");
  }, [openModal]);

  const openFractureImportModal = useCallback(() => {
    openImportModal("fracture");
  }, [openImportModal]);

  const handleCreatePadClick = useCallback(
    (title) => {
      if (title) {
        const newPad = {
          id: nextPadId,
          title,
        };

        setPads((prevPads) => [...prevPads, newPad]);
        setNextPadId((prevId) => prevId + 1);

        if (selectedPadId === null) {
          setSelectedPadId(newPad.id);
        }
      }
    },
    [nextPadId, selectedPadId]
  );

  const handleCreateWellClick = useCallback(
    (title) => {
      if (selectedPadId && title) {
        const newWell = {
          id: nextWellId,
          title,
          padId: selectedPadId,
          surveys: [],
          isVisible: true, // Add isVisible property
        };

        const updatedWells = [...wells, newWell];
        setWells(updatedWells);
        setNextWellId((prevId) => prevId + 1); // Increment nextWellId

        // Automatically select the newly created well
        setSelectedWell(newWell);
      }
    },
    [nextWellId, selectedPadId, wells]
  );

  const handlePadClick = (padId) => {
    setSelectedPadId(padId);

    // Combine survey data from wells in the selected pad
    const padWells = wells.filter(
      (well) => well.padId === padId && well.isVisible
    );
    const allSurveys = padWells.flatMap((well) => well.surveys);
    setGraphData(allSurveys);
  };

  const handleWellClick = (wellId) => {
    const selected = wells.find((well) => well.id === wellId);
    setSelectedWell(selected);
  };

  const handleEditWell = (id, newTitle) => {
    setWells((prevWells) =>
      prevWells.map((well) =>
        well.id === id ? { ...well, title: newTitle } : well
      )
    );
  };

  const handleDeleteWell = (id) => {
    const updatedWells = wells.filter((well) => well.id !== id);
    setWells(updatedWells);

    // Combine survey data from remaining wells in the selected pad
    const padWells = updatedWells.filter(
      (well) => well.padId === selectedPadId && well.isVisible
    );
    const allSurveys = padWells.flatMap((well) => well.surveys);
    setGraphData(allSurveys);

    if (selectedWell && selectedWell.id === id) {
      setSelectedWell(null);
    }
  };

  const handleEditPad = (id, newTitle) => {
    setPads((prevPads) =>
      prevPads.map((pad) => (pad.id === id ? { ...pad, title: newTitle } : pad))
    );
  };

  const handleDeletePad = (id) => {
    const updatedPads = pads.filter((pad) => pad.id !== id);
    setPads(updatedPads);

    if (selectedPadId === id) {
      setSelectedPadId(null);
      setGraphData([]);
      setSelectedWell(null);
    }
  };

  const openAddPadModal = useCallback(() => {
    openModal("pad");
  }, [openModal]);

  const handleToggleWellVisibility = (wellId, isVisible) => {
    const updatedWells = wells.map((well) =>
      well.id === wellId ? { ...well, isVisible } : well
    );
    setWells(updatedWells);

    // Combine survey data from visible wells in the selected pad
    const padWells = updatedWells.filter(
      (well) => well.padId === selectedPadId && well.isVisible
    );
    const allSurveys = padWells.flatMap((well) => well.surveys);
    setGraphData(allSurveys);
  };

  return (
      <div className="w-full h-screen bg-[#CFDBD5] overflow-y-auto">
        {/* TOP NAVBAR */}
        <div
          className={`${
            isClickBurger ? "lg:hidden" : "hidden"
          } top-0 left-0 w-full h-[50%] shadow-lg bg-white ease-in duration-700`}
        >
          <TopNavbar
            handleNewDesignClick={openNewSurveyDesignModal}
            handleImportClick={openImportModal}
            handleExportClick={openExportModal}
            graphData={graphData}
            burgerClick={handleClickBurger}
          />
        </div>

        <div className="flex w-full h-screen">
          <div className="hidden h-full lg:block w-1/3 p-2">
            <Sidebar
              handleNewSurveyDesignClick={openNewSurveyDesignModal}
              handleImportClick={() => openImportModal("survey")}
              handleExportClick={openExportModal}
              handleWellClick={openAddWellModal}
              handleFractureClick={openAddFractureModal}
              handleFractureImportClick={openFractureImportModal}
              handlePadClick={handlePadClick}
              handleCreatePadClick={openAddPadModal}
              areButtonsEnabled={wells.length > 0}
              isSurveyDesigned={wells.length > 0}
              graphData={graphData}
              padData={pads}
              wellData={wells}
              selectedPadId={selectedPadId}
              setSelectedPad={handlePadClick}
              setSelectedWell={handleWellClick}
              onEditWell={handleEditWell}
              onDeleteWell={handleDeleteWell}
              onEditPad={handleEditPad}
              onDeletePad={handleDeletePad}
              onToggleWellVisibility={handleToggleWellVisibility}
              handleAddPad={openAddPadModal}
            />
          </div>
          <div className="w-full h-full lg:w-2/3 p-2">
            <GraphView
              graphData={graphData}
              burgerClick={handleClickBurger}
              fractureData={fractureData}
            />
          </div>

          <div
            className={`${
              modalOpen || importModalOpen || exportModalOpen
                ? "fixed"
                : "hidden"
            } z-50 w-full h-screen top-0 left-0 bg-black/70`}
          >
            <div className="flex items-center justify-center z-[99] w-full h-full">
              <div>
                <AddWellModal
                  opened={modalOpen && modalType === "well"}
                  onClose={closeModal}
                  modalType={modalType}
                  handleCreateWellClick={handleCreateWellClick}
                  pads={pads} // Pass pads to allow selecting a pad when creating a well
                />
                <SurveyNewDesignModal
                  opened={modalOpen && modalType === "survey"}
                  onClose={closeModal}
                  modalType={modalType}
                  onDataReceived={handleDataFromModal}
                />
                <FractureNewDesignModal
                  opened={modalOpen && modalType === "fracture"}
                  onClose={closeModal}
                  modalType={modalType}
                  onDataReceived={handleFractureDataFromModal}
                  selectedWell={selectedWell} // Pass the selected well
                />
                <FractureImportModal
                  opened={importModalOpen && importType === "fracture"}
                  onClose={closeModal}
                  importModalType={importType}
                  onDataReceived={() => {}} // TODO: handle data from modal
                />
                <ImportModal
                  opened={importModalOpen && importType === "survey"}
                  onClose={closeModal}
                  importModalType={importType}
                  onDataReceived={handleDataFromModal}
                />
                <ExportModal
                  opened={exportModalOpen}
                  onClose={closeModal}
                  exportModalType={exportType}
                  graphData={graphData}
                />
                <PadModal
                  opened={modalOpen && modalType === "pad"}
                  onClose={closeModal}
                  modalType={modalType}
                  handleCreatePadClick={handleCreatePadClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
