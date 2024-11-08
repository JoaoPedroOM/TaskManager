import React, { useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <main className="lg:mb-[120px] lg:my-[120px] my-14">
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="font-main text-center lg:w-1/2 w-full lg:text-5xl lg:px-0 px-2 text-3xl font-bold text-[#d4d5d6]">
            Melhoria na Produtividade e Gestão de Tarefas
          </h1>
          <p className="font-titles text-center font-light lg:text-xl text-base lg:px-0 px-2 text-[#a9abad]">
            Aproveite uma Gestão de Tarefas Sem Complicação com o Task Manager:
            Simplicidade e Eficiência!
          </p>

          <Link to="/logar" className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
            <span className="text-lg">
              Começar agora
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </Link>

          <div className="px-2">
            {isLoading && (
              <Box sx={{ width: '100%' }}>
                <Skeleton variant="rectangular" width="100%" height={600} sx={{ bgcolor: 'grey.900' }} />
              </Box>
            )}
            <img
              className={`overflow-x-visible rounded-sm border border-[#a9abad] shadow-2xl transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
              src="https://portfolio-joao-pedro.vercel.app/assets/taskmanager-lhL2Rm88.png"
              onLoad={handleImageLoad}
              alt="Task Manager Preview"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
