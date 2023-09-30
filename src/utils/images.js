import { compareByString } from './sort';

export const isImagesSame = (imagesA, imagesB) => {
  if (imagesA.length !== imagesB.length) {
    return false;
  }

  const stringifiedImagesA = imagesA
    .map((image) => JSON.stringify(image))
    .sort(compareByString);
  const stringifiedImagesB = imagesB
    .map((image) => JSON.stringify(image))
    .sort(compareByString);

  return stringifiedImagesA.every((image, i) => {
    return image === stringifiedImagesB[i];
  });
};

export async function loadImage(url, imageNode) {
  return new Promise((resolve, reject) => {
    imageNode.onload = () => resolve(imageNode);
    imageNode.onerror = reject;
    imageNode.src = url;
  });
}
