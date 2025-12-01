import { Image, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '@src/constants/colors'
import icons from '@src/assets/icons'
import { JustifyContentType } from '@src/@types/enum'
import fontSize from '@src/constants/fontSize'

const SearchFilter = ({
    onChangeText,
    value,
    onPress,
}: {
    onChangeText: (text: string) => void
    value: string
    onPress: () => void
}) => {
    return (
        <View style={styles.textInputContainer}>
            <TextInput
                testID="mobile"
                style={styles.textInputStyle}
                onChangeText={onChangeText}
                maxFontSizeMultiplier={1.4}
                value={value}
                placeholderTextColor={
                    Platform.OS === 'ios' ? colors.DROP_DOWN_PICKER_TEXT : colors.DROP_DOWN_PICKER_TEXT
                }
                underlineColorAndroid="transparent"
                placeholder="Enter Mobile Number"
                keyboardType="phone-pad"
            />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={{ justifyContent: JustifyContentType.Center }}>
                <Image source={icons.SEARCH} style={styles.image} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchFilter

const styles = StyleSheet.create({
    textInputContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: JustifyContentType.SpaceBetween,
        borderBottomWidth: 0.4,
        borderBottomColor: colors.BLACK,
    },
    textInputStyle: {
        fontSize: fontSize.TEXT_BASE,
        width: '90%',
        color: colors.BLACK,
    },
    image: { width: 27, height: 27 },

})