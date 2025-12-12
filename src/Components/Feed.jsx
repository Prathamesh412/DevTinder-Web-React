import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  
  const getFeed = async () => {
    if (feed) return; // Don't fetch if feed already exists
    try {
      const response = await axios.get(BASE_URL + "/getUser/feed", {
        withCredentials: true,
      });
      console.log("Feed response:", response.data); // Debug log
      dispatch(addFeed(response.data.users));
    } catch (err) {
      console.error("Error fetching feed:", err); // Better error logging
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
    }
  };
  
  useEffect(() => {
    getFeed();
  }, []); // Fix: empty dependency array to run only once on mount

  if (!feed) return null; // Return null instead of undefined

  if (feed.length <= 0)
    return (
      <h1 className=" flex justify-center m-52 text-3xl">No more users!!!!</h1>
    );
    
  return (
    <div className="flex flex-col items-center gap-4 my-5">
      {feed.map((user) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};

export default Feed;
