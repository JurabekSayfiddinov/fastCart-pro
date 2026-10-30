import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jblImage from "../images/Frame 694.png";

const SALE_DURATION = 6 * 24 * 60 * 60 * 1000;

export default function MusicBanner() {
  const [endTime] = useState(() => {
    const saved = localStorage.getItem("musicBannerEndTime");

    if (saved && Number(saved) > Date.now()) {
      return Number(saved);
    }

    const nextEndTime = Date.now() + SALE_DURATION;
    localStorage.setItem("musicBannerEndTime", String(nextEndTime));

    return nextEndTime;
  });

  const [remaining, setRemaining] = useState(
    Math.max(0, endTime - Date.now())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(Math.max(0, endTime - Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  const timerItems = [
    { label: "Hours", value: hours },
    { label: "Days", value: days },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="max-w-[1170px] mx-auto px-4 mt-[100px]">

      <div className="relative min-h-[500px] bg-black overflow-hidden flex items-center">

  
        <div className="relative z-10 pl-[56px] py-12">

          <p className="text-[#00FF66] text-[16px] font-semibold mb-8">
            Categories
          </p>

          <h2 className="text-white text-[48px] font-semibold leading-[1.2] tracking-wide max-w-[440px]">
            Enhance Your Music Experience
          </h2>

        
          <div className="flex items-center gap-4 mt-8">

            {timerItems.map((item) => (
              <div
                key={item.label}
                className="w-[62px] h-[62px] rounded-full bg-white text-black flex flex-col items-center justify-center"
              >
                <span className="text-[16px] font-semibold leading-tight">
                  {String(item.value).padStart(2, "0")}
                </span>

                <span className="text-[10px] leading-tight">
                  {item.label}
                </span>
              </div>
            ))}

          </div>

       
          <Link
            to="/products"
            className="inline-flex items-center justify-center mt-10 w-[171px] h-[56px] bg-[#00FF66] text-black rounded font-medium hover:bg-green-400 transition-colors"
          >
            Buy Now!
          </Link>

        </div>

     
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[50%]">

          <div className="absolute inset-0 bg-white/15 blur-[90px] rounded-full" />

          <img
            src={jblImage}
            alt="JBL Speaker"
            className="relative w-full h-[400px] object-contain"
          />

        </div>

      </div>

    </section>
  );
}