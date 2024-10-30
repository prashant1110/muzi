import { LoginForm } from "@/components/login-form";
import { Headphones, Radio, Users } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="grid h-screen w-full md:grid-cols-2">
      <section className="order-2 md:order-1 flex h-full w-full items-center justify-center bg-black p-6 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tighter text-white sm:text-3xl">
            Key Featuress
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <Users className="h-12 w-12 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Fan Interaction</h3>
              <p className="text-gray-400">Let fans choose the music.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <Radio className="h-12 w-12 text-green-400" />
              <h3 className="text-xl font-bold text-white">Live Streaming</h3>
              <p className="text-gray-400">Stream with real-time input.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <Headphones className="h-12 w-12 text-blue-400" />
              <h3 className="text-xl font-bold text-white">
                High-Quality Audio
              </h3>
              <p className="text-gray-400">Crystal clear sound quality.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="order-1 md:order-2 flex flex-col h-full w-full items-center  p-6">
        <section className="w-full py-12 md:py-24 lg:py-40">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter text-black sm:text-4xl">
                  Ready to Transform Your Streams?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join MusicStreamChoice today and create unforgettable
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
