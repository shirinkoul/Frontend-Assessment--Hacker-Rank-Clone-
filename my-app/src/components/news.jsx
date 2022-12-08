import React from 'react';
import {useGlobalContext} from './context';
import './news.css';

const News = () => {
    const {loading, hits, hideNews } = useGlobalContext();
    if(loading) {
        return <h2>Loading..</h2>;
    }    
    console.log("---------------");
    console.log(hits);
    console.log("in news.jsx");
    console.log("---------------");


    // const indexOfLastPost = curPage*postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const curPosts = hits.slice(indexOfFirstPost, indexOfLastPost);

    return ( 
        <div className='news-div'>
            {hits.map((curNews) => {
                const { story_title, objectID, story_url, points, author} = curNews;
                let point="point", val = points;
                if(points>1)
                    point+='s';
                else if(points==null)
                    val=0;
                if(story_title==null)
                    return <></>;
                return (
                    <div className='news' key={objectID}>
                        <span >
                            <h4 className='title'> {story_title} </h4>
                            <a href={story_url} target="_blank" rel="noreferrer">
                            (Read More)
                            </a>
                        </span>
                        <p className='news-details'>{val} {point} by {author} | <a href="#" onClick= {() => hideNews(objectID)} >hide </a> | past | discuss</p>
                      </div>
            );
        })}
        {/* {
            curPosts.map(post=> (
                <li key={post.objectID} className='list-group-news'>
                    {post.story_title}
                </li>
            ))
        } */}
    </div> );
};
 
export default News;