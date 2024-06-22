



import { Axios } from '@/config/Axios';
import SingleBlogPostTemp from '@/template/single-blog-post'
import React from 'react';
var qs = require('qs')

async function getData(slug) {
  const params = qs.stringify({
    populate: [
      'Image', 'category', "Tags"
    ],
    'filters[Slug][$eq]': slug
  })

  console.log("🚀 ~ getData ~ params:", params)

  const blogs = await Axios.get(`/blogs?${params}`);
  const data = blogs.data.data?.[0]?.attributes  ;
  console.log("🚀 ~ getData ~ data:", data)
 
  return {
    data: data
  }
}

async function PostDetail(props) {
  const { data } = await getData(props?.params?.slug)
  return (
    <>
      <SingleBlogPostTemp data={data}/>
    </>
  );
}

export default PostDetail;

