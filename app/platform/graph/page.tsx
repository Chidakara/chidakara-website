"use client";

import { useEffect, useState, useRef } from "react";
import { useGraphStore } from "../../../stores/graphStore";
import { usePlatformStore } from "../../../stores/platformStore";
import {
  Search,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  CheckCircle,
  Network,
  Info,
  HelpCircle,
} from "lucide-react";

export default function KnowledgeGraphPage() {
  const {
    nodes,
    edges,
    selectedNode,
    hoveredEdge,
    searchQuery,
    filterType,
    isLoading,
    panX,
    panY,
    zoom,
    loadGraph,
    setSelectedNode,
    setHoveredEdge,
    setSearchQuery,
    setFilterType,
    updateNodePosition,
    setPan,
    setZoom,
    resetView
  } = useGraphStore();

  const { addActivity } = usePlatformStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadGraph();
  }, []);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    const nodeId = target.getAttribute("data-node-id");

    if (nodeId) {
      // Node dragging
      setDraggedNodeId(nodeId);
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        setSelectedNode(node);
      }
    } else {
      // Canvas panning
      setIsPanning(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggedNodeId) {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      
      // Calculate coordinates relative to SVG canvas including zoom and pan transforms
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

  const handleReset = () => {
    resetView();
    addActivity({ type: "info", message: "Reset knowledge graph layout view coordinates." });
  };

  // Filter and search logic
  const getFilteredNodes = () => {
    return nodes.filter(n => {
      const matchSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      
      {/* LEFT COLUMN: GRAPH CANVAS */}
      <div className="rounded-[2.5rem] border border-white/10 bg-black/60 p-6 backdrop-blur-2xl relative flex flex-col justify-between overflow-hidden shadow-lg h-[calc(100vh-140px)]">
        
        {/* TOP CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4 z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-48 sm:w-56">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entity node..."
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
                <option value="Technology">Technology</option>
                <option value="Product">Product</option>
                <option value="Event">Event</option>
                <option value="Document">Document</option>
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
              onClick={handleReset}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-2 hover:bg-white/5 text-gray-400"
              title="Reset View"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* DRAGGABLE SVG GRAPH VIEW */}
        <div className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden rounded-2xl bg-black/40 border border-white/5">
          <div className="absolute inset-0 bg-grid-background opacity-20 pointer-events-none" />

          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <svg
              ref={svgRef}
              className="h-full w-full select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              {/* Outer container transform group */}
              <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
                
                {/* DRAW RELATION EDGES LINES */}
                {edges.map((edge, idx) => {
                  const sourceNode = nodes.find(n => n.id === edge.source);
                  const targetNode = nodes.find(n => n.id === edge.target);

                  if (!sourceNode || !targetNode) return null;

                  const isEdgeActive = activeNodeIds.has(edge.source) && activeNodeIds.has(edge.target);
                  const isHighlighted = selectedNode && highlightedNodeIds.has(edge.source) && highlightedNodeIds.has(edge.target);

                  return (
                    <g key={idx}>
                      <line
                        x1={sourceNode.x || 0}
                        y1={sourceNode.y || 0}
                        x2={targetNode.x || 0}
                        y2={targetNode.y || 0}
                        stroke={isHighlighted ? "rgba(37,99,235,0.7)" : "rgba(255,255,255,0.08)"}
                        strokeWidth={isHighlighted ? 2.5 : 1}
                        strokeDasharray={isHighlighted ? "5 5" : "none"}
                        className={isHighlighted ? "glow-path" : ""}
                        opacity={isEdgeActive ? 1 : 0.15}
                      />
                      {/* Optional inline relationship label on hover */}
                      {isHighlighted && (
                        <text
                          x={((sourceNode.x || 0) + (targetNode.x || 0)) / 2}
                          y={((sourceNode.y || 0) + (targetNode.y || 0)) / 2 - 5}
                          fill="rgba(59,130,246,0.8)"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {edge.type}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* DRAW NODES CIRCLES */}
                {nodes.map((node) => {
                  const isActive = activeNodeIds.has(node.id);
                  const isSelected = selectedNode?.id === node.id;
                  const isHighlighted = selectedNode ? highlightedNodeIds.has(node.id) : true;

                  const colorMap = {
                    Person: "#3b82f6",     // blue
                    Technology: "#06b6d4", // cyan
                    Product: "#10b981",    // emerald
                    Event: "#eab308",      // yellow
                    Database: "#ec4899",   // pink
                    Document: "#a855f7"    // purple
                  }[node.type] || "#ffffff";

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x || 0}, ${node.y || 0})`}
                      opacity={isActive && isHighlighted ? 1 : 0.2}
                    >
                      <circle
                        r={node.val}
                        fill={isSelected ? colorMap : "rgba(0,0,0,0.9)"}
                        stroke={colorMap}
                        strokeWidth={isSelected ? 4 : 2}
                        data-node-id={node.id}
                        className="cursor-pointer transition-colors duration-200"
                      />
                      <text
                        y={node.val + 14}
                        fill="#ffffff"
                        fontSize="10"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        className="pointer-events-none"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}

              </g>
            </svg>
          )}
        </div>

        <div className="absolute bottom-10 left-10 text-[10px] text-gray-500 font-mono pointer-events-none">
          <span>* Click and drag nodes. Drag canvas to pan. Mouse wheel to zoom. *</span>
        </div>

      </div>

      {/* RIGHT COLUMN: NODE INSPECTOR */}
      <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-full overflow-y-auto custom-scrollbar">
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-6">Knowledge Node Metadata</h4>
          
          {selectedNode ? (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-500 font-mono">Entity Value Name</p>
                <p className="text-sm font-semibold text-white mt-1 break-all">{selectedNode.label}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-mono">Class Type</p>
                <p className="text-xs font-semibold text-blue-400 mt-1 font-mono">{selectedNode.type}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-mono">Relative Weight Weight</p>
                <p className="text-xs text-gray-300 mt-1 font-mono">{selectedNode.val} points</p>
              </div>

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
                          <span className="text-gray-400 truncate max-w-[100px]" title={otherNode?.label}>{otherNode?.label}</span>
                          <span className="text-[10px] text-blue-400 font-bold uppercase">{edge.type}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 leading-normal">
              Click on a knowledge node on the graph canvas to inspect its semantic connections, class type, and metadata connections.
            </p>
          )}
        </div>

        <div className="border-t border-white/5 pt-5 mt-6 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <Network className="h-4 w-4 text-gray-600 animate-pulse" />
          <span>Extracted dynamically from ChromaDB sources</span>
        </div>
      </div>

    </div>
  );
}
