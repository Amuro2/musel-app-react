import React from "react";
import { Link, Outlet } from "react-router-dom";

import useWindowSize from "./hooks/use-window-size";

const Layout = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  return (
    <div className="flex flex-col bg-gray-900 text-gray-100" style={{minHeight: windowHeight}}>
      <header className="flex gap-4 z-10 p-4 bg-gray-800 text-gray-100 shadow">
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/create-song">New Song</Link>
      </header>

      <main className="grow flex">
        <aside></aside>

        <section className="grow" style={{maxWidth: windowWidth, width: "100%"}}>
          <Outlet />
        </section>

        <aside></aside>
      </main>

      <footer className="z-10 p-4 bg-gray-600 text-gray-100 shadow">MuSeL 2023.</footer>
    </div>
  );
};

export default Layout;
