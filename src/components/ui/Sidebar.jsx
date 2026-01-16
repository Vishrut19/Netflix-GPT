import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Sparkles, 
  Library, 
  TrendingUp, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearchView } from "../../utils/gptSlice";

import Logo from "./Logo";

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full p-3 rounded-lg transition-all duration-200 group relative",
      active 
        ? "bg-indigo-600/10 text-indigo-400" 
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    )}
  >
    <Icon size={22} className={cn("transition-colors", active ? "text-indigo-400" : "group-hover:text-white")} />
    {!collapsed && <span className="ml-3 font-medium text-sm">{label}</span>}
    {collapsed && (
      <div className="absolute left-14 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </button>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/browse", active: !showGptSearch },
    { icon: Sparkles, label: "AI Studio", path: "/browse", active: showGptSearch, isGpt: true },
    { icon: TrendingUp, label: "Trending", path: "/trending" },
    { icon: Library, label: "My Library", path: "/library" },
  ];

  const handleItemClick = (item) => {
    if (item.isGpt) {
      if (!showGptSearch) dispatch(toggleGptSearchView());
    } else {
      if (showGptSearch && item.path === "/browse") dispatch(toggleGptSearchView());
      navigate(item.path);
    }
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => navigate("/error"));
  };

  return (
    <aside 
      className={cn(
        "sticky top-0 h-screen z-40 bg-gray-950/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 flex flex-col pt-4 shrink-0",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Logo Area */}
      <div className={cn(
        "mb-10 mt-4 flex items-center overflow-hidden transition-all duration-300",
        isCollapsed ? "px-2 justify-center" : "px-6"
      )}>
        <Logo 
          size={isCollapsed ? "sm" : "md"} 
          iconOnly={isCollapsed} 
          className="cursor-pointer"
          onClick={() => navigate("/browse")}
        />
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-indigo-600 rounded-full p-1 text-white border border-gray-950 hover:bg-indigo-500 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            collapsed={isCollapsed}
            active={item.active}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <SidebarItem
          icon={Settings}
          label="Settings"
          collapsed={isCollapsed}
          onClick={() => navigate("/settings")}
        />
        <SidebarItem
          icon={LogOut}
          label="Sign Out"
          collapsed={isCollapsed}
          onClick={handleSignOut}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
