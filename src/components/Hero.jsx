import { Button } from "../components/ui/button";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center bg-[#2B428C] pt-20">
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
              <Button
                size="lg"
                className="bg-[#47C263] hover:bg-[#47C263]/90 text-white px-8 py-6 text-lg"
              >
                Contact Us
              </Button>
              <Button
                size="lg"
                to="/pricing"
                className="text-[#2B428C] shadow-md bg-white hover:bg-[#2B428C] hover:text-white px-8 py-6 text-lg"
              >
                Pricing
              </Button>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="block sm:hidden text-center mt-8">
            <img
              src="/assets/chart vector.png"
              alt="Analytics Dashboard"
              className="w-full max-w-xs mx-auto rounded-lg"
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden sm:block">
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
