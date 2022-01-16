import { Input } from 'baseui/input'
import { Search } from 'baseui/icon'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { fetchBook } from '../store/actions/book'
import { Heading, HeadingLevel } from 'baseui/heading'
import debounce from 'lodash.debounce'
import HomeLoader from '../components/Home/HomeLoader'
import HomeDisplay from '../components/Home/HomeDisplay'

const Home = () => {
  const { books, isLoading } = useSelector(state => state.book)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBook())
  }, [dispatch])

  const handleSearch = (e) => {
    debouncedSearch(e.target.value)
  }

  const debouncedSearch = useMemo(
    () => debounce(searchString => dispatch(fetchBook(searchString)), 500),
    [dispatch]
  )

  return (
    <>
      <Input
        startEnhancer={<Search size="18px" />}
        placeholder="Search Books"
        clearable
        clearOnEscape
        onChange={handleSearch}
      />

      {!isLoading && books.length === 0 && (
        <HeadingLevel>
          <Heading styleLevel={6}>
            No records found.
          </Heading>
        </HeadingLevel>
      )}

      {isLoading
        ? <HomeLoader />
        : <HomeDisplay />
      }
    </>
  )
}

export default Home
