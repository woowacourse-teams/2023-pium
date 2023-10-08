import { getResizedImageUrl, isServerStaticData } from 'utils/image';
import sadpiumiPng from 'assets/sadpiumi-imageFail.png';

const failedImageUrls = new Set<string>();

class ImageSourceList {
  private fallbackImages: string[] = [sadpiumiPng];
  /**
   * @param src img src
   * @param imageSize 사용할 크기 (픽셀, px)
   */
  constructor(src: string, imageSize: number) {
    if (!failedImageUrls.has(src)) this.fallbackImages.push(src);

    if (isServerStaticData(src)) {
      const pngUrl = getResizedImageUrl(src, imageSize, 'png');
      const webpUrl = getResizedImageUrl(src, imageSize, 'webp');

      if (!failedImageUrls.has(pngUrl)) this.fallbackImages.push(pngUrl);
      if (!failedImageUrls.has(webpUrl)) this.fallbackImages.push(webpUrl);
    }
  }

  getCurrent() {
    return this.fallbackImages[this.fallbackImages.length - 1];
  }

  getNext() {
    if (this.fallbackImages.length > 1) {
      const failed = this.fallbackImages.pop();
      if (failed) failedImageUrls.add(failed);
    }
    return this.getCurrent();
  }
}

export default ImageSourceList;
