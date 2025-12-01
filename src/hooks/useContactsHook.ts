import { extractPhoneNumbers } from '@src/helper/helper'
import { useState, useEffect, useCallback } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import Contacts from 'react-native-contacts'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

const useContacts = () => {
  const [contacts, setContacts] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Access',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'OK',
          },
        )

        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          const fetchedContacts = await Contacts.getAll()
          const phoneNumbers = extractPhoneNumbers(fetchedContacts)
          setContacts(phoneNumbers)
        } else {
          setError('Contacts permission denied')
        }
      } else {
        let permission = await check(PERMISSIONS.IOS.CONTACTS)
        if (permission === RESULTS.DENIED) {
          permission = await request(PERMISSIONS.IOS.CONTACTS)
        }

        if (permission === RESULTS.GRANTED) {
          const fetchedContacts = await Contacts.getAllWithoutPhotos()
          const phoneNumbers = extractPhoneNumbers(fetchedContacts)
          setContacts(phoneNumbers)
        } else {
          setError('Contacts permission denied')
        }
      }
    } catch (err) {
      if (err) setError('Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  return { contacts, loading, error }
}

export default useContacts
