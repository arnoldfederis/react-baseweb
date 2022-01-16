import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider, DarkTheme, LightTheme } from 'baseui'
import Home from './views/Home'
import BookForm from './views/books/BookForm'
import NotFound from './views/errors/NotFound'
import AppNavBar from './components/AppNavBar'
import { Cell, Grid } from 'baseui/layout-grid'
import { useEffect } from 'react'
import { THEME } from './utils/theme'
import { initTheme } from './store/actions/app'

const engine = new Styletron()

const App = () => {
  const theme = useSelector(state => state.app.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initTheme())
  }, [dispatch])

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme === THEME.light ? LightTheme : DarkTheme}>
        <AppNavBar />

        <BrowserRouter basename='/react-baseweb'>
          <Grid>
            <Cell span={12}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/books">
                  <Redirect to="/books/create" />
                </Route>
                <Route exact path="/books/create">
                  <BookForm action="create" />
                </Route>
                <Route exact path="/books/:id/edit">
                  <BookForm action="edit" />
                </Route>
                <Route exact path="/404-page-not-found">
                  <NotFound />
                </Route>
                <Route path="*">
                  <Redirect to="/404-page-not-found" />
                </Route>
              </Switch>
            </Cell>
          </Grid>
        </BrowserRouter>
      </BaseProvider>


    </StyletronProvider>
  )
}

export default App
