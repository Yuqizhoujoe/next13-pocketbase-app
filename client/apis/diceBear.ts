const diceBearAPI = "https://avatars.dicebear.com/api";

const sprites = [
  "male",
  "female",
  "human",
  "identicon",
  "initials",
  "bottts",
  "avataaars",
  "jdenticon",
  "gridy",
  "micah",
];

const generateRandomIndex = () => {
  // 0 to sprites.length
  return Math.floor(Math.random() * sprites.length);
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100000);
};

export const diceBearAvatar = () => {
  const index = generateRandomIndex();
  const sprite = sprites[index];
  const svgText = generateRandomNumber();
  const imageUrl = `${diceBearAPI}/${sprite}/${svgText}.svg`;
  return imageUrl;
};
