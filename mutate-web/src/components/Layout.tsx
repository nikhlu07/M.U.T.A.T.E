import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AuditLog } from "./AuditLog";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { to: "/", label: "OVERVIEW", end: true },
  { to: "/swarm", label: "SWARM" },
  { to: "/fitness", label: "FITNESS" },
  { to: "/evolution", label: "EVOLUTION" },
  { to: "/integration", label: "INTEGRATION" },
  { to: "/graduation", label: "GRADUATION" },
];

export const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      <header className="bg-canvas/90 backdrop-blur-md text-ink border-b border-ink/10 sticky top-0 z-50 shadow-sm relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-infrared/50 to-transparent" />
        <div className="mx-auto max-w-[1440px] px-6 py-4 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-5 h-5 flex items-center justify-center relative border border-ink/20 group-hover:border-infrared transition-colors duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-infrared/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <div className="w-1.5 h-1.5 bg-ink group-hover:bg-infrared transition-colors duration-300 relative z-10" />
            </div>
            <span className="font-display text-xl tracking-widest font-bold uppercase bg-gradient-to-r from-ink to-ink/70 bg-clip-text text-transparent group-hover:text-ink transition-colors duration-300">
              M.U.T.A.T.E.
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end as any}
                className={({ isActive }) =>
                  `relative font-mono font-medium uppercase text-[11px] tracking-[0.15em] py-2 transition-colors duration-300 ${
                    isActive ? "text-ink drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "text-ink/50 hover:text-ink/90"
                  } group`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border border-infrared rounded-full flex items-center justify-center">
                         <span className="w-0.5 h-0.5 bg-infrared rounded-full animate-pulse shadow-[0_0_5px_rgba(255,0,0,0.8)]" />
                      </span>
                    )}
                    {n.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                        isActive ? "w-full bg-infrared" : "w-0 bg-ink/20 group-hover:w-full group-hover:bg-ink/40"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          
          <div className="hidden lg:flex items-center gap-4 font-mono uppercase tracking-widest">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-ink/10 px-4 py-2 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 relative overflow-hidden cursor-default">
              <div className="absolute top-0 left-0 w-1 h-full bg-infrared animate-pulse" />
              <span className="text-[9px] text-ink/60 relative z-10">AGENT //</span>
              <span className="text-ink font-bold text-[10px] relative z-10">AUTONOMOUS</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-ink/10 px-4 py-2 bg-canvas/80 backdrop-blur-sm shadow-sm transition-all hover:border-ink/30 relative overflow-hidden cursor-default">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#facc15] animate-pulse" />
              <span className="text-[9px] text-ink/60 relative z-10">ORACLE //</span>
              <span className="text-ink font-bold text-[10px] relative z-10">SYNCED</span>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -16, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <AuditLog />
    </div>
  );
};
