import SectionHeading from "../UI/SectionHeading";

type MovieContentProps = {
  content: string;
};

const MovieContent: React.FC<MovieContentProps> = ({ content }) => {
  return (
    <div>
      <SectionHeading text="Nội dung" />
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    </div>
  );
};
export default MovieContent;
