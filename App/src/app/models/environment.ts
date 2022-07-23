import { MenuItem } from "../components/side-menu/side-menu.component";

export interface Environment {
	pages: MenuItem[];
	production: boolean;
	url: string;
}