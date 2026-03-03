import { Link } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import { FaMoon } from "react-icons/fa";
import { LuSunDim } from "react-icons/lu";

const Navbar = () => {
  const { theme, toggoleTheme } = useAppContext();
  return (
    <div className="bg-green-300 dark:bg-gray-900 dark:text-white p-4 flex justify-between">
      <Link to="/">
        <h1 className="font-semibold text-xl">School Management App</h1>
      </Link>

      <div className="space-x-4 ">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/teacher">Teacher </Link>
        <Link to="/student">Student</Link>
      </div>

      <button onClick={toggoleTheme} className="p-3 rounded bg-black text-white dark:bg-white dark:text-black">
        {theme === "light" ? <FaMoon /> : <LuSunDim />}
      </button>
    </div>
  );
};

export default Navbar;
