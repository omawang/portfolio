import { Hero } from "@/components/hero";
import { experiences } from "@/constants/experiences";
import { BuildingIcon } from "lucide-react";

const HomePage = () => {
  return (
    <main className="mt-8 md:mt-16 w-full flex flex-col gap-16 fadeInUp">
      <Hero />

      <section>
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
};

export default HomePage;
