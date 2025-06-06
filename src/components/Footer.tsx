import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";
import { Logo } from "@/components/Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";
import { asImageSrc } from "@prismicio/client";

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const boardTextureURLs = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));

  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          width={1200}
        />
        <FooterPhysics
          boardTextureURLs={boardTextureURLs}
          className="absolute inset-0 overflow-hidden"
        />

        <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28" />
      </div>
      {/* list of links */}
      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
          {Array.isArray(settings.data.navigation) &&
          settings.data.navigation.length > 0 ? (
            settings.data.navigation.map((item) => (
              <li key={item.link.text} className="hover:underline">
                <PrismicNextLink field={item.link} />
              </li>
            ))
          ) : (
            <></> // fallback: renders nothing but satisfies ReactNode
          )}
        </ul>
      </Bounded>
    </footer>
  );
}
