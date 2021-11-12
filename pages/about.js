import Navbar from '../components/navbar'
import ImageUrlBuilder from '@sanity/image-url'
import { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react'
import {AboutWrapper} from '../styles/About.js'

export default function About ({ name, bio, mainImage, profession }) {
    const [imageUrl, setImageUrl] = useState('')
  
    useEffect(() => {
      const imgUrl = ImageUrlBuilder({
        projectId: 'i7qan6hi',
        dataset: 'production'
      })
      setImageUrl(imgUrl.image(mainImage))
    }, [mainImage])
  
    
    return (
      <>
      <Navbar />
      <AboutWrapper>
        <div className="main">
            { name ? 
                  <div>
                    <h1>Hola!</h1>
                    <h3> {name} </h3>
                    <h3> {profession} </h3>
                    {imageUrl && <img className="main-image" alt='imagetext' src={imageUrl} />}
                    <div>
                      <BlockContent blocks={bio} />
                    </div>
                  </div>
              : <>No Blog Found</>
            }
          </div>
      </AboutWrapper>
      </>
    )
  }
  
  
export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "about"]');
  const url = `https://i7qan6hi.api.sanity.io/v1/data/query/production?query=${query}`
  const result = await fetch(url).then(res => res.json());

  const about = result.result[0]

  if (!about) {
      return {
          notFound: false
      }
  }
  else {
      return {
          props: {
              bio: about.bio,
              name: about.name,
              profession: about.profession,
              mainImage: about.mainImage
          }
      }
  }
}