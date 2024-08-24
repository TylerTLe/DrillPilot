import React, { useState, useEffect, useCallback } from "react";
import { Button, SegmentedControl } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { Loader } from "@mantine/core";

const XYZGraph = dynamic(() => import("./graphs/XYZGraph"), {
  ssr: false,
  loading: () => <Loader color="yellow" />,
});

const LineGraph = dynamic(() => import("./graphs/LineGraph"), {
  ssr: false,
  loading: () => <Loader color="yellow" />,
});

function GraphView({ graphData, fractureData, burgerClick }) {
  const [view, setView] = useState("Bird");
  const [refreshKey, setRefreshKey] = useState(0);

  const [data, setData] = useState([]);
  const [fracturePoints, setFracturePoints] = useState([]);

  useEffect(() => {
    const updateData = () => {
      const newData = graphData.map((survey) => {
        if (!Array.isArray(survey)) {
          console.error("Survey data is not an array", survey);
          return [];
        }
        return survey.map((point) => {
          switch (view) {
            case "Bird":
              return { Ew: point.Ew, Ns: point.Ns };
            case "Side":
              return { Ns: point.TvdSubSea, Ew: point.VerticalSection };
            case "3D":
              return { Ew: point.Ew, Ns: point.Ns, Tvd: point.Tvd };
            default:
              return {};
          }
        });
      });
      setData(newData);
    };
    updateData();
  }, [graphData, view, refreshKey]);

  useEffect(() => {
    const updateFractureData = () => {
      switch (view) {
        case "Bird":
          setFracturePoints(
            fractureData.reduce((acc, point) => {
              acc.push({
                name: "BirdView",
                points: [
                  { Ew: point.EwSurfaceMinus, Ns: point.NsSurfaceMinus },
                  { Ew: point.EwSurfacePlus, Ns: point.NsSurfacePlus },
                ],
              });
              return acc;
            }, [])
          );
          break;
        case "Side":
          setFracturePoints(
            fractureData.reduce((acc, point) => {
              acc.push({
                name: "SideView",
                points: [
                  { Ns: point.TvdSubSeaPlus, Ew: point.VerticalSection },
                  { Ns: point.TvdSubSeaMinus, Ew: point.VerticalSection },
                ],
              });
              return acc;
            }, [])
          );
          break;
        case "3D":
          setFracturePoints(
            fractureData.reduce((acc, point) => {
              acc.push({
                name: "3DView",
                points: [
                  {
                    Ew: point.EwSurfaceMinus,
                    Ns: point.NsSurfaceMinus,
                    Tvd: point.TvdSubSeaMinus,
                  },
                  {
                    Ew: point.EwSurfacePlus,
                    Ns: point.NsSurfacePlus,
                    Tvd: point.TvdSubSeaPlus,
                  },
                ],
              });
              return acc;
            }, [])
          );
          break;
        default:
          setFracturePoints([]);
          break;
      }
    };
    updateFractureData();
  }, [fractureData, view, refreshKey]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="w-full h-full p-2 rounded-lg">
      <div className="max-w-[1240px] w-full flex flex-col items-center h-full rounded-lg">
        <div className="flex w-full lg:block lg:w-1/3 mb-4 border-2 border-black rounded-lg">
          <div className="w-full">
            <SegmentedControl
              fullWidth
              size="lg"
              color="#eab308"
              styles={{ label: { color: "black" } }}
              data={[
                { label: "Birds Eye", value: "Bird" },
                { label: "Side", value: "Side" },
                { label: "3D", value: "3D" },
              ]}
              value={view}
              onChange={setView}
            />
          </div>

          <div
            onClick={burgerClick}
            className="p-2 lg:hidden mx-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
        </div>

        <div className="flex w-full border-2 border-black rounded-lg mb-4 grow overflow-auto justify-center items-center bg-white">
          {data.length > 0 && view === "Bird" && (
            <LineGraph
              className="flex justify-center items-center"
              data={data}
              fractureData={fracturePoints} // Pass fracture data to the LineGraph component
              yLabel="North South (NS)"
              xLabel="East West (EW)"
            />
          )}
          {data.length > 0 && view === "3D" && (
            <XYZGraph data={data} fractureData={fracturePoints} /> // Pass fracture data to the XYZGraph component
          )}
          {data.length > 0 && view === "Side" && (
            <LineGraph
              className="flex justify-center items-center"
              data={data}
              fractureData={fracturePoints} // Pass fracture data to the LineGraph component
              yLabel="TVD-SubSea"
              xLabel="Vertical Section"
            />
          )}
        </div>

        <div className="w-full">
          <Button
            fullWidth
            className="w-full text-black rounded-md mt-auto mb-4 py-2 bg-yellow-500 hover:bg-yellow-700 border-black border-2 hover:text-white"
            onClick={handleRefresh}
            disabled={data.length === 0}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="icon" />
            &nbsp;
            <span>Refresh</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GraphView;
