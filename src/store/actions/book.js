import { CREATE_BOOK, DELETE_BOOK, EDIT_BOOK, READ_BOOKS, SET_IS_VIEWING, UPDATE_BOOK } from '../types/book'
import { SET_IS_LOADING } from '../types/app'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, orderBy, query, where  } from 'firebase/firestore/lite'
import { dates, formatDate, now } from '../../utils/dates'
import firebase from '../../config/firebase'

const fireStore = collection(firebase, 'books')

export const fetchBook = (searchString) => async (dispatch) => {
  try {
    let payload = []
    let snapshot

    if (!searchString) {
      setIsLoading(dispatch, true, false, 0)
      snapshot = await getDocs(fireStore)
      setIsLoading(dispatch, false, false)
    } else {
      setIsLoading(dispatch, true, true, 0)
      searchString = searchString.toString().toLowerCase()

      const searchQuery = query(
        fireStore,
        orderBy('title', 'desc'),
        where('title', '>=', searchString),
        where('title', '<=', `${searchString}\uf8ff`)
      )

      snapshot = await getDocs(searchQuery)
      setIsLoading(dispatch, false, true)
    }

    snapshot.forEach(doc => payload.push({ id: doc.id, ...doc.data() }))

    dispatch({
      type: READ_BOOKS,
      payload
    })
  } catch (err) {
    setIsLoading(dispatch, false)
    console.log(err)
  }
}

export const fetchSingleBook = (id, formikRef) => async (dispatch) => {
  try {
    let payload = {}
    const snapchat = await getDoc(getBooksDoc(id))

    payload.book = { id: snapchat.id, ...snapchat.data() }

    const fields = ['title', 'author', 'year', 'datePublished', 'imgUrl']

    fields.forEach(field => {
      let data

      switch (field) {
        case 'year':
          data = [{ year: payload.book[field] }]
          break

        case 'datePublished':
          data = new Date(payload.book[field])
          break

        default:
          data = payload.book[field]
          break
      }

      formikRef?.current?.setFieldValue(field, data, false)
    })

    dispatch({
      type: EDIT_BOOK,
      payload
    })

    dispatch({
      type: SET_IS_VIEWING,
      payload: true
    })
  } catch (err) {
    console.log(err)
  }
}

export const saveBook = (forms) => async (dispatch) => {
  try {
    const payload = { ...formatForms(forms), ...dates }
    const snapshot = await addDoc(fireStore, payload)

    dispatch({
      type: CREATE_BOOK,
      payload: { id: snapshot.id, ...payload }
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateBook = ({ id, forms }) => async (dispatch) => {
  try {
    await updateDoc(getBooksDoc(id), { ...formatForms(forms), updatedAt: now })

    dispatch({
      type: UPDATE_BOOK,
      payload: { id, ...forms }
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteBook = (id) => async (dispatch) => {
  try {
    await deleteDoc(getBooksDoc(id))

    dispatch({
      type: DELETE_BOOK,
      payload: { id }
    })
  } catch (err) {
    console.log(err)
  }
}

const formatForms = (forms) => {
  forms.year = forms.year[0].year
  forms.datePublished = Array.isArray(forms.datePublished) ? formatDate(forms.datePublished[0]) : formatDate(forms.datePublished)
  forms.title = forms.title.toString().toLowerCase()
  return forms
}

const getBooksDoc = (id) => {
  return doc(firebase, 'books', id)
}

const setIsLoading = (dispatch, isLoading, isSearching = false, timer = 500) => {
  setTimeout(() => {
    dispatch({
      type: SET_IS_LOADING,
      payload: { isLoading, isSearching }
    })
  }, timer)
}
