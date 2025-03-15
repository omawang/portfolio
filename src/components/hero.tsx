import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center md:flex-row-reverse md:justify-between gap-8 md:gap-16">
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
          building scalable and efficient solutions. Let&apos;s connect and
          build something amazing!
        </p>

        <div className="flex flex-row gap-2">
          <Link href="https://github.com/omawang" passHref target="_blank">
            <Button variant="outline">Github</Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/kurniawan100/"
            passHref
            target="_blank"
          >
            <Button variant="outline">Linkedin</Button>
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/kurniawan-cv.pdf`}
            passHref
            target="_blank"
          >
            <Button variant="outline">CV</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
