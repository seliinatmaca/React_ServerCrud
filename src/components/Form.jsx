import axios from "axios"
import { v4 } from "uuid"


const Form = ({ setTodos }) => {
    const handleSubmit = (e) => {
        e.preventDefault()

        //formdan verileri al
        const title = e.target[0].value
        const status = e.target[1].value
        //inputu kontrol et
        if (!title) {
            return alert("lütfen başlık yazınız")
        }



        //veri tabanına eklenecek veriyi hazırla
        const newTodo = {
            title: title,
            status: status,
            id: v4(),
            date: new Date().toLocaleDateString(),
        }
        //oluşturduğumuz todyu ekrana ekle

        //AXİOS
        axios.post('/todos', newTodo)
            //api isteği başarılı olursa newTodoty state ekle

            //api isteği başarılı olursa newTodoyu state ekle
            .then(() => setTodos((prev) => [newTodo, ...prev]))
            //api isteği başarısız olursa
            .catch(() => alert('üzgünüz bir sorun oluştu'))



    }

    return (
        <form onSubmit={handleSubmit} className="d-flex justify-content gap-3 my-5">
            <input
                placeholder="ör:react projesi yap"
                className="form-control shadow" type="text" />

            <select className="form-select w-50 shadow">
                <option>Varsayılan</option>
                <option value='important'>Önemli</option>
                <option value='daily'>Günlük</option>
                <option value='job'>İş</option>
            </select>


            <button type="submit" className="btn btn-primary shadow">Gönder</button>
        </form>
    )
}

export default Form
