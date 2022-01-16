import { Cell, Grid } from 'baseui/layout-grid'
import { FlexGridItem } from 'baseui/flex-grid'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Button, SHAPE, SIZE } from 'baseui/button'
import { getAccentColor, THEME } from '../utils/theme'
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md'
import { toggleTheme } from '../store/actions/app'
import { useDispatch, useSelector } from 'react-redux'
import { StyledLink } from 'baseui/link'
import { useStyletron } from 'baseui'

const AppNavBar = () => {
  const theme = useSelector(state => state.app.theme)
  const themeIcon = theme === THEME.dark ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />
  const dispatch = useDispatch()
  const [css] = useStyletron()

  return (
    <div className={
      css({
        backgroundColor: theme === THEME.dark ? '#000000' : '#ffffff',
        marginBottom: '1rem',
      })
    }>
      <Grid>
        <Cell span={12}>
          <FlexGridItem display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <HeadingLevel>
              <StyledLink href={'https://arnoldfederis.github.io/react-baseweb'} className="button-link">
                <Heading styleLevel={5}>Books App</Heading>
              </StyledLink>
              <Button
                size={SIZE.compact}
                shape={SHAPE.circle}
                onClick={() => dispatch(toggleTheme())}
                overrides={{
                  BaseButton: {
                    style: () => ({
                      color: theme === THEME.dark ? 'white' : 'black',
                      backgroundColor: 'transparent',
                      ':hover': {
                        backgroundColor: getAccentColor(theme)
                      },
                      ':focus': {
                        backgroundColor: getAccentColor(theme)
                      },
                      ':active': {
                        backgroundColor: getAccentColor(theme)
                      }
                    })
                  }
                }}
              >
                {themeIcon}
              </Button>
            </HeadingLevel>
          </FlexGridItem>
        </Cell>
      </Grid>
    </div>
  )
}

export default AppNavBar
