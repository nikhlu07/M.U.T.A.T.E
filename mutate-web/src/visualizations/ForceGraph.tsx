import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { swarmAgents } from "@/data/mockData";

const COLORS: Record<string, string> = {
  momentum: "hsl(0 0% 0%)",
  diamond: "hsl(240 2% 57%)",
  speculator: "hsl(12 100% 50%)",
  herd: "hsl(0 0% 0%)",
  whale: "hsl(0 0% 0%)",
  influencer: "hsl(240 2% 57%)",
};

export const ForceGraph = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    const width = ref.current.clientWidth;
    const height = 480;
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const nodes = swarmAgents.slice(0, 160).map((a) => ({ ...a }));
    const links: { source: any; target: any }[] = [];
    nodes.forEach((n, i) => {
      for (let k = 0; k < (n.connections % 3); k++) {
        const t = nodes[(i + 7 * (k + 1)) % nodes.length];
        links.push({ source: n.id, target: t.id });
      }
    });

    const sim = d3
      .forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-22))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => (d.type === "whale" ? 10 : 5)))
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(40).strength(0.05));

    const linkSel = svg
      .append("g")
      .attr("stroke", "hsl(0 0% 0%)")
      .attr("stroke-opacity", 0.18)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const nodeSel = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => (d.type === "whale" ? 7 : d.type === "influencer" ? 5 : 3.5))
      .attr("fill", (d: any) => COLORS[d.type] || "hsl(0 0% 0%)")
      .attr("stroke", "hsl(0 0% 100%)")
      .attr("stroke-width", 0.6);

    nodeSel.append("title").text((d: any) => `${d.id} · ${d.type}`);

    sim.on("tick", () => {
      linkSel
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      nodeSel.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    });

    return () => {
      sim.stop();
    };
  }, []);

  return <svg ref={ref} className="w-full h-[480px]" />;
};
