import { ICustomModalProps } from '@src/@types/components/modal';
import { AlignItemType, AlignSelfType, JustifyContentType } from '@src/@types/enum';
import colors from '@src/constants/colors';
import React, { FC } from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';

const CustomModal: FC<ICustomModalProps> = ({
  visible,
  containerStyle = {},
  children,
  overlayStyle,
  pressable,
  onPress,
}) => {
  return (
    <Modal visible={visible} transparent>
      {pressable ? (
        <Pressable
          onPress={onPress}
          testID="modal-view"
          style={{ ...styles.backgroundContainer, ...overlayStyle }}>
          <View style={{ ...styles.modalView, ...containerStyle }}>{children}</View>
        </Pressable>
      ) : (
        <View testID="modal-view" style={{ ...styles.backgroundContainer, ...overlayStyle }}>
          <View style={{ ...styles.modalView, ...containerStyle }}>{children}</View>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: JustifyContentType.Center,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  modalView: {
    width: '92%',
    padding: 20,
    alignSelf: AlignSelfType.Center,
    alignItems: AlignItemType.Center,
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
