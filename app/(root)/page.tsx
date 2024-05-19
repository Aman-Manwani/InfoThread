import { fetchThreads } from "@/lib/actions/thread.action";

const  Home = async() => {

  const posts = await fetchThreads();

  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
    </div>
  )
}

export default Home;