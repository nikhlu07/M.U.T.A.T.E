import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { lineage } from "@/data/mockData";

export const PhylogeneticTree = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    
    // Clear previous renders (important for React StrictMode)
    svg.selectAll("*").remove(); 

    // Calculate dimensions
    const w = ref.current.clientWidth || 1000;
    const h = 800; // Increased to prevent vertical compression
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    // Create defs for filters and gradients
    const defs = svg.append("defs");

    // Glow filter for highlighting the active/current evolutionary branch
    const filter = defs.append("filter")
      .attr("id", "ultra-glow")
      .attr("x", "-50%").attr("y", "-50%")
      .attr("width", "200%").attr("height", "200%");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "6")
      .attr("result", "blur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Link Gradient (graphite to bright infrared)
    const linkGrad = defs.append("linearGradient")
      .attr("id", "linkGrad")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%");
    linkGrad.append("stop").attr("offset", "0%").attr("stop-color", "rgba(0,0,0,0.05)");
    linkGrad.append("stop").attr("offset", "100%").attr("stop-color", "rgba(255,50,50,0.8)");

    // Define tree layout and hierarchy
    const root = d3.hierarchy(lineage);
    const tree = d3.tree<any>().size([h - 80, w - 300]);
    tree(root);

    // Main group container
    const g = svg.append("g").attr("transform", "translate(120,40)");

    // Draw Links
    const link = g.append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d3.linkHorizontal<any, any>()
          .x((d: any) => d.y)
          .y((d: any) => d.x)
      )
      .attr("stroke", (d: any) => {
        // If it leads to current, make it glowing red gradient
        if (d.target.data.current) return "url(#linkGrad)";
        // If it's a deep branch, dim it further systematically
        return `rgba(0,0,0,${0.2 - (d.target.depth * 0.03)})`;
      })
      .attr("stroke-width", (d: any) => d.target.data.current ? 3.5 : 1.5)
      .attr("filter", (d: any) => d.target.data.current ? "url(#ultra-glow)" : "none");

    // Animate links drawing sequence (stroke-dasharray technique)
    link.each(function(this: SVGPathElement, d: any) {
      const el = d3.select(this);
      const len = this.getTotalLength();
      el.attr("stroke-dasharray", `${len} ${len}`)
        .attr("stroke-dashoffset", len)
        .transition()
        .duration(1200)
        .delay(d.source.depth * 300)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);
    });

    // Draw Nodes
    const node = g.append("g").selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    // Fade in nodes sequentially matching the path drawing
    node.attr("opacity", 0)
      .transition()
      .duration(600)
      .delay((d: any) => (d.depth * 300) + 800)
      .attr("opacity", 1);

    // Dynamic Outer Pulsing Orbital for current nodes
    const currentNodes = node.filter((d: any) => d.data.current);
    
    currentNodes.append("circle")
      .attr("r", (d: any) => (4 + (d.data.fitness || 0.3) * 6) + 6)
      .attr("fill", "none")
      .attr("stroke", "rgba(255,50,50,0.6)")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "3 4")
      .attr("filter", "url(#ultra-glow)")
      .each(function pulseOut(this: any) {
        d3.select(this)
          .transition()
          .duration(1500)
          .ease(d3.easeCircleOut)
          .attr("r", 32)
          .attr("opacity", 0)
          .transition()
          .duration(0)
          .attr("r", (d: any) => (4 + (d.data.fitness || 0.3) * 6) + 6)
          .attr("opacity", 1)
          .on("end", pulseOut);
      });

    // Node Core Design
    node.append("circle")
      .attr("r", (d: any) => 4 + (d.data.fitness || 0.3) * 6)
      .attr("fill", (d: any) => d.data.current ? "rgb(255, 50, 50)" : "rgba(255,255,255,1)")
      .attr("stroke", (d: any) => d.data.current ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)")
      .attr("stroke-width", (d: any) => d.data.current ? 2.5 : 1.5)
      .attr("filter", (d: any) => d.data.current ? "url(#ultra-glow)" : "none")
      .style("cursor", "crosshair")
      // Core continuous pulse for current nodes
      .each(function(d: any) {
        if (d.data.current) {
          const core = d3.select(this);
          const baseR = 4 + (d.data.fitness || 0.3) * 6;
          function corePulse() {
            core.transition()
                .duration(1000)
                .attr("r", baseR + 2.5)
                .transition()
                .duration(1000)
                .attr("r", baseR)
                .on("end", corePulse);
          }
          corePulse();
        }
      })
      // Brutalist interactive hover effects for non-current nodes
      .on("mouseover", function(event, d: any) {
        if (!d.data.current) {
           d3.select(this)
             .transition()
             .duration(200)
             .attr("r", (4 + (d.data.fitness || 0.3) * 6) * 1.6)
             .attr("fill", "rgba(0,0,0,0.05)")
             .attr("stroke-width", 2);
        }
      })
      .on("mouseout", function(event, d: any) {
        if (!d.data.current) {
           d3.select(this)
             .transition()
             .duration(250)
             .ease(d3.easeBounceOut)
             .attr("r", 4 + (d.data.fitness || 0.3) * 6)
             .attr("fill", "rgba(255,255,255,1)")
             .attr("stroke-width", 1.5);
        }
      });

    // Node Labels Background (Thick outline for readability)
    node.append("text")
      .attr("x", (d: any) => (d.children ? -16 : 18))
      .attr("y", 4)
      .attr("text-anchor", (d: any) => (d.children ? "end" : "start"))
      .attr("font-family", "IBM Plex Mono")
      .attr("font-size", (d: any) => d.data.current ? 12 : 9.5)
      .attr("font-weight", (d: any) => d.data.current ? "bold" : "600")
      .attr("stroke", "rgba(255,255,255,1)")
      .attr("stroke-width", 4)
      .attr("stroke-linejoin", "round")
      .text((d: any) => d.data.name);

    // Node Labels Foreground
    node.append("text")
      .attr("x", (d: any) => (d.children ? -16 : 18))
      .attr("y", 4)
      .attr("text-anchor", (d: any) => (d.children ? "end" : "start"))
      .attr("font-family", "IBM Plex Mono")
      .attr("font-size", (d: any) => d.data.current ? 12 : 9.5)
      .attr("font-weight", (d: any) => d.data.current ? "bold" : "600")
      .attr("fill", (d: any) => d.data.current ? "rgb(255, 50, 50)" : "hsl(240 2% 57%)")
      .text((d: any) => d.data.name);

  }, []);

  return (
    <div className="relative w-full h-[850px] flex justify-center items-center overflow-hidden group">
       {/* Ambient grid background overlaying for a futuristic clinical feel */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000 z-0" 
            style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
       
       <svg ref={ref} className="w-full h-full relative z-10" />
    </div>
  );
};
