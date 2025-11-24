import { Hero } from "@/components/home/Hero";
import { BriefForm } from "@/components/home/BriefForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BriefForm />
    </div>
  );
}
