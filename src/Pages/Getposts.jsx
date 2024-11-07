import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, Postcard } from "../components/index";

export default function Getposts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getAllActivePosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
 
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
        {posts.map((post) => (
          <div key={post.$id} className='p-2 w-1/4'>
            <Postcard {...post} />
          </div>
        ))}
        </div>
        
      </Container>
    </div>
  );
}
