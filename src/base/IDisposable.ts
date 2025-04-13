export interface IDisposable {
    dispose(): void;
}

export interface IAsyncDisposable {
    close(): Promise<void>;
}