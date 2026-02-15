import React, { useEffect, useState } from "react";
import axiosInstance from "../context/Axios";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoPlayOutline } from "react-icons/io5";
import { Link } from "react-router";

const TopInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axiosInstance.get("/instructors").then((res) => {
      const dataS = res.data.slice(0, 4);
      setInstructors(dataS);
    });
  }, []);

  return (
    <div className="bg-base-200">
      <div className="py-20 text-center max-w-6xl mx-auto">
        <div data-aos="fade-up">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-3">
            Our Top Instructor
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Talented Educators Building <br />
            Tomorrow’s Leaders With Passion
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Our instructors design courses that cultivate leadership, critical
            thinking, and creativity, preparing learners to excel in today’s
            dynamic world.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
          {instructors.map((ed, i) => (
            <InstructorCard ed={ed} i={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const InstructorCard = ({ ed, i }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  return (
    <div
      data-aos="flip-right"
      data-aos-delay={i * 150}
      className="card bg-base-100 shadow-md border border-gray-200 rounded-2xl overflow-hidden relative hover:border hover:border-b-5 hover:border-secondary transform hover:transition-transform hover:scale-105 ease-in duration-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <figure className="relative w-full h-56 overflow-hidden flex items-center justify-center">
        <img
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          src={ed.img}
          alt={ed.name}
          className="rounded-xl w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: `scale(1.25) translate(${offset.x}px, ${offset.y}px)`,
          }}
        />

        {/* Social icons div */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex justify-center items-center gap-5 text-3xl pb-4  bg-opacity-50 rounded-b-xl transition-all duration-500
            ${
              hovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }
          `}
        >
          <Link to={`/${ed.fb_link}`}>
            <FaFacebookF className="p-1 text-white bg-secondary rounded-full" />
          </Link>
          <Link to={`/${ed.x_link}`}>
            <FaXTwitter className="p-1 text-white bg-secondary rounded-full" />
          </Link>
          <Link to={`/${ed.yt_link}`}>
            <IoPlayOutline className="p-1 text-white bg-secondary rounded-full" />
          </Link>
        </div>
      </figure>

      <div className="card-body items-center text-center">
        <h3 className="text-xl font-bold">{ed.name}</h3>
        <p className="text-sm">{ed.title}</p>
      </div>
    </div>
  );
};

export default TopInstructor;