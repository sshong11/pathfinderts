import React from "react"

function AllPosts() {

    const url: string = "https://seir-todos.herokuapp.com/todos/"

    const [posts, setPosts] = React.useState([])

    const [targetPost, setTargetPost] = React.useState([])

    const getPosts = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setPosts(data)
    }

    const addPosts = async (newPost: any) => {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
        getPosts()
    }

    const getTargetPost = (post: any) => {
        setTargetPost(post)
        // props.history.push("/edit")
    }

    const updatePost = async (post: any) => {
        const response = await fetch(url + post.id + "/", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })

        getPosts()
    }

    const deletePost = async (post: any) => {
        const response = await fetch(url + post.id + "/", {
            method: "delete"
        })

        getPosts()
    }


    React.useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>asdf</div>
    )
}

export default AllPosts