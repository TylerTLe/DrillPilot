import React, { useState } from "react";
import { Box, Group, Button, NativeSelect, Input, Text } from "@mantine/core";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const ExportModal = ({
  opened,
  onClose,
  graphData,
  exportModalType,
  ...props
}) => {
  const [filename, setFilename] = useState("");
  const [fileType, setFileType] = useState(".XLSX");

  const exportFile = (graphData, filename) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(graphData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write the workbook to an Excel file
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleExport = () => {
    if (!filename) {
      toast.error("Please enter a filename.");
      return;
    }

    try {
      exportFile(graphData, filename);
      toast.success("File exported successfully.");
      onClose();
    } catch (error) {
      console.error("Error exporting file", error);
      toast.error("Error exporting file");
    }
  };

  if (!opened) return null;

  return (
    <div className="w-full h-3/5">
      <Box className="bg-white p-6 rounded-lg shadow-lg w-80 relative border-2 border-[#242423]">
        <Text className="text-lg font-bold mb-2 flex justify-between items-center">
          {exportModalType === "survey" ? "Export Survey" : "Export Fractures"}
          <span className="text-gray-600 cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </Text>

        {exportModalType === "survey" ? (
          <div>
            <Input
              placeholder="Enter filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <NativeSelect
              label="Select File Type"
              data={[".XLSX", ".XLS", ".CSV", ".PDF"]}
              onChange={(e) => setFileType(e.target.value)}
            />
          </div>
        ) : (
          <></>
        )}
        <Group className="flex mt-4 justify-center space-x-2">
          <Button
            variant="filled"
            onClick={handleExport}
            className="bg-yellow-500 text-black hover:bg-yellow-700 px-4 py-2 transition-colors rounded-lg"
          >
            Export to file
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

export default ExportModal;
