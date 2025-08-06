"use client";

import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/app/(auth)/login/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full -z-10">
        <div className="relative w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            src="/auth-bg.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        </div>
      </div>

      <div className="w-dvw h-screen relative">
        <div className="w-full h-full flex items-center justify-end">
          <div className="w-full md:w-2/5 min-w-none md:min-w-[622px] h-dvh p-2 md:p-4 transition">
            <div className="flex flex-col w-full items-center justify-center h-full transition bg-white border shadow-custom p-4 rounded-3xl md:p-12">
              <div className="w-full h-full relative flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="login"
                    className="w-full absolute h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LoginForm />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        Esqueceu sua senha?{" "}
                        <Link href="/forgot-password">Clique aqui</Link>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
