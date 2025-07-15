import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Home,
  PokemonDetails,
  Roster,
  Battle,
  Leaderboard,
} from "./pages/index";

import { MainLayout } from "./layouts/MainLayout";
import { usePlayer } from "./context/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  const { isAuthenticated } = usePlayer();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={isAuthenticated ? <Battle /> : <Home />} />
        <Route path="pokemon/:name" element={<PokemonDetails />} />
        <Route path="myroster" element={<Roster />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
