export enum ProjectCategory {
    android,
    flutter,
    unity,
    nextJs
}

export enum UrlType {
    none,
    github,
    googlePlay,
    website,
    youtube,
}

export type Project = {
    id: number,
    name: string;
    category: ProjectCategory;
    description: string;
    imagePath: string;
    url: string;
    urlType: UrlType;
    screenshots: string[];
}