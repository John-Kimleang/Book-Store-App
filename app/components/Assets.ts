import { ImageSourcePropType } from 'react-native';

const Assets: Record<string, ImageSourcePropType> = {
  reactLogo: require("../../assets/images/react-logo.png"),
  favicon: require("../../assets/images/favicon.png"),
  icon: require("../../assets/images/icon.png"),
  splashIcon: require("../../assets/images/splash-icon.png"),
  adaptiveIcon: require("../../assets/images/adaptive-icon.png"),
  
  // Book Images
  artofWarBook: require("../../assets/images/art_of_war.jpeg"),
  powerofHabitBook: require("../../assets/images/power_of_habit.jpg"),
  harryPotterBook: require("../../assets/images/harry_potter.jpeg"),
  bookBanner: require("../../assets/images/book_banner.png"),

  // Author Images
  authorRobert: require("../../assets/images/author_1.jpg"),
  aurhorJk: require("../../assets/images/author_3.jpeg"),

  //Audio Assets
  audioBook1: require("../../assets/audios/art_of_war_03-04_sun_tzu_64kb.mp3"),
};

export default Assets;
