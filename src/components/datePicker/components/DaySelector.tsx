import moment from 'moment'
import React, { useMemo, useCallback } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Day, { EmptyDay } from './Day'
import { useCalendarContext } from '../CalendarContext'
import {
  getParsedDate,
  getMonthDays,
  getWeekdaysMin,
  areDatesOnSameDay,
  getDate,
  getFormated,
  swapTime,
} from '../utils'
import { AlignContentType, AlignItemType, JustifyContentType } from '@src/@types/enum'

const DaySelector = () => {
  const {
    currentDate,
    selectedDate,
    selectedDateTo,
    onSelectDate,
    onSelectDateTo,
    displayFullDays,
    minimumDate,
    maximumDate,
    firstDayOfWeek,
    theme,
    onChangeMonth,
  } = useCalendarContext()
  const { year, month, hour, minute } = getParsedDate(new Date())

  const daysGrid = useMemo(() => {
    const today = new Date()
    return getMonthDays(currentDate, displayFullDays, minimumDate, maximumDate, firstDayOfWeek).map(
      (day) => {
        return day
          ? {
              ...day,
              isToday: areDatesOnSameDay(day.date, today),
              isSelected: areDatesOnSameDay(day.date, selectedDate),
              isSelectedTo: areDatesOnSameDay(day.date, selectedDateTo),
            }
          : null
      },
    )
  }, [
    month,
    year,
    displayFullDays,
    minimumDate,
    maximumDate,
    selectedDate,
    selectedDateTo,
    onChangeMonth,
  ])

  const handleSelectDate = useCallback(
    (date: string) => {
      const newDate = getDate(date)
        .hour(hour)
        .minute(minute + getDate(date).utcOffset())
      const currentDateToday = moment().format('YYYY-MM-DD')
      const newDateString = moment(date).format('YYYY-MM-DD')
      const swappedDate = swapTime(newDateString, currentDateToday)

      // Helper function to reset date range
      const resetDateRange = () => {
        onSelectDate(swappedDate)
        onSelectDateTo(null, null)
      }

      // Handle different selection scenarios
      if (selectedDate === null && selectedDateTo === null) {
        onSelectDate(swappedDate)
      } else if (selectedDate != null && selectedDateTo === null) {
        // Setting date range
        if (newDate.isBefore(selectedDate)) {
          onSelectDate(swappedDate)
          onSelectDateTo(selectedDate, swappedDate)
        } else {
          onSelectDateTo(swappedDate, selectedDate)
        }
      } else if (
        (selectedDate != null && selectedDateTo != null && selectedDate !== selectedDateTo) ||
        getFormated(selectedDate) === getFormated(selectedDateTo)
      ) {
        // Reset date range for both cases where:
        // 1. Both dates are selected and different
        // 2. Both dates are the same
        resetDateRange()
      }
    },
    [onSelectDate, onSelectDateTo, hour, minute, selectedDate, selectedDateTo],
  )

  return (
    <View style={styles.container} testID="day-selector">
      <View style={[styles.weekDaysContainer, theme?.weekDaysContainerStyle]} testID="week-days">
        {getWeekdaysMin(firstDayOfWeek)?.map((item, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text maxFontSizeMultiplier={1.4} style={theme?.weekDaysTextStyle}>
              {item}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.daysContainer} testID="days">
        {daysGrid?.map((day, index) => {
          return day ? (
            <Day
              key={index}
              date={day.date}
              text={day.text}
              disabled={day.disabled}
              isCurrentMonth={day.isCurrentMonth}
              theme={theme}
              isToday={day.isToday}
              isSelected={day.isSelected}
              isSelectedTo={day.isSelectedTo}
              onSelectDate={handleSelectDate}
            />
          ) : (
            <EmptyDay key={index} />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  weekDaysContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 4,

    alignItems: AlignItemType.Center,
  },
  weekDayCell: {
    width: '14.2%',
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  daysContainer: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: AlignContentType.FlexStart,
  },
})

export default DaySelector
