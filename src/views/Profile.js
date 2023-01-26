import { useEffect } from 'react';
import { findUserById } from '../api/user';
import ProfileActions from '../components/Profile/ProfileActions';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileTranslationsHistory from '../components/Profile/ProfileTranslationHistory';
import { STORAGE_KEY_USER } from '../const/storageKeys';

import { useUser } from '../context/UserContext';
import withAuth from '../hoc/withAuth';
import { storageSave } from '../utils/storage';

function Profile() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const findUser = async () => {
      const [error, latestUser] = await findUserById(user.id);
      if (error === null) {
        storageSave(STORAGE_KEY_USER, latestUser);
        setUser(latestUser);
      }
    };
    //findUser();
  }, [setUser, user.id]);

  return (
    <>
      <h1>Profile</h1>
      <ProfileHeader username={user.username} />
      <ProfileActions />
      <ProfileTranslationsHistory translations={user.translations} />
    </>
  );
}

export default withAuth(Profile);
