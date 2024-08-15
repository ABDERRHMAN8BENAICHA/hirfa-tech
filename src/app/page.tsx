import About from "@/components/About";
import AIOptimize from "@/components/AIOptimize";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Resume from "@/components/Resume";
import View from "@/components/View";
import { auth } from "@/auth"


export default async function Home() {
  const session = await auth()
  // return (<p>Welcome {session?.user?.name}!</p>)
  return (
    <section>
      <NavBar />
      <Hero />
      <View />
      <About />
      <AIOptimize />
      <Resume />
      <Footer />
    </section>
  );
}
