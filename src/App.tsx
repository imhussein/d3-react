import React, { useRef, useState, useEffect } from "react";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { axisLeft, axisBottom } from "d3-axis";

const data = [
  {
    name: "mohamed",
    number: 5000,
  },
  {
    name: "jane",
    number: 2340,
  },
  {
    name: "doe",
    number: 3463,
  },
  {
    name: "hussein",
    number: 3654,
  },
  {
    name: "ahmed",
    number: 2654,
  },
  {
    name: "smith",
    number: 2654,
  },
  {
    name: "sayeed",
    number: 3463,
  },
  {
    name: "kareem",
    number: 3654,
  },
  {
    name: "yousif",
    number: 2654,
  },
  {
    name: "tony",
    number: 6654,
  },
];

class Dim {
  constructor(
    public width: number,
    public height: number,
    public chartWidth: number,
    public chartHeight: number,
    public marginLeft: number
  ) {}
}

const dimension = new Dim(800, 500, 700, 400, 100);

export default function App() {
  const ref = useRef<null>(null);
  const [selection, setSelection] = useState<null | Selection<
    null,
    unknown,
    null,
    undefined
  >>(null);
  const maxNum = max(data, (d) => d.number);
  const y = scaleLinear()
    .domain([0, maxNum!])
    .range([dimension.chartHeight, 0]);
  const x = scaleBand()
    .domain(data.map(({ name }) => name))
    .range([0, dimension.chartWidth])
    .paddingInner(0.05)
    .paddingOuter(0.1);
  const yAxis = axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `$${d}`);
  const xAxis = axisBottom(x);
  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      const xAxisGroup = selection
        .append("g")
        .attr(
          "transform",
          `translate(${dimension.marginLeft}, ${dimension.chartHeight})`
        )
        .call(xAxis);
      const yAxisGroup = selection
        .append("g")
        .attr("transform", `translate(${dimension.marginLeft}, 0)`)
        .call(yAxis);
      selection
        .append("g")
        .attr("transform", `translate(${dimension.marginLeft}, 0)`)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", x.bandwidth)
        .attr("x", (d) => x(d.name)!)
        .attr("y", (d) => dimension.chartHeight - y(d.number))
        .attr("fill", "#2896fb")
        .attr("height", (d) => y(d.number));
    }
  }, [selection]);
  return (
    <div className="Ap">
      <svg ref={ref} width={dimension.width} height={dimension.height}>
        <g>
          <rect />
          <rect />
          <rect />
          <rect />
        </g>
      </svg>
    </div>
  );
}
