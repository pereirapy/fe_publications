import React from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import ContainerCRUD from '../../components/common/ContainerCRUD/ContainerCRUD'
import { publications } from '../../services'
import { map, getOr, isEmpty, truncate } from 'lodash/fp'
import AskDelete from '../common/AskDelete/AskDelete'
import NoRecords from '../common/NoRecords/NoRecords'
import Pagination from '../common/Pagination/Pagination'
import Search from '../common/Search/Search'
import { parseQuery } from '../../utils/forms'
import { RECORDS_PER_PAGE } from '../../constants/application'
import FilterData from '../common/FilterData/FilterData'
import { showError, formatDate } from '../../utils/generic'
import ReactPlaceholder from 'react-placeholder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'


const sortDefault = `publications.createdAt:`
const sortDefaultlast = `,firstName:ASC`

class Publications extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      error: false,
      hiddenFilter: false,
      submitting: false,
      pagination: {},
      iconSort: faArrowDown,
      creadtedAtSort: 'DESC',
      queryParams: {
        sort: `${sortDefault}DESC${sortDefaultlast}`,
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          title: '',
          authors: [],
        }),
      },
    }
    this.handleGetAll = this.handleGetAll.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.toggleCreadtedSort = this.toggleCreadtedSort.bind(this)
  }

  async handleGetAll(objQuery) {
    this.setState({ submitting: true })
    try {
      const queryParams = parseQuery(objQuery, this.state)
      const response = await publications.getAll(queryParams)
      this.setState({
        data: getOr([], 'data.list', response),
        pagination: getOr({}, 'data.pagination', response),
        submitting: false,
        error: false,
        queryParams,
      })
    } catch (error) {
      this.setState({
        error,
        submitting: false,
      })
      showError(error)
    }
  }

  async handleDelete(id) {
    this.setState({ submitting: true })
    await publications
      .dellOne(id)
      .then(() => {
        this.handleGetAll()
      })
      .catch((error) => {
        this.setState({ submitting: false })
        showError(error)
      })
  }

  componentDidMount() {
    this.handleGetAll()
  }

  toggleFilter() {
    this.setState({ hiddenFilter: !getOr(false, 'hiddenFilter', this.state) })
  }

  toggleCreadtedSort() {
    const creadtedAtSort = this.state.creadtedAtSort === 'DESC' ? 'ASC' : 'DESC'
    const iconSort = creadtedAtSort === 'DESC' ? faArrowDown : faArrowUp
    const sort = `${sortDefault}${creadtedAtSort}${sortDefaultlast}`
    this.setState({ creadtedAtSort, iconSort })
    this.handleGetAll({ sort })
  }

  render() {
    const {
      data,
      pagination,
      submitting,
      error,
      hiddenFilter,
      iconSort,
    } = this.state
    const colSpan = '5'
    return (
      <ContainerCRUD title={'List of publications'} {...this.props}>
        <Row>
          <Col xs={12} lg={3} xl={2} className={hiddenFilter ? 'd-none' : ''}>
            <FilterData
              handleFilters={this.handleGetAll}
              refresh={submitting}
              error={error}
              getFilters={publications.getAllFilters}
            />
          </Col>
          <Col xs={12} lg={hiddenFilter ? 12 : 9} xl={hiddenFilter ? 12 : 10}>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <Search
                  onFilter={this.handleGetAll}
                  fields={['title']}
                  colspan={colSpan}
                  toggleFilter={this.toggleFilter}
                />
                <tr>
                  <th>{'Title'}</th>
                  <th className="d-none d-sm-table-cell">{'Author'}</th>
                  <th className="d-none d-lg-table-cell">
                    {'Publisher at'}
                    <Button
                      className=""
                      size="sm"
                      variant="outlined"
                      title={'Change order'}
                      onClick={this.toggleCreadtedSort}
                    >
                      <FontAwesomeIcon icon={iconSort} />
                    </Button>
                  </th>
                  <th className="d-none d-lg-table-cell">{'Body'}</th>
                  <th className="d-none d-lg-table-cell">{'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {submitting ? (
                  <tr>
                    <td colSpan={colSpan}>
                      <ReactPlaceholder
                        showLoadingAnimation={true}
                        type="text"
                        ready={!submitting}
                        rows={RECORDS_PER_PAGE}
                      />
                    </td>
                  </tr>
                ) : !isEmpty(data) ? (
                  map(
                    (publication) => (
                      <tr key={publication.id}>
                        <td>{publication.title}</td>
                        <td className="d-none d-lg-table-cell">
                          {`${publication.author.firstName}, ${publication.author.email}`}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {`${formatDate(publication.createdAt)}`}
                        </td>
                        <td className="d-none d-sm-table-cell">
                          {truncate(
                            { length: 50, omission: '...' },
                            publication.body
                          )}
                        </td>
                        <td>
                          <AskDelete
                            id={publication.id}
                            funcToCallAfterConfirmation={this.handleDelete}
                          />
                        </td>
                      </tr>
                    ),
                    data
                  )
                ) : (
                  <NoRecords cols={colSpan} />
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={colSpan} style={{ border: 0 }}>
                    <Pagination
                      pagination={pagination}
                      onClick={this.handleGetAll}
                      submitting={submitting}
                    />
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
      </ContainerCRUD>
    )
  }
}

export default Publications
