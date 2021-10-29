export default function fetchImages(query, page) {
    return fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=23320531-e67f94e9f6229e6b46894ace7&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((r) => r.json())
}