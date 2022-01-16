import { Heading, HeadingLevel } from 'baseui/heading'
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'
import { Card, StyledBody } from 'baseui/card'
import { THEME } from '../../utils/theme'
import { Button, KIND, SIZE } from 'baseui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useStyletron } from 'baseui'
import { fetchSingleBook } from '../../store/actions/book'
import HomeModal from './HomeModal'

const HomeDisplay = () => {
  const { books, isSearching, total } = useSelector(state => state.book)
  const dispatch = useDispatch()
  const theme = useSelector(state => state.app.theme)
  const [css] = useStyletron()

  return (
    <>
      <HomeModal />

      {books.length > 0 && (
        <div className={
          css({
            margin: '1rem 0'
          })
        }>
          <HeadingLevel>
            <Heading styleLevel={6}>{isSearching ? `Result(s): ${total}` : 'New Arrivals'}</Heading>
          </HeadingLevel>
          <FlexGrid
            flexGridColumnCount={[1, 2, 3, 5]}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
          >
            {books.map(book => (
              <FlexGridItem key={book.id}>
                <Card
                  headerImage={book.imgUrl || 'https://api.lorem.space/image/book?h=700&w=400'}
                  overrides={{
                    Root: {
                      style: {
                        position: 'relative',
                        borderRightWidth: '0',
                        borderLeftWidth: '0',
                        borderTopWidth: '0',
                        borderBottomWidth: '0',
                        backgroundColor: 'transparent',
                      }
                    },
                    Contents: {
                      style: {
                        marginBottom: '0 !important',
                        marginTop: '0 !important'
                      }
                    },
                    Body: {
                      style: {
                        marginBottom: '0 !important',
                        marginTop: '0 !important'
                      }
                    }
                  }}
                >
                  <StyledBody
                    className={
                      css({
                        marginBottom: '0 !important',
                        marginTop: '0 !important',
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        top: '0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        ':hover': {
                          backgroundColor: theme === THEME.dark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.75)'
                        }
                      })
                    }
                    onClick={() => {
                      dispatch(fetchSingleBook(book.id))
                    }}
                  >
                    <div className={css({ marginBottom: '1rem' })}>
                      <Button kind={KIND.secondary} size={SIZE.compact}>Details</Button>
                    </div>
                  </StyledBody>
                </Card>
              </FlexGridItem>
            ))}
          </FlexGrid>
        </div>
      )}
    </>
  )
}

export default HomeDisplay
