import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  StatusBar
} from 'react-native';

import { ViewPropTypes, withTheme } from '../config';
import { ScreenHeight, ScreenWidth } from '../helpers';

const OverlayModal = props => {
  const {
    children,
    isVisible,
    containerStyle,
    overlayStyle,
    windowBackgroundColor,
    overlayBackgroundColor,
    onBackdropPress,
    borderRadius,
    width,
    height,
    fullScreen,
    ...rest
  } = props;

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onBackdropPress}
      transparent
      {...rest}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.7)"  barStyle="light-content"/>
      <TouchableWithoutFeedback
        onPress={onBackdropPress}
        testID="RNE__Overlay__backdrop"
      >
        <View
          testID="overlayContainer"
          style={StyleSheet.flatten([
            styles.backdrop,
            { backgroundColor: windowBackgroundColor },
            containerStyle,
          ])}
        />
      </TouchableWithoutFeedback>

      <View style={styles.container} pointerEvents="box-none">
        <View
          style={StyleSheet.flatten([
            styles.overlay,
            {
              borderRadius,
              backgroundColor: overlayBackgroundColor,
              width,
              height,
            },
            fullScreen && styles.fullscreen,
            overlayStyle,
          ])}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

OverlayModal.propTypes = {
  children: PropTypes.element.isRequired,
  isVisible: PropTypes.bool.isRequired,
  containerStyle: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  windowBackgroundColor: PropTypes.string,
  overlayBackgroundColor: PropTypes.string,
  onBackdropPress: PropTypes.func,
  borderRadius: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullScreen: PropTypes.bool,
};

OverlayModal.defaultProps = {
  borderRadius: 3,
  fullScreen: false,
  windowBackgroundColor: 'rgba(0, 0, 0, .4)',
  overlayBackgroundColor: 'white',
  width: ScreenWidth - 80,
  height: ScreenHeight - 180,
  onBackdropPress: () => null,
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    borderRadius: 5,
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
    }),
  },
});

export { OverlayModal };
export default withTheme(OverlayModal, 'OverlayModal');
