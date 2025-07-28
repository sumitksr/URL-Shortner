// components/Contact.jsx
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { BiGlobe } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Contact Me</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        I'm open to collaborations, projects, or just a good tech talk.<br />
        <span className="flex items-center justify-center mt-2 gap-2">
          <MdEmail className="text-xl" />
          <a
            href="sumitksr4156@gmail.com"
            className="underline text-blue-400 hover:text-blue-500"
          >
            sumitksr4156@gmail.com
          </a>
        </span>
      </p>

      <div className="flex gap-6 text-3xl text-gray-400">
        <a
          href="https://github.com/sumitksr"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="hover:text-white transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://leetcode.com/sumitksr"
          target="_blank"
          rel="noopener noreferrer"
          title="LeetCode"
          className="hover:text-white transition"
        >
          <SiLeetcode />
        </a>
        <a
          href="https://www.linkedin.com/in/sumitksr"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="hover:text-white transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://sumitksr.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
          className="hover:text-white transition"
        >
          <BiGlobe />
        </a>
        <a
          href="https://www.instagram.com/_sk_3110/"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="hover:text-white transition"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default Contact;
