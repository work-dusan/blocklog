import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Link2 } from "lucide-react";
import BlockChain from "./components/BlockChain";
import Validate from "./components/Validate";

const navLinkClass = ({ isActive }) =>
  `transition text-sm ${isActive ? "text-indigo-400" : "text-gray-400 hover:text-indigo-400"}`;

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6 items-center border-b border-gray-800">
        <span className="font-bold text-indigo-400 text-lg flex items-center gap-1.5">
          <Link2 className="w-5 h-5" /> BlockLog
        </span>
        <NavLink to="/" end className={navLinkClass}>
          Blockchain
        </NavLink>
        <NavLink to="/validate" className={navLinkClass}>
          Verify
        </NavLink>
      </nav>

      <main className="h-[calc(100vh-57px)] bg-gray-950 text-white">
        <Routes>
          <Route path="/" element={<BlockChain />} />
          <Route path="/validate" element={<Validate />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
