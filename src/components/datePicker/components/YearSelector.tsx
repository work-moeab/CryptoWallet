import React, { useCallback } from 'react'
import { Text, View, Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useCalendarContext } from '../CalendarContext'
import { getDateYear, getYearRange } from '../utils'
import { AlignItemType, FontWeight, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'

const YearSelector = () => {
  const { currentDate, currentYear, onSelectYear, theme } = useCalendarContext()
  const selectedYear = getDateYear(currentDate)
  const generateCells = useCallback(() => {
    const years = getYearRange(currentYear)
    const activeYear = getDateYear(currentDate)
    const column = years.map((year) => {
      const activeItemStyle: ViewStyle =
        year === selectedYear
          ? {
            borderColor: theme?.selectedItemColor ?? '#0047FF',
            backgroundColor: theme?.selectedItemColor ?? '#0047FF',
          }
          : year === activeYear
            ? {
              borderColor: theme?.selectedItemColor ?? '#0047FF',
            }
            : {}

      const textStyle: TextStyle =
        year === selectedYear
          ? { color: colors.WHITE, ...theme?.selectedTextStyle }
          : year === activeYear
            ? {
              color: theme?.selectedItemColor ?? '#0047FF',
              fontWeight: FontWeight.Bold,
            }
            : { ...theme?.calendarTextStyle }

      return (
        <Pressable
          key={year}
          onPress={() => onSelectYear(year)}
          style={styles.yearCell}
          accessibilityRole="button"
          accessibilityLabel={year.toString()}>
          <View style={[styles.year, theme?.yearContainerStyle, activeItemStyle]}>
            <Text maxFontSizeMultiplier={1.4} key={year} style={textStyle}>
              {year}
            </Text>
          </View>
        </Pressable>
      )
    })
    return column
  }, [onSelectYear, selectedYear, currentYear, currentDate, theme])

  return (
    <View style={styles.container} testID="year-selector">
      <View style={styles.years}>{generateCells()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
    margin: 5,
    width: '100%',
  },
  yearCell: {
    width: '33.3%',
  },
  years: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  year: {
    paddingVertical: 15,
    margin: 2,
    alignItems: AlignItemType.Center,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: colors.WHITE,
  },
})

export default YearSelector
