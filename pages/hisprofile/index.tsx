import Layout from "@/components/layout";
import InfoPost from "@/components/InfoPost";
import classes from "./index.module.scss";
import mockPost from "@/json/post.json";
import mockUser from "@/json/user.json";
import HisProfileZone from "@/components/hisprofileZone";
const Profile = () => {
  return (
    <div>
      <Layout>
        <HisProfileZone user={mockUser.users[1]} />
        {mockPost.post.map((mockPost) => {
          return (
            <InfoPost
              key={mockPost.id}
              user={mockUser.users[1]}
              {...mockPost}
            />
          );
        })}
      </Layout>
    </div>
  );
};
export default Profile;
