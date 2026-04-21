import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { orderBook } from "@/data/mockData";

export const OrderBookDepth = () => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const w = ref.current.clientWidth;
    const h = 220;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const all = [...orderBook.bids.map((b) => ({ ...b, side: "bid" as const })), ...orderBook.asks.map((a) => ({ ...a, side: "ask" as const }))];
    const x = d3.scaleLinear()
      .domain([d3.min(all, (d) => d.price)!, d3.max(all, (d) => d.price)!])
      .range([20, w - 20]);
    const y = d3.scaleLinear()
      .domain([0, d3.max(all, (d) => d.size)!])
      .range([h - 24, 12]);

    let bidCum = 0;
    const bidArea = orderBook.bids
      .slice()
      .sort((a, b) => a.price - b.price)
      .map((b) => ({ price: b.price, cum: (bidCum += b.size) }));
    let askCum = 0;
    const askArea = orderBook.asks
      .slice()
      .sort((a, b) => a.price - b.price)
      .map((a) => ({ price: a.price, cum: (askCum += a.size) }));

    const area = d3.area<{ price: number; cum: number }>()
      .x((d) => x(d.price))
      .y0(h - 24)
      .y1((d) => y(d.cum))
      .curve(d3.curveStepAfter);

    svg.append("path")
      .datum(bidArea)
      .attr("fill", "hsl(0 0% 0% / 0.15)")
      .attr("stroke", "hsl(0 0% 0%)")
      .attr("stroke-width", 1)
      .attr("d", area as any);
    svg.append("path")
      .datum(askArea)
      .attr("fill", "hsl(12 100% 50% / 0.15)")
      .attr("stroke", "hsl(12 100% 50%)")
      .attr("stroke-width", 1)
      .attr("d", area as any);

    svg.append("g")
      .attr("transform", `translate(0,${h - 24})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat((d) => (+d).toFixed(4)))
      .call((g) => g.selectAll("text").attr("font-family", "IBM Plex Mono").attr("font-size", 9).attr("fill", "hsl(240 2% 57%)"))
      .call((g) => g.select(".domain").attr("stroke", "hsl(0 0% 0%)"));
  }, []);
  return <svg ref={ref} className="w-full h-[220px]" />;
};
