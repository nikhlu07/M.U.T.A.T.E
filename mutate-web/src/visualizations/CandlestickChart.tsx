import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { candlesticks } from "@/data/mockData";

export const CandlestickChart = () => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const w = ref.current.clientWidth;
    const h = 220;
    const m = { t: 12, r: 12, b: 24, l: 56 };
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const x = d3.scaleBand<number>()
      .domain(candlesticks.map((d) => d.i))
      .range([m.l, w - m.r])
      .padding(0.25);
    const y = d3.scaleLinear()
      .domain([d3.min(candlesticks, (d) => d.low)!, d3.max(candlesticks, (d) => d.high)!])
      .nice()
      .range([h - m.b, m.t]);

    svg.append("g")
      .attr("transform", `translate(${m.l},0)`)
      .call(d3.axisLeft(y).ticks(4).tickFormat((d) => (+d).toFixed(4)))
      .call((g) => g.selectAll("text").attr("font-family", "IBM Plex Mono").attr("font-size", 9).attr("fill", "hsl(240 2% 57%)"))
      .call((g) => g.select(".domain").attr("stroke", "hsl(0 0% 0%)"));

    candlesticks.forEach((d) => {
      const cx = x(d.i)! + x.bandwidth() / 2;
      svg.append("line")
        .attr("x1", cx).attr("x2", cx)
        .attr("y1", y(d.high)).attr("y2", y(d.low))
        .attr("stroke", "hsl(0 0% 0%)").attr("stroke-width", 1);
      const up = d.close >= d.open;
      svg.append("rect")
        .attr("x", x(d.i)!).attr("width", x.bandwidth())
        .attr("y", y(Math.max(d.open, d.close)))
        .attr("height", Math.max(1, Math.abs(y(d.open) - y(d.close))))
        .attr("fill", up ? "hsl(0 0% 0%)" : "hsl(0 0% 100%)")
        .attr("stroke", "hsl(0 0% 0%)").attr("stroke-width", 1);
    });
  }, []);
  return <svg ref={ref} className="w-full h-[220px]" />;
};
