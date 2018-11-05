
const createFormat = (id, description, sizeDescription) => ({ id, description, sizeDescription })

export const PHOTO_FORMAT = {
	SMALL_SQUARE: createFormat('s','Small Square','75x75'),
	LARGE_SQUARE: createFormat('q','Large Square','150x150'),
	THUMBNAIL: createFormat('t','Thumbnail','100 on longest side'),
	SMALL_240: createFormat('m','Small 240','240 on longest side'),
	SMALL_320: createFormat('n','Small 320','320 on longest side'),
	MEDIUM_500: createFormat('-','Medium','500 on longest side'),
	MEDIUM_640: createFormat('z','Medium 640','640 on longest side'),
	MEDIUM_800: createFormat('c','Medium 800','800 on longest side'),
	LARGE_1024: createFormat('b','Large','1024 on longest side'),
	LARGE_1600: createFormat('h','Large 1600','1600 on longest side'),
	LARGE_2048: createFormat('k','Large 2048','2048 on longest side'),
}

export const getPhotoFormatForId = (id) => {
	return Object.values(PHOTO_FORMAT).find(f => f.id === id)
}

export const getPhotoUrl = (photo, format = PHOTO_FORMAT.THUMBNAIL, ext = 'jpg') => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${format.id}.${ext}`

export const getPhotoPageUrl = (photo) => `https://www.flickr.com/photos/${photo.owner}/${photo.id}`

export const getPhotoOwnerUrl = (photo) => `https://www.flickr.com/photos/${photo.owner}`

export const dataProcessor = (onSuccess, onFail) => data => {
	if (data.stat === 'ok') {
		onSuccess(data)
	} else {
		onFail(`Flickr reported: ${data.message || `Error ${data.code}`}`)
	}
}

export const getPhotoTags = (photo) => photo.tags.split(' ').filter(t => !!t)