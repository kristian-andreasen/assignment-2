import './TranslationForm.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SIGNS } from '../../const/characters';
import TranslatedList from './TranslatedList';

import { useUser } from '../../context/UserContext';
import { storeTranslation } from '../../api/translation';
import { storageSave } from '../../utils/storage';
import { STORAGE_KEY_USER } from '../../const/storageKeys';

function TranslationForm({ username }) {
  const { user, setUser } = useUser();
  const { register, handleSubmit, reset } = useForm();

  const [signs, setSigns] = useState([]);

  function onSubmit(data) {
    const userInput = data.regularText;
    const isValid = userInput.match(/^[A-Za-z\s]+$/);

    if (!isValid) {
      alert('Input should only contain letters from the english alphabet');
      return;
    }
    storeTranslation(user, userInput).then(([error, result]) => {
      if (error) {
        console.log(error);
        return;
      }
      //keep UI state and server state in sync
      storageSave(STORAGE_KEY_USER, result);
      //update context state
      setUser({ ...user, translations: [...user.translations, userInput] });
    });

    const translatedText = [];

    for (let char of userInput) {
      // find the signs that matches the characters of the input
      const matchedSign = SIGNS.find(
        (sign) => sign.letter === char.toLowerCase()
      );

      // if a sign was found, add it to the signs array
      if (matchedSign) {
        translatedText.push(matchedSign);
      } else {
        console.log(`No sign found for character: ${char}`);
      }
    }

    // Here you can use the array of signs to render them in the component
    setSigns(translatedText);
    console.log(translatedText);
    reset({ regularText: '' });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} class="translationForm">
        <fieldset>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
          <input
            type="text"
            {...register('regularText')}
            class="translation-input"
          />
          <button type="submit" class="translate-btn">
            Translate!
          </button>
        </fieldset>
      </form>
      <TranslatedList signs={signs} />
    </>
  );
}

export default TranslationForm;
