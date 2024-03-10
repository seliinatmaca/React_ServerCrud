import getStatus from "./helpers/getStatus"




const Content = ({ todo, setIsMode, handleDelete }) => {
    return (
        <>
            <span>{getStatus(todo.status)}</span>
            <span>{todo.title}</span>

            <div className="btn-group">
                <button onClick={() => setIsMode(true)} className="btn btn-sm btn-primary">Düzenle</button>
                <button onClick={handleDelete} className="btn btn-sm btn-danger"> Sil</button>
            </div>
        </>
    )
}

export default Content
