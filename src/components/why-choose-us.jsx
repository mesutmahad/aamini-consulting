"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function WhyChooseUs() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "bg-gray-900" : "bg-white"}>
      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/assets/image choose us.png"
                alt="Why Choose Us"
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-8">
              <h2
                className={`text-3xl md:text-4xl font-bold ${
                  isDark ? "text-blue-400" : "text-[#2B428C]"
                }`}
              >
                Why Choose Us ?
              </h2>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Lorem ipsum dolor sit amet consectetur. Dictum auctor urna
                feugiat morbi. Blandit egestas ipsum vehicula fusce sit. A fusce
                pulvinar morbi
              </p>

              <div className="space-y-4">
                {[
                  "Expertise in 245D licensing and compliance.",
                  "Personalized service packages to fit your unique needs.",
                  "Designated care coordinators to ensure quality service and client satisfaction.",
                  "Proven success in navigating DHS processes and securing client recruitment.",
                ].map((text, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isDark ? "bg-green-500" : "bg-[#47C263]"
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
