import React from "react"

interface AppProps {
    post: any,
    updatePost: any,
}

function EditPost({post, updatePost} : {post:any, updatePost: any}) {

    const [editForm, setEditForm] = React.useState(post)

    console.log(editForm)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({...editForm, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        updatePost(editForm)
    }
        
    return (<form onSubmit={handleSubmit}>
        <input
            type="text"
            value={editForm.subject}
            name="subject"
            onChange={handleChange}
        />
        <input type="submit" value="Finish" />
    </form>)
}

export default EditPost