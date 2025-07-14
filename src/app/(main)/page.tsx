"use client";
import Image from "next/image";
import Link from "next/link";
// import AdComponent from "@/components/AdComponent";
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-0 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Content Section */}
        <div className="flex-1 flex justify-center lg:justify-start items-center">
          <div className="max-w-xl space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 animate-fadeInUp opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                ✨ Thiết kế đột phá 2025
              </span>
            </div>

            {/* Main Heading */}
            <div className="animate-fadeInUp opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Thiết kế
                </span>
                <br />
                <span className="text-[var(--text-color)]">không giới hạn</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-normal ">
                  Tự do sáng tạo
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl  leading-relaxed max-w-2xl animate-fadeInUp opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
              Dành cho những ai không ngại{" "}
              <span className="font-semibold text-blue-600">phá cách</span>.
              Giao diện đậm chất nghệ thuật, mang đến cảm hứng sáng tạo và sự
              khác biệt hoàn toàn cho dự án của bạn.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInUp opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
              <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link href={"/login"} className="relative z-10">
                  Đăng nhập ngay
                </Link>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </button>

              <button className="group relative bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Xem mẫu thiết kế
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-4 animate-fadeInUp opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[var(--text-color)]">
                  10K+
                </div>
                <div className="text-sm text-[var(--text-color)]">
                  Mẫu thiết kế
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[var(--text-color)]">
                  5K+
                </div>
                <div className="text-sm text-[var(--text-color)]">
                  Khách hàng
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[var(--text-color)]">
                  99%
                </div>
                <div className="text-sm text-[var(--text-color)]">Hài lòng</div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative animate-[slideInRight_0.8s_ease-out_0.6s_both]">
            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 animate-float shadow-lg"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-float [animation-delay:1000ms] shadow-lg"></div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg rotate-45 animate-float [animation-delay:2000ms] shadow-lg"></div>

            {/* Main image container */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="overflow-hidden  ">
                <Image
                  src="/assets/images/HomeLogo.png"
                  alt="Thiết kế sáng tạo không giới hạn"
                  width={500}
                  height={400}
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Ad Component */}
      {/* <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AdComponent type="in-article" />
      </div> */}
    </main>
  );
}
