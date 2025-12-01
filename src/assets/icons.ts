import DUMMY_PICTURE from '@src/assets/dummy-pic.jpg';
import QR_CODE from "@src/assets/qrcode.png"
import NO_IMAGE_FOUND from '@src/assets/noImageFound.jpg'

const icons = {
  DUMMY_PICTURE,
  QR_CODE,
  NO_IMAGE_FOUND,
};

export default icons;
export type IconType = keyof typeof icons;
