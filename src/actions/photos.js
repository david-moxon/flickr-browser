import types from 'actions/types'
import * as apiHelper from 'helpers/api'
import * as flickrHelper from 'helpers/flickr'
import * as flickr from 'api/flickr'

export const pageSize = 40

export const load = (search, tags, page = 1) => (dispatch/*, getState*/) => {
	dispatch(loadAttempt(search, tags, page, pageSize))

	const onSuccess = data => dispatch(loadSuccess(data.photos))
	const onFail = error => dispatch(loadFailure(error))

	flickr.photos.search({
		text: search,
		tags: tags ? tags.join(',') : null,
		tag_mode: 'all',
		page,
		per_page: pageSize,
		extras: 'description,owner_name,tags',
	}).then(apiHelper.responseProcessor(flickrHelper.dataProcessor(onSuccess, onFail), onFail))
}

export const loadAttempt = (search, tags, page, pageSize) => ({ type: types.LOAD_PHOTOS_ATTEMPT, search, tags, page, pageSize })
export const loadSuccess = (data) => ({ type: types.LOAD_PHOTOS_SUCCESS, data })
export const loadFailure = (error) => ({ type: types.LOAD_PHOTOS_FAILURE, error })
