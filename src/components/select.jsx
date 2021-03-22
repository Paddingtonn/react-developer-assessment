import '../styles/components/select.scss';

import React, {useState, useEffect} from 'react';

const Select = ({data, chandleChange}) => {
  const [distinctCategories, setDistinctCategories] = useState(false);
  const categoriesList = [];

  if(data) {
    data.map(({categories}) => {
      categories.map(el => {
        categoriesList.push(el.name);
      });
    });
  };

  useEffect(() => {
    setDistinctCategories([... new Set(categoriesList)])
  }, [data]);

  return (
    <>
    {distinctCategories && (
      <section className='select-wrapper'>
        <select onChange={e => chandleChange(e.target)}>
          <option value="all" selected >Display all</option>
          {distinctCategories.map(option => {
            return (
              <option value={option}>{option}</option>
            );
          })}
        </select>
      </section>
    )}
  </>
  );
};

export default Select;