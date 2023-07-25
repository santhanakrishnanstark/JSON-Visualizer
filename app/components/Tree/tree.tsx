'use client'

import React, { useState } from "react";
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

  const hasChild = node.children.length ? true : false;
  const getActiveClass = () => hasChild ? (childVisible ? "expand-item" : "collapse-item"): '';

  return (
    <li className={`tree-node ${getActiveClass()}`}>
      <div className="w-max" onClick={(e) => setChildVisiblity((v) => !v)}>
        <div className="tree-head flex gap-2">
          <span className="label">{node.label}</span> : <span className="value">{node.value.toString()}</span>
        </div>
      </div>

      {hasChild && childVisible && (
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