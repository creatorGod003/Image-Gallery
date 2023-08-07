import { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState("system");
  const options = [
    {
      icon: "sunny",
      theme: "light",
    },
    {
      icon: "moon",
      theme: "dark",
    },
    {
      icon: "desktop",
      theme: "system",
    },
  ];

  useEffect(() => {
    const element = document.documentElement;

    if ("image-gallery-theme" in localStorage) {
      const savedTheme = localStorage.getItem("image-gallery-theme");
      if (savedTheme === "light") {
        element.classList.remove("dark");
        setTheme('light');
      } else if(savedTheme === 'dark') {
        element.classList.add("dark");
        setTheme('dark')
      }
    } else {
      applySystemDefault();
    }
  }, []);

  function applySystemDefault() {
    localStorage.removeItem("image-gallery-theme");

    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkQuery.matches) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }

    darkQuery.addEventListener("change", (e) => {
      console.log('change mode')
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    });
  }

  function applySelectedTheme(theme) {
    
    const element = document.documentElement;

    switch (theme) {
      case "light":
        localStorage.setItem("image-gallery-theme", "light");
        element.classList.remove("dark");
        break;
      case "dark":
        localStorage.setItem("image-gallery-theme", "dark");
        element.classList.add("dark");
        break;
      default:
        applySystemDefault();
    }
  }

  return (
    <div className="fixed top-10 right-16 z-20">
      <div className="bg-gray-300 text-black-600 dark:bg-slate-700 dark:text-sky-500 p-2 rounded-md ring-2 dark:ring-purple-600">
        <ul className="flex justify-evenly space-x-8 text-3xl">
          {options.map((opt) => (
            <li key={opt.icon}>
              <button
                className={`${
                  opt.theme === theme && "text-sky-500 dark:text-gray-200"
                } duration-300`}
                onClick={() => {
                  setTheme(opt.theme);
                  applySelectedTheme(opt.theme);
                }}
              >
                <ion-icon name={opt.icon}></ion-icon>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Theme;
