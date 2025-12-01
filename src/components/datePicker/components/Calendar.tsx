import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

import DaySelector from './DaySelector'
import Header from './Header'
import MonthSelector from './MonthSelector'
import TimeSelector from './TimeSelector'
import YearSelector from './YearSelector'
import { useCalendarContext } from '../CalendarContext'
import type { CalendarViews } from '../enums'
import { CALENDAR_HEIGHT } from '../enums'
import type { HeaderProps } from '../types'
import colors from '@src/constants/colors'
import { AlignItemType } from '@src/@types/enum'

const CalendarView: Record<CalendarViews, ReactNode> = {
  year: <YearSelector />,
  month: <MonthSelector />,
  day: <DaySelector />,
  time: <TimeSelector />,
}

const Calendar = ({ buttonPrevIcon, buttonNextIcon }: HeaderProps) => {
  const { calendarView, mode } = useCalendarContext()

  return (
    <View style={styles.container}>
      {mode !== 'time' ? (
        <Header buttonPrevIcon={buttonPrevIcon} buttonNextIcon={buttonNextIcon} />
      ) : null}
      <View style={styles.calendarContainer}>{CalendarView[calendarView]}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 13,
  },
  calendarContainer: {
    height: CALENDAR_HEIGHT,
    alignItems: AlignItemType.Center,
  },
})

export default Calendar
