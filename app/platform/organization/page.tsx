"use client";

import { useEffect, useState, useRef } from "react";
import { useOrganizationStore } from "../../../stores/organizationStore";
import {
  Building2,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle,
  Play,
  HelpCircle,
  RefreshCw,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize2,
  GitPullRequest,
  FileText,
  AlertCircle,
  Activity,
  UserX,
  Clock,
  Settings,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

export default function OrganizationIntelPage() {
  const {
    overview,
    nodes,
    edges,
    selectedNode,
    hoveredEdge,
    searchQuery,
    filterType,
    insights,
    recommendations,
    simulationResult,
    simulationTargetId,
    simulationScenario,
    isLoading,
    panX,
    panY,
    zoom,
    loadAllData,
    setSelectedNode,
    setHoveredEdge,
    setSearchQuery,
    setFilterType,
    runSimulation,
    clearSimulation,
    updateNodePosition,
    setPan,
    setZoom,
    resetView
  } = useOrganizationStore();

  const [activeTab, setActiveTab] = useState<"overview" | "graph" | "insights" | "recommendations" | "simulation">("overview");
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Custom simulation selections
  const [simType, setSimType] = useState("engineer_leave");
  const [simTarget, setSimTarget] = useState("Alice");

  useEffect(() => {
    loadAllData();
  }, []);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    const nodeId = target.getAttribute("data-node-id");

    if (nodeId) {
      setDraggedNodeId(nodeId);
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        setSelectedNode(node);
      }
    } else {
      setIsPanning(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggedNodeId) {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      const newX = (clientX - panX) / zoom;
      const newY = (clientY - panY) / zoom;
      
      updateNodePosition(draggedNodeId, newX, newY);
    } else if (isPanning) {
      setPan(e.clientX - dragStart.x, e.clientY - dragStart.y);
    }
  };

  const handleMouseUp = () => {
    setDraggedNodeId(null);
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom(zoom * factor);
  };

  const triggerSimulation = () => {
    runSimulation(simType, simTarget);
  };

  // Node filtering
  const getFilteredNodes = () => {
    return nodes.filter(n => {
      const matchSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = filterType === "All" || n.type === filterType;
      return matchSearch && matchFilter;
    });
  };

  const filteredNodes = getFilteredNodes();
  const activeNodeIds = new Set(filteredNodes.map(n => n.id));

  // Connections highlight on selected node
  const getConnectedNodeIds = () => {
    if (!selectedNode) return new Set();
    const connected = new Set<string>([selectedNode.id]);
    edges.forEach(edge => {
      if (edge.source === selectedNode.id) connected.add(edge.target);
      if (edge.target === selectedNode.id) connected.add(edge.source);
    });
    return connected;
  };

  const highlightedNodeIds = getConnectedNodeIds();

  // Simulation affected highlight set
  const simulationAffectedNodeIds = new Set(
    simulationResult?.affected_nodes.map(n => n.id) || []
  );

  const getNodeColor = (type: string, isSelected: boolean) => {
    const colors: Record<string, string> = {
      Department: "#ef4444",  // Red
      Team: "#f97316",        // Orange
      Person: "#3b82f6",      // Blue
      Project: "#10b981",     // Emerald Green
      Task: "#6b7280",        // Gray
      Technology: "#06b6d4",  // Cyan
      Skill: "#0891b2",       // Teal
      Document: "#a855f7",    // Purple
      Policy: "#c084fc",      // Light purple
      Meeting: "#f43f5e",     // Rose
      Repository: "#6366f1",  // Indigo
      Product: "#84cc16",     // Lime
      Customer: "#eab308",    // Yellow
      Vendor: "#d97706"       // Amber
    };
    return colors[type] || "#ffffff";
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider font-mono flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Organization Intelligence
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Model, analyze, and simulate cascading impacts across your enterprise graph architecture.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            disabled={isLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Sync Graph
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      <div className="flex border-b border-white/5 gap-1 select-none overflow-x-auto custom-scrollbar">
        {(["overview", "graph", "insights", "recommendations", "simulation"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === tab
                ? "border-blue-500 text-blue-400 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* RENDER ACTIVE TAB VIEW */}

      {/* TAB: OVERVIEW */}
      {activeTab === "overview" && overview && (
        <div className="space-y-6">
          {/* STATS OVERVIEW CARDS */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-left">
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-semibold">Total Personnel</p>
              <h3 className="text-2xl font-bold font-mono mt-1 text-blue-400">
                {overview.health_report.organizational_structure_summary.total_personnel}
              </h3>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-left">
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-semibold">Active Projects</p>
              <h3 className="text-2xl font-bold font-mono mt-1 text-emerald-400">
                {overview.health_report.organizational_structure_summary.total_projects}
              </h3>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-left">
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-semibold">Teams Mapped</p>
              <h3 className="text-2xl font-bold font-mono mt-1 text-orange-400">
                {overview.health_report.organizational_structure_summary.total_teams}
              </h3>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-left">
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-semibold">Skills Indexed</p>
              <h3 className="text-2xl font-bold font-mono mt-1 text-cyan-400">
                {overview.health_report.organizational_structure_summary.total_skills}
              </h3>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-left">
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-semibold">Operational Risk</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`h-2 w-2 rounded-full ${
                  overview.health_report.overall_operational_risk.rating === "High"
                    ? "bg-rose-500 animate-pulse"
                    : overview.health_report.overall_operational_risk.rating === "Medium"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`} />
                <h3 className={`text-xl font-bold uppercase font-mono ${
                  overview.health_report.overall_operational_risk.rating === "High"
                    ? "text-rose-400"
                    : overview.health_report.overall_operational_risk.rating === "Medium"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}>
                  {overview.health_report.overall_operational_risk.rating} ({overview.health_report.overall_operational_risk.score_percent}%)
                </h3>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* HEALTH AND SKILLS */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Department Skill Density
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">Number of indexed skills possessed by departmental personnel.</p>
              </div>

              <div className="space-y-4">
                {Object.entries(overview.health_report.departmental_skill_coverage).map(([dept, count]) => (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">{dept}</span>
                      <span className="text-blue-400 font-semibold">{count} Unique Skills</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                        style={{ width: `${Math.min((count / 6) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HIGHLIGHTS PANEL */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  Executive Risk Highlights
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">Key operational constraints flag alerts computed in this cycle.</p>
              </div>

              <div className="space-y-3.5">
                {overview.highlights.map((hl, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3 rounded-xl border border-white/5 bg-white/[0.01]">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-300 leading-normal">{hl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ORG GRAPH */}
      {activeTab === "graph" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* GRAPH SVG CONTAINER */}
          <div className="rounded-[2rem] border border-white/10 bg-black/60 p-5 backdrop-blur-2xl relative flex flex-col justify-between overflow-hidden shadow-lg h-[600px]">
            {/* TOP BAR CONTROLS */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4 z-10">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-48 sm:w-56">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search node..."
                    className="w-full rounded-xl border border-white/10 bg-black py-2 pl-9 pr-4 text-xs text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="rounded-xl border border-white/10 bg-black px-3 py-2 text-xs text-gray-400 font-mono focus:outline-none"
                  >
                    <option value="All">All Types</option>
                    <option value="Person">Person</option>
                    <option value="Project">Project</option>
                    <option value="Team">Team</option>
                    <option value="Technology">Technology</option>
                    <option value="Skill">Skill</option>
                    <option value="Document">Document</option>
                    <option value="Task">Task</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(zoom * 1.1)}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-2 hover:bg-white/5 text-gray-400"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setZoom(zoom * 0.9)}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-2 hover:bg-white/5 text-gray-400"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={resetView}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-2 hover:bg-white/5 text-gray-400"
                  title="Reset View"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* GRAPH VIEWPORT */}
            <div className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden rounded-2xl bg-black/40 border border-white/5">
              <div className="absolute inset-0 bg-grid-background opacity-20 pointer-events-none" />

              <svg
                ref={svgRef}
                className="h-full w-full select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
                  {/* EDGES */}
                  {edges.map((edge, idx) => {
                    const sourceNode = nodes.find(n => n.id === edge.source);
                    const targetNode = nodes.find(n => n.id === edge.target);

                    if (!sourceNode || !targetNode) return null;

                    const isEdgeActive = activeNodeIds.has(edge.source) && activeNodeIds.has(edge.target);
                    const isHighlighted = selectedNode && highlightedNodeIds.has(edge.source) && highlightedNodeIds.has(edge.target);
                    const isSimAffected = simulationResult && simulationAffectedNodeIds.has(edge.source) && simulationAffectedNodeIds.has(edge.target);

                    let strokeColor = "rgba(255,255,255,0.08)";
                    let strokeWidth = 1;
                    if (isHighlighted) {
                      strokeColor = "rgba(59,130,246,0.6)";
                      strokeWidth = 2;
                    }
                    if (isSimAffected) {
                      strokeColor = "rgba(239,68,68,0.7)";
                      strokeWidth = 2.5;
                    }

                    return (
                      <g key={idx}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={isHighlighted || isSimAffected ? "4 4" : "none"}
                          opacity={isEdgeActive ? 1 : 0.1}
                          className={isSimAffected ? "glow-path" : ""}
                        />
                        {(isHighlighted || isSimAffected) && (
                          <text
                            x={(sourceNode.x + targetNode.x) / 2}
                            y={(sourceNode.y + targetNode.y) / 2 - 5}
                            fill={isSimAffected ? "#f43f5e" : "#60a5fa"}
                            fontSize="8"
                            fontFamily="monospace"
                            textAnchor="middle"
                          >
                            {edge.type}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* NODES */}
                  {nodes.map(node => {
                    const isActive = activeNodeIds.has(node.id);
                    const isSelected = selectedNode?.id === node.id;
                    const isHighlighted = selectedNode ? highlightedNodeIds.has(node.id) : true;
                    const isSimAffected = simulationResult && simulationAffectedNodeIds.has(node.id);
                    
                    const baseColor = getNodeColor(node.type, isSelected);

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        opacity={isActive && isHighlighted ? 1 : 0.15}
                      >
                        <circle
                          r={node.val}
                          fill={isSelected ? baseColor : "rgba(0,0,0,0.95)"}
                          stroke={isSimAffected ? "#ef4444" : baseColor}
                          strokeWidth={isSelected ? 4 : isSimAffected ? 3 : 1.5}
                          data-node-id={node.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            isSimAffected ? "active-node-pulse" : ""
                          }`}
                        />
                        {isSimAffected && (
                          <circle
                            r={node.val + 6}
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                            className="animate-spin"
                          />
                        )}
                        <text
                          y={node.val + 14}
                          fill="#ffffff"
                          fontSize="9"
                          fontFamily="sans-serif"
                          textAnchor="middle"
                          className="pointer-events-none font-medium select-none"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
            
            <div className="absolute bottom-5 left-5 text-[9px] text-gray-500 font-mono pointer-events-none">
              <span>* Click-drag nodes. Drag canvas to pan. Wheel to zoom. *</span>
            </div>
          </div>

          {/* INSPECTOR PANEL */}
          <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-[600px] overflow-y-auto custom-scrollbar">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-6">
                Entity Inspector
              </h4>

              {selectedNode ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono">Entity Key ID</p>
                    <p className="text-sm font-semibold text-white mt-1 break-all">{selectedNode.id}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 font-mono">Name / Display Label</p>
                    <p className="text-xs font-semibold text-blue-400 mt-1">{selectedNode.label}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 font-mono">Entity Category Class</p>
                    <p className="text-xs font-semibold text-purple-400 mt-1 font-mono">{selectedNode.type}</p>
                  </div>

                  {Object.entries(selectedNode.properties).map(([k, v]) => {
                    if (k === "name" || k === "val") return null;
                    return (
                      <div key={k}>
                        <p className="text-[10px] text-gray-500 font-mono uppercase">{k}</p>
                        <p className="text-xs text-gray-300 mt-1 font-mono">{String(v)}</p>
                      </div>
                    );
                  })}

                  <div className="border-t border-white/5 pt-4">
                    <p className="text-[10px] text-gray-500 font-mono block mb-2">Connected Relationships</p>
                    <div className="space-y-2">
                      {edges
                        .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                        .map((edge, i) => {
                          const otherNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
                          const otherNode = nodes.find(n => n.id === otherNodeId);
                          return (
                            <div key={i} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs flex justify-between items-center font-mono">
                              <span className="text-gray-400 truncate max-w-[120px]" title={otherNode?.label}>{otherNode?.label}</span>
                              <span className="text-[9px] text-blue-400 font-bold uppercase">{edge.type}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 leading-normal">
                  Click on an entity node on the canvas to inspect its variables, attributes, and graph connections.
                </p>
              )}
            </div>

            <div className="border-t border-white/5 pt-4 mt-6 flex items-center gap-2 text-[9px] text-gray-500 font-mono">
              <Activity className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Interactive Enterprise Graph Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB: INSIGHTS */}
      {activeTab === "insights" && insights && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* BLOCK 1: PROJECTS BLOCKAGES */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-rose-400 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-500" />
              Blocked Projects
            </h3>
            
            <div className="space-y-3">
              {insights.blocked_projects.map((p, idx) => (
                <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white font-mono">{p.project}</span>
                    <span className="rounded bg-rose-500/10 border border-rose-500/25 px-2 py-0.5 text-[9px] font-mono text-rose-400 uppercase font-bold">
                      {p.priority} Priority
                    </span>
                  </div>
                  <div className="space-y-1">
                    {p.reasons.map((r, i) => (
                      <p key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                        <span className="text-rose-500 mt-0.5">•</span>
                        {r}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCK 2: RESOURCE & WORKFLOW BOTTLENECK ANALYSIS */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-amber-400 flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Workflow Bottlenecks
            </h3>
            
            <div className="space-y-3">
              {insights.workflow_bottlenecks.map((b, idx) => (
                <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 space-y-2 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold">{b.resource}</span>
                    <span className="text-amber-400 font-semibold">{b.type}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-normal">{b.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCK 3: TECH DEPENDENCIES */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-2">
              <Settings className="h-4 w-4 text-cyan-500" />
              Technology Dependencies
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-400 font-mono mb-2">Projects depending on Python:</p>
                {insights.projects_depend_on_python.map((p, idx) => (
                  <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs flex justify-between font-mono mb-2">
                    <span className="text-white">{p.technology}</span>
                    <span className="text-gray-400">{p.projects.join(", ")}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-3">
                <p className="text-xs font-semibold text-gray-400 font-mono mb-2">Teams using CUDA:</p>
                {insights.teams_using_cuda.map((t, idx) => (
                  <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs flex justify-between font-mono">
                    <span className="text-white">{t.technology}</span>
                    <span className="text-gray-400">{t.teams.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BLOCK 4: KNOWLEDGE INTEGRITY GAPS */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              Knowledge & Stack Integrity Gaps
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {insights.obsolete_technologies.map((o, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-[#0a0505] p-3 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-rose-400 font-bold">Obsolete: {o.technology} (v{o.version})</span>
                    <span className="text-gray-500">Affected: {o.affected_projects.join(", ")}</span>
                  </div>
                </div>
              ))}

              {insights.duplicate_documents.map((d, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 space-y-1">
                  <p className="text-white font-semibold">Duplicate Doc Detected:</p>
                  <p className="text-gray-400">{d.duplicate_document} matches {d.main_document} ({d.similarity})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: RECOMMENDATIONS */}
      {activeTab === "recommendations" && recommendations && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Actionable Optimization Recommendations
            </h3>
            <span className="text-xs font-mono text-gray-500">{recommendations.length} total entries</span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold ${
                      rec.severity === "High"
                        ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                        : rec.severity === "Medium"
                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                        : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                    }`}>
                      {rec.severity}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{rec.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">{rec.title}</h4>
                  <p className="text-xs text-gray-400 leading-normal max-w-2xl">{rec.description}</p>
                </div>

                <div className="md:w-80 rounded-xl border border-white/5 bg-black/40 p-3.5 space-y-1">
                  <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold">Recommended Mitigation</p>
                  <p className="text-xs text-gray-300 leading-normal">{rec.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SIMULATION */}
      {activeTab === "simulation" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* SIMULATION FORM & OPTIONS */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                Trigger Dependency Simulation
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Select an impact scenario and target entity to run path traversals.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Scenario Type</label>
                <select
                  value={simType}
                  onChange={(e) => setSimType(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black px-3.5 py-2.5 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="engineer_leave">If engineer leaves...</option>
                  <option value="project_delay">If project is delayed...</option>
                  <option value="technology_upgrade">If technology is upgraded...</option>
                  <option value="document_change">If document changes...</option>
                  <option value="technology_removal">If technology is removed...</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Target Entity ID</label>
                <select
                  value={simTarget}
                  onChange={(e) => setSimTarget(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black px-3.5 py-2.5 text-xs text-gray-300 focus:outline-none"
                >
                  {simType === "engineer_leave" ? (
                    <>
                      <option value="Alice">Alice Smith (Researcher)</option>
                      <option value="Bob">Bob Jones (Frontend Dev)</option>
                      <option value="Charlie">Charlie Brown (Devops)</option>
                      <option value="Ethan">Ethan Hunt (ML Dev)</option>
                    </>
                  ) : simType === "project_delay" ? (
                    <>
                      <option value="Project_Chidakara">Project Chidakara</option>
                      <option value="Project_Web_Console">Project Web Console</option>
                      <option value="Project_Data_Pipeline">Project Data Pipeline</option>
                    </>
                  ) : simType === "technology_upgrade" || simType === "technology_removal" ? (
                    <>
                      <option value="Tech_CUDA_11">CUDA 11.2 (Obsolete)</option>
                      <option value="Tech_CUDA_12">CUDA 12.8 (Active)</option>
                      <option value="Tech_Go_Lang">Go Language (Active)</option>
                    </>
                  ) : (
                    <>
                      <option value="Doc_Security_Policy">Corporate Security Policy 2026</option>
                      <option value="Doc_Arch_Spec_v3">Architecture Spec v3</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <button
              onClick={triggerSimulation}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <Play className="h-4 w-4" />
              Evaluate Impact Matrix
            </button>

            {/* PRE-BUILT SUGGESTED CARDS */}
            <div className="border-t border-white/5 pt-6 space-y-3.5">
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Or select presets:</p>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
                <div
                  onClick={() => { setSimType("engineer_leave"); setSimTarget("Alice"); runSimulation("engineer_leave", "Alice"); }}
                  className="rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] p-3 text-left cursor-pointer transition-all space-y-1.5"
                >
                  <UserX className="h-4.5 w-4.5 text-rose-500" />
                  <p className="text-xs font-bold text-white">Alice Leaves</p>
                  <p className="text-[9px] text-gray-500 leading-snug">Test developer departure cascading path risks.</p>
                </div>

                <div
                  onClick={() => { setSimType("project_delay"); setSimTarget("Project_Chidakara"); runSimulation("project_delay", "Project_Chidakara"); }}
                  className="rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] p-3 text-left cursor-pointer transition-all space-y-1.5"
                >
                  <Clock className="h-4.5 w-4.5 text-amber-500" />
                  <p className="text-xs font-bold text-white">Chidakara Delayed</p>
                  <p className="text-[9px] text-gray-500 leading-snug">Trace target delay across product customers.</p>
                </div>

                <div
                  onClick={() => { setSimType("technology_upgrade"); setSimTarget("Tech_CUDA_11"); runSimulation("technology_upgrade", "Tech_CUDA_11"); }}
                  className="rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] p-3 text-left cursor-pointer transition-all space-y-1.5"
                >
                  <TrendingUp className="h-4.5 w-4.5 text-cyan-500" />
                  <p className="text-xs font-bold text-white">CUDA 11 Upgrade</p>
                  <p className="text-[9px] text-gray-500 leading-snug">Determine migration dependencies for versions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATION IMPACT REPORT */}
          <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-full overflow-y-auto custom-scrollbar">
            {simulationResult ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">
                    Impact Analysis Report
                  </h4>
                  <button
                    onClick={clearSimulation}
                    className="text-[9px] font-mono text-gray-500 hover:text-white uppercase font-bold"
                  >
                    Clear
                  </button>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 space-y-3">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-xs text-gray-400">Impact Risk Severity</span>
                    <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      simulationResult.risk_level === "High"
                        ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                        : simulationResult.risk_level === "Medium"
                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                        : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                    }`}>
                      {simulationResult.risk_level}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 font-mono">Affected Entities Count</p>
                    <p className="text-sm font-semibold text-white mt-0.5 font-mono">{simulationResult.affected_nodes_count} Nodes</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 font-mono">Simulation Scenario Summary</p>
                  <p className="text-xs text-gray-300 leading-normal mt-1">{simulationResult.summary}</p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <p className="text-[10px] text-gray-500 font-mono block">Dependency Cascading Paths</p>
                  <div className="space-y-2">
                    {simulationResult.dependency_chains.map((chain, i) => (
                      <div key={i} className="rounded-xl border border-white/5 bg-[#0a0505] p-3 text-xs leading-normal font-mono text-gray-300 flex items-center gap-2">
                        <GitPullRequest className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                        <span>{chain}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <p className="text-[10px] text-gray-500 font-mono block">Directly Affected Node List</p>
                  <div className="space-y-2">
                    {simulationResult.affected_nodes.map((node, i) => (
                      <div key={i} className="rounded-xl border border-white/5 bg-white/[0.01] p-2.5 text-xs flex justify-between items-center font-mono">
                        <span className="text-white truncate max-w-[140px]">{node.name}</span>
                        <span className="text-[9px] text-rose-400 font-semibold uppercase">{node.relation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-500/10 bg-rose-500/[0.01] p-3 text-[10px] text-rose-400/80 font-mono leading-normal">
                  * Note: Visual graph view matches simulated nodes in red flashing pulses. *
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-3">
                <ShieldAlert className="h-10 w-10 text-gray-600 animate-pulse" />
                <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Ready for Evaluation</h5>
                <p className="text-xs text-gray-500 leading-normal max-w-xs">
                  Run a simulation or click a preset card to evaluate how departures, technology shifts, or document edits cascade across Chidakara.
                </p>
              </div>
            )}

            <div className="border-t border-white/5 pt-4 mt-6 flex items-center gap-2 text-[9px] text-gray-500 font-mono">
              <Activity className="h-4 w-4 text-emerald-500 shrink-0 animate-pulse" />
              <span>Cascading Impact Simulator Online</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
