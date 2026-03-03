

const AddUser = () => {


  return (
    <div>
      <div className="border p-4 mb-6 mt-5 bg-gray-50 space-y-5 ">
        Enter Name:{" "}
        <input type="text" name="name" placeholder="Enter your Name" /> <br />
        Enter Email: <input type="email" name="email" id="" /> <br />
        <input
          type="text"
          name="phone"
          value="Enter Your Phone"
          placeholder="Phone"
          className="input input-bordered w-48"
        />
        <p>Select Your Role</p>
        <select name="role" className="input input-bordered ">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
};

export default AddUser;
