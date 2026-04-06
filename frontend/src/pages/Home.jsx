import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MainLayout from "../layout/MainLayout";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#05081a] min-h-screen">
      <Navbar />
      <HeroSection />
      <MainLayout />
      <Footer />
    </div>
  );
};

export default Home;