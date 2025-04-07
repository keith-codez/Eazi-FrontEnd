import { useRef,  useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookingCarousel({ bookings }) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
  
    // Check if carouselRef is valid
    if (carousel) {
      const handleScroll = () => {
        const scrollLeft = carousel.scrollLeft;
        const itemWidth = carousel.offsetWidth;
        const index = Math.round(scrollLeft / itemWidth);
        setCurrentIndex(index);
      };
  
      carousel.addEventListener("scroll", handleScroll);
  
      // Cleanup on unmount
      return () => {
        if (carousel) {
          carousel.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    const itemWidth = carousel.offsetWidth;
    carousel.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative block md:hidden w-100 overflow-hidden my-3 pt-10 pb-6">
      {bookings.length > 0 ? (
        <>


        {/* Container for Arrow Buttons (Flexbox layout) */}
        <div className="flex justify-between items-center w-100 absolute top-0 px-4 z-10">
            {/* Left Arrow Button */}
            <button
                onClick={scrollLeft}
                className="bg-white mx-5 shadow-md p-3 rounded-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Right Arrow Button */}
            <button
                onClick={scrollRight}
                className="bg-white mx-5 shadow-md p-3 rounded-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
                <ChevronRight size={20} />
            </button>
        </div>



          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex space-x-4 my-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full"
          >
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className=" w-100 p-1 snap-start shrink-0"
              >
                <div className="bg-white shadow-lg mb-2 rounded-lg p-4">
                  <div className="mt-4 p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Booking ID</span>
                      <span className="text-gray-700">#{booking.id}</span>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Date</span>
                      <span className="text-gray-700">{booking.booking_}</span>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Amount</span>
                      <span className="text-gray-700">${booking.booking_amount}</span>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Status</span>
                      <span
                        className={`px-2 py-1 rounded-lg text-white text-sm ${
                          booking.booking_status === "Completed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
        <div className="flex justify-center mt-5 space-x-2">
        {bookings.map((_, index) => (
            <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
            }`}
            ></button>
        ))}
        </div>

        </>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}
