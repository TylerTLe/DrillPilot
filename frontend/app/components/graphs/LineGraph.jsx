import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function LineGraph({
  labels,
  data,
  fractureData,
  width = 800,
  height = 600,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 40,
  marginLeft = 60,
  xLabel = "East West (EW)",
  yLabel = "North South (NS)",
}) {
  const svgRef = useRef();
  const gxRef = useRef();
  const gyRef = useRef();
  const gridRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const allEw = data.flatMap((survey) => survey.map((d) => d.Ew));
    const allNs = data.flatMap((survey) => survey.map((d) => d.Ns));
    const allFractureEw = fractureData.flatMap((d) =>
      d.points.flatMap((p) => [p.Ew])
    );
    const allFractureNs = fractureData.flatMap((d) =>
      d.points.map((p) => p.Ns)
    );

    const x = d3
      .scaleLinear()
      .domain([
        d3.min([...allEw, ...allFractureEw]),
        d3.max([...allEw, ...allFractureEw]),
      ])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min([...allNs, ...allFractureNs]),
        d3.max([...allNs, ...allFractureNs]),
      ])
      .range([height - marginBottom, marginTop]);

    const drawGrid = (g, x, y) => {
      const xGrid = g.selectAll(".x-grid").data(x.ticks());
      xGrid
        .join(
          (enter) => enter.append("line").attr("class", "x-grid"),
          (update) => update,
          (exit) => exit.remove()
        )
        .attr("x1", (d) => x(d))
        .attr("x2", (d) => x(d))
        .attr("y1", marginTop)
        .attr("y2", height - marginBottom)
        .attr("stroke", "lightgray")
        .attr("stroke-width", (d) => (d === 0 ? "2px" : "1px"));

      const yGrid = g.selectAll(".y-grid").data(y.ticks());
      yGrid
        .join(
          (enter) => enter.append("line").attr("class", "y-grid"),
          (update) => update,
          (exit) => exit.remove()
        )
        .attr("x1", marginLeft)
        .attr("x2", width - marginRight)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("stroke", "lightgray")
        .attr("stroke-width", (d) => (d === 0 ? "2px" : "1px"));
    };

    const svg = d3.select(svgRef.current);
    const gx = d3.select(gxRef.current);
    const gy = d3.select(gyRef.current);
    const grid = d3.select(gridRef.current);

    // Clear previous axes and labels
    svg.selectAll(".x.label").remove();
    svg.selectAll(".y.label").remove();
    svg.selectAll(".axis-line").remove();
    gx.selectAll("*").remove();
    gy.selectAll("*").remove();

    // Define the clipping path
    svg.select("defs").remove();

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom);

    gx.call(d3.axisBottom(x).ticks(10));
    gy.call(d3.axisLeft(y).ticks(10));

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 10])
      .on("zoom", (event) => {
        const transform = event.transform;
        const newX = transform.rescaleX(x);
        const newY = transform.rescaleY(y);

        gx.call(d3.axisBottom(newX).ticks(10));
        gy.call(d3.axisLeft(newY).ticks(10));

        d3.select(chartRef.current)
          .selectAll(".line-path")
          .attr("d", (d) => lineGenerator(d, newX, newY));

        d3.select(chartRef.current)
          .selectAll(".fracture-line")
          .attr("x1", (d) => newX(d.points[0].Ew))
          .attr("y1", (d) => newY(d.points[0].Ns))
          .attr("x2", (d) => newX(d.points[1]?.Ew))
          .attr("y2", (d) => newY(d.points[1]?.Ns));

        drawGrid(grid, newX, newY);

        // Draw solid black lines for axes at (0,0)
        svg.selectAll(".axis-line").remove();
        svg
          .append("line")
          .attr("clip-path", "url(#clip)") // Apply the clipping path
          .attr("class", "axis-line")
          .attr("x1", newX(0))
          .attr("y1", marginTop)
          .attr("x2", newX(0))
          .attr("y2", height - marginBottom)
          .attr("stroke", "black")
          .attr("stroke-width", "0.5px");

        svg
          .append("line")
          .attr("clip-path", "url(#clip)") // Apply the clipping path
          .attr("class", "axis-line")
          .attr("x1", marginLeft)
          .attr("y1", newY(0))
          .attr("x2", width - marginRight)
          .attr("y2", newY(0))
          .attr("stroke", "black")
          .attr("stroke-width", "0.5px");
      });

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 20)
      .attr("y", height)
      .text(xLabel);

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("x", -20)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text(yLabel);

    svg.call(zoom);

    const chart = d3.select(chartRef.current);

    const lineGenerator = (data, x, y) => {
      return d3
        .line()
        .x((d) => x(d.Ew))
        .y((d) => y(d.Ns))(data);
    };

    // Plot each survey as a separate line
    chart
      .attr("clip-path", "url(#clip)") // Apply the clipping path
      .selectAll(".line-path")
      .data(data)
      .join("path")
      .attr("class", "line-path")
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", "3px")
      .attr("d", (d) => lineGenerator(d, x, y));

    chart
      .attr("clip-path", "url(#clip)") // Apply the clipping path
      .selectAll(".fracture-line")
      .data(fractureData)
      .join("line")
      .attr("class", "fracture-line")
      .attr("stroke", "black")
      .attr("stroke-width", "1.5px")
      .attr("x1", (d) => x(d.points[0].Ew))
      .attr("y1", (d) => y(d.points[0].Ns))
      .attr("x2", (d) => x(d.points[1]?.Ew))
      .attr("y2", (d) => y(d.points[1]?.Ns));

    drawGrid(grid, x, y);

    // Draw solid black lines for axes at (0,0)
    svg
      .append("line")
      .attr("clip-path", "url(#clip)") // Apply the clipping path
      .attr("class", "axis-line")
      .attr("x1", x(0))
      .attr("y1", marginTop)
      .attr("x2", x(0))
      .attr("y2", height - marginBottom)
      .attr("stroke", "black")
      .attr("stroke-width", "0.5px");

    svg
      .append("line")
      .attr("clip-path", "url(#clip)") // Apply the clipping path
      .attr("class", "axis-line")
      .attr("x1", marginLeft)
      .attr("y1", y(0))
      .attr("x2", width - marginRight)
      .attr("y2", y(0))
      .attr("stroke", "black")
      .attr("stroke-width", "0.5px");

    // Calculate the initial transform to center the origin (0,0)
    const initialScale = Math.min(
      (width - marginLeft - marginRight) /
        (d3.max([...allNs, ...allFractureNs]) -
          d3.min([...allNs, ...allFractureNs])),
      (height - marginTop - marginBottom) /
        (d3.max([...allEw, ...allFractureEw]) -
          d3.min([...allEw, ...allFractureEw]))
    );

    // Calculate the initial translation to center (0,0)
    const initialTranslateX = width / 2 - initialScale * x(0);
    const initialTranslateY = height / 2 - initialScale * y(0);

    const initialTransform = d3.zoomIdentity
      .translate(initialTranslateX, initialTranslateY)
      .scale(initialScale);

    svg.call(zoom.transform, initialTransform);
  }, [
    data,
    fractureData,
    height,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    width,
    xLabel,
    yLabel,
  ]);

  return (
    <svg width={width} height={height} ref={svgRef}>
      <g ref={gridRef} />
      <g ref={gxRef} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gyRef} transform={`translate(${marginLeft},0)`} />
      <g ref={chartRef} />
    </svg>
  );
}
