"use client";

import { useEffect, useState } from "react";
import { GlobalPokemonSearch } from "./GlobalPokemonSearch";

const pokedexHashes = new Set(["#pokedex", "#pokemon-search"]);

export function PokedexDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => {
      if (pokedexHashes.has(window.location.hash)) setOpen(true);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        if (pokedexHashes.has(window.location.hash)) {
          window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (pokedexHashes.has(window.location.hash)) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  return <>
    <button className="pokedex-search-fab" type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
      <span className="pokedex-fab-icon" aria-hidden="true"><i /><b /><em /></span>
      <span><small>Open the</small>Pokédex</span>
    </button>

    {open && <div className="pokemon-search-overlay" id="pokedex">
      <button className="pokemon-search-backdrop" type="button" aria-label="Close Pokédex" onClick={close} />
      <aside className="pokemon-search-drawer" role="dialog" aria-modal="true" aria-label="Multilingual Pokédex">
        <header className="pokemon-search-drawer-bar"><div><span>Portable research desk</span><b>Multilingual Pokédex</b></div><button type="button" onClick={close} aria-label="Close Pokédex">Close <span>×</span></button></header>
        <GlobalPokemonSearch />
      </aside>
    </div>}
  </>;
}
