export interface FilterProps {
    categories: Record<string, number>;
    minPrice: number;
    maxPrice: number;
    tags: string[];
    times: { label: string }[];
    organizations: string[];
}
