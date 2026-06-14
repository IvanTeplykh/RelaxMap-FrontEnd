import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/app/profile/Providers";

type Props = {
  params: Promise<{ id: string }>;
};

async function getLocation(id: string) {
  const res = await fetch(`${process.env.API_URL}/locations/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed");

  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;

    const location = await getLocation(id);

    return {
      title: `${location.name} | RelaxMap`,
      description: location.description,
      openGraph: {
        title: location.name,
        description: location.description,
        images: [
          {
            url: location.image,
            alt: location.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Локація | RelaxMap",
    };
  }
}

export default function LocationLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
