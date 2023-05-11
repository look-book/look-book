import React, {useState, useEffect} from "react";
import People from "./People";
import Locations from "./Locations";
import AlbumSearch from "./AlbumSearch";
import Posts from "./Posts/Posts";
import { useDispatch} from "react-redux";
import { getPosts } from "../actions/posts";

function Filters() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  
  return (
    <section className="filterBox">
      <h1>Filters</h1>
      <p>
        This page will be a composite of all of the tags (including people and
        locations) that the members will create to describe their photos.
      </p><br></br>
      <div className="searchBox">
      <h1>Most Popular</h1>
        <AlbumSearch/>
      </div>
      <br /><br></br>
      <h3>Recent Contacts</h3>
      <table>
        <tr>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
        </tr>
        <tr>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
          <td className="fillerBox"></td>
        </tr>
      </table>
      <br />
      <br />
      <div className="membersBox">
        <People />
      </div>
      <hr />
      <br></br>
      <div className="contentBox">
        <h2>Random Posts</h2><br></br>
      <Posts setCurrentId={setCurrentId}/>
     
      </div>
      <br></br>
     
      <h3>Locations</h3>
      <Locations />
    </section>
  );
}

export default Filters;
