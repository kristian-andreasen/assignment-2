import { Link } from 'react-router-dom';
import { STORAGE_KEY_USER } from '../../const/storageKeys';
import { useUser } from '../../context/UserContext';
import { storageDelete } from '../../utils/storage';
import { translationClearHistory } from '../../api/translation';
// ProfileActions.js
import './ProfileActions.css';


function ProfileActions() {
  const { user, setUser } = useUser();

  function handleLogoutClick() {
    if (window.confirm('Are you sure?')) {
      storageDelete(STORAGE_KEY_USER);
      setUser(null);
    }
  }

  const handleClearTranslations = () => {
    translationClearHistory(user.id, user.translations).then(
      ([error, result]) => {
        if (error) {
          console.log(error);
          return;
        }
        setUser({ ...user, translations: result.translations });
      }
    );
  };

  return (
    <ul className="profile-actions">
      <li>
        <Link to='/translations'>Translations</Link>
        <li>
          <button onClick={ handleClearTranslations}>
            Clear translations
          </button>
        </li>
        <li>
          <button onClick={handleLogoutClick}>Logout</button>
        </li>
      </li>
    </ul>
  );
}

export default ProfileActions;
