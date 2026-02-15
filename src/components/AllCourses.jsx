import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { BiCategory, BiSortAlt2 } from "react-icons/bi";
import { VscDiffIgnored } from "react-icons/vsc";
import { Title } from "react-head";

const AllCourses = () => {
  const { courses, loading } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("Default"); // New Sort State
  const [filteredCourses, setFilteredCourses] = useState([]);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  useEffect(() => {
    if (!courses) return;

    let updated = [...courses];

    // --- Search Filter ---
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      updated = updated.filter(
        (c) =>
          c.title?.toLowerCase().includes(query) ||
          c.instructor?.name?.toLowerCase().includes(query)
      );
    }

    // --- Category Filter ---
    if (category !== "All") {
      updated = updated.filter((c) => c.category === category);
    }

    // --- Difficulty Filter ---
    if (difficulty !== "All") {
      updated = updated.filter((c) => c.level === difficulty);
    }

    // --- Price Sorting Logic ---
    if (sortBy === "Price: Low to High") {
      updated.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "Price: High to Low") {
      updated.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    setFilteredCourses(updated);
    setCurrentPage(1); // Reset to page 1 when filters or sorting change
  }, [search, category, difficulty, sortBy, courses]);

  // --- Pagination Logic ---
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    "All",
    "Development",
    "Design",
    "Marketing",
    "Data Science",
    "Business",
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setDifficulty("All");
    setSortBy("Default");
  };

  if (loading) {
    return (
      <div className="p-5">
        <Title>Loading Courses | TURITOR</Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl mt-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <Title>Courses | TURITOR</Title>

      {/* Header Section */}
      <div data-aos="fade-down" className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-3">
          Explore <span className="text-secondary">All Courses</span>
        </h2>
      </div>

      {/* Filter & Sort Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-4 bg-base-100 p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <div>
          <label className="mb-2 text-secondary text-sm font-medium flex gap-2 items-center">
            <CiSearch className="text-lg" /> Search
          </label>
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 text-secondary text-sm font-medium flex gap-2 items-center">
            <BiCategory className="text-lg" /> Category
          </label>
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 text-secondary text-sm font-medium flex gap-2 items-center">
            <VscDiffIgnored className="text-lg" /> Difficulty
          </label>
          <select
            className="select select-bordered w-full"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficulties.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 text-secondary text-sm font-medium flex gap-2 items-center">
            <BiSortAlt2 className="text-lg" /> Sort By Price
          </label>
          <select
            className="select select-bordered w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Default">Default</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Card Display Area */}
      <div className="min-h-[400px]">
        {currentCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
              {currentCourses.map((course, i) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={(i % 8) * 50}
                  key={course._id || i}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="btn btn-outline btn-sm sm:btn-md disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`btn btn-sm sm:btn-md ${
                          currentPage === pageNum ? "btn-primary" : "btn-ghost"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="btn btn-outline btn-sm sm:btn-md disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
            <BookOpen size={80} className="text-secondary/30 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No Courses Found</h3>
            <button
              onClick={handleReset}
              className="mt-4 text-primary underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;