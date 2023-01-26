import './TranslatedList.css';

const TranslatedList = ({ signs }) => {
  return (
    <ul className='translated-list'>
      {signs.map((sign, index) => (
        <li className='translated-list__item' key={index}>
          <img
            className='translated-list__img'
            src={sign.image}
            alt={sign.letter}
          />
        </li>
      ))}
    </ul>
  );
};

export default TranslatedList;
