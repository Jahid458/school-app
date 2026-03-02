import { useCallback, useRef, useState } from "react";
import { useAppContext } from "../context/useAppContext";

const Teacher = () => {
  const { setAssignments, assignement, users } = useAppContext();
  const [title, setTitle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [deadline, setDeadline] = useState("");


  const titleRef = useRef(null);
  const studentSelectRef = useRef(null);
  const deadLineRef = useRef(null);
  const addBtnRef = useRef(null);

  const teacherId = 1;
  const teacherName = "Teacher Karim";

  const students = users.filter(
    (singleStdnt) => singleStdnt.role === "student",
  );

  const handleAddAssignment = useCallback(() => {
    if (!title || !studentId || !deadline) {
      alert("Please Required the Field!!");
      return;
    }

    const newAssignmentLoad = {
      id: assignement.length + 1,
      title,
      teacherId,
      studentId: parseInt(studentId),
      status: "pending",
      deadline,
    };

    setAssignments([...assignement, newAssignmentLoad]);
    setTitle("");
    setStudentId("");
    setDeadline("");

    titleRef.current.focus();

    console.log(titleRef);
  }, [assignement, title, setAssignments, deadline, studentId]);

  const myAssignments = assignement.filter(
    (ass) => ass.teacherId === teacherId,
  );

  const submittedCountList = myAssignments.filter(
    (studentAssignment) => studentAssignment.status === "submitted",
  ).length;
  const pendingCountList = myAssignments.filter(
    (studentAssignment) => studentAssignment.status === "pending",
  ).length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl  font-bold text-center">Teacher Dashboard</h1>

      <p className="text-center mt-2">Logged In As Teacher: {teacherName}</p>

      <div className="flex spcace-x-3 mt-5 justify-center space-x-5">
        <div className="border bg-amber-600 text-white text-center text-2xl rounded-xl p-2">
          <p>Submitted Count: {submittedCountList} </p>
        </div>
        <div className="border bg-gray-600 text-white text-2xl text-center rounded-xl p-2">
          <p>Pending Count: {pendingCountList}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <h2 className="card-title justify-center text-lg font-semibold">
            Add New Assignment
          </h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Assignment Title</span>
            </label>
            <input
              type="text"
              ref={titleRef}
              placeholder="Enter assignment title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  studentSelectRef.current.focus();
                }
              }}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Select Student</span>
            </label>
            <select
              ref={studentSelectRef}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="select w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  deadLineRef.current.focus();
                }
              }}
            >
              <option value="">Choose a student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — Class:{s.class}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Deadline</span>
            </label>
            <input
              ref={deadLineRef}
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input input-bordered w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addBtnRef.current.focus();
                }
              }}
            />
          </div>

          <div className="form-control mt-4 text-center">
            <button
              ref={addBtnRef}
              onClick={handleAddAssignment}
              className="btn"
            >
              Add Assignment For Students
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-center p-2 text-xl">My Student Assignment List </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Deadline</th>
              <th>Submission Content</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {myAssignments.map((a) => {
              const student = students.find((s) => s.id === a.studentId);
              return (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{student ? student.name : `Student ${a.studentId}`}</td>
                  <td>{student ? student.class : "N/A"}</td>
                  <td>{a.deadline}</td>
                  <td>
                    {a.submissionLink ? a.submissionLink : "Not Submit Yet"}
                  </td>

                  <td>
                    <span
                      className={`badge ${a.status === "submitted" ? "badge-success" : "badge-error"}`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;
