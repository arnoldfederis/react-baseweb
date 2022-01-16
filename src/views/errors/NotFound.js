import PageNotFoundImg from '../../img/page-not-found.svg'
import { Heading, HeadingLevel } from 'baseui/heading'
import { StyledLink } from 'baseui/link'
import { FlexGridItem } from 'baseui/flex-grid'

const NotFound = () => {
  return (
    <FlexGridItem alignItems={'center'} display={'flex'} flexDirection={'column'}>
      <img width={'100%'} className="img-fluid" src={PageNotFoundImg} alt="page-not-found" />
      <HeadingLevel>
        <Heading>Page not found</Heading>
        <StyledLink href={'/'}>Go back to Home page</StyledLink>
      </HeadingLevel>
    </FlexGridItem>
  )
}

export default NotFound
