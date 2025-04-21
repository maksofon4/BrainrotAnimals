"use client";
import { createContext, ReactNode, useState, useEffect } from "react";

interface animalProps {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export const animalContext = createContext<{
  animals: animalProps[];
  setAnimals: (animalData: animalProps[]) => void;
} | null>(null);

export default function AnimalProvider({ children }: { children: ReactNode }) {
  const [animals, setAnimals] = useState<animalProps[]>([]);

  function likesRandom() {
    return Math.floor(Math.random() * 100);
  }

  const brainRootAnimals = [
    {
      id: 1,
      name: "Lirilì Larilà",
      image: "https://i.imgur.com/Qa0sgrZ.jpeg",
    },
    {
      id: 2,
      name: "Tralalero Tralala",
      image: "https://i.imgur.com/MrIzIpr.jpeg",
    },
    {
      id: 3,
      name: "Tung Tung Tung Tung Tung Tung Sahur",
      image: "https://i.imgur.com/9Mv4o9C.jpeg",
    },
    {
      id: 4,
      name: "Brr Brr Patapim",
      image: "https://i.imgur.com/WWrU69J.jpeg",
    },
    {
      id: 5,
      name: "Boneca Ambalabu",
      image: "https://i.imgur.com/dpB8Pcy.jpeg",
    },
    {
      id: 6,
      name: "Glorbo Fruttodrillo",
      image: "https://i.imgur.com/wq9IvGU.jpeg",
    },
    {
      id: 7,
      name: "Bombardiro Crocodilo",
      image: "https://i.imgur.com/SfZTKhC.jpeg",
    },
    {
      id: 8,
      name: "Špijuniro Golubiro",
      image: "https://i.imgur.com/nukAkKJ.jpeg",
    },
    {
      id: 9,
      name: "Figa Carmello Buffo Fardello",
      image: "https://i.imgur.com/63RJqdL.jpeg",
    },
    {
      id: 10,
      name: "Chimpanzini Bananini",
      image: "https://i.imgur.com/qf73FGN.jpeg",
    },
  ];

  const AnimalsWithLikes = brainRootAnimals.map((animal) => ({
    ...animal,
    likes: likesRandom(),
  }));

  useEffect(() => {
    const animalsLocalStorage = localStorage.getItem("brainAnimals");

    if (animalsLocalStorage) {
      setAnimals(JSON.parse(animalsLocalStorage));
    } else {
      setAnimals(AnimalsWithLikes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("brainAnimals", JSON.stringify(animals));
  }, [animals]);

  return (
    <animalContext.Provider value={{ animals, setAnimals }}>
      {children}
    </animalContext.Provider>
  );
}
