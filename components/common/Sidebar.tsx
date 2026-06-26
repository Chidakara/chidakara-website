"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlatformStore } from "../../stores/platformStore";
import { useWorkspaceStore } from "../../stores/workspaceStore";
import {
  LayoutDashboard,
  Bot,
  FileText,
  Workflow,
  Eye,
  Network,
  Brain,
  Terminal,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Plus,
  Edit3,
  Trash2,
  Factory,
  ShoppingBag,
  Cpu,
  Layers,
  Building2,
  GitPullRequest,
  Compass,
} from "lucide-react";

const getWorkspaceIcon = (iconName: string) => {
  switch (iconName) {
    case "Factory": return Factory;
    case "ShoppingBag": return ShoppingBag;
    case "Brain": return Brain;
    case "Cpu": return Cpu;
    default: return Layers;
  }
};

const getWorkspaceColorClasses = (color: string) => {
  if (color?.includes("blue")) return { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", hex: "#3b82f6" };
  if (color?.includes("emerald")) return { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", hex: "#10b981" };
  if (color?.includes("purple")) return { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", hex: "#a855f7" };
  if (color?.includes("amber")) return { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", hex: "#f59e0b" };
  return { border: "border-white/10", bg: "bg-white/5", text: "text-gray-400", hex: "#9ca3af" };
};

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = usePlatformStore();
  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspaceId,
    createWorkspace,
    renameWorkspace,
    deleteWorkspace
  } = useWorkspaceStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTargetId, setEditTargetId] = useState<string | null>(null);

  // Form states
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newColor, setNewColor] = useState("text-blue-400");
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const ws = await createWorkspace(newName, newDesc, newColor);
    setActiveWorkspaceId(ws.id);
    setNewName("");
    setNewDesc("");
    setNewColor("text-blue-400");
    setShowCreateModal(false);
    setIsDropdownOpen(false);
  };

  const handleEditClick = (ws: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditTargetId(ws.id);
    setEditName(ws.name);
    setEditDesc(ws.description || "");
    setShowEditModal(true);
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTargetId || !editName.trim()) return;
    await renameWorkspace(editTargetId, editName, editDesc);
    setShowEditModal(false);
    setEditTargetId(null);
  };

  const handleDeleteClick = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this workspace? This operation is permanent.")) {
      await deleteWorkspace(id);
    }
  };

  const menuItems = [
    { label: "Dashboard", href: "/platform/dashboard", icon: LayoutDashboard },
    { label: "Knowledge Assistant", href: "/platform/assistant", icon: Bot },
    { label: "Documents", href: "/platform/documents", icon: FileText },
    { label: "Workflow Engine", href: "/platform/workflows", icon: Workflow },
    { label: "Visual Debugger", href: "/platform/debugger", icon: Eye },
    { label: "Knowledge Graph", href: "/platform/graph", icon: Network },
    { label: "Organization Intel", href: "/platform/organization", icon: Building2 },
    { label: "Enterprise Connectors", href: "/platform/connectors", icon: GitPullRequest },
    { label: "Decision Center", href: "/platform/decision", icon: Compass },
    { label: "Memory", href: "/platform/memory", icon: Brain },
    { label: "API Explorer", href: "/platform/api", icon: Terminal },
    { label: "Settings", href: "/platform/settings", icon: Settings },
  ];

  const colorsOptions = [
    { name: "Blue", value: "text-blue-400" },
    { name: "Emerald", value: "text-emerald-400" },
    { name: "Purple", value: "text-purple-400" },
    { name: "Amber", value: "text-amber-400" }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 border-r border-white/10 bg-[#050505] text-white flex flex-col justify-between transition-all duration-300 ${
        sidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* LOGO SECTION */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/5">
          <Link
            href="/"
            className={`font-semibold tracking-[0.18em] transition-opacity duration-300 ${
              sidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            CHIDAKARA
          </Link>
          {sidebarCollapsed && (
            <span className="text-xs font-bold text-blue-500 mx-auto">C.</span>
          )}
          <button
            onClick={toggleSidebar}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-1.5 hover:bg-white/[0.05] transition-colors focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* WORKSPACE SWITCHER SECTION */}
        {activeWorkspace && (
          <div className="px-3 pt-4 relative">
            {sidebarCollapsed ? (
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`h-11 w-11 rounded-xl border flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all mx-auto ${
                  getWorkspaceColorClasses(activeWorkspace.color).border
                }`}
                title={`Switch workspace: ${activeWorkspace.name}`}
              >
                {(() => {
                  const IconComponent = getWorkspaceIcon(activeWorkspace.icon);
                  return <IconComponent className={`h-5 w-5 ${getWorkspaceColorClasses(activeWorkspace.color).text}`} />;
                })()}
              </div>
            ) : (
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] px-3.5 py-2.5 text-left w-full hover:border-white/10 hover:bg-white/[0.02] transition-all select-none cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${getWorkspaceColorClasses(activeWorkspace.color).border} ${getWorkspaceColorClasses(activeWorkspace.color).bg}`}>
                    {(() => {
                      const IconComponent = getWorkspaceIcon(activeWorkspace.icon);
                      return <IconComponent className={`h-4.5 w-4.5 ${getWorkspaceColorClasses(activeWorkspace.color).text}`} />;
                    })()}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-semibold text-white truncate leading-tight">{activeWorkspace.name}</h4>
                    <p className="text-[9px] text-gray-500 truncate leading-none mt-0.5">{activeWorkspace.description || "System workspace"}</p>
                  </div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-2" />
              </div>
            )}

            {/* SWITCHER DROPDOWN POPOVER */}
            {isDropdownOpen && (
              <div className={`absolute left-4 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-[#0c0c0c]/90 backdrop-blur-xl shadow-2xl p-2 z-[100] space-y-1 ${
                sidebarCollapsed ? "left-[72px] top-4" : ""
              }`}>
                <p className="text-[9px] font-mono uppercase tracking-widest text-gray-600 font-bold px-2 py-1">Workspaces</p>
                <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-0.5 pr-0.5">
                  {workspaces.map((ws) => {
                    const isSelected = ws.id === activeWorkspaceId;
                    const colorMap = getWorkspaceColorClasses(ws.color);
                    const IconComp = getWorkspaceIcon(ws.icon);

                    return (
                      <div
                        key={ws.id}
                        onClick={() => {
                          setActiveWorkspaceId(ws.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between rounded-xl px-2.5 py-2 cursor-pointer transition-all duration-200 group text-xs ${
                          isSelected
                            ? "bg-white/[0.03] text-white"
                            : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className={`h-6 w-6 rounded border flex items-center justify-center shrink-0 ${colorMap.border} ${colorMap.bg}`}>
                            <IconComp className={`h-3.5 w-3.5 ${colorMap.text}`} />
                          </div>
                          <span className="truncate max-w-[120px] font-medium">{ws.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleEditClick(ws, e)}
                            className="text-gray-600 hover:text-white p-0.5 transition-colors"
                            title="Edit workspace"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          {workspaces.length > 1 && (
                            <button
                              onClick={(e) => handleDeleteClick(ws.id, e)}
                              className="text-gray-600 hover:text-rose-400 p-0.5 transition-colors"
                              title="Delete workspace"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                          {isSelected && <Check className="h-3.5 w-3.5 text-blue-500" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-white/5 pt-1.5 mt-1">
                  <button
                    onClick={() => {
                      setShowCreateModal(true);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 px-3 py-2 text-[11px] text-gray-300 w-full transition-all text-left font-semibold"
                  >
                    <Plus className="h-3.5 w-3.5 text-blue-400 font-bold" />
                    Create Workspace
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MENU LIST */}
        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600/10 border border-blue-500/25 text-blue-400 font-semibold"
                    : "border border-transparent text-gray-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-blue-400" : "text-gray-500"}`} />
                <span
                  className={`transition-opacity duration-300 truncate ${
                    sidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* SYSTEM STATUS FOOTER */}
      <div className="p-4 border-t border-white/5 bg-black/40 text-[10px] font-mono flex items-center justify-between text-gray-500">
        {!sidebarCollapsed ? (
          <>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
            <span>Platform v2.1</span>
          </>
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mx-auto animate-pulse" />
        )}
      </div>

      {/* CREATE WORKSPACE DIALOG */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#050505] p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">Create Workspace</h3>
              <p className="text-xs text-gray-500 mt-1">Initialize a new isolated vector workspace segment.</p>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Workspace Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sales Diagnostics"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Isolate logs and specific RAG sources..."
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-black px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Color Theme</label>
                <div className="flex gap-3">
                  {colorsOptions.map((c) => {
                    const isSelected = newColor === c.value;
                    const hex = getWorkspaceColorClasses(c.value).hex;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setNewColor(c.value)}
                        className={`h-6 px-2.5 text-[9px] font-semibold rounded-lg border transition-all ${
                          isSelected 
                            ? "text-white border-white bg-white/10" 
                            : "text-gray-500 border-white/5 hover:border-white/20"
                        }`}
                        style={{ color: isSelected ? "#fff" : hex }}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-bold uppercase text-white hover:bg-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT WORKSPACE DIALOG */}
      {showEditModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#050505] p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">Rename Workspace</h3>
              <p className="text-xs text-gray-500 mt-1">Update the name and meta properties of this segment.</p>
            </div>
            
            <form onSubmit={handleEditSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Workspace Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Sales Diagnostics"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Segment description details..."
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-black px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-bold uppercase text-white hover:bg-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
