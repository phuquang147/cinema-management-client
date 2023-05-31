import { IconMoon, IconSun } from "@tabler/icons";
import { ChangeEvent, FC, useState } from "react";

const ToggleDarkMode: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleChangeMode = (e: ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="flex min-w-fit gap-4">
      <div className="col-span-12 sm:col-span-8 md:col-span-9 flex items-center justify-start w-full mt-2 mb-0 sm:mb-2">
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="toggle"
              className="hidden"
              onChange={handleChangeMode}
            />
            <div
              className={`flex w-14 h-8 p-1 rounded-full bg-gray-200 dark:bg-gray-700`}
            >
              <IconSun className="text-gray-500" />
              <IconMoon className="text-gray-100" />
            </div>
            <div
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                darkMode && "transform translate-x-full"
              }`}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default ToggleDarkMode;
