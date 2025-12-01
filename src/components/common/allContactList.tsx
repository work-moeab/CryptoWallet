import { AlignItemType, FontWeight, JustifyContentType, TextAlignType } from "@src/@types/enum"
import { UserContact } from "@src/@types/redux"
import icons from "@src/assets/icons"
import colors from "@src/constants/colors"
import fontSize from "@src/constants/fontSize"
import { deviceDimensions, validateImageUri } from "@src/helper/helper"
import { ChevronDown, ChevronRight } from "lucide-react-native"
import React, { useState } from "react"
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const AllContacts = ({
    recentList,
    onPress,
}: {
    recentList: UserContact[] | null
    onPress: (item: UserContact) => void
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(true)

    return (
        <View>
            {recentList && recentList.length > 0 ? (
                <>
                    <TouchableOpacity
                        style={styles.collapsibleHeader}
                        onPress={() => setCollapsed(!collapsed)}
                        activeOpacity={0.7}>
                        <Text maxFontSizeMultiplier={1.4} style={styles.header}>
                            Contact List
                        </Text>
                        {collapsed ? (
                            <ChevronDown size={20} color={colors.BLACK} />
                        ) : (
                            <ChevronRight size={20} color={colors.BLACK} />
                        )}
                    </TouchableOpacity>

                    {collapsed ? (
                        <FlatList
                            data={recentList}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => {
                                if (!item.phoneNumber) return null;
                                return (
                                    <TouchableOpacity
                                        style={styles.contactRow}
                                        onPress={() => onPress(item)}
                                        activeOpacity={0.7}>
                                        <View style={styles.imgDiv} testID="click">
                                            <Image
                                                source={
                                                    validateImageUri(item.image || '')
                                                        ? { uri: item.image }
                                                        : icons.DUMMY_PICTURE
                                                }
                                                style={styles.img}
                                            />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text
                                                maxFontSizeMultiplier={1.4}
                                                style={styles.allContactsTitle}
                                                ellipsizeMode="tail"
                                                numberOfLines={1}>
                                                {item.firstName}
                                            </Text>
                                            {item.lastName && (
                                                <Text
                                                    maxFontSizeMultiplier={1.4}
                                                    style={styles.allContactsTitle}
                                                    ellipsizeMode="tail"
                                                    numberOfLines={1}>
                                                    {item.lastName}
                                                </Text>
                                            )}
                                        </View>
                                        <Text
                                            maxFontSizeMultiplier={1.4}
                                            style={styles.allContactsTitle}
                                            ellipsizeMode="tail"
                                            numberOfLines={1}>
                                            {item.phoneNumber}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }}
                            style={[
                                styles.flatList,
                                {
                                    marginBottom: 10,
                                    height:
                                        Platform.OS === 'ios'
                                            ? deviceDimensions.height > 667
                                                ? 350
                                                : 200
                                            : 260,
                                },
                            ]}
                            showsHorizontalScrollIndicator={false}
                        />
                    ) : (
                        <View />
                    )}
                </>
            ) : (
                <Text maxFontSizeMultiplier={1.4} style={styles.noResults}>
                    No Results
                </Text>
            )}
        </View>
    )
}
export default AllContacts



const styles = StyleSheet.create({
    collapsibleHeader: {
        flexDirection: 'row',
        alignItems: AlignItemType.Center,
        justifyContent: JustifyContentType.SpaceBetween,
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: AlignItemType.Center,
        gap: 5,
        marginBottom: 6,
    },
    nameContainer: {
        width: '30%',
    },

    flatList: {
        marginTop: 10,
    },
    allContactsTitle: {
        color: colors.GREY,
        textAlign: TextAlignType.Left,
    },
    header: {
        fontSize: fontSize.TEXT_BASE,
        fontWeight: FontWeight.W500,
        color: colors.BLACK,
    },
    imgDiv: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginRight: 10,
    },
    img: {
        width: '100%',
        height: '100%',
    },
    noResults: {
        textAlign: TextAlignType.Center,
        color: colors.BLACK,
        padding: 30,
        fontSize: fontSize.TEXT_BASE,
    },
})
