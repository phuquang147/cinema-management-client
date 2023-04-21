type SectionHeadingProps = {
  text: string;
  className?: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ text, className }) => {
  return (
    <div
      className={`text-4xl text-white uppercase font-bold py-4 ${className}`}
    >
      <h1>{text}</h1>
    </div>
  );
};
export default SectionHeading;
