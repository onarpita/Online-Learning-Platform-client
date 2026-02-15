import React from "react";
import img from "../assets/studentImage.png";
import teacherImg from "../assets/teacher.png";
import curriculumImg from "../assets/curriculumn.png";
import certified from "../assets/Certified.png";
import flexible from "../assets/flexible.png";

const AboutSection = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 bg-base-100 text-base-content">
      {/* Top Section */}
      <div className="px-6 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div data-aos="fade-right">
          <p className="text-sm font-semibold text-center text-secondary uppercase mb-2">
            Why Choose Us
          </p>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Committed To Excellence
            <br /> In Online Education
          </h2>
          <p className="text-base-content/70 mb-6">
            Our platform is built on trust, quality, and innovation, ensuring
            learners everywhere access knowledge that truly empowers and
            inspires.
          </p>
          <button className="btn btn-primary ">Learn More →</button>
        </div>

        {/* Right Content */}
        <div data-aos="fade-left" className="flex flex-col items-center">
          <div className="border border-secondary rounded-xl p-4">
            <img src={img} alt="Students" className="rounded-lg" />
          </div>

          {/* Features */}
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="grid md:grid-cols-2 gap-6 mt-8 w-2/3 mx-auto"
      >
        <div className=" flex items-center space-x-3">
          <div>
            <img src={teacherImg} alt="" className="min-w-15 h-15" />
          </div>
          <div>
            <h4 className="font-semibold">Qualified Teachers</h4>
            <p className="text-sm text-base-content/70">
              Experienced educators guiding with proven expertise
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div>
            <img src={curriculumImg} alt="" className="min-w-15 h-15" />
          </div>
          <div>
            <h4 className="font-semibold">Modern Curriculum</h4>
            <p className="text-sm text-base-content/70">
              Up-to-date courses aligned with industry needs
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div>
            <img src={certified} alt="" className="min-w-15 h-15" />
          </div>
          <div>
            <h4 className="font-semibold">Certified Institute</h4>
            <p className="text-sm text-base-content/70">
              Officially recognized with globally trusted certifications
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div>
            <img src={flexible} alt="" className="min-w-15 h-15" />
          </div>
          <div>
            <h4 className="font-semibold">Flexible Learning</h4>
            <p className="text-sm text-base-content/70">
              Study anytime anywhere with complete freedom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;