import { Route, Routes } from "react-router";

import Layout from "./Layout";

import Home from "./pages/Home";

const Router = () => {
  return <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="library" element={<div>Library</div>} />
    </Route>
  </Routes>;
};

export default Router;
