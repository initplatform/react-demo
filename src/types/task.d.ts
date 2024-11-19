export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export type TaskFilter = 'all' | 'completed' | 'pending';
