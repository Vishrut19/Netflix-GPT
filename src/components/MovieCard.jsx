import { Star } from "lucide-react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, movie }) => {
  if (!posterPath) return null;
  
  return (
    <div className="w-40 md:w-48 pr-4 flex-shrink-0 group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 glass-dark transition-all duration-500 group-hover:scale-[1.02] group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)]">
        <img 
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
          alt="Movie Card" 
          src={IMG_CDN_URL + posterPath} 
        />
        
        {/* Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold text-white">
              {movie?.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
          <h3 className="text-xs font-bold text-white line-clamp-1 truncate">
            {movie?.title || movie?.original_title}
          </h3>
          <p className="text-[10px] text-gray-400 font-medium">
            AI Recommended
          </p>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
