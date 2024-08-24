"use client";
import { Box, Group, Button, Input, Text } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";

const PadModal = ({ opened, onClose, modalType, handleCreatePadClick }) => {
  if (!opened || modalType !== "pad") return null;

  const [newPad, setNewPad] = useState("");

  const handleSubmit = () => {
    if (newPad.trim() === "") {
      toast.error("Pad name cannot be empty");
      return;
    }
    // Handle pad creation logic here
    toast.success(`Pad ${newPad} created successfully`);

    onClose();
    handleCreatePadClick(newPad);
    setNewPad("");
  };

  return (
    <div className="w-full h-3/5 flex items-center justify-center">
      <Box className="bg-white p-6 rounded-lg shadow-lg w-80 relative border-2 border-[#242423]">
        <Text className="text-lg font-bold mb-2 flex justify-between items-center">
          Create Pad
          <span className="text-gray-600 cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </Text>
        <Input
          placeholder="Enter pad"
          value={newPad}
          onChange={(e) => setNewPad(e.target.value)}
        />
        <Group className="flex mt-4 justify-center space-x-2">
          <Button
            variant="filled"
            className="bg-yellow-500 text-black hover:bg-yellow-700 px-4 py-2 transition-colors rounded-lg"
            onClick={handleSubmit}
          >
            Create Pad
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

export default PadModal;
