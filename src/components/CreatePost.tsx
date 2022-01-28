import React from "react"
import EditPost from "./EditPost"

function CreatePost() {

    const [newForm, setNewForm] = React.useState({
        id: "",
        subject: "",
        details: "",
    })

    const url: string = "https://seir-todos.herokuapp.com/todos/"

    const [posts, setPosts] = React.useState([])


    const getPosts = async (): Promise<any> => {
        const response = await fetch(url)
        const data = await response.json()
        setPosts(data)
    }


    const addPosts = async (newPost: any): Promise<any> => {
        await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
        getPosts()
    }


    const updatePost = async (post: any): Promise<any> => {
        await fetch(url + post.id + "/", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })

        getPosts()
    }

    const deletePost = async (post: any): Promise<any> => {
        await fetch(url + post.id + "/", {
            method: "delete"
        })

        getPosts()
    }


    React.useEffect(() => {
        getPosts()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewForm({...newForm, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        addPosts(newForm)
        setNewForm({
            id: "",
            subject: "",
            details: ""
        })
    }

    const [showEdit, setShowEdit] = React.useState(false)

    const loading = () => {
        return <h1>Loading</h1>
    }

    const loaded = (): any => {
        return posts.map((post: any) => (
            <div>
                <h1>{post.subject}</h1>
                <button onClick={() => deletePost(post)} id="delete">Delete</button>
                <button onClick={() => setShowEdit(true)} id="edit">Edit</button>
                {showEdit ? <EditPost post={post} updatePost={updatePost}/> : null}
            </div>
        ))
    }
    

    return (<div className="posts">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newForm.subject}
                name="subject"
                placeholder="Post"
                id={newForm.id}
                onChange={handleChange}
            />
            <input type="submit" value="Create New Post" />
        </form>
        {posts ? loaded() : loading()}
        </div>
    )
}

export default CreatePost