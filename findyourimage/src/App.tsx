import { useEffect, useState, FormEvent } from 'react';
import './App.css';
import { image_interface } from "./components/image";
import ImageComponent  from './components/image_component';

function App() {
  const [imagesFound, setImagesFound] = useState<image_interface[]>([]);
  const [query, setQuery] = useState('');
  const key = "28585010-4be9d592cc591b4690d5b3833";

  const searchimage = async (the_query: String): Promise<image_interface[]> => {
    const result = await fetch(`https://pixabay.com/api/?key=${key}&q=${the_query}&image_type=photo&pretty=tr
    ue`);
    return (await result.json()).hits;
  }

  useEffect(() => {
    (async () => {
      const the_query = encodeURIComponent(query);
      const response = await searchimage(the_query);
      setImagesFound(response);
    })();
  }, [query]);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setQuery(input.value);
    input.value = '';
  };

  return (
    <div className="App">
      <h1 className="title">Ylan image search engine</h1>
      <form className="searchForm" onSubmit={event => search(event)} >
        <input id="searchText" type="text" placeholder="Yellow Flowers..."/>
      </form>
      {query && <p>Results for {query}...</p>}
      <div className="images-container">
        {imagesFound.length != 0 &&
          imagesFound.map(image => (<ImageComponent key={image.href} Images={image}></ImageComponent>))
        }
      </div>
    </div>
  );

}

export default App;
