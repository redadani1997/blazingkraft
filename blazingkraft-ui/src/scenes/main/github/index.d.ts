export interface IGithubRelease {
    id: number;
    name: string;
    body: string;
    tag_name: string;
}

export type GithubReducerState = {
    latestRelease: IGithubRelease;
    currentRelease: IGithubRelease;
    isGetLatestReleasePending: boolean;
};
