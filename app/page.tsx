"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useContext } from "react";

import { animalContext } from "@/components/animalProvider";
import ModalWin from "@/components/modal";

interface animalProps {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export default function Home() {
  const { animals, setAnimals } = useContext(animalContext)!;
  const handleAnimalsChange = (updatedAnimals: animalProps[]) => {
    setAnimals(updatedAnimals);
  };

  return (
    <Table>
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>LIKES</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {animals.map((animal) => (
          <TableRow key={animal.id}>
            <TableCell>{animal.id}</TableCell>
            <TableCell>{animal.name}</TableCell>
            <TableCell>{animal.likes}</TableCell>
            <TableCell>
              <ModalWin
                animal={animal}
                animals={animals}
                onChanges={handleAnimalsChange}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
