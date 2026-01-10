export const fetchTranslation = async (word) => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|pl`
    );
    const data = await response.json();
    return data.responseData.translatedText || 'no translation';
  } catch (err) {
    console.error(err);
    return 'translation error';
  }
};
