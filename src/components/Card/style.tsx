import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.CARD_BACKGROUND,
    borderRadius: 20,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 5,
    shadowColor: colors.BLACK,
    elevation: 10,
  },
})

export default styles
