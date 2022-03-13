import React, {useEffect} from 'react'
import axios from 'axios'

const test = () => {
    useEffect(() => {
        axios.post("http://localhost:4000/graphql", {
            query: `
            query ExampleQuery {
                users {
                  firstname
                  surename
                  posts {
                    postText
                    comments {
                      commentText
                      ownUser {
                        firstname
                        surename
                      }
                    }
                  }
                }
              }
              
            `
        }).then((res)=>{
            console.log(res.data);
            
        })
    },[])
  return (
    <div>test</div>
  )
}

export default test
