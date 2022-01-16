import { Link, useHistory, useParams } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSingleBook, saveBook, updateBook } from '../../store/actions/book'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Button, KIND } from 'baseui/button'
import { Select, TYPE } from 'baseui/select'
import generateYearRange from '../../utils/generateYearRange'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Card, StyledBody } from 'baseui/card'
import { DatePicker } from 'baseui/datepicker'
import { FlexGridItem } from 'baseui/flex-grid'

const BookForm = ({ action }) => {
  const { id } = useParams()
  const formikRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (action !== 'edit') {
      return
    }

    dispatch(fetchSingleBook(id, formikRef))
  }, [action, dispatch, id])

  const bookForms = [
    {
      name: 'title',
      type: 'text',
      label: 'Title'
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author'
    },
    {
      name: 'imgUrl',
      type: 'text',
      label: 'Image Url'
    },
    {
      name: 'year',
      type: 'number',
      label: 'Year'
    },
    {
      name: 'datePublished',
      type: 'text',
      label: 'Date Published'
    }
  ]

  const initialValues = {
    title: '',
    author: '',
    imgUrl: '',
    year: [{ year: currentYear }],
    datePublished: new Date()
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required')
  })

  const onSaveBook = (forms) => {
    if (action === 'edit') {
      dispatch(updateBook({ id, forms }))
    } else {
      dispatch(saveBook(forms))
    }

    history.push('/')
  }

  return (
    <>
      <Card>
        <HeadingLevel>
          <Heading styleLevel={3}>{action === 'edit' ? 'Edit Book' : 'Create Book'}</Heading>
        </HeadingLevel>
        <StyledBody>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSaveBook} innerRef={formikRef}>
            {({ errors, touched, isSubmitting, isValid }) => {
              return (
                <Form>
                  {bookForms.map(({ name, label, type }) => {
                    if (name === 'year') {
                      return (
                        <FormControl
                          key={name}
                          label={label}
                        >
                          <Field name={name}>
                            {({ field }) => (
                              <Select
                                options={generateYearRange(1900, currentYear)}
                                labelKey="year"
                                valueKey="year"
                                placeholder="Choose a year"
                                maxDropdownHeight="300px"
                                value={field.value}
                                type={TYPE.search}
                                clearable={false}
                                onChange={event => formikRef.current?.setFieldValue(name, event.value)}
                              />
                            )}
                          </Field>
                        </FormControl>
                      )
                    } else if (name === 'datePublished') {
                      return (
                        <FormControl
                          key={name}
                          label={label}
                        >
                          <Field name={name}>
                            {({ field }) => (
                              <DatePicker
                                value={field.value}
                                onChange={({ date }) => formikRef.current?.setFieldValue(name, Array.isArray(date) ? date : [date])}
                              />
                            )}
                          </Field>
                        </FormControl>
                      )
                    } else {
                      return (
                        <FormControl
                          key={name}
                          label={label}
                          error={errors[name] && touched[name] ? errors[name] : ''}
                        >
                          <Field
                            as={Input}
                            name={name}
                            type={type} />
                        </FormControl>
                      )
                    }
                  })}

                  <FlexGridItem display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      onSubmit={onSaveBook}
                    >
                      Save
                    </Button>
                    &nbsp;&nbsp;
                    <Link to="/" className="button-link">
                      <Button kind={KIND.secondary}>Cancel</Button>
                    </Link>
                  </FlexGridItem>
                </Form>
              )
            }}
          </Formik>
        </StyledBody>
      </Card>
    </>
  )
}

export default BookForm
