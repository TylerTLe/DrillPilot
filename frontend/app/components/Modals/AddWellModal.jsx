import React, { useState } from "react";
import { Box, Group, Button, Input, Text } from "@mantine/core";
import toast from "react-hot-toast";

const AddWellModal = ({
  opened,
  onClose,
  modalType,
  handleCreateWellClick,
  ...props
}) => {
  const [well, setWell] = useState("");

  const handleSubmit = () => {
    if (well.trim() === "") {
      toast.error("Well name cannot be empty");
      return;
    }
    // Handle well creation logic here
    toast.success(`Well ${well} created successfully`);
    onClose();
    handleCreateWellClick(well);
    setWell("")
  };

  if (!opened || modalType !== "well") return null;

  return (
    <div className="w-full h-3/5 flex items-center justify-center">
      <Box className="bg-white p-6 rounded-lg shadow-lg w-80 relative border-2 border-[#242423]">
        <Text className="text-lg font-bold mb-2 flex justify-between items-center">
          Create Well
          <span className="text-gray-600 cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </Text>
        <Input
          placeholder="Enter well"
          value={well}
          onChange={(e) => setWell(e.target.value)}
        />
        <Group className="flex mt-4 justify-center space-x-2">
          <Button
            variant="filled"
            onClick={handleSubmit}
            className="bg-yellow-500 text-black hover:bg-yellow-700 px-4 py-2 transition-colors rounded-lg"
          >
            Create Well
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

export default AddWellModal;
