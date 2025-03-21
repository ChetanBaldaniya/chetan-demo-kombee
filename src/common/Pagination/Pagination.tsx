import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { useState } from 'react';

type PaginationProps = {
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  handleChangeRowsPerPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, rowsPerPage,handleChangeRowsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="flex items-center gap-4">
      <span>Rows per page:</span>
      <select
  value={rowsPerPage}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
    handleChangeRowsPerPage(Number(e.target.value))
  }
  className="border border-teal-500 rounded-md px-2 py-1"
>
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="20">20</option>
</select>


      <span>{`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalItems)} of ${totalItems}`}</span>

      <div className="flex gap-2">
        <div onClick={() => handlePageChange(1)} className="p-2 text-teal-500 cursor-pointer">
          <ChevronsLeft size={18} />
        </div>
        <div onClick={() => handlePageChange(currentPage - 1)} className="p-2 text-teal-500 cursor-pointer">
          <ChevronLeft size={18} />
        </div>
        <div onClick={() => handlePageChange(currentPage + 1)} className="p-2 text-teal-500 cursor-pointer">
          <ChevronRight size={18} />
        </div>
        <div onClick={() => handlePageChange(totalPages)} className="p-2 text-teal-500 cursor-pointer">
          <ChevronsRight size={18} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
