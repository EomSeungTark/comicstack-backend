export interface IToonInfo {
  user_id?: String;
	day?: String;
	title?: String;
	thumbnail_path?: String;
	context?: String;
	toon_sid?: number;
}

export const defaultValue: Readonly<IToonInfo> = {};