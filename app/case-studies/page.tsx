import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Case Studies — Chidakara",
};
export default function ContactPage() {

  return (

    <>
    
      <Navbar />

      <main className="min-h-screen bg-black px-6 pt-40 text-white">

        <div className="mx-auto max-w-7xl">

          <h1 className="text-5xl font-semibold">
            case-studies
          </h1>

        </div>

      </main>

      <Footer />

    </>

  );
}