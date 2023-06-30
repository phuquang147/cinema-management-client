import Image from "next/image";
import Link from "next/link";
import IActor from "~/interfaces/actor.interface";

interface ActorProps {
  actor: IActor;
}

const Actor: React.FC<ActorProps> = ({ actor }) => {
  return (
    <div className="w-full rounded overflow-hidden flex flex-col">
      <Link href={`/dien-vien/${actor.slug}`}>
        <div className="group rounded relative w-full aspect-square mb-2 overflow-hidden">
          <Image
            src={actor.avatar}
            alt=""
            fill
            objectFit="cover"
            className="rounded group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-col items-start text-gray-text dark:text-light-text">
        <Link
          href=""
          className="text-lg font-medium line-clamp-2 hover:text-primary"
        >
          {actor.name}
        </Link>
        <p className="text-sm text-gray-400">{actor.nation}</p>
      </div>
    </div>
  );
};

export default Actor;
