import '../styles/pages/detail.scss';

const Detail = ({details: {summary, publishDate}}) => {

  return (
    <section className='detail-wrapper'>
      <h3>Summary:</h3>
      <p>{summary}</p>
      <h3>Publish date:</h3>
      <p>{publishDate}</p>
    </section>
  )
}

export default Detail;