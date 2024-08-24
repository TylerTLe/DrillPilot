import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const XYZGraph = ({ data, fractureData, typeView }) => {
  const [plotData, setPlotData] = useState([]);
  const [fracturePoints, setFracturePoints] = useState([]);

  useEffect(() => {
    const unpack = (data, key) => data.map((row) => row[key]);
    const makeNegative = (values) => values.map((value) => -Math.abs(value));

    // Process survey data
    const surveysData = data.map((survey) => ({
      x: unpack(survey, "Ns"),
      y: unpack(survey, "Ew"),
      z: makeNegative(unpack(survey, "Tvd")),
    }));

    setPlotData(surveysData);

    // Process fracture data
    const fracturesData = fractureData.reduce((acc, point) => {
      acc.push({
        x: [point.points[0].Ns, point.points[1].Ns],
        y: [point.points[0].Ew, point.points[1].Ew],
        z: [
          makeNegative([point.points[0].Tvd])[0],
          makeNegative([point.points[1].Tvd])[0],
        ],
      });
      return acc;
    }, []);

    setFracturePoints(fracturesData);
  }, [data, fractureData]);

  const layout = {
    autosize: true,
    scene: {
      xaxis: { title: "Ns" },
      yaxis: { title: "Ew" },
      zaxis: { title: "Tvd" },
      camera:
        typeView === "Side"
          ? { eye: { x: 0, y: 1, z: 0 } }
          : { eye: { x: 1.4, y: 1.4, z: 1.4 } },
    },
    margin: { l: 0, r: 0, b: 0, t: 0 },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "1px",
        position: "relative",
      }}
    >
      <style jsx global>{`
        .modebar-container {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 1000;
        }
      `}</style>
      <Plot
        data={[
          ...plotData.map((survey, index) => ({
            type: "scatter3d",
            mode: "lines",
            x: survey.x,
            y: survey.y,
            z: survey.z,
            opacity: 1,
            lines: {
              size: 20,
              color: `hsl(${index * 40}, 70%, 50%)`,
            },
          })),
          ...fracturePoints.map((fracture, index) => ({
            type: "scatter3d",
            mode: "lines",
            x: fracture.x,
            y: fracture.y,
            z: fracture.z,
            opacity: 1,
            line: {
              width: 3,
              color: "black",
            },
          })),
        ]}
        layout={layout}
        config={{
          displayModeBar: false,
          modeBarButtonsToRemove: [
            "zoom2d",
            "pan2d",
            "select2d",
            "lasso2d",
            "resetScale2d",
            "hoverClosestCartesian",
            "hoverCompareCartesian",
          ],
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default XYZGraph;
