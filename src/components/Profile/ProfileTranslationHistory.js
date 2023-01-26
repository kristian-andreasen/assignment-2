import ProfileTranslationHistoryItem from './ProfileTranslationHistoryItem';
import './ProfileTranslationHistory.css';

function ProfileTranslationsHistory({ translations }) {
  const translationList = translations
    .slice(-10)
    .map((translation, index) => (
      <ProfileTranslationHistoryItem
        key={index + '-' + translation}
        translation={translation}
      />
    ));

  return (
    <section>
      <h4>Your translation history</h4>
      <ul>{translationList}</ul>
    </section>
  );
}

export default ProfileTranslationsHistory;
