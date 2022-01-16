import { CREATE_BOOK, DELETE_BOOK, EDIT_BOOK, READ_BOOKS, UPDATE_BOOK, SET_IS_VIEWING } from '../types/book'
import { SET_IS_LOADING } from '../types/app'

const initialState = {
  books: [],
  book: {},
  isLoading: true,
  total: 0,
  isSearching: false,
  isViewing: false
}

const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload.isLoading, isSearching: payload.isSearching }

    case SET_IS_VIEWING:
      return { ...state, isViewing: payload }

    case CREATE_BOOK:
      return {
        ...state,
        books: [payload, ...state.books]
      }

    case READ_BOOKS:
      return {
        ...state,
        books: payload,
        total: payload.length
      }

    case EDIT_BOOK:
      return { ...state, book: payload.book }

    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book => book.id === payload.id ? payload : book),
        book: payload
      }

    case DELETE_BOOK:
      return { ...state, books: state.books.filter(({ id }) => id !== payload.id) }

    default:
      return state
  }
}

export default bookReducer
