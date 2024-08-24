import React, { useState } from "react";
import { Box, Group, NumberInput, Button, Text } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";

const FractureNewDesignModal = ({
  opened,
  onClose,
  onDataReceived,
  selectedWell,
}) => {
  const [inputValues, setInputValues] = useState({
    FracSpacing: 80.0,
    Backoff: 55.0,
    InclinationCutoff: 86.0,
    JointLength: 13.0,
  });

  const [errors, setErrors] = useState({});

  const validateInputs = (values) => {
    const errors = {};
    // Add any necessary validation logic here
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

    const dataToSend = {
      ...inputValues,
      SurveyData: JSON.stringify(selectedWell.surveys), // Send only the survey data
    };

    try {
      const response = await axios.post(
        "https://drillpilotapi.sunsab.com/api/FracturesData",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Fracture design created successfully.");
      onClose();
      onDataReceived(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Please select a well first, or the selected well is empty.");
    }
  };

  if (!opened) return null;

  return (
    <div className="w-full h-3/5">
      <Box className="bg-white p-6 rounded-lg shadow-lg w-80 relative border-2 border-[#242423]">
        <Text className="text-lg font-bold mb-2 flex justify-between items-center">
          Design Fractures
          <span className="text-gray-600 cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </Text>
        <NumberInput
          label="Frac Spacing"
          placeholder="Frac Spacing"
          value={inputValues.FracSpacing}
          suffix=" m"
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
          suffix=" m"
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
          suffix=" °"
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
          suffix=" m"
          onChange={(value) =>
            setInputValues((prevValues) => ({
              ...prevValues,
              JointLength: value,
            }))
          }
        />
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

export default FractureNewDesignModal;
