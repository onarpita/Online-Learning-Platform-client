import React from "react";

const About = () => {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">About LearnHub</h1>
      <p className="text-base-content/80 mb-4">
        LearnHub is an online learning platform dedicated to helping learners
        build practical skills through high-quality courses and experienced
        instructors. Our mission is to make education accessible, flexible, and
        effective for learners everywhere.
      </p>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">What we offer</h2>
        <ul className="list-disc list-inside mt-2 text-base-content/80">
          <li>Curated courses across in-demand topics</li>
          <li>Experienced instructors and mentors</li>
          <li>Certificates of completion</li>
          <li>Flexible learning — learn at your own pace</li>
        </ul>
      </section>
    </main>
  );
};

export default About;