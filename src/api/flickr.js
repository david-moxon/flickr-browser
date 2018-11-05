import { create } from 'apisauce'

const FLICKR_KEY = "adfc022ef0c2b6ee769d454e15eaad5f"
// const FLICKR_SECRET = "dac8ffa5f8bf1ddc"

// Test URL: `https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value&format=json&nojsoncallback=1&api_key=${FLICKR_KEY}`

// define the api
const api = create({
	baseURL: 'https://api.flickr.com/services/rest/',
	headers: {'Accept': 'application/vnd.github.v3+json'}
})

const call = (method, params) => api.get('', { method, api_key: FLICKR_KEY, format: 'json', nojsoncallback: 1, ...params })

export const photos = {
	getPopular: ({ page, per_page, sort, extras, user_id }) => call('flickr.photos.getPopular', { page, per_page, sort, extras, user_id }),
	getRecent: ({ page, per_page, extras }) => call('flickr.photos.getRecent', { page, per_page, extras }),
	search: ({ text, tags, tag_mode, page, per_page, extras }) => call('flickr.photos.search', { text, tags, tag_mode, page, per_page, extras, safe_search: 1, content_type: 1 }),	// lets search for safe photos only please
}
