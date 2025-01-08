import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import MovieList from "./pages/MovieList";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./Providers/WishlistProvider";
import Navbar from "./components/Navbar";

const root = document.getElementById("root");
function App() {
  return (
    <WishlistProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </WishlistProvider>
  )
}

export default App