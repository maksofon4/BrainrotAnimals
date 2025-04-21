import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Input } from "@heroui/react";
import { useState } from "react";

interface animalProps {
  id: number;
  name: string;
  image: string;
  likes: number;
}
export default function ModalWin({
  animals,
  animal,
  onChanges,
}: {
  animals: animalProps[];
  animal: animalProps;
  onChanges: (updatedAnimals: animalProps[]) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [memeName, setMemeName] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isNameInvalid, setNameInvalid] = useState<boolean>(false);
  const [isImgUrlInvalid, setImgUrlInvalid] = useState<boolean>(false);

  const updateAnimal = (animal: animalProps) => {
    const updatedAnimals = animals.map((a) =>
      a.id === animal.id
        ? {
            ...a,
            name: memeName ?? a.name,
            image: image ?? a.image,
            likes: a.likes,
          }
        : a,
    );

    onChanges(updatedAnimals);
    localStorage.setItem("brainAnimals", JSON.stringify(updatedAnimals));
  };

  function confirmChanges(animal: animalProps) {
    if (image === null && memeName === null) return;

    const isImageValid = image !== null ? isValidImageUrl(image) : true;
    const isNameValidValue =
      memeName !== null ? isValidAnimalName(memeName) : true;

    if (!isImageValid) {
      setImgUrlInvalid(true);
    }
    if (!isNameValidValue) {
      setNameInvalid(true);
    }
    if (isImageValid && isNameValidValue) {
      updateAnimal(animal);
      setImage(null);
      setMemeName(null);

      return true;
    }
  }

  function isValidImageUrl(url: string) {
    const pattern = /^https?:\/\/.+\.(jpg|jpeg)$/i;

    return pattern.test(url);
  }

  function isValidAnimalName(name: string): boolean {
    const trimmed = name.trim();

    return trimmed.length >= 3 && trimmed.length <= 100;
  }

  return (
    <>
      <Button onPress={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit: {animal.name}
              </ModalHeader>
              <ModalBody>
                <Input
                  errorMessage="Please enter a valid name"
                  isInvalid={isNameInvalid}
                  label="name"
                  value={memeName !== null ? memeName : animal.name}
                  onChange={(e) => {
                    setMemeName(e.target.value);
                    setNameInvalid(false);
                  }}
                />
                <Input
                  defaultValue="junior2heroui.com"
                  errorMessage="Please enter a valid URL"
                  isInvalid={isImgUrlInvalid}
                  label="image"
                  value={image !== null ? image : animal.image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setImgUrlInvalid(false);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setMemeName(null);
                    setImage(null);
                    setNameInvalid(false);
                    setImgUrlInvalid(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (confirmChanges(animal) === true) onClose();
                  }}
                >
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
