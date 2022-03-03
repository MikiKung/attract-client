import Layout from "@/components/layout";
import InfoPost from "@/components/InfoPost";
import mockPost from "@/json/post.json";
import mockUser from "@/json/user.json";
const Recommand = () => {
  return (
    <div>
      <Layout>
        {mockPost.post.map((e) => (
          <InfoPost user={mockUser.users[0]} {...e}></InfoPost>
        ))}
      </Layout>
    </div>
  );
};
export default Recommand;
