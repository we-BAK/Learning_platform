import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 border-t border-blue-200 shadow-inner text-gray-700 py-12 px-6 sm:px-8 lg:px-12 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* About Section */}
        <div className="col-span-1">
          <h3 className="text-2xl font-semibold mb-4">About PTCP</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text mb-4 animate-pulse drop-shadow-lg">
            Bright Bridge
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Connecting parents and therapists to enhance autism care at Bright Autism Center.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-lg">
            {[
              { name: "About Us", link: "/about" },
              { name: "Contact", link: "/contact" },
              { name: "Donate", link: "/donate" },
              { name: "Privacy Policy", link: "/privacy" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out font-medium"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <div className="rounded-lg bg-white/60 p-4 shadow-sm">
            <p className="text-base text-gray-600">Bright Autism Center</p>
            <p className="text-base text-gray-600">Hawassa, Ethiopia</p>
            <p className="text-base text-gray-600">
              Email:{" "}
              <a
                href="mailto:info@brightautism.org"
                className="text-blue-500 hover:underline"
              >
                info@brightautism.org
              </a>
            </p>
            <p className="text-base text-gray-600">
              Phone:{" "}
              <a
                href="tel:+251123456789"
                className="text-blue-500 hover:underline"
              >
                +251 123 456 789
              </a>
            </p>
          </div>
        </div>

        {/* Team Credit & Socials */}
        <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center">
          <div className="rounded-xl bg-white/70 p-6 shadow-md hover:shadow-xl transition-all duration-300 w-full text-center">
            <h3 className="text-2xl font-semibold mb-2">Developed By</h3>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              Infolink University College
              <br /> Computer Science Department Student
              <br /> Team 2025
            </p>
            <div className="flex gap-6 justify-center mt-2">
              {/* Social Icons */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition transform hover:scale-110"
                title="Facebook"
              >
                <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition transform hover:scale-110"
                title="Twitter"
              >
                <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.72 0-4.924 2.206-4.924 4.924 0 .386.044.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.724-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition transform hover:scale-110"
                title="LinkedIn"
              >
                <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.045 0 3.607 2.005 3.607 4.614v5.582z"/>
                </svg>
              </a>
              {/* Telegram */}
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition transform hover:scale-110"
                title="Telegram"
              >
                <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.993 16.2l-.426 4.02c.611 0 .875-.262 1.195-.576l2.87-2.726 5.953 4.34c1.09.6 1.87.285 2.15-.998l3.897-18.26c.348-1.61-.586-2.236-1.64-1.85l-22.36 8.62c-1.53.6-1.51 1.46-.262 1.85l5.72 1.79 13.27-8.36c.62-.4 1.19-.18.72.22l-10.74 9.74z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition transform hover:scale-110"
                title="YouTube"
              >
                <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.5 20.5 12 20.5 12 20.5s7.5 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 rounded-full my-8 opacity-70"></div>

      {/* Bottom Section */}
      <div className="text-center">
        <p className="text-base text-gray-600 animate-fade-in font-medium tracking-wide">
          &copy; {new Date().getFullYear()} PTCP - Bright Autism Center. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
