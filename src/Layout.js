import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
      </header>

      <main>
        <aside></aside>

        <section>
          <Outlet />
        </section>

        <aside></aside>
      </main>

      <footer>MuSeL 2023.</footer>
    </>
  );
};

export default Layout;
