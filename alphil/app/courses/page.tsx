import Director from '@/components/Director'
import Footer from '@/components/Footer'
import ProgramsCards from '@/components/ProgramsCards'
import React from 'react'

const page = () => {
  return (
    <div>
      <li className='text-[1.2rem] m-[2.5rem] '>Our Courses</li>
  
       <h1 className='text-4xl m-[2.5rem] '>Education That Sets You Apart. How alphil played a part in shaping these students lives</h1>
       <hr />

       <ProgramsCards />
       <section>
        <Director />
       </section>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default page