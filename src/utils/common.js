export const shuffleArray = (array) => {
  const newArray = [...array];
  const arraySize = newArray.length;
  let index = -1;
  let lastIndex = arraySize - 1;

  while (++index < arraySize) {
    let randomNumber = getRandomInteger(index, lastIndex);
    let value = newArray[randomNumber];

    newArray[randomNumber] = newArray[index];
    newArray[index] = value;
  }

  newArray.length = arraySize;

  return newArray;
}

export const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
}
