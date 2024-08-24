import lateral_length from "../../public/lateral_length.png";
import lateral_azimuth from "../../public/lateralazimuth.png";
import lateral_dip from "../../public/lateral_dip.png";
import drill_turn from "../../public/drillbuild_or_drillturn.png";
import well_spacing from "../../public/well_spacing_diagram.png";
import total_depth from "../../public/total_depth.png";

export const docsData = [
  {
    title: "Lateral Length",
    description: `
          The horizontal distance covered by the drill during the lateral section.
          Determines how far horizontally the well extends after the build arc.
          
          Maximum: 9999 m
          Minimum: 0 m`,
    imageUrl: lateral_length,
  },
  {
    title: "Well Spacing",
    description: `
          The distance between the lateral and the origin point.
          Defines the lateral offset from the vertical axis.
          
          Maximum: Build Radius + Turn Radius
          Minimum: 0
          Build Radius = ((30 / DrillBuild) * 180) / π
          Turn Radius = ((30 / DrillTurn) * 180) / π`,
    imageUrl: well_spacing,
  },
  {
    title: "Lateral Azimuth",
    description: `
          The final angle of the lateral section relative to the North-South axis.
          Sets the orientation of the lateral path from a top-down view.
          Range typically from 0 to the specified angle. 
          
          Maximum: 359°
          Minimum: 0°`,
    imageUrl: lateral_azimuth,
  },
  {
    title: "Drill Turn",
    description: `
          Angle change per unit length during the drill's turning section.
          Controls the directional changes in the drill's path.
          Typically ranges from 0 to the lateral azimuth angle.
          
          Maximum: 12 ° / 30 m
          Minimum: 2 ° / 30 m`,
    imageUrl: drill_turn,
  },
  {
    title: "Total Depth",
    description: `
          The vertical depth of the well.
          Indicates how deep the well extends into the ground.
          Often abbreviated as 'd' in calculations.

          Maximum: 9999 m
          Minimum: Build Radius
          
          Build Radius = ((30 / DrillBuild) * 180) / π
          `
          
          ,
    imageUrl: total_depth,
  },
  {
    title: "Drill Build",
    description: `
          Angle change per unit length during the drill's building section.
          Governs the angle increase in the well's vertical section.

          Maximum: 12 ° / 30 m
          Minimum: 2 ° / 30 m`,
    imageUrl: drill_turn,
  },
  {
    title: "Lateral Dip",
    description: `
          The angle of the lateral section relative to the ground.
          Specifies the inclination of the lateral drill path.
          Includes minimum and maximum angle values.

          Maximum: 5°
          Minimum: -5°`,
    imageUrl: lateral_dip,
  },
] as const;
