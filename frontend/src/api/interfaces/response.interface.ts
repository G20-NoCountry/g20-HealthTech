export type Res<T> = Promise<{ success: boolean; message: string; data: T }>;
