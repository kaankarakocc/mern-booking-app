import React from "react";

type Props = {};

const Hero = (props: Props) => {
  const textStyle = (params: string) => {
    return `text-${params} text-white font-bold tracking-tight`;
  };

  return (
    <section className="w-full bg-blue-800 pt-10 pb-20">
      <div className="container mx-auto space-y-4">
        <span className={textStyle("4xl")}>Find your next stay</span>
        <p className={textStyle("2xl")}>
          Search low prices on hotels, flights, and cruises for your dream
          vacation...
        </p>
      </div>
    </section>
  );
};

export default Hero;
