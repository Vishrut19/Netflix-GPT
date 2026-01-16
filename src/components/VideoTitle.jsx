/* eslint-disable react/prop-types */
import { Button } from "./ui/Button";
import { Play, Info } from "lucide-react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video absolute text-white z-10">
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent h-40" />
      
      {/* Content Area */}
      <div className="relative pt-[12%] px-6 md:px-16 max-w-4xl space-y-6">
        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-700">
          <span className="px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold tracking-widest uppercase">
            AI Recommended
          </span>
          <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase border border-white/10 text-gray-300">
            Top Trending
          </span>
        </div>
        
        <h1 className="text-4xl font-extrabold md:text-8xl tracking-tighter drop-shadow-2xl leading-[0.9] text-white">
          {title}
        </h1>
        <p className="hidden text-base md:text-lg leading-relaxed text-gray-200 max-w-2xl md:block line-clamp-3">
          {overview}
        </p>
        <div className="flex items-center gap-4 pt-4">
          <Button 
            className="flex items-center gap-2 px-8 py-6 text-base md:text-lg font-bold bg-white text-black hover:bg-gray-200 shadow-xl"
          >
            <Play size={20} fill="currentColor" />
            <span>Play Now</span>
          </Button>
          <Button 
            variant="outline"
            className="hidden md:flex items-center gap-2 px-8 py-6 text-base md:text-lg font-bold border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            <Info size={20} />
            <span>More Info</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
