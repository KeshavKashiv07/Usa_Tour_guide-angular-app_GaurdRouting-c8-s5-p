export type Tour = {
    id?: string;
    tourName?: string;
    image?: string;
    description?: string;
    rating: number;
    tourPrice?: number;
    duration?: number;
    transportation?: string;
    categories?: Array<string>;
    details?: string;
    languages?: Array<string>;
    tourGuide?: string;
}