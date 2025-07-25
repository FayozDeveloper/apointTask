import http from '../utils/axios.ts';
import type { Material } from '../types/Materials';

export async function getMaterials(startDate?: Date | null, endDate?: Date | null): Promise<Material[]> {
    const params: any = {
        sort: 'name',
    };

    if (startDate) params.start = startDate.toISOString();
    if (endDate) params.end = endDate.toISOString();

    return await http.get('/reports/reports/materials', { params });
}
