//CardImageItemProps
interface ICardImageItemProps {
  firstName?: string;
  lastName?: string;
  username: string;
  referredDate: string;
  image: string | null;
  phoneNumber: string;
}

//CardImage
interface ICardImageProps {
  item: ICardImageItemProps;
  onPress: (item: ICardImageItemProps) => void;
}
