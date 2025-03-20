const dummy=(blogs)=>{

return 1
}



const getTotalLikes=(blogs)=>{

    let totalLikes=0

    totalLikes= blogs.reduce( (sum,item)=> sum + item.likes, 0)

   /* if(blogs && blogs.Length>0)
    {
       totalLikes= blogs.reduce( (sum,item)=> sum + item.likes, 0)
    }
       */

    return totalLikes

}


module.exports= {
    dummy, getTotalLikes
}