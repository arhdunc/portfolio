"use client"

import { useState, MouseEvent } from "react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import AnimatedGridBackground, { backgroundColors } from "@/components/animated-grid-background"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = backgroundColors.lightTeal
  }

  const handleMouseOut = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = backgroundColors.mediumTeal
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden p-4">
      <AnimatedGridBackground />

      {/* Left Menu - with rounded corners on the right side */}
      <div
        className="fixed left-0 top-0 bottom-0 w-64 backdrop-blur-sm p-6 flex flex-col z-10"
        style={{
          backgroundColor: `${backgroundColors.darkTeal}CC`, // CC = 80% opacity
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-1">Adam Holding</h2>
          <p className="text-sm" style={{ color: backgroundColors.lightTeal }}>
            Data Analyst
          </p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-4">
            {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`w-full text-left py-2 px-4 rounded transition-colors hover:bg-opacity-40 ${
                    activeSection === item.toLowerCase() ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                  style={{
                    backgroundColor:
                      activeSection === item.toLowerCase() ? `${backgroundColors.mediumTeal}80` : "transparent"
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <div className="flex space-x-4 mb-6 justify-center">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: backgroundColors.lightTeal }}
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: backgroundColors.lightTeal }}
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: backgroundColors.lightTeal }}
            >
              <FaTwitter size={20} />
            </a>
          </div>
          <p className="text-xs text-center" style={{ color: backgroundColors.lightTeal }}>
            © 2025 Adam Holding
          </p>
        </div>
      </div>

      {/* Main Content - rounded rectangle with gap to show background */}
      <div
        className="ml-72 flex-1 flex items-center justify-center relative z-10 text-white rounded-2xl p-4 mt-2 mb-2 mr-2"
        style={{
          backgroundColor: `${backgroundColors.darkTeal}CC`, // CC = 80% opacity
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl md:text-7xl font-[200] mb-6">Adam Holding</h1>
          <h2 className="text-xl md:text-2xl mb-8" style={{ color: backgroundColors.lightTeal }}>
            Software Developer
          </h2>

          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Hello There. I am a data Analyst by day and a vibe coder by night. Please take a look at some of my Analytics work, much which cannot be shared due to containing company info. 
          </p>

          <button
            className="font-bold py-3 px-8 rounded-full transition-colors text-lg"
            style={{
              backgroundColor: backgroundColors.mediumTeal,
              color: "white",
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            View My Work
          </button>
        </div>
      </div>
    </main>
  )
}
