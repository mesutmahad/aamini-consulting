import { Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect } from "react";

export default function Pricing() {
   useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2B428C] mb-4">
            Pricing Package
          </h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Commodo ut venenatis quam
            tristique nulla sed enim. Tempor semper malesuada arcu cursus.
            Venenatis vulputate diam
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#2B428C]/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-[#2B428C] rounded-full" />
              </div>
              <div>
                <div className="text-sm text-gray-600">For individuals</div>
                <h3 className="font-semibold text-xl">Basic</h3>
              </div>
            </div>
            <div className="text-4xl font-bold mb-6">$1,500</div>
            <div className="mb-6">
              <div className="font-medium mb-4">What's included</div>
              <ul className="space-y-3">
                <PricingFeature text="All analytics features" />
                <PricingFeature text="Up to 250,000 tracked visits" />
                <PricingFeature text="Normal support" />
                <PricingFeature text="Up to 3 team members" />
              </ul>
            </div>
            <Button className="w-full bg-[#2B428C]">Get started</Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#2B428C] text-white rounded-lg p-6 shadow-lg transform scale-105">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full" />
              </div>
              <div>
                <div className="text-sm text-white/80">Full package</div>
                <h3 className="font-semibold text-xl">Pro</h3>
              </div>
            </div>
            <div className="text-4xl font-bold mb-6">$5,000</div>
            <div className="mb-6">
              <div className="font-medium mb-4">What's included</div>
              <ul className="space-y-3">
                <PricingFeature text="All analytics features" light />
                <PricingFeature text="Up to 1,000,000 tracked visits" light />
                <PricingFeature text="Premium support" light />
                <PricingFeature text="Up to 10 team members" light />
              </ul>
            </div>
            <Button className="w-full bg-[#47C263] hover:bg-[#47C263]/90">
              Get started
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#2B428C]/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-[#2B428C] rounded-full" />
              </div>
              <div>
                <div className="text-sm text-gray-600">For big companies</div>
                <h3 className="font-semibold text-xl">Enterprise</h3>
              </div>
            </div>
            <div className="text-4xl font-bold mb-6">$3,000</div>
            <div className="mb-6">
              <div className="font-medium mb-4">What's included</div>
              <ul className="space-y-3">
                <PricingFeature text="All analytics features" />
                <PricingFeature text="Up to 5,000,000 tracked visits" />
                <PricingFeature text="Dedicated support" />
                <PricingFeature text="Up to 50 team members" />
              </ul>
            </div>
            <Button className="w-full bg-[#2B428C]">Get started</Button>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="bg-[#2B428C] rounded-lg p-8 md:p-12">
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
                <Button className="bg-[#47C263] hover:bg-[#47C263]/90 text-white">
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

function PricingFeature({ text, light = false }) {
  return (
    <li className="flex items-center gap-2">
      <Check className={`w-5 h-5 ${light ? "text-white" : "text-[#47C263]"}`} />
      <span>{text}</span>
    </li>
  );
}
