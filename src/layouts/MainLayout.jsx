import { Outlet } from "react-router";
import { Navbar, Footer } from "../components/shared/index";
import { PlayerProvider } from "../context/index";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PlayerProvider>
        <main className="flex-1">
          <Outlet />
        </main>
      </PlayerProvider>
      {/* <Footer /> */}
    </div>
  );
};
