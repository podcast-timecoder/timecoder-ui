import { Theme } from "./theme";

export class Episode {
    id: Number;
    name: String;
    themeList: Theme[];
    started: boolean;
    startTime: Date;
}