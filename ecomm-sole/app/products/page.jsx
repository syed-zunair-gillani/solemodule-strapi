import { Axios } from "@/config/Axios";
import ProductsTemp from "@/template/products";
var qs = require('qs')

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

async function Home() {
  const { data } = await getData()
  return (
    <>
      <ProductsTemp data={data}/>
    </>
  );
}

export default Home;
