import Head from 'next/head'
import Navbar from '../components/navbar'
import ImageUrlBuilder from '@sanity/image-url'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {HomePageWrapper} from '../styles/Index.js'

export default function Home({ postsData }) {
  const router = useRouter();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (postsData.length) {
      const imgUrl = ImageUrlBuilder({
        projectId: 'i7qan6hi',
        dataset: 'production'
      })
      setPosts(
        postsData.map(post => {
          return {
            ...post,
            mainImage: imgUrl.image(post?.mainImage).width(500).height(250)
          }
        })
      )
    } else {
      setPosts([])
    }

  }, [postsData])

  return (
    <HomePageWrapper>
      <Head>
        <title>Blogs!</title>
      </Head>
      <Navbar />
      <div className="main">
        <h1>
          Hola!, Blogs with good components
        </h1>
        <div>
          {posts.length ? posts.map((post, index) => {
            return (
              <div onClick={() => router.push(`/post/${post.slug.current}`)} key={index}>
                <h3> {post.title} </h3>
                <img alt='Blog Text' src={post.mainImage} />
              </div>
            )
          }) : <>No Blog Found</>}
        </div>
      </div>
    </HomePageWrapper>
  )
}


export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "post"]');
  const url = `https://i7qan6hi.api.sanity.io/v1/data/query/production?query=${query}`
  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        postsData: []
      }
    }
  }
  else {
    return {
      props: {
        postsData: result.result
      }
    }
  }
}