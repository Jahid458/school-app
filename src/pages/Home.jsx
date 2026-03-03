import { Link } from "react-router-dom";

const Home = () => {
  const roleList = [
    {
      tittle: "Admin",
      path: "/admin",
      color: "bg-blue-100 border-blue-400",
      desc: "View All Users List",
    },
    {
      tittle: "Teacher",
      path: "/teacher",
      color: "bg-blue-100 border-blue-400",
      desc: "Create and assignments for students ",
    },
    {
      tittle: "Student",
      path: "/student",
      color: "bg-blue-100 border-blue-400",
      desc: "View All Users List",
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-center">Welome to the Student Management App</h1>

      <div
        className={`border-2 rounded-xl  p-6 flex gap-3 justify-center items-center  hover:shadow-lg transition cursor-pointer`}
      >
        {roleList.map((role) => (
          <Link to={role.path} key={role.tittle}>
            <div
              className={`border-2 rounded-xl p-6 ${role.color} hover:shadow-lg transition cursor-pointer`}
            >
              <h2 className="text-xl font-bold mb-2 text-center">
                {role.tittle}
              </h2>
              <p className="text-sm text-gray-600 text-center">{role.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
