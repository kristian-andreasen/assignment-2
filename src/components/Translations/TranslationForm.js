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
    reset({regularText: ''})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} class="translationsForm">
      <fieldset>
        <label htmlFor='translations'>Translation</label>
        <input type='text' {...register('regularText')} class="translation-input"/>
      </fieldset>
      <button type='submit'>Translate!</button>
      <TranslatedList signs={signs} />
    </form>
  );
}

export default TranslationForm;
