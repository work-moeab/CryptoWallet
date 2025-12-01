import type { Dayjs } from 'dayjs'
import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'

import type { CalendarActionKind, CalendarViews } from './enums'

export type DateType = string | number | Dayjs | Date | null | undefined

export type CalendarModes = 'datetime' | 'date' | 'time'

export type HeaderButtonPositions = 'around' | 'right' | 'left'

export type CalendarState = {
  calendarView: CalendarViews
  selectedDate: DateType
  selectedDateTo: DateType
  currentDate: DateType // used for latest state of calendar based on Month and Year
  currentYear: number // used for pagination in YearSelector
  currentTime: Date // used for pagination in YearSelector
}

type SetCalendarViewAction = {
  type: CalendarActionKind.SET_CALENDAR_VIEW
  payload: CalendarViews
}

type ChangeCurrentDateAction = {
  type: CalendarActionKind.CHANGE_CURRENT_DATE
  payload: DateType
}

type ChangeCurrentYearAction = {
  type: CalendarActionKind.CHANGE_CURRENT_YEAR
  payload: number
}

type ChangeSelectedDateAction = {
  type: CalendarActionKind.CHANGE_SELECTED_DATE
  payload: DateType
}

type ChangeSelectedDateToAction = {
  type: CalendarActionKind.CHANGE_SELECTED_DATE_TO
  payload: DateType
}

type ChangeCurrentTimeAction = {
  type: CalendarActionKind.CHANGE_CURRENT_TIME
  payload: Date
}

export type CalendarAction =
  | SetCalendarViewAction
  | ChangeCurrentDateAction
  | ChangeCurrentYearAction
  | ChangeSelectedDateAction
  | ChangeSelectedDateToAction
  | ChangeCurrentTimeAction

export type CalendarTheme = {
  headerButtonsPosition?: HeaderButtonPositions
  headerContainerStyle?: ViewStyle
  headerTextContainerStyle?: ViewStyle
  headerTextStyle?: TextStyle
  headerButtonStyle?: ViewStyle
  footerContainerStyle?: ViewStyle
  footerTextContainerStyle?: ViewStyle
  footerTextStyle?: TextStyle
  headerButtonColor?: string
  headerButtonSize?: number
  dayContainerStyle?: ViewStyle
  todayContainerStyle?: ViewStyle
  todayTextStyle?: TextStyle
  monthContainerStyle?: ViewStyle
  yearContainerStyle?: ViewStyle
  weekDaysContainerStyle?: ViewStyle
  weekDaysTextStyle?: TextStyle
  calendarTextStyle?: TextStyle
  selectedTextStyle?: TextStyle
  selectedItemColor?: string
  timePickerContainerStyle?: ViewStyle
  timePickerTextStyle?: TextStyle
}

export type HeaderProps = {
  buttonPrevIcon?: ReactNode
  buttonNextIcon?: ReactNode
}
export interface IDayObject {
  text: string
  day: number
  date: string
  disabled: boolean
  isCurrentMonth: boolean
}
