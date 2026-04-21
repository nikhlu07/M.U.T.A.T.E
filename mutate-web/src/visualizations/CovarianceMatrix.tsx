import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { covariance } from "@/data/mockData";

export const CovarianceMatrix = () => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const size = Math.min(ref.current.clientWidth, 220);
    svg.attr("viewBox", `0 0 ${size} ${size}`);
    const cell = size / covariance.length;
    const color = d3.scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(["hsl(0 0% 100%)", "hsl(240 5% 96%)", "hsl(0 0% 0%)"]);
    covariance.forEach((row, i) =>
      row.forEach((v, j) => {
        svg.append("rect")
          .attr("x", j * cell).attr("y", i * cell)
          .attr("width", cell - 1).attr("height", cell - 1)
          .attr("fill", color(v))
          .attr("stroke", "hsl(0 0% 0%)").attr("stroke-width", 0.5);
        svg.append("text")
          .attr("x", j * cell + cell / 2).attr("y", i * cell + cell / 2 + 3)
          .attr("text-anchor", "middle")
          .attr("font-family", "IBM Plex Mono").attr("font-size", 9)
          .attr("fill", Math.abs(v) > 0.5 ? "hsl(0 0% 100%)" : "hsl(240 2% 57%)")
          .text(v.toFixed(2));
      })
    );
  }, []);
  return <svg ref={ref} className="w-full max-w-[220px]" />;
};
