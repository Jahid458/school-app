
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-green-300 p-4 flex justify-between">
      <Link to="/"><h1>School Management App</h1>  </Link>

      <div className="space-x-4 ">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/teacher">Teacher </Link>
        <Link to="/student">Student</Link>
      </div>
    </div>
  );
};

export default Navbar;
