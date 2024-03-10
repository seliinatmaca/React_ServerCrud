import { useEffect, useState } from "react";
import Form from "./components/Form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";

//varsayılan olarak baseUrl ekle
// yapılan bütün isteklerin başında ki api url belirle

axios.defaults.baseURL = 'http://localhost:3030'

function App() {
  const [todos, setTodos] = useState(null);
  const [page, setPage] = useState(1)
  const [maxPageCount, setMaxPageCount] = useState()

  //bileşenin ekrana basılma olayını izle
  useEffect(() => {
    //apiden todo verlilerini alır
    axios.get('/todos', {
      timeout: 3000,
      timeoutErrorMessage: 'zaman aşımı',
      params: {
        _page: page,
        _per_page: 10
      }
    })
      .then((res) => {
        setMaxPageCount(res.data.pages)
        setTodos(res.data.data)
      })

      .catch((err) => {
        if (err.message === 'zaman aşımı') {
          alert('istek zaman aşımına uğradı')
        }
      })
  }, [page]);

  return (
    <div className="container p-3 p-md-5">
      <h1 className="text-center">
        ...server <span className="text-warning">CRUD</span>{" "}
      </h1>
      <Form setTodos={setTodos} />

      <ul className="list-group">
        {!todos && <Loader />}

        {todos?.map((todo) => (
          <ListItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>



      <div className="d-flex justify-content-between my-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary">
          {'<Geri'}
        </button>
        <span>{page}</span>
        <button disabled={page === maxPageCount} onClick={() => setPage(page + 1)} className="btn btn-primary">{'>İleri'}</button>

      </div>
    </div>
  );
}

export default App;
