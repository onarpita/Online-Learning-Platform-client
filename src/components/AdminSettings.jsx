const AdminSettings = () => (
  <div className="max-w-2xl bg-base-100 p-8 rounded-xl shadow-lg border border-base-300">
    <h2 className="text-2xl font-bold mb-6">Global Site Settings</h2>
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">Site Name</label>
        <input
          type="text"
          className="input input-bordered"
          defaultValue="TURITOR"
        />
      </div>
      <div className="form-control">
        <label className="label">Support Email</label>
        <input
          type="email"
          className="input input-bordered"
          defaultValue="support@turitor.com"
        />
      </div>
      <button className="btn btn-primary mt-4">Save Changes</button>
    </div>
  </div>
);

export default AdminSettings;