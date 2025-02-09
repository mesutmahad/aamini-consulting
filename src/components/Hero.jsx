import { Button } from "../components/ui/button";
import { Link } from "react-router-dom"; // Import Link

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center bg-[#2B428C]">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-[#47C263] hover:bg-[#47C263]/90 text-white px-8 py-6 text-lg"
                >
                  Contact Us
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  className="text-white hover:bg-[#2B428C] shadow-md hover:text-white px-8 py-6 text-lg"
                >
                  Pricing
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <div>
                    <img
                      src="/assets/chart vector.png"
                      alt="Analytics Dashboard"
                      className="w-full h-auto object-cover rounded-lg mt-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
