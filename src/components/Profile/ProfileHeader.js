import './ProfileHeader.css';

function ProfileHeader({ username }) {
  return (
    <header className='profile-header'>
      <h4>Hello, welcome back {username}</h4>
    </header>
  );
}

export default ProfileHeader;
