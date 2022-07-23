import { AppURL } from "src/app/constants/routes";
import { Environment } from "src/app/models/environment";

export const environment: Environment = {
	pages: [
		{ name: 'menu.home', icon: 'home', link: AppURL.HOME },
		{ name: 'menu.cameras', icon: 'camera', link: AppURL.CAMERAS },
		{ name: 'menu.photos', icon: 'picture', link: AppURL.PHOTOS },
		{ name: 'menu.settings', icon: 'settings', link: AppURL.SETTINGS }
	],
	production: false,
	url: 'https://myhouselan.ddns.net'
};
