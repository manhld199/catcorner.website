"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function Scrollup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          id="scrollup"
          className="fixed phone:bottom-8 desktop:bottom-10 phone:right-2 desktop:right-9 phone:w-10 phone:h-10 desktop:w-12 desktop:h-12 bg-pri-7 rounded-full shadow-md cursor-pointer z-50 text-center flex justify-center items-center hover:bg-pri-2 hover:text-black"
          onClick={scrollToTop}>
          <ChevronUp className="text-white w-6 h-6" />
        </div>
      )}
    </>
  );
}
