import { Modal, ModalBody, ROLE } from 'baseui/modal'
import { useDispatch, useSelector } from 'react-redux'
import { SET_IS_VIEWING } from '../../store/types/book'
import { useStyletron } from 'baseui'
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Paragraph3, Paragraph4 } from 'baseui/typography'
import { IoPersonOutline } from 'react-icons/io5'
import { BsCalendar } from 'react-icons/bs'
import moment from 'moment'
import { Button, SHAPE, SIZE } from 'baseui/button'
import { Block } from 'baseui/block'
import { Link } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi'

const HomeModal = () => {
  const { isViewing, book } = useSelector(state => state.book)
  const dispatch = useDispatch()
  const [css] = useStyletron()

  return (
    <Modal
      onClose={() => dispatch({ type: SET_IS_VIEWING, payload: false })}
      closeable
      isOpen={isViewing}
      animate
      autoFocus
      role={ROLE.dialog}
      unstable_ModalBackdropScroll
      overrides={{
        Dialog: {
          style: {
            height: 'auto',
            '@media only screen and (min-width: 1136px)': {
              width: '50vw !important'
            },
            '@media only screen and (min-width: 600px)': {
              width: '95vw !important'
            },
            '@media only screen and (min-width: 320px)': {
              width: '95vw !important'
            }
          }
        }
      }}
    >
      <FlexGrid
        flexGridColumnCount={[1, 1, 2, 2]}
      >
        <FlexGridItem>
          <img
            src={book.imgUrl}
            alt={book.title}
            className={css({
              width: '100%',
              maxHeight: 'calc(100vh / 1.77)',
              height: '100%',
              borderRadius: '10px'
            })}
          />
        </FlexGridItem>
        <FlexGridItem>
          <ModalBody>
            <HeadingLevel>
              <Heading
                styleLevel={4}
                className={css({ textTransform: 'capitalize' })}
              >
                {book.title}
              </Heading>
              <FlexGridItem
                className={css({
                  display: 'flex',
                  flexDirection: 'column'
                })}
              >
                <Paragraph4
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0'
                  })}
                >
                  <IoPersonOutline size={12} />&nbsp; {book.author}
                </Paragraph4>
                <Paragraph4
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0'
                  })}
                >
                  <BsCalendar size={12} />&nbsp; {moment(book.datePublished).format('LL')}
                </Paragraph4>
              </FlexGridItem>
            </HeadingLevel>
            <Block
              className={css({
                maxHeight: '300px',
                height: '100%',
                overflowY: 'scroll'
              })}
            >
              <Paragraph3>{book.description ?? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}</Paragraph3>
            </Block>
            <Link to={`/books/${book.id}/edit`}>
              <Button
                shape={SHAPE.circle}
                size={SIZE.compact}
                className={css({
                  position: 'absolute',
                  right: '1rem',
                  bottom: '1rem'
                })}
                onClick={() => dispatch({ type: SET_IS_VIEWING, payload: false })}
              >
                <FiEdit2 />
              </Button>
            </Link>
          </ModalBody>
        </FlexGridItem>
      </FlexGrid>
    </Modal>
  )
}

export default HomeModal
