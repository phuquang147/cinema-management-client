type TabsProps = {
  activeIndex: number;
  tabs: string[];
  setActiveTab: (value: number) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, activeIndex, setActiveTab }) => {
  return (
    <div className="flex gap-x-6">
      {tabs.map((tab, index) => (
        <div key={tab}>
          <button
            className={`font-bold capitalize py-2 outline-none ${
              index === activeIndex
                ? "text-gray-text dark:text-white"
                : "text-gray-text dark:text-light-text "
            }`}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tabs[index]}
          </button>
          <div
            className={`w-full h-[2px] transition-colors duration-200 ${
              index === activeIndex
                ? "bg-gradient-to-r from-light-pink to-light-red"
                : "bg-transparent"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
