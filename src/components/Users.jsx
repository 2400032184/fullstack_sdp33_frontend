import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // ✅ FETCH USERS FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => {
        setUsers(res.data.reverse());
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Toggle selection of a user
  const toggleSelectUser = (index) => {
    if (selectedUsers.includes(index)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== index));
    } else {
      setSelectedUsers([...selectedUsers, index]);
    }
  };

  // ✅ DELETE SELECTED USERS FROM BACKEND
  const deleteSelectedUsers = async () => {
    try {
      for (let index of selectedUsers) {
        const user = users[index];
        await axios.delete(`http://localhost:8080/api/users/${user.id}`);
      }

      const updatedUsers = users.filter(
        (_, index) => !selectedUsers.includes(index)
      );

      setUsers(updatedUsers);
      setSelectedUsers([]);
      setEditMode(false);
    } catch (err) {
      console.error("Error deleting users:", err);
    }
  };

  return (
    <>
      <div className="users-page">
        <h1>Registered Users</h1>
        <p className="user-count">Total Users: {users.length}</p>

        <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit Users"}
        </button>

        {editMode && selectedUsers.length > 0 && (
          <button className="delete-btn" onClick={deleteSelectedUsers}>
            Delete Selected Users
          </button>
        )}

        {users.length > 0 ? (
          <div className="users-grid">
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`user-card ${
                  editMode && selectedUsers.includes(index) ? "selected" : ""
                }`}
                onClick={() => editMode && toggleSelectUser(index)}
              >
                <h2 className="user-name">{user.username}</h2>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Password:</strong>{" "}
                  {"•".repeat(user.password?.length || 0)}
                </p>
                <p>
                  <strong>Agreed to Terms:</strong>{" "}
                  {user.terms ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-users">No registered users found.</p>
        )}
      </div>

      <style>{`
  .users-page {
    padding: 40px 20px;
    min-height: 100vh;
    background: linear-gradient(135deg, #d9f1f7, #b6e0f0, #8fd3e8, #c3eaf7);
    text-align: center;
    font-family: Arial, sans-serif;
  }

  h1 {
    font-size: 2.5rem;
    color: #123c5a;
    margin-bottom: 10px;
  }

  .user-count {
    font-size: 1.3rem;
    color: #1f6f8b;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .edit-btn, .delete-btn {
    padding: 10px 15px;
    margin: 10px 5px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }

  .edit-btn {
    background-color: #1f6f8b;
    color: white;
  }

  .edit-btn:hover {
    background-color: #123c5a;
  }

  .delete-btn {
    background-color: #006994;
    color: white;
  }

  .delete-btn:hover {
    background-color: #004466;
  }

  .users-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    justify-items: center;
  }

  .user-card {
    background: #fff;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 300px;
    text-align: left;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
    border: 2px solid transparent;
  }

  .user-card.selected {
    border: 2px solid #006994;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }

  .user-name {
    font-size: 1.6rem;
    font-weight: 700;
    color: #123c5a;
    margin-bottom: 10px;
  }

  .user-card p {
    font-size: 1rem;
    color: #1f6f8b;
    margin: 5px 0;
  }

  .no-users {
    font-size: 1.3rem;
    color: #123c5a;
  }

  @media (max-width: 500px) {
    .users-page {
      padding: 20px 10px;
    }
  }
`}</style>
    </>
  );
};

export default Users;
