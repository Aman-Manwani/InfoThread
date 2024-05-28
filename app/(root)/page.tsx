import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";

const Home = async() => {

  const result = await fetchPosts(1,20);
  console.log(result);
  const user = currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section>
        {result.posts.length === 0 ? (
          <p className="no-result">No posts found</p>
          ) : (
          result.posts.map((post) => (
            <ThreadCard
              key = {post._id} 
              id = {post._id}
              currentUserId = {user?.id}
              parentId = {post.parentId}
              content = {post.text}
              author = {post.author}
              community = {post.community}
              createdAt = {post.createdAt} 
              comments = {post.children}
            />
          )))
        }
      </section>
    </>
  )
}

export default Home;