import { Pagination } from "react-bootstrap"
import "./CardsListingPagination.css"

const CardsListingPagination = ({ page, setPage, totalPages }) => {

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber)
    }
  }

  const getPaginationItems = () => {
    const items = []
    items.push(
      <Pagination.Item
        key={1}
        active={1 === page}
        onClick={() => handlePageChange(1)}
      >
        {1}
      </Pagination.Item>
    )

    if (page > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis-1" />)
    }


    for (let number = Math.max(2, page - 1); number <= Math.min(totalPages - 1, page + 1); number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      )
    }

    if (page < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis-2" />)
    }

    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === page}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      )
    }

    return items
  }

  return (
    <Pagination className="custom-pagination justify-content-center pt-5" size="sm">
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
      {getPaginationItems()}
      <Pagination.Next onClick={() => handlePageChange(page + 1)} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  )
}

export default CardsListingPagination