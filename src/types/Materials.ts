export interface Item {
    id: number;
    name: string;
    count: number;
    sum: number;
}

export interface Category {
    id: number;
    name: string;
    items: Item[];
    totalCount: number;
    totalSum: number;
}

export interface ParentGroup {
    id: number;
    name: string;
    categories: Category[];
    totalCount: number;
    totalSum: number;
}

export interface MaterialsMeta {
    remind_end_amount: string;
    remind_end_sum: string;
    remind_income_amount: string;
    remind_income_sum: string;
    remind_outgo_amount: string;
    remind_outgo_sum: string;
    remind_start_amount: string;
    remind_start_sum: string;
}

export interface Material {
    material_id: number;
    name: string;
    parent: string;
    category: string;
    remind_start_amount: number;
    remind_income_amount: number;
    remind_outgo_amount: number;
    remind_end_amount: number;
    remind_start_sum: number;
    remind_income_sum: number;
    remind_outgo_sum: number;
    remind_end_sum: number;
}
export interface MaterialsResponse {
    data: ParentGroup[];
    meta: MaterialsMeta;
}

export interface Material {
    id: number;
    title: string;
    createdAt: string;
}