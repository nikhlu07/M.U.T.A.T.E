import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { fitnessTrajectory } from "@/data/mockData";

export const FitnessTrajectory = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const w = ref.current.clientWidth;
    const h = 220;
    const m = { t: 16, r: 16, b: 28, l: 36 };
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const x = d3.scaleLinear().domain([1, 50]).range([m.l, w - m.r]);
    const y = d3.scaleLinear().domain([0, 1]).range([h - m.b, m.t]);

    // axes
    svg.append("g")
      .attr("transform", `translate(0,${h - m.b})`)
      .call(d3.axisBottom(x).ticks(8).tickSize(-h + m.t + m.b))
      .call((g) => g.selectAll("line").attr("stroke", "hsl(240 2% 57% / 0.25)"))
      .call((g) => g.selectAll("text").attr("font-family", "IBM Plex Mono").attr("font-size", 10).attr("fill", "hsl(240 2% 57%)"))
      .call((g) => g.select(".domain").attr("stroke", "hsl(0 0% 0%)"));

    svg.append("g")
      .attr("transform", `translate(${m.l},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.selectAll("text").attr("font-family", "IBM Plex Mono").attr("font-size", 10).attr("fill", "hsl(240 2% 57%)"))
      .call((g) => g.select(".domain").attr("stroke", "hsl(0 0% 0%)"));

    // target line
    svg.append("line")
      .attr("x1", m.l).attr("x2", w - m.r)
      .attr("y1", y(0.9)).attr("y2", y(0.9))
      .attr("stroke", "hsl(240 2% 57%)").attr("stroke-dasharray", "4 4");

    const line = d3.line<{ gen: number; fitness: number }>()
      .x((d) => x(d.gen))
      .y((d) => y(d.fitness))
      .curve(d3.curveLinear);

    svg.append("path")
      .datum(fitnessTrajectory)
      .attr("fill", "none")
      .attr("stroke", "hsl(0 0% 0%)")
      .attr("stroke-width", 1)
      .attr("d", line as any);

    const last = fitnessTrajectory[fitnessTrajectory.length - 1];
    svg.append("circle")
      .attr("cx", x(last.gen)).attr("cy", y(last.fitness)).attr("r", 4)
      .attr("fill", "hsl(12 100% 50%)");
  }, []);

  return <svg ref={ref} className="w-full h-[220px]" />;
};
