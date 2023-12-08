const apiKey = '40357504-569de062b9af68d468be4e854';
const apiUrl = 'https://pixabay.com/api/';
const searchImages = async (query, page = 1) => {
  const url = `${apiUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const images = data.hits.map((item) => ({
      id: item.id,
      webformatURL: item.webformatURL,
      largeImageURL: item.largeImageURL,
    }));

    return images;
  } catch (error) {
    throw error;
  }
};

export { searchImages }; 
