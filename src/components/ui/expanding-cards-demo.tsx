"use client";

import React from "react";
import {
  Pyramid,
  Castle,
  Mountain,
  TowerControl,
  Building,
  Landmark,
} from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";

const architecturalWonders: CardItem[] = [
  {
    id: "pyramids-giza",
    title: "Pyramids of Giza",
    description:
      "The last surviving of the Seven Wonders of the Ancient World, these monumental tombs have stood for over 4,500 years.",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/43/43aee3efb8fc05a0f3dc8e950f004a1593daa1709d0500df6b9c0982f3975523.jpg",
    icon: <Pyramid size={24} />,
    linkHref: "#",
  },
  {
    id: "great-wall",
    title: "Great Wall of China",
    description:
      "A vast series of fortifications stretching thousands of miles, built to protect Chinese states and empires against raids.",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/f7/f7a046f3c47ae1143626bdd961b3b505ae768bef603550691bf709f80d764928.jpg",
    icon: <Castle size={24} />,
    linkHref: "#",
  },
  {
    id: "machu-picchu",
    title: "Machu Picchu",
    description:
      "An Incan citadel set high in the Andes Mountains in Peru, renowned for its sophisticated dry-stone walls that fuse huge blocks.",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/d7/d753d83062bef773891653eb331c86e624783f6d6b44ac7ba7fe76f26eef5bda.jpg",
    icon: <Mountain size={24} />,
    linkHref: "#",
  },
  {
    id: "eiffel-tower",
    title: "Eiffel Tower",
    description:
      "A global cultural icon of France and one of the most recognizable structures in the world, offering panoramic views of Paris.",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/8f/8ff1a280c1481c879afeffd638117d60e18d47a17b8d8a393e7bf99f433a6df7.jpg",
    icon: <TowerControl size={24} />,
    linkHref: "#",
  },
  {
    id: "burj-khalifa",
    title: "Burj Khalifa",
    description:
      "The world's tallest building, a modern architectural marvel in Dubai that pierces the sky at over 828 meters.",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/88/886f469ca6d66dfb17f6b9b22f5de7fa483aeaf975f5c45f5aa0a5e8f337684e.jpg",
    icon: <Building size={24} />,
    linkHref: "#",
  },
  {
    id: "taj-mahal",
    title: "Taj Mahal",
    description:
      "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan.",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/cd/cdaa6cd7d67e8ea669cb9a51a0e13c8f3ac9c3b68504a640f96b58ec61f93a28.jpg",
    icon: <Landmark size={24} />,
    linkHref: "#",
  },
  {
    id: "colosseum",
    title: "The Colosseum",
    description:
      "The largest ancient amphitheater ever built, it remains the largest standing amphitheater in the world today.",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/99/99e3553863f73895b57c7549c060ca3a0b3cdd9d14687765e67f5cc7caf16395.jpg",
    icon: <Landmark size={24} />,
    linkHref: "#",
  },
];

export default function ExpandingCardsDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8 bg-background p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Architectural Wonders
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore humanity&apos;s most ambitious and breathtaking creations. Hover or
          click on a card to unveil its story.
        </p>
      </div>
      <ExpandingCards items={architecturalWonders} defaultActiveIndex={0} />
    </div>
  );
}
