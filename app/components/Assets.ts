import { ImageSourcePropType } from 'react-native';

const Assets: Record<string, ImageSourcePropType> = {
  reactLogo: require("../../assets/images/react-logo.png"),
  favicon: require("../../assets/images/favicon.png"),
  icon: require("../../assets/images/icon.png"),
  splashIcon: require("../../assets/images/splash-icon.png"),
  adaptiveIcon: require("../../assets/images/adaptive-icon.png"),
  profile: require("../../assets/images/profile_pic.jpg"),
  
  // Book Images
  artofWarBook: require("../../assets/images/the_art_of_war.jpg"),
  powerofHabitBook: require("../../assets/images/power_of_habit.jpg"),
  harryPotterBook: require("../../assets/images/harry_potter.jpeg"),
  letThemBook: require("../../assets/images/let_them_book.jpg"),
  makingThingHappenBook: require("../../assets/images/making_thing_happen.jpg"),
  oneThingBook: require("../../assets/images/one_thing.jpg"),
  powerBook:require("../../assets/images/power.jpg"),
  theoryOfEverythingBook: require("../../assets/images/theory_of_everything.jpeg"),
  bookBanner: require("../../assets/images/book_banner.png"),

  // Author Images
  authorRobert: require("../../assets/images/author_1.jpg"),
  aurhorJk: require("../../assets/images/author_3.jpeg"),

  //Audio Assets
  audioBook1: require("../../assets/audios/art_of_war_03-04_sun_tzu_64kb.mp3"),
};

export default Assets;
