/**
 * the structure of a brewery object
 */
export interface Brewery {
    id: string;
    name: string;
    brewery_type: string;
    address_1: string;
    address_2?: string | null;
    address_3?: string | null;
    city: string;
    state_province?: string | null;
    postal_code?: string | null;
    country: string;
    longitude?: string | null;
    latitude?: string | null;
    phone: string | null;
    website_url: string | null;
    state?: string | null;
    street: string;
}

/**
 * the structure of a brewery meta object
 */
export interface BreweryMeta {
    total: number;
    page: number;
    per_page: number;
}
