export type ReadingStatus = 'To Read' | 'Reading' | 'Completed';

//the Book blueprint 
export interface Book{
    id: string;
    title: string;
    author: string;
    status: ReadingStatus;
    comment: string[];
}

