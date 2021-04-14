import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { getOr, reduce } from 'lodash/fp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

const Search = (props) => {
  const { onFilter, name, colspan, fields, toggleFilter } = props

  const sendSearch = (event) => {
    if (event.key === 'Enter') {
      toSearch(event)
    }
  }

  const toSearch = (event) => {
    const value = getOr('', 'target.value', event)
    const newValues = reduce(
      (result, current) => ({ ...result, [current]: value }),
      {},
      fields
    )
    onFilter({ filters: newValues })
  }

  return (
    <>
      <tr>
        <th colSpan={colspan || '7'}>
          <InputGroup>
            <InputGroup.Prepend>
              {toggleFilter && (
                <Button
                  className=""
                  variant="outlined"
                  title={'show/hide Filters'}
                  onClick={toggleFilter}
                >
                  <FontAwesomeIcon icon={faFilter} />
                </Button>
              )}
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name={name || 'search'}
              type="text"
              placeholder={'You can search by title here'}
              onKeyPress={sendSearch}
            />
          </InputGroup>
        </th>
      </tr>
      <tr>
        <th colSpan={colspan || '7'} style={{ border: 0 }}></th>
      </tr>
    </>
  )
}

export default Search
