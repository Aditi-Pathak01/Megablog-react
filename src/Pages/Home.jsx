import React, { useState } from "react";
import service from "../appwrite/config";
import { Container, Postcard } from "../components/index";

export default function Home() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    service.getAllActivePosts().then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  if (post.length === 0) {
    return (
      <div>
        <h1>Please Login To Read Posts</h1>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
