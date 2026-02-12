import AcmeLogo from "@/src/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import HeroDesktopImage from "@/public/hero-desktop.png";
import HeroMobileImage from "@/public/hero-mobile.png";
import styled from "styled-components";
import Image from "next/image";
import styles from "@/src/app/ui/home.module.css";
import { inter, lusitana } from "@/src/app/ui/fonts";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a
              href="https://nextjs.org/learn/"
              className={`text-blue-500 ${lusitana.className}`}
            >
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href={{ pathname: "/login" }}
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src={HeroDesktopImage}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src={HeroMobileImage}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>

        {/* <div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
          <img
            className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
            src="/img/erin-lindford.jpg"
            alt=""
          />
          <div className="space-y-2 text-center sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg font-semibold text-black">Erin Lindford</p>
              <p className="font-medium text-gray-500">Product Engineer</p>
            </div>
            <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
              Message
            </button>
          </div>
        </div> */}

        {/* <div className="flex-grow">
          <section className="max-w-6xl mx-auto px-4 py-20 lg:py-28">
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src="/x402-logo-dark.png"
                  alt="x402 logo"
                  width={320}
                  height={160}
                  className="mx-auto"
                />
              </div>
              <p className="text-xl text-gray-600 mb-8 font-mono">
                Fullstack demo powered by Next.js
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/api/protected"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-mono transition-colors text-white"
                >
                  Protected page
                </Link>
                <Link
                  href="/api/weather"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-mono transition-colors text-white"
                >
                  Protected API
                </Link>
              </div>
            </div>
          </section>
        </div> */}
      </div>
    </main>
  );
}
