import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import MyProfileZone from '@/components/myprofileZone'
const MyProfile = () => {
  return (
    <div>
      <Layout>
        <MyProfileZone user={mockUser.users[1]} />
        {mockPost.post.map((mockPost) => {
          return (
            <InfoPost
              key={mockPost.id}
              user={mockUser.users[1]}
              {...mockPost}
            />
          )
        })}
      </Layout>
    </div>
  )
}
export default MyProfile
