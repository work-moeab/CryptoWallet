export enum CalendarViews {
  day = 'day',
  month = 'month',
  year = 'year',
  time = 'time',
}

export enum CalendarActionKind {
  SET_CALENDAR_VIEW = 'SET_CALENDAR_VIEW',
  CHANGE_CURRENT_DATE = 'CHANGE_CURRENT_DATE',
  CHANGE_CURRENT_YEAR = 'CHANGE_CURRENT_YEAR',
  CHANGE_SELECTED_DATE = 'CHANGE_SELECTED_DATE',
  CHANGE_SELECTED_DATE_TO = 'CHANGE_SELECTED_DATE_TO',
  CHANGE_CURRENT_TIME = 'CHANGE_CURRENT_TIME',
}

export const CALENDAR_HEIGHT = 280
export const CALENDAR_WIDTH = 400
