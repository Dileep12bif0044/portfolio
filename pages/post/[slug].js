import ImageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import {DetailPageWrapper} from '../../styles/Post.js'
import { useState, useEffect } from 'react'
import Navbar from '../../components/navbar'

const Post = ({ title, body, image }) => {
    const [imageUrl, setImageUrl] = useState('')
    useEffect(() => {
        const imgUrl = ImageUrlBuilder({
            projectId: 'i7qan6hi',
            dataset: 'production'
          })
        setImageUrl(imgUrl.image(image))
    }, [image])

    return (
        <DetailPageWrapper>
            <Navbar />
            <div className="detail-body">
                <div>
                    <h1>{title}</h1>
                    {imageUrl && <img className="main-image" alt='imagetext' src={imageUrl} />}
                    <div>
                        <BlockContent blocks={body} />
                    </div>
                </div>
            </div>
        </DetailPageWrapper>
    )
}

export const getServerSideProps = async (pageContext) => {
    const blogPageSlug = pageContext.query.slug
    const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${blogPageSlug}" ]`)
    const url = `https://i7qan6hi.api.sanity.io/v1/data/query/production?query=${query}`

    const result = await fetch(url).then(res => res.json())
    const post = result.result[0]

    if (!post) {
        return {
            notFound: false
        }
    }
    else {
        return {
            props: {
                body: post.body,
                title: post.title,
                image: post.mainImage
            }
        }
    }

}

export default Post