"use client";

import { Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-[#f9f9ff]"
      } py-16 mt-20`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-blue-400" : "text-[#2B428C]"
            } mb-4`}
          >
            Pricing Package
          </h1>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Lorem ipsum dolor sit amet consectetur. Commodo ut venenatis quam
            tristique nulla sed enim. Tempor semper malesuada arcu cursus.
            Venenatis vulputate diam
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
          <PricingCard
            title="Basic"
            price="$1,500"
            description="For individuals"
            features={[
              "All analytics features",
              "Up to 250,000 tracked visits",
              "Normal support",
              "Up to 3 team members",
            ]}
            isDark={isDark}
          />
          <PricingCard
            title="Pro"
            price="$5,000"
            description="Full package"
            features={[
              "All analytics features",
              "Up to 1,000,000 tracked visits",
              "Premium support",
              "Up to 10 team members",
            ]}
            isPro={true}
            isDark={isDark}
          />
          <PricingCard
            title="Enterprise"
            price="$3,000"
            description="For big companies"
            features={[
              "All analytics features",
              "Up to 5,000,000 tracked visits",
              "Dedicated support",
              "Up to 50 team members",
            ]}
            isDark={isDark}
          />
        </div>

        {/* Subscribe Section */}
        <div
          className={`${
            isDark ? "bg-gray-800" : "bg-[#2B428C]"
          } rounded-lg p-8 md:p-12`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex-shrink-0">
              <img
                src="/assets/test 1.png"
                alt="Subscribe"
                className="w-full max-w-md"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Subscribe updates
              </h2>
              <p className="text-white/80">
                Lorem ipsum dolor sit amet consectetur. Libero ut eros ac
                pretium feugiat. Nec elit cursus amet urna varius. Lorem
                fringilla sagittis diam nulla morbi a et. Fermentum id aliquiet
                vel porttitor luctus eu aliquet lobortis sit.
              </p>
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button
                  className={`${
                    isDark
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-[#47C263] hover:bg-[#47C263]/90"
                  } text-white`}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  isPro = false,
  isDark,
}) {
  return (
    <div
      className={`${
        isPro
          ? isDark
            ? "bg-blue-900 text-white"
            : "bg-[#2B428C] text-white"
          : isDark
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-900"
      } rounded-lg p-6 shadow-lg ${isPro ? "transform scale-105" : ""}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 ${
            isPro
              ? "bg-white/10"
              : isDark
              ? "bg-blue-900/10"
              : "bg-[#2B428C]/10"
          } rounded-lg flex items-center justify-center`}
        >
          <div
            className={`w-6 h-6 ${
              isPro ? "bg-white" : isDark ? "bg-blue-400" : "bg-[#2B428C]"
            } rounded-full`}
          />
        </div>
        <div>
          <div
            className={`text-sm ${
              isPro
                ? "text-white/80"
                : isDark
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {description}
          </div>
          <h3 className="font-semibold text-xl">{title}</h3>
        </div>
      </div>
      <div className="text-4xl font-bold mb-6">{price}</div>
      <div className="mb-6">
        <div className="font-medium mb-4">What's included</div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <PricingFeature key={index} text={feature} light={isPro} />
          ))}
        </ul>
      </div>
      <Button
        className={`w-full ${
          isPro
            ? isDark
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#47C263] hover:bg-[#47C263]/90"
            : isDark
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-[#2B428C] hover:bg-[#2B428C]/90"
        } text-white`}
      >
        Get started
      </Button>
    </div>
  );
}

function PricingFeature({ text, light = false }) {
  return (
    <li className="flex items-center gap-2">
      <Check className={`w-5 h-5 ${light ? "text-white" : "text-[#47C263]"}`} />
      <span>{text}</span>
    </li>
  );
}
