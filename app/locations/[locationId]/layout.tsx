import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{ locationId: string }>;
};

async function getLocation(locationId: string) {
  const res = await fetch(`${process.env.API_URL}/locations/${locationId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed");

  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locationId } = await params;
    const location = await getLocation(locationId);

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

export default function LocationLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
