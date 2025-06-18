import React from "react";
import Image from "next/image";

type ProgressBarProps = {
  value: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <>
      <div className="flex-between text-theme">
        <span className="flex-center text-theme-inactive">
            <Image src='/img/progressMenu.png' height={22} width={22} className="object-scale-down" alt="" />
            Progress
        </span>

        <span className="text-sm font-medium">
          {(Math.round(value / 10) * 10) / 10}/10
        </span>
      </div>

      <div className=" bg-theme h-1.5 rounded-lg m-2">
        <div
          className={`h-full transition-all duration-300 ${
            value < 30
              ? "bg-[#FF7979]"
              : value > 30 && value < 70
              ? "bg-[#FFA048]"
              : "bg-[#78D700]"
          } rounded-lg`}
          style={{ width: `${value}%` }}
        />
      </div>
    </>
    // background: #FFA048; fair
    // background: #FF7979; bad
    // background: #78D700;
  );
};

export default ProgressBar;
