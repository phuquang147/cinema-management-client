type DividerProps = {
  height?: number;
};

const Divider: React.FC<DividerProps> = ({ height = 2 }) => {
  return (
    <div
      className={`w-full h-[${height}px] bg-gradient-to-r from-[#ff55a5] to-[#ff5860] shadow-red`}
    ></div>
  );
};

export default Divider;
