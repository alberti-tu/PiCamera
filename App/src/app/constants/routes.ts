export enum AppURL {
	CAMERAS = '/cameras',
	HOME = '/home',
	LOGIN = '/login',
	PHOTOS = '/photos',
	SETTINGS = '/settings',
	REGISTER = '/register'
}

export enum ApiURL {
	LOGIN = '/api/user/login',
	PICTURE_BY_ID = '/api/picture/[id]',
	PICTURE_BY_NAME = '/api/picture/[id]/[name]',
	CAMERA = '/api/settings/camera',
	CAMERA_BY_ID = '/api/settings/camera/[id]',
	SETTINGS_FILTERS = '/api/settings/filters',
	SUBSCRIPTION = '/api/subscription',
	SUBSCRIPTION_BY_ID = '/api/subscription/[id]',
	USER = '/api/user/',
}