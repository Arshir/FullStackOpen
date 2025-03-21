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

const getFavouriteBlog =(blogs)=>{

    let favoriteBlog ={title, author,likes}= blogs.sort((a,b)=>(b.likes -a.likes))[0]
     

    return  favoriteBlog
}


module.exports= {
    dummy, getTotalLikes,getFavouriteBlog
}