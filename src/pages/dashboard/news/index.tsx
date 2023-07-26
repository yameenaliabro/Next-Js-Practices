import { dummyjsonType } from '@src/types/data'
import { Card, Typography, Image, message } from 'antd'
import axios from 'axios'
import { useState, useEffect } from "react"

const NewsDashboard = () => {
  const [newsitem, setnewsitem] = useState<dummyjsonType[]>([])
  const { Meta } = Card

  useEffect(() => {

  }, [])

  return (
    <div className='flex justify-center m-10'>
      <Typography.Title>News Dashboard</Typography.Title>
      <div className='flex justify-center flew'>
        {newsitem.map((item, index) => {
          return (
            <Card key={index}
              className='w-300 m-10'
              hoverable
              cover={<Image src={item.thumbnail} alt='this is a duumy image' preview={false} />}
              bordered={true}
            >
              <Meta title={item.title} description={item.description}></Meta>

            </Card>
          )
        })}
      </div>
    </div>


  )
}

export default NewsDashboard