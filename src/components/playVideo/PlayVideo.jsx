import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/dislike.png'
import jack from '../../assets/jack.png'
import save from '../../assets/save.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
    const {videoId}=useParams()
    const [apiData,setApiData] = useState(null);
    const[channeldata,setChannelData] =useState(null)
    const[commentData,setcommentData]=useState([])


  const fetchVideoData = async()=>{
    //fetching the videos data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=1000&regionCode=US&id=${videoId}&key=${API_KEY} `
    await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
  }

  const fetchOtherData =async()=>{
    //fetching the data related to the owner of the video,channnel name , subscribers etcc
    const channelData_url= `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&maxResults=1000&regionCode=US&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))


    //fething comments data
    const comment_url =`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=15&regionCode=US&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(res=>res.json()).then(data=>setcommentData(data.items))
  }

  useEffect(()=>{
    fetchVideoData()

  },[videoId])

useEffect(()=>{
    fetchOtherData()

},[apiData])


    return (
        <div className='play-video'>

            <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData?apiData.snippet.title:"Title is  here"}</h3>
            <div className="play-video-info">
                <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"}views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
                <div>
                    <span> <img src={like} alt="" /> {apiData?value_converter(apiData.statistics.likeCount):"155"}</span>
                    <span> <img src={dislike} alt="" /></span>
                    <span> <img src={share} alt="" /> Share</span>
                    <span> <img src={save} alt="" /> Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channeldata?channeldata.snippet.thumbnails.default.url:""} alt="" />
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:"Code with sarv"}</p>
                    <span>{channeldata?value_converter(channeldata.statistics.subscriberCount):"1M"} subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?apiData.snippet.description.slice(0,250):"Description here"}</p>
                <hr />
                <h4>{apiData?value_converter(apiData.statistics.commentCount):102}</h4>
                {commentData.map((item,index)=>{
                    return(
                        <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>



                    )
                })}
           
              
            </div>

        </div>
    )
}

export default PlayVideo
