import Image from "next/image";
import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Hero/>
      <PopularCityList/>
    </div>
  );
}
