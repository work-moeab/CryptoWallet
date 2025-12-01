import { JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: { flexDirection: 'row', marginVertical: 5 },
    imgDiv: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        flexDirection: 'row',
        marginVertical: 5,
    },
    title: {
        color: colors.GREY,
        marginTop: 3,
    },
    img: {
        width: '100%',
        height: '100%',
    },
    content: { justifyContent: JustifyContentType.Center, marginHorizontal: 20 },
})
