import axios from "axios"
import formatDate from "./helpers/formatDate"
import getStatus from "./helpers/getStatus"
import { useState } from "react"
import Content from "./Content"
import EditMode from "./EditMode"




const ListItem = ({ todo, setTodos }) => {

    const [isEditMode, setIsMode] = useState(false)




    //silme butonuna tıklanınca çalışır
    const handleDelete = () => {
        //veriyi apiden sil
        axios.delete(`todos/${todo.id}`)
            //veriyi stateden sil
            .then(() => setTodos((todos) => todos.filter((item) => item.id !== todo.id)))
    }

    //form gönderilmesinde çalışır
    const handleEdit = (e) => {
        e.preventDefault()

        //inputlarda ki veriyi al
        const newStatus = e.target[0].value
        const newTittle = e.target[1].value
        //apideki ilgili todoyu güncelle
        axios.patch(`/todos/${todo.id}`, {
            title: newTittle,
            status: newStatus
        })
            // api isteği başarılı olursa
            .then(() => {

                //arayüzü güncelle
                //statedeki eski todoyu kaldır yerine yenisini koy

                // todonun title  ve statusunu güncelle
                const updated = { ...todo, status: newStatus, title: newTittle }

                //dizideki eski todoyu kaldır yerine yenisni koy
                // eğer ki eleman güncellenicek eleman ise
                // o zaman diziye güncel haline ekle
                //değilse dizide ki halini koru
                const newTodos = todos.map((todo) => todo.id === updated.id ? updated : todo)

                //state güncelle
                setTodos(newTodos)
            })


        //düzenleme modunu kapat
        setIsMode(false);
    }



    return (
        <li className="relative p-3 list-group-item d-flex justify-content-between align-items-center gap-3">
            {!isEditMode ? <Content
                todo={todo}
                setIsMode={setIsMode}
                handleDelete={handleDelete} /> :
                <EditMode todo={todo}
                    setIsMode={setIsMode}
                    handleEdit={handleEdit} />}


            <span className="date">{formatDate(todo.date)}</span>


        </li>
    )
}

export default ListItem
