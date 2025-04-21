"use client";
import React, { useContext, use } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";

import { animalContext } from "@/components/animalProvider";

export default function Animal({ params }: { params: { id: string } }) {
  const { animals } = useContext(animalContext)!;
  const { id } = use(params);

  const animalId = parseInt(id, 10); // convert URL param to number
  const animal = animals.find((a) => a.id === animalId); // find animal by id

  if (!animal) return <h1>Animal not found</h1>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Card key={animal.id} className="py-4" style={{ width: "400px" }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <small className="text-default-500">
            <p style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <svg
                style={{ fill: "grey", width: "20px", height: "20px" }}
                viewBox="0 0 32 32"
              >
                <path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z" />
              </svg>{" "}
              {animal.likes}
            </p>
          </small>
          <h4 className="font-bold text-large whitespace-normal break-words">
            {animal.name}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={animal.image}
            width={"100%"}
          />
        </CardBody>
      </Card>
    </div>
  );
}
