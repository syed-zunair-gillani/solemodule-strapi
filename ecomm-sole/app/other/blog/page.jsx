import { Axios } from "@/config/Axios";
import BlogTemp from "@/template/blogs";
var qs = require('qs')

async function getData() {
  const params = qs.stringify({
    populate: [
      'Image', 'category', "Tags"
    ]
  })

  const blogs = await Axios.get(`/blogs?${params}`);
  const data = blogs.data?.data;
  console.log("🚀 ~ getData ~ data: 123", data)
 
  return {
    data
  }
}


export default async function blogMasonry() {
  const { data } = await getData()
  return (
    <>
      <BlogTemp blogsData={data}/>
    </>
  );
}
