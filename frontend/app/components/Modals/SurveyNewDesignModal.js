import React, { useState } from "react";
import {
  Box,
  Group,
  NumberInput,
  Button,
  Text,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import { HiOutlineInformationCircle } from "react-icons/hi2";

let graphData = [];

const SurveyNewDesignModal = ({
  opened,
  onClose,
  modalType,
  onDataReceived,
}) => {
  const [inputValues, setInputValues] = useState({
    LateralLength: 2000.0,
    WellSpacing: 300.0,
    DrillTurn: 7.0,
    TurnLeft: "Left",
    LateralAzimuth: 45.0,
    TotalDepth: 2000.0,
    DrillBuild: 5.0,
    LateralDip: 0.14,
  });

  const angleAlphaCalc = (W, R1, R2) => {
    // Calculate the components of the formula
    let numerator = W - R2;
    let denominator = Math.sqrt(Math.pow(R1, 2) + Math.pow(R2, 2));

    // Calculate the first part: sin^(-1) ((W - R2) / sqrt(R1^2 + R2^2))
    let firstPart = Math.asin(numerator / denominator);

    // Calculate the second part: tan^(-1) (R2 / R1)
    let secondPart = Math.atan(R2 / R1);

    // Calculate alpha
    let alpha = firstPart - secondPart;

    return alpha;
  };

  const [errors, setErrors] = useState({});

  const validateInputs = (values) => {
    const errors = {};

    const BuildRadius = ((30 / values.DrillBuild) * 180) / Math.PI; // calc done from arc length formula
    const TurnRadius = ((30 / values.DrillTurn) * 180) / Math.PI; // calc done from arc length formula

    if (values.LateralLength < 0 || values.LateralLength > 9999) {
      // Fix LateralLength max when we talk to anwar
      errors.LateralLength = "Lateral length must be between 0 and 9999.";
    }
    if (
      values.WellSpacing < 0 ||
      values.WellSpacing > BuildRadius + TurnRadius
    ) {
      errors.WellSpacing = `Well spacing must be between 0 and ${Math.floor(
        BuildRadius + TurnRadius
      )}.`;
    }
    if (values.DrillTurn < 2 || values.DrillTurn > 12) {
      errors.DrillTurn = "Turn must be between 2 and 12 degrees per 30 meters.";
    }
    if (values.TurnLeft !== "Left" && values.TurnLeft !== "Right") {
      errors.TurnLeft = "TurnLeft must be either 'Left' or 'Right'.";
    }
    if (values.LateralAzimuth < 0 || values.LateralAzimuth > 359) {
      errors.LateralAzimuth = "Lateral azimuth must be between 0 and 359.";
    }
    if (values.TotalDepth < BuildRadius || values.TotalDepth > 9999) {
      errors.TotalDepth = `Total depth must be between ${Math.floor(
        BuildRadius
      )} and 9999.`;
    }
    if (values.DrillBuild < 2 || values.DrillBuild > 12) {
      errors.DrillBuild =
        "Build must be between 2 and 12 degrees per 30 meters.";
    }
    if (values.LateralDip < -5 || values.LateralDip > 5) {
      errors.LateralDip = "Drill stick must be between -5 and 5.";
    }
    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateInputs(inputValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.error("Validation errors:", validationErrors);
      toast.error("Please correct the errors in the form.");
      return;
    }

    const formattedValues = {
      ...inputValues,
      TurnLeft: inputValues.TurnLeft === "Left" ? true : false,
    };

    const jsonData = JSON.stringify(formattedValues, null, 2);
    try {
      const sentData = await axios.post(
        "https://drillpilotapi.sunsab.com/api/SurveyData",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Design created successfully.");
      onClose();
      graphData = sentData.data;
      onDataReceived(graphData);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  if (!opened) return null;

  return (
    <div className="w-full h-3/5">
      <Box className="bg-white p-6 rounded-lg shadow-lg w-80 relative border-2 border-[#242423]">
        <Text className="text-lg font-bold mb-2 flex justify-between items-center">
          {modalType === "survey" ? "Design Survey" : "Design Fractures"}
          <span className="text-gray-600 cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </Text>
        {modalType === "survey" ? (
          <>
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Lateral Length</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="The length that the drill goes during the lateral."
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <NumberInput
              placeholder="Lateral Length"
              value={inputValues.LateralLength}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  LateralLength: value,
                }))
              }
              error={errors.LateralLength}
            />
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Well Spacing</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="Enter the length of the lateral section of the wellbore"
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <NumberInput
              placeholder="Well Spacing"
              value={inputValues.WellSpacing}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  WellSpacing: value,
                }))
              }
              error={errors.WellSpacing}
            />
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Drill Turn</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="Enter the length of the lateral section of the wellbore"
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <NumberInput
              placeholder="Drill Turn"
              value={inputValues.DrillTurn}
              suffix="° / 30 m"
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  DrillTurn: value,
                }))
              }
              error={errors.DrillTurn}
            />
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Turn Direction</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="Enter the length of the lateral section of the wellbore"
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <SegmentedControl
              fullWidth
              data={[
                { label: "Left", value: "Left" },
                { label: "Right", value: "Right" },
              ]}
              value={inputValues.TurnLeft}
              styles={{ label: { color: "black" } }}
              color="#eab308"
              onChange={(value) => {
                setInputValues((prevValues) => ({
                  ...prevValues,
                  TurnLeft: value,
                }));
              }}
              error={errors.TurnLeft}
            />
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Lateral Azimuth</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="From a bird's-eye view perspective: the final angle of the drill's lateral relative to the positive NS."
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <NumberInput
              placeholder="Lateral Azimuth"
              value={inputValues.LateralAzimuth}
              suffix="°"
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  LateralAzimuth: value,
                }))
              }
              error={errors.LateralAzimuth}
            />
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Total Depth</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="The depth of the vertical portion of the well "
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <NumberInput
              placeholder="Total Depth"
              value={inputValues.TotalDepth}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  TotalDepth: value,
                }))
              }
              error={errors.TotalDepth}
            />
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Drill Build</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="Enter the length of the lateral section of the wellbore"
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <NumberInput
              placeholder="Drill Build"
              value={inputValues.DrillBuild}
              suffix="° / 30 m"
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  DrillBuild: value,
                }))
              }
              error={errors.DrillBuild}
            />
            <div className="flex flex-row items-center">
              <Text className="mb-1 text-md">Lateral Dip</Text>
              <Tooltip
                multiline
                arrowOffset={50}
                arrowSize={5}
                w={220}
                label="Enter the length of the lateral section of the wellbore"
                withArrow
              >
                <div className="ml-1">
                  <HiOutlineInformationCircle className="hover:text-yellow-500" />
                </div>
              </Tooltip>
            </div>
            <NumberInput
              placeholder="Lateral Dip"
              value={inputValues.LateralDip}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  LateralDip: value,
                }))
              }
              error={errors.LateralDip}
            />
          </>
        ) : (
          <>
            <NumberInput
              label="Frac Spacing"
              placeholder="Frac Spacing"
              value={inputValues.FracSpacing}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  FracSpacing: value,
                }))
              }
            />
            <NumberInput
              label="Backoff"
              placeholder="Backoff"
              value={inputValues.Backoff}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  Backoff: value,
                }))
              }
            />
            <NumberInput
              label="Inclination Cutoff"
              placeholder="Inclination Cutoff"
              value={inputValues.InclinationCutoff}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  InclinationCutoff: value,
                }))
              }
            />
            <NumberInput
              label="Joint Length"
              placeholder="Joint Length"
              value={inputValues.JointLength}
              onChange={(value) =>
                setInputValues((prevValues) => ({
                  ...prevValues,
                  JointLength: value,
                }))
              }
            />
          </>
        )}
        <Group className="flex mt-4 justify-center space-x-2">
          <Button
            variant="filled"
            onClick={handleSubmit}
            className="bg-yellow-500 text-black hover:bg-yellow-700 px-4 py-2 transition-colors rounded-lg"
          >
            OK
          </Button>
          <Button
            variant="filled"
            onClick={onClose}
            className="bg-yellow-500 text-black hover:bg-yellow-700 px-4 py-2 transition-colors rounded-lg"
          >
            Cancel
          </Button>
        </Group>
      </Box>
    </div>
  );
};

export default SurveyNewDesignModal;

export { graphData };
