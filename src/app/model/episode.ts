import { Theme } from "./theme";

export class Episode {
    id: number;
    name: string;
    themeList: Theme[];
    started: boolean;
    startTime: Date;
}
