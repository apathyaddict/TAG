import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage = false,
  itemsPerPage = 20,
  currentCount = itemsPerPage,
}) => {
  const hasKnownTotal = Number.isInteger(totalPages) && totalPages > 0;
  const isFirstPage = currentPage === 1;
  const isLastPage = hasKnownTotal ? currentPage === totalPages : !hasNextPage;

  const handlePrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate pagination numbers based on totalPages
  const getPageNumbers = () => {
    if (!hasKnownTotal) return [];
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const startResult = (currentPage - 1) * itemsPerPage + 1;
  const endResult = hasKnownTotal
    ? Math.min(currentPage * itemsPerPage, totalPages * itemsPerPage)
    : (currentPage - 1) * itemsPerPage + currentCount;
  const totalLabel = hasKnownTotal ? `${totalPages * itemsPerPage}` : "inconnu";

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-1 py-10 ">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Affichage&nbsp;
            <span className="font-medium">{startResult}</span> à&nbsp;
            <span className="font-medium">{endResult}</span>
            &nbsp; sur&nbsp;
            <span className="font-medium">{totalLabel}</span> résultats
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-full  shadow-sm">
            <button
              onClick={handlePrevClick}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                isFirstPage ? "hidden" : ""
              } hover:bg-gray-100 focus:z-20 focus:outline-offset-0`}>
              <span className="sr-only">Previous</span>
              <BiChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            {hasKnownTotal ? (
              getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => onPageChange(number)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-gray-300 hover:bg-blue-200 focus:z-20 focus:outline-offset-0 ${
                    currentPage === number
                      ? "bg-blue-400 text-white focus:outline-none"
                      : ""
                  }`}>
                  {number}
                </button>
              ))
            ) : (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 bg-blue-400">
                {currentPage}
              </span>
            )}
            <button
              onClick={handleNextClick}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                isLastPage ? "hidden" : ""
              } hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}>
              <span className="sr-only">Next</span>
              <BiChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
