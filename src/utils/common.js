export const getShuffledSlicedArray = (array, newSize) => {
  const newArray = [...array];
  const arraySize = newArray.length;
  const resultArrayNewSize = newSize ?? arraySize;
  let index = -1;
  let lastIndex = arraySize - 1;

  while (++index < arraySize) {
    let randomNumber = getRandomInteger(index, lastIndex);
    let value = newArray[randomNumber];

    newArray[randomNumber] = newArray[index];
    newArray[index] = value;
  }

  newArray.length = arraySize;

  return newArray.splice(0, resultArrayNewSize);
};

export const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const getRgbValue = (wallpaperEngineCustomColor) => {
  let rgbValue = wallpaperEngineCustomColor
    .split(' ')
    .map((color) => Math.ceil(color * 255));
  return `rgb(${rgbValue})`;
};
