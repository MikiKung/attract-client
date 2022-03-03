import Layout from '@/components/layout'
import InfoPost from '@/components/InfoPost'
import mockPost from '@/json/post.json'
import mockUser from '@/json/user.json'
import EditMyProfileZone from '@/components/editmyprofileZone'
const EditMyProfile = () => {
  return (
    <div>
      <Layout>
        <EditMyProfileZone user={mockUser.users[1]} />
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
export default EditMyProfile
