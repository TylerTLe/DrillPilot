import React, { useState, useEffect } from "react";
import { Box, Group, Button, Text, rem } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import { FileInput } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import * as XLSX from "xlsx";

let graphData = [];

const FractureImportModal = ({ opened, onClose, onDataReceived, ...props }) => {
  const [incomingFile, setIncomingFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!opened) {
      setIncomingFile(null);
      setFileName("");
    }
  }, [opened]);

  const ParseExcel = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheet];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Assuming the fracture data structure is similar to survey data structure
          const mdInputs = jsonData.map((row) => row["Md"] || 0);
          const inclinationInputs = jsonData.map(
            (row) => row["Inclination"] || 0
          );
          const azimuthInputs = jsonData.map((row) => row["Azimuth"] || 0);

          const parsedData = {
            mdInputs,
            inclinationInputs,
            azimuthInputs,
          };
          console.log(parsedData);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async () => {
    if (!incomingFile) {
      toast.error("No file selected.");
      return;
    }

    setIsParsing(true);
    try {
      const parsedData = await ParseExcel(incomingFile);
      const jsonData = JSON.stringify(parsedData, null, 2);

      const response = await axios.post(
        "https://drillpilot-backend-1.onrender.com/api/FractureImportData",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Fracture data imported successfully.");
      graphData = response.data;
      onDataReceived(graphData);
      onClose();
    } catch (error) {
      console.error("Error submitting Imported file", error);
      toast.error("Error submitting Imported file");
    } finally {
      setIsParsing(false);
    }
  };

  if (!opened) return null;

  return (
    <div className="w-full h-3/5">
      <Box className="bg-white p-6 rounded-lg shadow-lg w-80 relative border-2 border-[#242423]">
        <Text className="text-lg font-bold mb-2 flex justify-between items-center">
          Import Fractures
          <span className="text-gray-600 cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </Text>
        {incomingFile ? (
          <Text size="xl" inline>
            {fileName}
          </Text>
        ) : (
          <Dropzone
            loading={isParsing}
            onDrop={(files) => {
              toast.success("Your file was accepted");
              setIncomingFile(files[0]);
              setFileName(files[0].name);
            }}
            accept={[
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/vnd.ms-excel",
            ]}
            onReject={(files) =>
              toast.error("There was an error accepting your file") + files
            }
            maxSize={5 * 1024 ** 2}
            multiple={false}
            {...props}
            acceptColor="green"
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag in your file containing fracture data.
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
        <Group className="flex mt-4 justify-center space-x-2">
          <Button
            variant="filled"
            onClick={handleSubmit}
            className="bg-yellow-500 text-black hover:bg-yellow-700 px-4 py-2 transition-colors rounded-lg"
            disabled={isParsing}
          >
            {isParsing ? "Processing..." : "OK"}
          </Button>
          <Button
            variant="filled"
            onClick={onClose}
            className="bg-yellow-500 text-black hover:bg-yellow-700 px-4 py-2 transition-colors rounded-lg"
            disabled={isParsing}
          >
            Cancel
          </Button>
        </Group>
      </Box>
    </div>
  );
};

export default FractureImportModal;

export { graphData };
