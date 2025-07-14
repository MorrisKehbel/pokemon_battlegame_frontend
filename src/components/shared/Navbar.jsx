import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600 drop-shadow-sm">Pokémon Battle</h1>

        <div className="space-x-6 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/myroster"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Roster
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-700 hover:text-blue-600"
            }
          >
            Leaderboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
