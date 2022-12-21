import { faker } from "@faker-js/faker";

// @ts-ignore
export const fetchRandomAvatar = () => {
  return faker.image.avatar();
};

export const fetchRandomImage = () => {
  return faker.image.cats();
};
