import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/admin.css";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = {}) => {
    try {
      setLoading(true);

      const params = {};
      if (query.email) params.email = query.email;
      if (query.phone) params.phone = query.phone;

      const res = await axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params,
      });

      let data = res.data;
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        const firstArray = Object.values(data).find((v) => Array.isArray(v));
        setUsers(firstArray || []);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (!term) {
      fetchUsers();
    } else if (/^\d+$/.test(term)) {
      fetchUsers({ phone: term });
    } else {
      fetchUsers({ email: term });
    }
  };

  const deleteUser = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { email },
        });
        setUsers((prev) => prev.filter((u) => u.email !== email));
      } catch (err) {
        console.error(
          "Error deleting user:",
          err.response?.data || err.message
        );
        alert("Failed to delete user");
      }
    }
  };

  return (
    <motion.div
      className="admin-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">
          Manage users with ease — search, view, and remove users instantly.
        </p>
      </div>

      <motion.div
        className="admin-controls"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search by email or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="admin-search"
        />
        <button onClick={handleSearch} className="admin-search-btn">
          Search
        </button>
        <button
          onClick={() => {
            setSearchTerm("");
            fetchUsers();
          }}
          className="admin-viewall-btn"
        >
          View All
        </button>
      </motion.div>

      {loading ? (
        <div className="admin-loading">Loading users...</div>
      ) : (
        <motion.div
          className="admin-table-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <motion.tr
                    key={user._id}
                    whileHover={{ scale: 1.01, backgroundColor: "#f0f8ff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "-"}</td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <button
                        className="admin-delete-btn"
                        onClick={() => deleteUser(user.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-users">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
