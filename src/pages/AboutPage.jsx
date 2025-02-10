"use client";

import { useEffect } from "react";
import { CheckCircle, BarChart, Users, Globe } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ConsultingAboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } mt-20`}
    >
      {/* Hero Section */}
      <section
        className={`${
          isDark ? "bg-gray-800" : "bg-primary"
        } text-white py-20 items-center flex justify-center`}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Consulting Firm
          </h1>
          <p className="text-xl mb-8">
            Driving Success Through Strategic Insights and Expertise
          </p>
          <button
            className={`${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-white text-primary hover:bg-gray-100"
            } px-6 py-3 rounded-md font-semibold transition duration-300`}
          >
            Schedule a Consultation
          </button>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="/assets/Our Approach.png"
                alt="Company Overview"
                className="rounded-lg shadow-lg w-50 mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2
                className={`text-3xl font-semibold mb-6 ${
                  isDark ? "text-blue-400" : "text-primary"
                }`}
              >
                Our Approach
              </h2>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } mb-6`}
              >
                At our consulting firm, we believe in delivering tailored
                solutions that drive real business growth. With years of
                industry experience and a team of expert consultants, we provide
                strategic insights and actionable recommendations to help our
                clients overcome challenges and seize opportunities.
              </p>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Our collaborative approach ensures that we work closely with you
                to understand your unique needs and develop strategies that
                align with your business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={`${isDark ? "bg-gray-800" : "bg-white"} py-16`}>
        <div className="container mx-auto px-4">
          <h2
            className={`text-3xl font-semibold text-center mb-12 ${
              isDark ? "text-blue-400" : "text-primary"
            }`}
          >
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Integrity",
                description:
                  "We uphold the highest ethical standards in all our engagements.",
              },
              {
                icon: BarChart,
                title: "Excellence",
                description:
                  "We strive for excellence in every aspect of our work.",
              },
              {
                icon: Users,
                title: "Collaboration",
                description:
                  "We believe in the power of teamwork and partnership.",
              },
              {
                icon: Globe,
                title: "Innovation",
                description:
                  "We continuously seek innovative solutions to complex problems.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`${
                  isDark ? "bg-gray-700" : "bg-blue-50"
                } rounded-lg p-6 text-center`}
              >
                <value.icon
                  className={`w-12 h-12 ${
                    isDark ? "text-blue-400" : "text-primary"
                  } mx-auto mb-4`}
                />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2
            className={`text-3xl font-semibold text-center mb-12 ${
              isDark ? "text-blue-400" : "text-primary"
            }`}
          >
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Strategic Planning",
              "Financial Advisory",
              "Operational Improvement",
              "Digital Transformation",
              "Market Research",
              "Risk Management",
            ].map((service, index) => (
              <div
                key={index}
                className={`${
                  isDark ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300`}
              >
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDark ? "text-blue-400" : "text-primary"
                  }`}
                >
                  {service}
                </h3>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                  Our expert consultants provide tailored solutions to help your
                  business thrive in this area.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`${isDark ? "bg-gray-800" : "bg-white"} py-16 shadow-md mb-20`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Ready to Transform Your Business?
          </h2>
          <p
            className={`mb-8 text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Let's work together to unlock your company's full potential.
          </p>
          <button
            className={`${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-primary hover:bg-primary-dark"
            } text-white px-6 py-3 rounded-md font-semibold`}
          >
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConsultingAboutPage;
