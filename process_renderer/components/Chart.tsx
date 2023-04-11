import React from "react";
import { ResponsivePie } from "@nivo/pie";

interface ChartProps {
  children?: React.ReactNode;
  win: number;
  lose: number;
}

const PieChart = ({ win, lose }: ChartProps) => {
  return (
    <div style={{ width: "150px", height: "150px" }}>
      <ResponsivePie
        data={[
          { id: "승리", lable: "win", value: win },
          { id: "패배", label: "lose", value: lose },
        ]}
        innerRadius={0.65}
        activeOuterRadiusOffset={8}
        colors={["#5770ea", "#d03939"]}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        isInteractive={false}
        animate={false}
      />
    </div>
  );
};

export default PieChart;
