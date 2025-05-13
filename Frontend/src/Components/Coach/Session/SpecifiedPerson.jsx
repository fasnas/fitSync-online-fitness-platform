import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CoachContext } from "../../Context/CoachContext";
import axiosInstance from "../../../AxiosInstance";

const AdminSessionPage = () => {
  const { id } = useParams(); // id is booking._id
  const { bookedUsers } = useContext(CoachContext);
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    taskDetails: "",
    description: "",
    time: "",
  });
  console.log(tasks);
  // Set session details
  if (!bookedUsers) return null;
  const selectedSession = bookedUsers.find((booking) => booking._id === id);
  if (!selectedSession) {
    navigate("/coach/sessions", {
      state: { error: `Session not found for ID: ${id}` },
    });
    return null;
  }
  if (!session) {
    setSession({
      client: selectedSession.user?.name || "Unknown",
      plan:
        selectedSession.plan === "oneMonth"
          ? "One Month Plan"
          : selectedSession.plan === "threeMonths"
          ? "Three Months Plan"
          : selectedSession.plan || "Custom Plan",
    });
  }

  // Handle adding a new task locally
  const handleAddTask = (e) => {
    e.preventDefault();
    if (
      !newTask.taskDetails.trim() ||
      !newTask.description.trim() ||
      !newTask.time.trim()
    ) {
      return; // Silently ignore invalid inputs
    }

    const task = {
      taskDetails: newTask.taskDetails,
      description: newTask.description,
      time: newTask.time,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ taskDetails: "", description: "", time: "" });
  };

  // Handle sending tasks to the server
  const handleSendTasks = async () => {
    if (tasks.length === 0) return;

    try {
      const token = localStorage.getItem("token"); // or whatever key you use

      await axiosInstance.post(
        "/coach/task",
        { bookingId: id, tasks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks([]);
    } catch (err) {
      console.error("Error sending tasks:", err.message);
    }
  };

  // Loading state
  if (!session) {
    return (
      <div className="p-6 pl-64 pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <svg
            className="h-12 w-12 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="mt-4 text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pl-64 pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">📋</span> Tasks for {session.client} (
            {session.plan})
          </h2>
          <form
            onSubmit={handleAddTask}
            className="mb-6 flex flex-col space-y-3"
          >
            <div className="flex space-x-3">
              <input
                type="text"
                value={newTask.taskDetails}
                onChange={(e) =>
                  setNewTask({ ...newTask, taskDetails: e.target.value })
                }
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                placeholder="Enter task (e.g., Warm-up)"
                aria-label="Task description"
              />
              <input
                type="time"
                value={newTask.time}
                onChange={(e) =>
                  setNewTask({ ...newTask, time: e.target.value })
                }
                className="w-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Task time"
              />
            </div>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              placeholder="Enter task description"
              aria-label="Task description details"
              rows="4"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md self-end"
              aria-label="Add new task"
              role="button"
            >
              Add Task
            </button>
          </form>
          <div className="overflow-y-auto max-h-[calc(100vh-20rem)]">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    Task
                  </th>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    Description
                  </th>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-gray-800">{task.taskDetails}</td>
                      <td className="p-3 text-gray-800">{task.description}</td>
                      <td className="p-3 text-gray-800">{task.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 text-center text-gray-500">
                      No tasks assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSendTasks}
              disabled={tasks.length === 0}
              className={`px-6 py-3 rounded-lg text-white transition-colors shadow-md ${
                tasks.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              aria-label="Send all tasks to client"
              role="button"
            >
              Send Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSessionPage;
