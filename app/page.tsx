import About from "@/components/about";
import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
    </main>
  );
}
