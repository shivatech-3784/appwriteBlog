import React,{ useEffect} from 'react'
import service from '../appwrite/config'
import { Container,PostCard } from '../components'

function AllPost() {
    const [posts,setposts] = React.useState([])
    useEffect(() => {
         service.getPosts().then((posts) =>{
        if(posts){
            setposts(posts.documents)
        }
    });  
    },[])
   

  return (
    <div className='w-full py-8'>
      <Container>
          <div className='flex flex-wrap'>
             {
                posts.map((post) =>(
                    <div key={post.$id} className='w-1/4 p-2'>
                        <PostCard
                          {...post}
                        />
                    </div>   
                ))
             }
          </div>
      </Container>

    </div>
  )
}

export default AllPost
