import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import { useCalendarContext } from '../CalendarContext'
import { CalendarViews } from '../enums'
import { formatTimeWithAmPm } from '../utils'
import { AlignItemType, FontWeight, JustifyContentType } from '@src/@types/enum'

const Footer = () => {
  const { selectedDate, selectedDateTo, calendarView, setCalendarView, mode, theme } =
    useCalendarContext()

  const { formattedTime, period } = formatTimeWithAmPm(
    selectedDateTo ? selectedDateTo : selectedDate,
  )
  return (
    <View style={[styles.footerContainer, theme?.footerContainerStyle]} accessibilityRole="header">
      <Text maxFontSizeMultiplier={1.4} style={[styles.text, theme?.footerTextStyle]}>
        Ends
      </Text>
      <View style={styles.timeContainer}>
        {mode === 'datetime' && calendarView !== CalendarViews.year ? (
          <Pressable
            onPress={() =>
              setCalendarView(
                calendarView === CalendarViews.time ? CalendarViews.day : CalendarViews.time,
              )
            }
            accessibilityRole="button"
            accessibilityLabel={formattedTime}>
            <View style={[styles.textContainer, theme?.footerTextContainerStyle]}>
              <Text maxFontSizeMultiplier={1.4} style={[styles.text, theme?.footerTextStyle]}>
                {formattedTime}
              </Text>
            </View>
          </Pressable>
        ) : null}
        {mode === 'datetime' && calendarView !== CalendarViews.year ? (
          <Pressable
            onPress={() =>
              setCalendarView(
                calendarView === CalendarViews.time ? CalendarViews.day : CalendarViews.time,
              )
            }
            accessibilityRole="button"
            accessibilityLabel={formattedTime}>
            <View style={[styles.periodTextContainer, theme?.footerTextContainerStyle]}>
              <View
                style={
                  period === 'AM'
                    ? styles.periodActiveCardContainer
                    : styles.periodInactiveCardContainer
                }>
                <Text maxFontSizeMultiplier={1.4} style={[styles.text, theme?.footerTextStyle]}>
                  AM
                </Text>
              </View>
              <View
                style={
                  period === 'AM'
                    ? styles.periodInactiveCardContainer
                    : styles.periodActiveCardContainer
                }>
                <Text maxFontSizeMultiplier={1.4} style={[styles.text, theme?.footerTextStyle]}>
                  PM
                </Text>
              </View>
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    width: 180,
  },
  footerContainer: {
    width: '100%',
    marginTop: 10,
    height: 55,
    borderTopWidth: 1,
    borderColor: 'rgba(84, 84, 88, 0.65)',
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    alignItems: AlignItemType.Center,
    paddingHorizontal: 12,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: AlignItemType.Center,
  },
  textContainer: {
    backgroundColor: 'rgba(118, 118, 128, 0.24)',
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 5,
    borderRadius: 10,
    height: 40,
    width: 80,
  },
  text: {
    fontWeight: FontWeight.Bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  periodTextContainer: {
    backgroundColor: 'rgba(118, 118, 128, 0.24)',
    justifyContent: JustifyContentType.SpaceBetween,
    alignItems: AlignItemType.Center,
    marginHorizontal: 0,
    borderRadius: 10,
    height: 40,
    width: 90,
    flexDirection: 'row',
  },
  periodActiveCardContainer: {
    backgroundColor: 'rgba(99, 99, 102, 1)',
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 5,
    borderRadius: 10,
    height: 39,
    width: 44,
  },
  periodInactiveCardContainer: {
    backgroundColor: 'transparent',

    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 5,
    borderRadius: 10,
    height: 39,
    width: 44,
  },
  iconContainer: {
    padding: 4,
  },
  prev: {
    marginRight: 3,
  },
  next: {
    marginLeft: 3,
  },
  row: {
    flexDirection: 'row',
  },
})

export default Footer
