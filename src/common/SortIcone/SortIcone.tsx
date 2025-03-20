import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortIconProps {
    sortKey: string;
    activeSort: string;
    activeOrder: string;
}

const SortIcon: React.FC<SortIconProps> = ({ sortKey, activeSort, activeOrder }) => {
    if (activeSort === sortKey) {
        return activeOrder === 'asc' ? (
            <ArrowUp className="inline ml-1 w-4 h-4" />
        ) : (
            <ArrowDown className="inline ml-1 w-4 h-4" />
        );
    }
    return <ArrowUpDown className="inline ml-1 w-4 h-4 text-gray-400" />;
};

export default SortIcon;