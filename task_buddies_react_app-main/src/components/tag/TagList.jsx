import { useEffect, useState } from "react";
import TagTile from "./TagTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTagsByUser } from "../../store/dashboard/tag"; 

const TagList = () => {
  const dispatch = useDispatch();
  const { tags, status, error } = useSelector((state) => state.tag);

  // Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
  useEffect(() => {
    dispatch(fetchTagsByUser());
  }, [dispatch]);


  return (
    <div className="componentContainer">
      <div className="componentHeader">
        <p>Tags</p>
      </div>
      <div className="bodyContainer">
        {status === "loading" && <div>Chargement...</div>}
        {error && <div>Erreur : {error}</div>}
        {tags.map((tag) => (
          <TagTile key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default TagList;
