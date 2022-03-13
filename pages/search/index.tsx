import Layout from '@/components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IPost, IUser } from 'types'
import PostCard from '@/components/Posts'
import { type } from 'os'

const Search = () => {
  const [selectFilter, setSelectFilter] = useState<string>('user')
  const [posts, setPosts] = useState<IPost[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [me, setMe] = useState<IUser>()
  const router = useRouter()

  const fethcMe = async () => {
    const res = await axios.get('http://localhost:3001/user/me', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    setMe(res.data)
  }

  const fetchUser = async (search?: string) => {
    const res = await axios.get(
      `http://localhost:3001/search?type=${selectFilter}&q=${search || ''}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    setUsers(res.data || [])
  }

  const fetchPost = async (category?: string) => {
    const res = await axios.get(
      `http://localhost:3001/post/search?q=${category}`,
    )
    setPosts(res.data)
  }

  const fetchText = async (search?: string) => {
    const res = await axios.post(`http://localhost:4000/graphql/`, {
      query: `query($text: String) {
        searchPostByText(text: $text) {
          postText
          timePost
          categoryId {
            name
          }
          commentId {
            commentText
            ownUserId {
              firstname
              surename
              img
              username
            }
          }
          markId {
            _id
            userId {
              _id
            }
          }
          ownUserId {
            firstname
            surename
            _id
            img
          }
        }
      }
      `,
      variables: {
        text: search,
      },
    })
    // console.log(res.data.data.searchPostByText)

    setPosts(res.data.data.searchPostByText || [])
  }

  const handleSearch = async (search?: string) => {
    if (selectFilter === 'user') {
      fetchUser(search)
    } else if (selectFilter === 'text') {
      fetchText(search)
    } else {
      fetchPost(search)
    }
  }

  useEffect(() => {
    if (router.query?.q) {
      handleSearch(router.query.q as string)
    }
  }, [router.query, selectFilter])

  useEffect(() => {
    fethcMe()
  }, [])

  return (
    <Layout>
      <div className="">
        <select
          className="outline-none rounded-lg px-2 py-1 select-none border border-black"
          value={selectFilter}
          onChange={(e) => setSelectFilter(e.target.value)}
        >
          <option value="user">User</option>
          <option value="category">Category</option>
          <option value="text">Text</option>
        </select>
        <div className="mt-12 space-y-3">
          {selectFilter == 'user' ? (
            <>
              {users.map((e) => (
                <div
                  key={e._id}
                  onClick={() => router.push(`/user/${e._id}`)}
                  className="flex space-x-3 bg-white shadow-lg p-2 rounded-lg cursor-pointer"
                >
                  <img
                    src={e.img}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <div>
                      {e.firstname} {e.surename}
                    </div>
                    <div className="text-[12px]">@ {e.username}</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {posts.map((e) => (
                <PostCard
                  post={e}
                  user={e.ownUserId}
                  me={me}
                  refetch={() => fetchPost(router.query.q as string)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Search
// rafce snippet เพื่อ export component ตามชื่อไฟล์
