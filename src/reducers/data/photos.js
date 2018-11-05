import { combineReducers } from "redux"
import types from 'actions/types'
import Immutable from 'seamless-immutable'

const loading = (state = Immutable(false), action) => {
	switch (action.type) {
	case types.LOAD_PHOTOS_ATTEMPT: return Immutable(true)
	case types.LOAD_PHOTOS_SUCCESS:
	case types.LOAD_PHOTOS_FAILURE: return Immutable(false)
	default: return state
	}
}

// Empty initial state
// Appends on subsequent page load
// Clears down on previous page loads
const data = (state = Immutable([]), action) => {
	switch (action.type) {
	case types.LOAD_PHOTOS_ATTEMPT: {
		let ret = [...state]
		const previousItems = ((action.page - 1) * action.pageSize)
		if (ret.length > previousItems) ret = ret.slice(0, previousItems)	// clear down previously paged photos if we've gone back
		return Immutable(ret)
	}
	case types.LOAD_PHOTOS_SUCCESS: {
		return Immutable([...state, ...action.data.photo])
	}
	default: return state
	}
}

const search = (state = Immutable(null), action) => {
	switch (action.type) {
	case types.LOAD_PHOTOS_ATTEMPT: return Immutable(action.search)
	default: return state
	}
}

const tags = (state = Immutable([]), action) => {
	switch (action.type) {
	case types.LOAD_PHOTOS_ATTEMPT: return Immutable(action.tags || [])
	default: return state
	}
}

// Defaults to 1
// Supports going back to a previous page
const page = (state = Immutable(1), action) => {
	switch (action.type) {
	case types.LOAD_PHOTOS_SUCCESS: return Immutable(action.data.page)
	default: return state
	}
}

// NULL initial state
// Supports going back to previous page
const pages = (state = Immutable(null), action) => {
	switch (action.type) {
	case types.LOAD_PHOTOS_SUCCESS: return Immutable(action.data.pages)
	default: return state
	}
}

const total = (state = Immutable(null), action) => {
	switch (action.type) {
	case types.LOAD_PHOTOS_ATTEMPT: return Immutable(null)
	case types.LOAD_PHOTOS_SUCCESS: return Immutable(action.data.total)
	default: return state
	}
}

export default combineReducers({
	loading,
	data,
	search,
	tags,
	page,
	pages,
	total,
})
