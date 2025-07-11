import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/myroster" element={<Roster />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
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
