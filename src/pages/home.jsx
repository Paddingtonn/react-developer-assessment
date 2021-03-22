import '../styles/pages/home.scss';

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/select';
import ReactPaginate from 'react-paginate';

const Home = ({handleDetail}) => {
  const [data, setData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  const perPage = 5;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(data.length / perPage);
  const renderSelected = [];

  const chandleChange = ({value}) => {
    setSelectedCategory(value);
  };
  const handlePageClick = ({selected: selectedPage}) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    fetch('/api/posts')
      .then(res => {
        if(!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(({posts}) => {
        setData(posts)
      })
  }, []);

  const listElements = (title, id, name, avatar, summary, publishDate) => {
    return (
      <li>
        <h3>{title}</h3>
        <h4 key={id}>By {name}</h4>
        <img src={avatar}></img>
        <Link onClick={() => handleDetail({summary, publishDate})} to='/detail'>Detail</Link>
      </li>
    );
  };

  if(selectedCategory && selectedCategory !== 'all') {
    data.map((el) => {
      el.categories.some(category => {
        return (
          category.name === selectedCategory && (
            renderSelected.push(el)
          )
        );
      });
    });
  };

  console.log(data)
  return (
      <div className='main'>
        <Select chandleChange={chandleChange} data={data}></Select>
        {selectedCategory && selectedCategory !== 'all' ? (
          <h2>{selectedCategory}</h2>
        ) : (
          <section className='pagination-wrapper'>
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </section>
        )
      }
      <section className='list-wrapper'>
        <ul>
          {data && !renderSelected.length ? (
            data.slice(offset, offset + perPage).map(({title, id, summary, publishDate, author: {name, avatar}}) => {
              return listElements(title, id, name, avatar, summary, publishDate);
            })
          ) : (
            renderSelected.map(({title, id, summary, publishDate, author: {name, avatar}}) => {
              return listElements(title, id, name, avatar, summary, publishDate);
            })
          )}
        </ul>
      </section>
    </div>       
)}

export default Home;