"use client";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { animalContext } from "@/components/animalProvider";

export default function App() {
  const { animals } = useContext(animalContext)!;

  const router = useRouter();

  return (
    <div
      className="cardContainer"
      style={{
        display: "grid",
        gap: "10px",
        justifyItems: "center",
      }}
    >
      <style>{`
        .cardContainer {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        @media (max-width: 1350px) {
          .cardContainer {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media (max-width: 950px) {
          .cardContainer {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 630px) {
          .cardContainer {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      {animals.map((animal) => (
        <Card
          key={animal.id}
          isPressable
          className="py-4"
          style={{ width: "300px" }}
          onPress={() => router.push(`/animal/${animal.id}`)}
        >
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
              width={270}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
