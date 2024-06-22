import LandingTemp from "@/template/landing";
var qs = require('qs')
import { Axios } from "@/config/Axios";


async function getData() {
  const params = qs.stringify({
    populate: [
      'Images', 'Attributes', "Other_Attributes", "Reviews", "category"
    ]
  })

  const products = await Axios.get(`/products?${params}`);
  const data = products.data?.data;
 
  return {
    data
  }
}


export default async function Home() { 
  const { data } = await getData()

  return (
    <LandingTemp data={data}/>
  );
}
