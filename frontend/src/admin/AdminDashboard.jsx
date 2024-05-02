import React from "react";
import WithAuth from "../../auth/WithAuth";

const AdminDashboard = () => {
  return (
    <div className="text-center mt-3 p-3">
      <h2 className="mb-0">Blog</h2>
    </div>
  );
};

export default WithAuth(AdminDashboard);
