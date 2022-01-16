import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'
import { useStyletron } from 'baseui'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Skeleton } from 'baseui/skeleton'
import { Card } from 'baseui/card'
import DarkImageLoader from '../../img/dark-image-loader.png'
import LightImageLoader from '../../img/light-image-loader.png'
import { useSelector } from 'react-redux'
import { THEME } from '../../utils/theme'

const HomeLoader = () => {
  const books = [...Array(10).keys()]
  const theme = useSelector(state => state.app.theme)
  const [css] = useStyletron()

  return (
    <div className={
      css({
        margin: '1rem 0'
      })
    }>
      <HeadingLevel>
        <Heading styleLevel={6}>
          <Skeleton
            width="120px"
            height="28px"
          />
        </Heading>

      </HeadingLevel>
      <FlexGrid
        flexGridColumnCount={[1, 2, 3, 5]}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
        {books.map((book, index) => (
          <FlexGridItem key={index}>
            <Card
              headerImage={theme === THEME.dark ? DarkImageLoader : LightImageLoader}
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
            </Card>
          </FlexGridItem>
        ))}
      </FlexGrid>
    </div>
  )
}

export default HomeLoader
