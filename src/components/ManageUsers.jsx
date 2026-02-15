const ManageUsers = () => (
  <div className="card bg-base-100 shadow-xl p-6 border border-base-300">
    <h2 className="text-2xl font-bold mb-4">User Management</h2>
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>Student</td>
            <td>
              <button className="btn btn-xs btn-error">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ManageUsers;