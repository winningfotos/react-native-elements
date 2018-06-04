import WFIcons from 'react-native-vector-icons/WFIcons';

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
  customIcons[id] = customIcon;
};

export default type => {
  switch (type) {
    case 'wficon':
      return WFIcons;
    default:
      if (customIcons.hasOwnProperty(type)) {
        return customIcons[type];
      }
      return WFIcons;
  }
};
