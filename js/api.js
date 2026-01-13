export async function fetchTranslation(word) {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!res.ok) throw new Error('Błąd sieci');

    const data = await res.json();
    const translated = data?.responseData?.translatedText;

    if (!translated || translated.toLowerCase() === word.toLowerCase()) {
      throw new Error('Zła odpowiedź z API');
    }

    return translated;
  } catch (e) {
    console.warn('brak API- słownik offline');

    const fallback = {
      apple: 'jabłko',
      book: 'książka',
      house: 'dom',
      sun: 'słońce',
      car: 'samochód',
      cat: 'kot',
      dog: 'pies',
      tree: 'drzewo',
      water: 'woda',
      school: 'szkoła'
    };

    return fallback[word.toLowerCase()] || '---';
  }
}
