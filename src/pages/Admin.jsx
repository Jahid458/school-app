import React, { useState } from "react";
import { useAppContext } from "../context/useAppContext";

const Admin = () => {
  const { users, teachers, assignement, libary } = useAppContext();

  // console.log(libary);

  const [activeTab, setActiveTab] = useState("users");

  const students = users.filter((su) => su.role === "student");

  // console.log(students)

  const getUserById = (id) => users.find((user) => user.id == id);
  const getTeacherById = (id) => teachers.find((teacher) => teacher.id == id);

  // console.log(getTeacherById, getUserById)

  const classSections = {};

  for (const student of students) {
    const cls = student.class
      ? student.class
      : "Student Not Availaible In Class";
    if (!classSections[cls]) {
      classSections[cls] = [];
    }
    classSections[cls].push(student);
  }

  const tabs = [
    { key: "users", label: " All Users" },
    { key: "classes", label: "Class List " },
    { key: "assignments", label: "Assignment Lists" },
    { key: "libary", label: "Libary Lists" },
  ];
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl  font-bold text-center">Admin dashboard</h1>

      <div className="flex space-x-3 mb-6 flex-wrap justify-center mt-5 gap-2">
        {tabs.map((tab) => (
          <button
            className={`px-4 py-2 rounded-full font-medium ${activeTab == tab.key ? "text-green-800" : "text-black-100"}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}

        {activeTab === "users" && (
          <div>
            <h2 className="text-xl text-black text-center mt-3">
              All Users List
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Class / Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((singleUser) => (
                    <tr key={singleUser.id}>
                      <th>{singleUser.id}</th>
                      <td>{singleUser.name}</td>
                      <td>{singleUser.email}</td>
                      <td
                        className={`px-2 py-1  mt-2 ${singleUser.role === "admin" ? " text-red-600" : singleUser.role === "teacher"
                              ? " text-sky-900"  : " text-green-600"
                        }`}
                      >
                        {singleUser.role}
                      </td>
                      <td>{singleUser.phone}</td>
                      <td>
                        {singleUser.class || singleUser.subject || "Admin"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "classes" && (
          <div>
            <h2 className="text-xl text-center font-semibold mb-3">
              Students by Class Section
            </h2>
            {Object.entries(classSections).map(([cls, studs]) => {
              return (
                <div key={cls} className="mb-6">
                  <h3 className="text-center font-semibold mb-4">
                    Class: {cls}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border text-sm">
                      <thead className="bg-sky-50">
                        <tr>
                          <th className="border px-3 py-2 text-left">Name</th>
                          <th className="border px-3 py-2 text-left">Email</th>
                          <th className="border px-3 py-2 text-left">Phone</th>
                        </tr>
                      </thead>

                      <tbody>
                        {studs.map((student) => {
                          return (
                            <tr key={student.id}>
                              <td className="border px-3 py-2">
                                {student.name}
                              </td>
                              <td className="border px-3 py-2">
                                {student.email}
                              </td>
                              <td className="border px-3 py-2">
                                {student.phone}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "assignments" && (
          <div>
            <h2 className="text-xl font-semibold text-center mb-3">
              All Assignments
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="border px-3 py-2 text-left">Title</th>
                    <th className="border px-3 py-2 text-left">Given By</th>
                    <th className="border px-3 py-2 text-left">Student</th>
                    <th className="border px-3 py-2 text-left">Deadline</th>
                    <th className="border px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assignement.map((ass) => {
                    const teachers = getTeacherById(ass.id);
                    const students = getUserById(ass.studentId);
                    return (
                      <tr key={ass.id} className="hover:bg-gray-50">
                        <td className="border px-3 py-2">{ass.title}</td>
                        <td className="border px-3 py-2">
                          {teachers
                            ? teachers.name
                            : `Teacher #${ass.teacherId}`}
                        </td>
                        <td className="border px-3 py-2">
                          {students
                            ? students.name
                            : `Student #${ass.studentId}`}
                        </td>
                        <td className="border px-3 py-2">{ass.deadline}</td>
                        <td className="border px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              ass.status === "submitted"
                                ? " text-green-700"
                                : " text-yellow-700"
                            }`}
                          >
                            {ass.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "libary" && (
          <div>
            <h2 className="text-center ml-3 mb-5">Libary Records</h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-sky-100">
                  <tr>
                    <th className="border px-3 py-2 text-left">Book</th>
                    <th className="border px-3 py-2 text-left">Student</th>
                    <th className="border px-3 py-2 text-left">Email</th>
                    <th className="border px-3 py-2 text-left">Phone</th>
                    <th className="border px-3 py-2 text-left">Issue Date</th>
                    <th className="border px-3 py-2 text-left">Returned</th>
                  </tr>
                </thead>

                <tbody>
                  {libary.map((book) => {
                    const student = getUserById(book.studentId);
                    return (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="border px-3 py-2">{book.book}</td>
                        <td className="border px-3 py-1">
                          {student
                            ? student.name
                            : `Student #${book.studentId}`}
                        </td>
                        <td className="border px-3 py-2">
                          {student ? student.email : "N/A"}
                        </td>
                        <td className="border px-3 py-2">
                          {student ? student.phone : "N/A"}
                        </td>
                        <td className="border px-3 py-2">{book.issueDate}</td>
                        <td
                          className={` border px-3 py-2  text-xs font-semibold ${book.return === "Yes" ? " text-green-400" : "text-red-500"}`}
                        >
                          {book.return === "Yes" ? "Return" : "Not Returned"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
