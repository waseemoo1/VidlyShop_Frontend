import _ from "lodash";
import PropTypes from 'prop-types';

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange, onNextClick, onPervClick }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          onClick={onPervClick}
          style={{ padding: 0 }}
          className={currentPage === 1 ? "page-item btn disabled" : "page-item btn"}
        ><a className="page-link">Previous</a></li>
        {
          pages.map(page =>
            <li
              key={page}
              style={{ padding: 0 }}
              className={page === currentPage ? "page-item btn active" : "page-item btn"}
            >
              <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
            </li>)
        }
        <li
          onClick={onNextClick}
          style={{ padding: 0 }}
          className={currentPage === pagesCount ? "page-item btn disabled" : "page-item btn"}
        ><a className="page-link">Next</a></li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPervClick: PropTypes.func.isRequired,
};

export default Pagination;