import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const SlerpArc = () => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const size = Math.min(ref.current.clientWidth, 220);
    svg.attr("viewBox", `0 0 ${size} ${size}`);
    const cx = size / 2, cy = size / 2, r = size / 2 - 16;

    svg.append("circle").attr("cx", cx).attr("cy", cy).attr("r", r)
      .attr("fill", "none").attr("stroke", "hsl(0 0% 0%)").attr("stroke-width", 1);

    const a = -Math.PI * 0.7, b = -Math.PI * 0.15;
    const px = (t: number) => [cx + r * Math.cos(t), cy + r * Math.sin(t)];

    const arcGen = d3.arc()
      .innerRadius(r).outerRadius(r)
      .startAngle(a + Math.PI / 2).endAngle(b + Math.PI / 2);
    svg.append("path")
      .attr("transform", `translate(${cx},${cy})`)
      .attr("d", arcGen as any)
      .attr("stroke", "hsl(12 100% 50%)").attr("stroke-width", 2).attr("fill", "none");

    const [ax, ay] = px(a); const [bx, by] = px(b);
    const t = 0.5;
    const omega = Math.acos(Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b));
    const sin = Math.sin(omega) || 1;
    const k1 = Math.sin((1 - t) * omega) / sin;
    const k2 = Math.sin(t * omega) / sin;
    const mx = k1 * Math.cos(a) + k2 * Math.cos(b);
    const my = k1 * Math.sin(a) + k2 * Math.sin(b);
    const mag = Math.hypot(mx, my);
    const ix = cx + (r * mx) / mag, iy = cy + (r * my) / mag;

    [[ax, ay, "A"], [bx, by, "B"], [ix, iy, "T=0.5"]].forEach(([x, y, label]: any) => {
      svg.append("circle").attr("cx", x).attr("cy", y).attr("r", 4).attr("fill", "hsl(0 0% 0%)");
      svg.append("text").attr("x", x + 8).attr("y", y - 6)
        .attr("font-family", "IBM Plex Mono").attr("font-size", 9)
        .attr("fill", "hsl(240 2% 57%)").text(label);
    });
  }, []);
  return <svg ref={ref} className="w-full max-w-[220px]" />;
};
