import { createHeaders } from '.';

const apiURL = process.env.REACT_APP_API_URL;

export async function storeTranslation(user, translation) {
  try {
    const response = await fetch(`${apiURL}/${user.id}`, {
      method: 'PATCH',
      headers: createHeaders(),
      body: JSON.stringify({
        translations: [...user.translations, translation],
      }),
    });
    if (!response.ok) {
      throw new Error('Could not update translation');
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

export async function translationClearHistory(userId, translations) {

  try {
    const response = await fetch(`${apiURL}/${userId}`, {
      method: 'PATCH',
      headers: createHeaders(),
      body: JSON.stringify({
        translations: [],
      }),
    });
    if (!response.ok) {
      throw new Error('Could not clear translation history');
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}
