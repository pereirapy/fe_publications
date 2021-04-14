import api from '../api'
import { toQueryString } from '../../utils/forms'

const moduleName = 'publications'

const getAll = (params) => api.get(`/${moduleName}${toQueryString(params)}`)

const getAllFilters = () => api.get(`/${moduleName}/filters`)

const updateOne = (id, data) => api.put(`/${moduleName}/${id}`, data)

const create = (data) => api.post(`/${moduleName}`, data)

const dellOne = (id) => api.delete(`/${moduleName}/${id}`)

const allExport = { getAll, getAllFilters, dellOne, updateOne, create }

export default allExport
