import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useEffect, useReducer } from 'react'

import CalendarContext from './CalendarContext'
import Calendar from './components/Calendar'
import { CalendarViews, CalendarActionKind } from './enums'
import type {
  DateType,
  CalendarModes,
  CalendarAction,
  CalendarState,
  CalendarTheme,
  HeaderProps,
} from './types'
import { getFormated, getDate, getDateYear } from './utils'

dayjs.extend(localeData)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

interface PropTypes extends CalendarTheme, HeaderProps {
  value: DateType
  mode?: CalendarModes
  locale?: string | ILocale
  minimumDate?: DateType
  maximumDate?: DateType
  firstDayOfWeek?: number
  onValueChange?: (to: DateType, from: DateType) => void
  displayFullDays?: boolean
}

const RangeDatePicker = ({
  value,
  mode = 'datetime',
  locale = 'en',
  minimumDate = null,
  maximumDate = null,
  firstDayOfWeek = 0,
  onValueChange = () => {},
  displayFullDays = false,
  headerButtonsPosition = 'around',
  headerContainerStyle,
  footerTextContainerStyle,
  footerContainerStyle,
  footerTextStyle,
  headerTextContainerStyle,
  headerTextStyle,
  headerButtonStyle,
  headerButtonColor,
  headerButtonSize,
  dayContainerStyle,
  todayContainerStyle,
  todayTextStyle,
  monthContainerStyle,
  yearContainerStyle,
  weekDaysContainerStyle,
  weekDaysTextStyle,
  calendarTextStyle,
  selectedTextStyle,
  selectedItemColor,
  timePickerContainerStyle,
  timePickerTextStyle,
  buttonPrevIcon,
  buttonNextIcon,
}: Partial<PropTypes>) => {
  dayjs.locale(locale)

  const theme = {
    headerButtonsPosition,
    headerContainerStyle,
    headerTextContainerStyle,
    headerTextStyle,
    headerButtonStyle,
    headerButtonColor,
    headerButtonSize,
    footerTextContainerStyle,
    footerContainerStyle,
    footerTextStyle,
    dayContainerStyle,
    todayContainerStyle,
    todayTextStyle,
    monthContainerStyle,
    yearContainerStyle,
    weekDaysContainerStyle,
    weekDaysTextStyle,
    calendarTextStyle,
    selectedTextStyle,
    selectedItemColor,
    timePickerContainerStyle,
    timePickerTextStyle,
  }

  const [state, dispatch] = useReducer(
    (prevState: CalendarState, action: CalendarAction) => {
      switch (action.type) {
        case CalendarActionKind.SET_CALENDAR_VIEW:
          return {
            ...prevState,
            calendarView: action.payload,
          }
        case CalendarActionKind.CHANGE_CURRENT_DATE:
          return {
            ...prevState,
            currentDate: action.payload,
          }
        case CalendarActionKind.CHANGE_CURRENT_YEAR:
          return {
            ...prevState,
            currentYear: action.payload,
          }
        case CalendarActionKind.CHANGE_SELECTED_DATE:
          return {
            ...prevState,
            selectedDate: action.payload,
          }
        case CalendarActionKind.CHANGE_SELECTED_DATE_TO:
          return {
            ...prevState,
            selectedDateTo: action.payload,
          }
        case CalendarActionKind.CHANGE_CURRENT_TIME:
          return {
            ...prevState,
            currentTime: action.payload,
          }
      }
    },
    {
      calendarView: mode === 'time' ? CalendarViews.time : CalendarViews.day,
      selectedDate: null,
      selectedDateTo: null,
      currentDate: value ? getFormated(value) : new Date(),
      currentYear: value ? getDateYear(value) : new Date().getFullYear(),
      currentTime: new Date(),
    },
  )

  useEffect(() => {
    dispatch({
      type: CalendarActionKind.SET_CALENDAR_VIEW,
      payload: mode === 'time' ? CalendarViews.time : CalendarViews.day,
    })
  }, [mode])

  const actions = {
    setCalendarView: (view: CalendarViews) =>
      dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view }),

    onSelectDate: (date: DateType) => {
      if (date != null) {
        // onValueChange(date, date)
      }
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: date,
      })
      {
        if (date != null)
          dispatch({
            type: CalendarActionKind.CHANGE_CURRENT_DATE,
            payload: date,
          })
      }
    },
    onSelectDateTo: (date: DateType, from: DateType) => {
      if (from != null) onValueChange(from, date)
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE_TO,
        payload: date,
      })
      {
        if (date != null)
          dispatch({
            type: CalendarActionKind.CHANGE_CURRENT_DATE,
            payload: date,
          })
      }
    },
    onSelectMonth: (month: number) => {
      const newDate = getDate(state.currentDate).month(month)
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      })
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: CalendarViews.day,
      })
    },
    onSelectYear: (year: number) => {
      const newDate = getDate(state.currentDate).year(year)
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      })
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: CalendarViews.day,
      })
    },
    onChangeMonth: (month: number) => {
      const newDate = getDate(state.currentDate).add(month, 'month')
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      })
    },
    onChangeYear: (year: number) => {
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_YEAR,
        payload: year,
      })
    },
    onChangeTime: (time: Date) => {
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_TIME,
        payload: time,
      })
    },
  }

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        ...actions,
        locale,
        mode,
        displayFullDays,
        minimumDate,
        maximumDate,
        firstDayOfWeek: firstDayOfWeek >= 0 && firstDayOfWeek <= 6 ? firstDayOfWeek : 0,
        theme,
      }}>
      <Calendar buttonPrevIcon={buttonPrevIcon} buttonNextIcon={buttonNextIcon} />
    </CalendarContext.Provider>
  )
}

export default RangeDatePicker
