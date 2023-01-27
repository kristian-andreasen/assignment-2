import TranslationForm from '../components/Translations/TranslationForm';
import withAuth from '../hoc/withAuth';

function Translations() {
  return (
    <div>
      <div class="header-line"></div>¨<h1>Translations</h1>
      <section id="translation-input">
        <TranslationForm />
      </section>
    </div>
  );
}

export default withAuth(Translations);
