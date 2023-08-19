import { Route, Routes } from "react-router";

import Layout from "./Layout";

import Home from "./pages/Home";
import Library from "./pages/Library";
import CreateSong from "./pages/CreateSong";
import UpdateSong from "./pages/UpdateSong";
import NotFound from "./pages/NotFound";

const Router = () => {
  return <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="library" element={<Library />} />
      <Route path="create-song" element={<CreateSong />} />
      <Route path="update-song/:songId" element={<UpdateSong />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>;
};

export default Router;
