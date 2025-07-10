import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

import {
  Home,
  PokemonDetails,
  Roster,
  Battle,
  Leaderboard,
} from "./pages/index";

import { MainLayout } from "./layouts/MainLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="/pokemon-details" element={<PokemonDetails />} /> */}
         <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/myroster" element={<Roster />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
