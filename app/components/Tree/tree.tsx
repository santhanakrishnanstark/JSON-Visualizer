'use client'

import React, { useEffect, useState } from "react";
import './tree.css';

const Tree = ({ data = [] }) => {
  return (
    <div className="tree">
      <ul className="tree-container">
        {data.map((tree, index) => (
          <TreeNode key={index} node={tree} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }: any) => {
  const [childVisible, setChildVisiblity] = useState(false);

  useEffect(()=>{
    setChildVisiblity(node.isExpand)
  }, [])

  useEffect(() => {
    setChildVisiblity(node.isExpand)
  }, [node])

  const hasChild = node.children.length ? true : false;
  const getActiveClass = () => hasChild ? ((childVisible) ? "expand-item" : "collapse-item"): '';

  const handleVisibility = (e: any) => {
    setChildVisiblity((v) => !v);

    // TODO: check if all the tree data is expanded, if expanded then change the expand button state
    
  }

  return (
    <li className={`tree-node ${getActiveClass()}`}>
      <div className="w-max">
        <div className="tree-head flex gap-2">
          <span className="label" onClick={handleVisibility}>{node.label}</span> : <span className="value">{node.value.toString()}</span>
        </div>
      </div>
      {hasChild && (childVisible) && (
        <div className="tree-content">
          <ul className="tree-container">
            <Tree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;