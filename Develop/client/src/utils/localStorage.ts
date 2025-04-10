// Defining the key once for clarity and consistency
const SAVED_KEY = 'saved_books';

export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem(SAVED_KEY)
    ? JSON.parse(localStorage.getItem(SAVED_KEY)!)
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr: string | any[]) => {
  if (bookIdArr.length) {
    localStorage.setItem(SAVED_KEY, JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem(SAVED_KEY);
  }
};

export const removeBookId = (bookId: string) => {
  const savedBookIds = localStorage.getItem(SAVED_KEY)
    ? JSON.parse(localStorage.getItem(SAVED_KEY)!)
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId: string) => savedBookId !== bookId);
  localStorage.setItem(SAVED_KEY, JSON.stringify(updatedSavedBookIds));

  return true;
};
