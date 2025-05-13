import { useState, useContext } from "react";
import { Search, Star, Calendar } from "lucide-react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const UserTrainers = () => {
  // Get data from context instead of Redux
  const { coaches } = useContext(UserContext);
  const trainerList = coaches?.coach || []; // Access the coach array
  // console.log(coaches);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter coaches based on search term
  const filteredTrainers = trainerList.filter((trainer) => {
    return (
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) // Adjusted for possible missing specialty
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-7xl">
        {/* Search Area */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search coaches..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredTrainers.length} coaches found
          </p>
        </div>

        {/* Trainer Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <div
                key={trainer._id}
                className="h-87 w-full overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
              >
                <div
                  className="relative h-40 w-full bg-gray-100"
                  onClick={() =>
                    navigate(`/user/trainers/detiles/${trainer._id}`)
                  }
                >
                  <img
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {trainer.name}
                      </h3>
                      <p className="text-sm text-indigo-600">
                        {trainer.specialty}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className="ml-1 text-sm font-medium">
                        {trainer.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 space-y-1 text-sm">
                    <p className="flex items-center text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      {trainer.freeSlots.filter(
                        (slot) => slot.status === "available"
                      ).length > 0 ? (
                        `${
                          trainer.freeSlots.filter(
                            (slot) => slot.status === "available"
                          ).length
                        } Slot Available`
                      ) : (
                        <span className="text-red-500 font-medium">
                          No slots available
                        </span>
                      )}
                    </p>

                    <p className="text-gray-600">
                      {trainer.experience}+Year experience
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <button
                      onClick={() =>
                        navigate(`/user/trainers/detiles/${trainer._id}`)
                      }
                      disabled={trainer.slots === "Slot Full"}
                      className={`rounded-md px-4 py-2 font-medium transition ${
                        trainer.slots === "Slot Full"
                          ? "cursor-not-allowed bg-gray-200 text-gray-500"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {trainer.freeSlots.length === 0
                        ? "Unavailable"
                        : "Enroll"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <p className="text-lg text-gray-500">No coaches found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTrainers;
