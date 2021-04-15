import React from 'react'
import { Form, Card, Col } from 'react-bootstrap'
import {
  pipe,
  uniq,
  compact,
  remove,
  getOr,
  map,
  isEmpty,
  contains,
} from 'lodash/fp'
import { parseErrorMessage } from '../../../utils/generic'
import ReactPlaceholder from 'react-placeholder'

class FilterData extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: false,
      authors: [],
      checksAuthors: [],
    }
    this.getAllFilters = this.getAllFilters.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleGetValuesTradicional = this.handleGetValuesTradicional.bind(this)
    this.updateValues = this.updateValues.bind(this)
  }

  handleOnClick(event) {
    const {
      target: { name, value, checked },
    } = event
    const newValues = checked
      ? pipe(uniq, compact)([...this.state[name], value])
      : remove((arrayValue) => arrayValue === value, this.state[name])
    this.updateValues(name, newValues)
  }

  handleGetValuesTradicional(event) {
    const {
      target: { name, value },
    } = event
    this.updateValues(name, value)
  }

  updateValues(name, newValues) {
    const { handleFilters } = this.props

    this.setState({
      [name]: newValues,
    })
    handleFilters({
      filters: {
        [name]: newValues,
      },
    })
  }

  async getAllFilters() {
    this.setState({ loading: true })

    try {
      const { getFilters } = this.props
      const response = await getFilters()
      const data = getOr([], 'data', response)
      this.setState({
        checksAuthors: getOr([], 'authors', data),
        loading: false,
      })
    } catch (error) {
      this.setState({
        error: `${parseErrorMessage(error)}`,
        loading: false,
      })
    }
  }

  componentDidMount() {
    this.getAllFilters()
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.state
    const { refresh, error } = this.props
    const prevRefresh = getOr(true, 'refresh', prevProps)
    if (refresh && !prevRefresh && !loading && !error) this.getAllFilters()
  }

  render() {
    const { checksAuthors, authors, error, loading } = this.state

    const noData = isEmpty(checksAuthors)
    return (
      <>
        <Col className="text-center">
          <h3>Filters</h3>
        </Col>
        <Col className="text-center text-muted">{error}</Col>
        <Col className="text-center text-muted">
          {!loading && noData && 'common:noData'}
        </Col>
        {(loading || !isEmpty(checksAuthors)) && !error && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{'Authors'}</Card.Title>
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  type="text"
                  ready={!loading}
                  rows={6}
                >
                  {map(
                    ({ authorId, author: {firstName, lastName } }) => (
                      <Form.Group
                        controlId={`authors${authorId}`}
                        key={authorId}
                      >
                        <Form.Check
                          type="checkbox"
                          name="authors"
                          checked={contains(String(authorId), authors)}
                          label={`${lastName}, ${firstName}`}
                          value={authorId}
                          onChange={this.handleOnClick}
                        />
                      </Form.Group>
                    ),
                    checksAuthors
                  )}
                </ReactPlaceholder>
              </Card.Body>
            </Card>
          </Col>
        )}
      </>
    )
  }
}

export default FilterData
