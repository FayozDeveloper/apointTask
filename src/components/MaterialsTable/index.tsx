import {Fragment, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Materials_table.module.css';
import { getMaterials } from '../../services/MaterialsService';
import type { Material } from '../../types/Materials';
import { toast } from 'react-toastify';

type GroupedMaterials = {
    [parent: string]: {
        [category: string]: Material[];
    };
};

export default function MaterialsTable() {
    const [materials, setMaterials] = useState<GroupedMaterials>({});
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [openParents, setOpenParents] = useState<Record<string, boolean>>({});
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setStartDate(firstDay);
        setEndDate(lastDay);
    }, []);

    const groupByParentCategory = (data: Material[]) => {
        const grouped: GroupedMaterials = {};
        data.forEach(item => {
            const parent = item.parent || 'Без родителя';
            const category = item.category || 'Без категории';
            if (!grouped[parent]) grouped[parent] = {};
            if (!grouped[parent][category]) grouped[parent][category] = [];
            grouped[parent][category].push(item);
        });
        return grouped;
    };

    const fetchMaterials = async () => {
        try {
            const flatData = await getMaterials(startDate, endDate);
            const flattened = ([] as Material[]).concat(...flatData);
            const grouped = groupByParentCategory(flattened);
            setMaterials(grouped);
        } catch (e) {
            toast.error('Ошибка при получении данных');
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            (async () => {
                try {
                    await fetchMaterials();
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [startDate, endDate]);

    const toggleParent = (parent: string) => {
        setOpenParents(prev => ({ ...prev, [parent]: !prev[parent] }));
    };

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const renderTotalRow = (label: string, items: Material[]) => {
        const total = (key: keyof Material) =>
            items.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);

        return (
            <tr className="bg-gray-100 font-semibold text-sm">
                <td className="p-2 border">{label} — Total</td>
                <td className="p-2 border">{total('remind_start_amount')}</td>
                <td className="p-2 border">{total('remind_income_amount')}</td>
                <td className="p-2 border">{total('remind_outgo_amount')}</td>
                <td className="p-2 border">{total('remind_end_amount')}</td>
                <td className="p-2 border">{total('remind_start_sum')}</td>
                <td className="p-2 border">{total('remind_income_sum')}</td>
                <td className="p-2 border">{total('remind_outgo_sum')}</td>
                <td className="p-2 border">{total('remind_end_sum')}</td>
            </tr>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.filter_block}>
                <DatePicker
                    className={styles.data_picker}
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    placeholderText="Start date"
                />
                <DatePicker
                    className={styles.data_picker}
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    placeholderText="End date"
                />
            </div>

            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Start Amount</th>
                            <th className="p-2 border">Income Amount</th>
                            <th className="p-2 border">Outgo Amount</th>
                            <th className="p-2 border">End Amount</th>
                            <th className="p-2 border">Start Sum</th>
                            <th className="p-2 border">Income Sum</th>
                            <th className="p-2 border">Outgo Sum</th>
                            <th className="p-2 border">End Sum</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.entries(materials).map(([parent, categories]) => {
                        const parentItems = Object.values(categories).flat();

                        return (
                            <Fragment key={`${parent}-${categories}`}>
                                <tr
                                    className="bg-[#d8ead3] font-bold cursor-pointer"
                                    onClick={() => toggleParent(parent)}
                                >
                                    <td colSpan={9} className="p-2 border">
                                        {openParents[parent] ? '-' : '+'} {parent}
                                    </td>
                                </tr>

                                {openParents[parent] &&
                                    Object.entries(categories).map(([category, items]) => (
                                        <Fragment key={`${parent}-${category}`}>
                                            <tr
                                                className="bg-[#c2e6fd] cursor-pointer"
                                                onClick={() => toggleCategory(category)}
                                            >
                                                <td colSpan={9} className="p-2 pl-6 border font-semibold">
                                                    {openCategories[category] ? '-' : '+'} {category}
                                                </td>
                                            </tr>

                                            {openCategories[category] &&
                                                items.map(item => (
                                                    <tr key={item.material_id}>
                                                        <td className="p-2 border pl-12">{item.name}</td>
                                                        <td className="p-2 border">{item.remind_start_amount}</td>
                                                        <td className="p-2 border">{item.remind_income_amount}</td>
                                                        <td className="p-2 border">{item.remind_outgo_amount}</td>
                                                        <td className="p-2 border">{item.remind_end_amount}</td>
                                                        <td className="p-2 border">{item.remind_start_sum}</td>
                                                        <td className="p-2 border">{item.remind_income_sum}</td>
                                                        <td className="p-2 border">{item.remind_outgo_sum}</td>
                                                        <td className="p-2 border">{item.remind_end_sum}</td>
                                                    </tr>
                                                ))}

                                            {openCategories[category] && renderTotalRow(category, items)}
                                        </Fragment>
                                    ))}

                                {openParents[parent] && renderTotalRow(parent, parentItems)}
                            </Fragment>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

