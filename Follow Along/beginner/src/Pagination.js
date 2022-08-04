const Pagination = ({props, page, handleChange, pageSize}) => {

  const numPages = Object.keys(props).length ? Math.floor(props.maxResults / pageSize) : 0;

  const goForward = () => {
    page++;
    updatePage();
  }

  const goBack = () => {
    page--;
    updatePage();
  }

  const updatePage = (event) => {
    if (event !== null) {
      if (page === event) {
        return;
      }
      page = event;
    }
    handleChange(page);
  }

  return (
    <div className="pagination-container">
      <button onClick={page > 0 ? goBack : null} className={page > 0 ? '' : 'btn-disable'}>{'< Prev'}</button>
      {[...Array(numPages + 1)].map((e, i) => (
        // eslint-disable-next-line
        <div key={i} className={page === i ? 'pagination-item page-selected' : 'pagination-item'}  onClick={() => updatePage(i)}>
          <span>{i + 1}</span>
        </div>
      ))}
      <button onClick={props.hasNext ? goForward : null} className={props.hasNext ? '' : 'btn-disable'}>{'Next >'}</button>
    </div>
  );
};

export default Pagination;
