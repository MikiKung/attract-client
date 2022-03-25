import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { ICategory, IUser } from '../../types'
import { create } from 'ipfs-http-client'
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

interface Props {
  user?: IUser
}

const PostInput: FC<Props> = (props) => {
  const [show, setShow] = useState<boolean>(false)
  const [showCategory, setShowCategory] = useState<boolean>(false)
  const [showInputCategory, setShowInputCategory] = useState<boolean>(false)

  const [image, setImage] = useState<string>()

  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([])

  const [categories, setCagtegories] = useState<ICategory[]>([])

  const [inputCategory, setInputCatagory] = useState<string>('')
  const [statusCate, setStatusCate] = useState(false)

  const [postText, setPostText] = useState<string>('')

  const fetchCategory = async () => {
    const res = await axios.get('http://localhost:3001/category')
    setCagtegories(res.data)
  }

  const addCategory = (category: ICategory) => {
    if (selectedCategories.some((e) => e.name == category.name)) {
      return
    }
    setSelectedCategories([...selectedCategories, category])
  }

  const removeCategory = (cateogry: ICategory) => {
    setSelectedCategories(
      selectedCategories.filter((e) => e._id !== cateogry._id),
    )
  }

  const postCategory = async () => {
    // console.log(inputCategory == '' );
    if (inputCategory != '') {
      setStatusCate(false)
      await axios.post('http://localhost:3001/category', {
        name: inputCategory,
      })
      fetchCategory()
      setInputCatagory('')
      setShowInputCategory(false)
    } else {
      setStatusCate(true)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      try {
        const { cid } = await ipfs.add({
          path: '/',
          content: e.target.files![0],
        })
        const url = `https://ipfs.infura.io/ipfs/${cid}`
        setImage(url)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }
    }
  }

  const post = async () => {
    await axios.post('http://localhost:3001/post', {
      postText: postText,
      ownUserId: props.user?._id,
      img: image,
      categoryId: selectedCategories.map((e) => e._id),
      timePost: new Date(),
    })
    clear()
  }

  const clear = () => {
    setShow(false)
    setShowCategory(false)
    setShowInputCategory(false)
    setImage('')
    setInputCatagory('')
    setSelectedCategories([])
    setPostText('')
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <div className="bg-white shadow-lg mb-4 rounded-lg p-4 pb-1 select-none relative">
      <div
        onClick={() => setShow(true)}
        className="flex items-center space-x-12 text-gray-500 border-b pb-4 border-gray-300"
      >
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={props.user?.img}
        />
        <div>What&apos;s on your mind, {props.user?.username}?</div>
      </div>
      <div className="grid grid-cols-2 mt-1 divide-x-2">
        <div
          onClick={() => setShow(true)}
          className="flex justify-center w-full hover:bg-gray-100 cursor-pointer p-1"
        >
          <img src="/image.svg" alt="" />
        </div>
        <div
          onClick={() => setShow(true)}
          className="flex justify-center w-full hover:bg-gray-100 cursor-pointer p-1"
        >
          <img src="/location.svg" alt="" />
        </div>
      </div>
      {show && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[60%] w-[60%] bg-white shadow-lg z-50 rounded-lg overflow-y-auto">
          <div className="relative">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-3">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={props.user?.img}
                />
                <div>
                  {props.user?.firstname} {props.user?.surename}
                </div>
              </div>
              <div onClick={() => setShow(false)} className="cursor-pointer">
                <img src="/cross.svg" className="w-6" />
              </div>
            </div>
            <div className="px-4 py-2">
              <textarea
                placeholder="Where have you traveled?"
                rows={6}
                className="w-full outline-none text-xl px-12"
                onChange={(e) => setPostText(e.target.value)}
                value={postText}
              ></textarea>

              <div className="flex flex-wrap gap-3 my-3">
                {selectedCategories.map((e) => (
                  <div className="bg-green-1 px-4 py-1 text-white select-none rounded-lg flex space-x-3">
                    <div>{e.name}</div>
                    <div
                      onClick={() => removeCategory(e)}
                      className="cursor-pointer"
                    >
                      <img src="/cross.svg" className="w-6" />
                    </div>
                  </div>
                ))}
              </div>

              {image && (
                <div className="flex justify-center  my-6 p-6">
                  <img src={image} className="h-[30rem] relative" alt="" />
                  <img src="/cross.svg" onClick={(e)=>{setImage("")}} className='absolute right-24 cursor-pointer select-none' alt="" />
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 bg-[#ededed] rounded-lg">
                  <div className="w-full flex justify-center hover:bg-[#cccccce7] cursor-pointer p-2 relative">
                    <input
                      type="file"
                      className="w-full h-full opacity-0 absolute top-0 right-0 cursor-pointer"
                      accept="image/png,image/jpeg,image/jpg"
                      onClick={(event: any) => {
                        event.target.value = null
                      }}
                      onChange={handleFileChange}
                    />
                    <img className="w-10" src="/image.svg" alt="" />
                  </div>
                  <div
                    onClick={() => setShowCategory(true)}
                    className="w-full flex justify-center hover:bg-[#cccccce7] cursor-pointer p-2 "
                  >
                    <img className="w-10" src="/location.svg" alt="" />
                  </div>
                </div>
                <div
                  onClick={post}
                  className="bg-green-1 text-white text-center w-full p-3 text-2xl rounded-lg cursor-pointer"
                >
                  Post
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
      {showCategory && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[40rem] h-[25rem] bg-white border border-[#BBBBBB] overflow-y-auto rounded-lg p-4 z-[99]">
          <div className="flex justify-end mb-3">
            <div
              onClick={() => setShowCategory(false)}
              className="cursor-pointer"
            >
              <img src="/cross.svg" className="w-6" />
            </div>
          </div>
          {/* <input
            type="text"
            placeholder="เลือกหมวดหมู่ที่เกี่ยวกับการท่องเที่ยวของคุณ"
            className="border border-[#C2C2C2] w-full px-4 py-2 rounded-lg mb-3"
          /> */}
          <div className='flex justify-center text-[18px] font-medium'>หมวดหมู่</div>
          <div className="divide-y-2 divide-y-[#C2C2C2]">
            {categories
              .filter((e) => e.name)
              .map((e) => (
                <div
                  onClick={() => addCategory(e)}
                  className="p-1 hover:bg-[#ededed] cursor-pointer"
                  key={e._id}
                >
                  {e.name}
                </div>
              ))}
            <div
              onClick={() => setShowInputCategory(true)}
              className="p-1 hover:bg-[#ededed] cursor-pointer"
            >
              เพิ่มหมวดหมู่ ++++
            </div>
          </div>
        </div>
      )}
      {showInputCategory && (
        <div className="bg-white border border-[#BBBBBB] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[30%] h-fit p-4 rounded-lg z-[999]">
          <div className="flex justify-between">
            <div className="font-medium">ชื่อหมวดหมู่ที่ต้องการเพิ่ม</div>
            <div
              onClick={() => setShowInputCategory(false)}
              className="cursor-pointer"
            >
              <img src="/cross.svg" className="w-6" />
            </div>
          </div>
          <input
            value={inputCategory}
            onChange={(e) => setInputCatagory(e.target.value)}
            type="text"
            placeholder="เลือกหมวดหมู่ที่เกี่ยวกับการท่องเที่ยวของคุณ"
            className="border border-[#C2C2C2] w-full px-4 py-2 rounded-lg my-3"
          />
          {statusCate ? <div>*this input is require</div> : <></>}
          <div
            onClick={postCategory}
            className="text-white bg-green-1 w-full py-2 rounded-lg text-center cursor-pointer text-2xl"
          >
            Done
          </div>
        </div>
      )}
    </div>
  )
}

export default PostInput
