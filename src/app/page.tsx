import { experiences } from "@/constants/experiences";
import { BuildingIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  // font-[family-name:var(--font-geist-sans)]
  return (
    <main className="mt-8 md:mt-16 w-full flex flex-col gap-16">
      <section className="flex flex-col items-center md:flex-row-reverse md:justify-between gap-8 md:gap-16">
        <Image
          alt="profile"
          src="https://avatars.githubusercontent.com/u/47683174?v=4"
          width={200}
          height={200}
          className="rounded-full"
        />

        <div className="flex flex-1 flex-col md:justify-center gap-4">
          <h2 className="font-bold text-3xl">Hi, I&apos;m Awang</h2>
          <p className="font-light">
            I&apos;m a passionate and fast-learning Full-Stack Developer with
            expertise in Backend, Frontend, and Mobile App development. I love
            building scalable and efficient solutions. Let&apos;s connect and build
            something amazing!
          </p>
        </div>
      </section>

      <section className="">
        <h2 className="font-bold text-3xl">Working Experiences</h2>
        <div className="mt-8 flex flex-col gap-8">
          {experiences.map((exp) => (
            <div key={exp.company} className="flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <div>
                  <BuildingIcon width={40} height={40} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold">{exp.company}</h3>
                  <p className="font-light text-sm">{exp.periods}</p>
                  {exp.country ? (
                    <p className="font-light text-sm">{exp.country}</p>
                  ) : null}

                  <div className="flex flex-col mt-2 gap-1">
                    <h3 className="text-sm font-semibold">{exp.role}</h3>
                    <p className="font-light text-sm whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
