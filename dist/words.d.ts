import Gists from 'gists';
declare class DB {
    gists: Gists;
    id: string;
    fileName: string;
    constructor({ token, gistId, gistFile }: Record<'token' | 'gistId' | 'gistFile', string>);
    read(): Promise<any>;
    write(data: any): Promise<{
        body: {
            files: import("gists").filesType;
        };
    }>;
}
export declare const db: DB;
export {};
