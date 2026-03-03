import { useState } from "react";
import { useAppContext } from "../context/useAppContext";

const Student = () => {
  const { setAssignments, assignement, libary, users } = useAppContext();
  const [submissionLink, setSubmissonLink] = useState({});
  const [activeTab, setActiveTab] = useState("assignments");
  const [selectStudentId, setSelectStudentId] = useState("");

  const selectedStudent = users.find((u) => u.id === parseInt(selectStudentId));

  const handleSubmit = (id) => {
    const links = submissionLink[id];
    if (!links || links.trim() === "") {
      alert("Please Submit Links")
      return;
    }
    setAssignments(
      assignement.map((as) =>
        as.id === id
          ? { ...as, status: "submitted", submissionLink: links }
          : as,
      ),
    );
  };

  const handleInputChange = (id, value) => {
    setSubmissonLink({ ...submissionLink, [id]: value });
  };

  const myAssignmentList = assignement.filter(
    (ass) => ass.studentId == parseInt(selectStudentId),
  );

  const submittedCountList = myAssignmentList.filter(
    (studentAssignment) => studentAssignment.status === "submitted",
  ).length;

  const myBookList = libary.filter(
    (book) => book.studentId === parseInt(selectStudentId),
  );
  const retunList = myBookList.filter((rt) => rt.return === "Yes").length;

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl  font-bold text-center mb-5">Student DashBoard</p>

      <div className="flex justify-center items-center mb-4">
        <select
          className="w-2/5 mb-5 text-center"
          value={selectStudentId}
          onChange={(e) => setSelectStudentId(e.target.value)}
        >
          <option>Select Student</option>
          {users
            .filter((u) => u.role === "student")
            .map((stu) => (
              <option key={stu.id} value={stu.id}>{stu.name}</option>
            ))}
        </select>
      </div>

      <p className="text-center text-2xl text-gray-500 border mb-5 p-3">
        Name: {selectedStudent?.name} || StudentId: {selectedStudent?.id}
      </p>

      <div className="flex spcace-x-3 mt-5 justify-center space-x-5">
        <div className="border bg-sky-800 text-white text-center text-2xl rounded-xl p-2">
          <p>Submitted Count: {submittedCountList} </p>
        </div>
        <div className="border bg-gray-600 text-white text-2xl text-center rounded-xl p-2">
          <p>Return Count: {retunList}</p>
        </div>
      </div>

      <div className="flex space-x-3 justify-center mt-5">
        <button
          onClick={() => setActiveTab("assignments")}
          className={`px-2 py-3 rounded-md  ${
            activeTab === "assignments"
              ? "bg-amber-800 text-white"
              : "bg-amber-100"
          }`}
        >My Assignments List</button>
        <button
          onClick={() => setActiveTab("libary")}
          className={`px-2 py-3 rounded-md  ${
            activeTab === "libary" ? "bg-green-800 text-white" : "bg-green-100 "
          }`}
        >
          My Libary Books
        </button>
      </div>

      {activeTab === "assignments" && (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-center">
            <thead>
              <tr>
                <th>Tittle</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Submission Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myAssignmentList.map((assign) => (
                <tr key={assign.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{assign.title}</td>
                  <td className="border px-3 py-2">{assign.deadline}</td>
                  <td className="border px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-xl bg-amber-500 text-black text-md font-semibold 
                        ${assign.status === "submitted" ? " text-green-700" : " text-white"}`}
                    >
                      {assign.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      placeholder="Submit your Links"
                      disabled={assign.status === "submitted"}
                      className="input w-full"
                      onChange={(e) =>
                        handleInputChange(assign.id, e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-3 py-2">
                    {assign.status === "pending" ? (
                      <button
                        onClick={() => handleSubmit(assign.id)}
                        className="btn bg-green-800  text-white px-3 py-1 font-semibold"
                      >
                        Submit
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "libary" && (
        <div>
          <div className="overflow-x-auto">
            <h1 className="text-center mt-3 p-4">My BookList Information</h1>

            <table className="table text-center">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Issue Date</th>
                  <th>Return</th>
                </tr>
              </thead>
              <tbody>
                {myBookList.map((book) => (
                  <tr key={book.id} className="text-center">
                    <td>{book.book}</td>
                    <td>{book.issueDate}</td>
                    <td>{book.return}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
