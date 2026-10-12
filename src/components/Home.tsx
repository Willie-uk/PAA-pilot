import Navbar from "../basic/Navbar";
import CardSection from "../paa/CardSection";
import Footer from "../paa/Footer";
import Hero from "../paa/Hero";
import MainSection from "../paa/MainSection";
import Sidebar from "../paa/Sidebar";
import Welcome from "../paa/Welcome";
import { motion } from "framer-motion";

const Home = () => {
  const staggeredItems = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger delay of 0.1s between elements
        duration: 0.5,
      },
    }),
  };
  return (
    <motion.div initial="hidden" animate="show">
      <Navbar />
      <motion.div custom={2} variants={staggeredItems}>
        <Welcome />
      </motion.div>
      <motion.div custom={3} variants={staggeredItems}>
        <MainSection />
      </motion.div>
      <motion.div custom={4} variants={staggeredItems}>
        <Hero />
      </motion.div>
      <motion.div custom={5} variants={staggeredItems}>
        <CardSection />
      </motion.div>
      <motion.div custom={6} variants={staggeredItems}>
        <Footer />
      </motion.div>
      <motion.div custom={2} variants={staggeredItems}>
        <Sidebar />
      </motion.div>
    </motion.div>
  );
};

export default Home;
