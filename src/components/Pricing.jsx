import React from "react";
import { BookOpen, Users, Award, Clock } from "lucide-react";
import { Link } from "react-router";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Get started with our platform",
      features: [
        "Access to 5 free courses",
        "Community forums access",
        "Basic certificate",
        "Limited to 2 active courses",
      ],
      button: "Start Free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "99",
      period: "/month",
      description: "Perfect for serious learners",
      features: [
        "Unlimited course access",
        "Priority support",
        "Professional certificates",
        "Offline course downloads",
        "Course completion guarantee",
      ],
      button: "Get Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "299",
      period: "/month",
      description: "For teams and organizations",
      features: [
        "All Pro features included",
        "Team management dashboard",
        "Custom training programs",
        "Dedicated account manager",
        "Advanced analytics",
      ],
      button: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div
        className="bg-linear-to-r from-primary to-secondary text-white py-16 px-4"
        data-aos="fade-down"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl opacity-90">
            Choose the perfect plan for your learning journey
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: BookOpen, label: "Courses", value: "500+" },
            { icon: Users, label: "Students", value: "50K+" },
            { icon: Award, label: "Instructors", value: "1K+" },
            { icon: Clock, label: "Hours", value: "10K+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-base-100 rounded-lg shadow p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <stat.icon className="text-primary mx-auto mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow transition-transform hover:shadow-xl ${
                plan.highlighted
                  ? "bg-primary text-white transform scale-105 md:scale-100"
                  : "bg-base-100"
              }`}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.highlighted ? "opacity-90" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.period && (
                    <span
                      className={
                        plan.highlighted ? "opacity-90" : "text-gray-600"
                      }
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <button
                  className={`btn w-full mb-6 ${
                    plan.highlighted ? "btn-outline btn-light" : "btn-primary"
                  }`}
                >
                  {plan.button}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-lg">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a refund policy?",
                a: "We offer a 7-day money-back guarantee on all paid plans if you're not satisfied.",
              },
              {
                q: "Do you offer student discounts?",
                a: "Yes, students get 50% off on Pro plans with valid student ID.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-base-100 rounded-lg shadow p-6"
                data-aos="fade-up"
              >
                <h4 className="font-semibold mb-2">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;