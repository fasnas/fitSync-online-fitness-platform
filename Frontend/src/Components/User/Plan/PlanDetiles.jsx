import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../AxiosInstance";

const PlanDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(`/user/gettask/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const taskGroups = response.data.data;
        if (Array.isArray(taskGroups) && taskGroups.length > 0) {
          setTasks(taskGroups[0].tasks);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch tasks. Please try again.", err);
      }
    };

    if (id) fetchTasks();
  }, [id]);

  const handleCompleteTask = (taskId) => {
    setCompletedTasks((prev) => new Set(prev).add(taskId));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">📋</span> Today's Tasks
        </h2>
        <div className="space-y-4 max-h-[75vh] overflow-y-auto">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`border rounded-xl p-4 shadow-sm transition-colors ${
                  completedTasks.has(task._id) ? "bg-green-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">Task:</p>
                    <p className="text-gray-600">{task.taskDetails}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Time:</p>
                    <p className="text-gray-600">{task.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCompleteTask(task._id)}
                  disabled={completedTasks.has(task._id)}
                  className={`mt-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    completedTasks.has(task._id)
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {completedTasks.has(task._id) ? "Completed" : "Complete"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
