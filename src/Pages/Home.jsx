import React from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer"

const Home = () => {
  return (
    <div>
      <Header />
      <main className="lg:mb-[120px] mb-14">
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="font-main text-center lg:w-1/2 w-full lg:text-5xl lg:px-0 px-2 text-3xl font-bold text-[#d4d5d6]">
            Melhoria na Produtividade e Gestão de Tarefas
          </h1>
          <p className="font-titles text-center font-light lg:text-xl text-base lg:px-0 px-2 text-[#a9abad] ">
            Aproveite uma Gestão de Tarefas Sem Complicação com o Task Manager:
            Simplicidade e Eficiência!
          </p>

          <button class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
            <span class="text-lg">Começar agora</span>
            <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div class="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>

          <div className="px-2">
          <img className="overflow-x-visible rounded-sm border border-[#a9abad] shadow-2xl" src="https://portfolio-joao-pedro.vercel.app/assets/taskmanager-lhL2Rm88.png"/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
