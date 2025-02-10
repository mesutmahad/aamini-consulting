"use client";

import { Button } from "../components/ui/button";
import { useTheme } from "../contexts/ThemeContext";

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative min-h-[calc(100vh-5rem)] flex items-center ${
        isDark ? "bg-gray-900" : "bg-[#2B428C]"
      } pt-20`}
    >
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Stays on the Left */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              We specialize in helping individuals and organizations set up
              businesses
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0">
              Including navigating requirements and opportunities with the
              Department of Human Services (DHS).
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className={`${
                  isDark
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#47C263] hover:bg-[#47C263]/90"
                } text-white px-8 py-6 text-lg`}
              >
                Contact Us
              </Button>
              <Button
                size="lg"
                variant={isDark ? "outline" : "secondary"}
                className={`${
                  isDark
                    ? "text-white border-white hover:bg-gray-800"
                    : "text-[#2B428C] bg-white hover:bg-gray-100"
                } shadow-md px-8 py-6 text-lg`}
              >
                Pricing
              </Button>
            </div>
          </div>

          {/* Image - Moves to Top on Mobile & Right Side on Large Screens */}
          <div className="flex justify-center order-first lg:order-last">
            <img
              src="/assets/chart vector.png"
              alt="Analytics Dashboard"
              className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
