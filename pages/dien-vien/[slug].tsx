import FsLightbox from "fslightbox-react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ParticipatedInMovies from "~/components/ActorDetail/ParticipatedInMovies";
import Tabs from "~/components/Tabs";
import Divider from "~/components/UI/Divider";
import IActor from "~/interfaces/actor.interface";
import ActorServices from "~/services/actorServices";
import { ISOToDateFormat } from "~/utils/formatDateTime";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await ActorServices.getActorBySlug(
    context.query.slug as string
  );

  return {
    props: data,
  };
};

const tabs = ["Tiểu sử", "Bộ ảnh", "Các phim đã tham gia"];

const Actor: NextPage = ({
  actor,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [toggler, setToggler] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  };
  console.log(actor);

  return (
    <>
      <Head>
        <title>{(actor as IActor).name}</title>
      </Head>
      <div className="bg-white dark:bg-dark-bg-primary">
        <div className="relative w-full">
          <div className="container mx-auto py-20 flex flex-col lg:flex-row gap-10">
            <div className="relative w-full md:w-[300px] aspect-[3/4] mx-auto z-20 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={(actor as IActor).avatar}
                alt=""
                sizes=""
                fill
                objectFit="cover"
                className="z-20"
              />
            </div>
            <div className="flex-1 z-20">
              <h1 className="text-gray-text dark:text-white text-5xl font-bold leading-[60px] break-words">
                {(actor as IActor).name}
              </h1>
              <p className="mt-4">
                <span className="font-bold text-gray-text dark:text-white">
                  Ngày sinh:
                </span>
                <span className="ml-2 text-gray-text dark:text-white">
                  {ISOToDateFormat((actor as IActor).birthday)}
                </span>
              </p>
              <p className="mt-2">
                <span className="font-bold text-gray-text dark:text-white">
                  Quốc tịch:
                </span>
                <span className="ml-2 text-gray-text dark:text-white">
                  {(actor as IActor).nation}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="container mx-auto">
          <Tabs
            tabs={tabs}
            activeIndex={activeTab}
            setActiveTab={handleChangeTab}
          />
          <div className="mt-8">
            {activeTab === 0 ? (
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: (actor as IActor).story,
                }}
              ></div>
            ) : null}

            {activeTab === 1 && (
              <div>
                <div>
                  <div className="w-full columns-4">
                    {(actor as IActor).images.map((image, index) => (
                      <div
                        key={image}
                        className="relative w-full aspect-[3/4]"
                        onClick={() => {
                          setSlideIndex(index + 1);
                          setToggler(true);
                        }}
                      >
                        <Image src={image} alt="" fill objectFit="cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <FsLightbox
                  toggler={toggler}
                  sources={(actor as IActor).images}
                  slide={slideIndex}
                  onClose={() => {
                    setToggler(false);
                  }}
                />
              </div>
            )}

            {activeTab === 2 && (
              <ParticipatedInMovies movies={(actor as IActor).movies} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Actor;
