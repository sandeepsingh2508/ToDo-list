import React, { useState } from "react";
import "./style.css";
import img from "./img/images.png";

const Todo = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [toggleChange,setToggleChange]=useState(true)
  const [isEditId,setIsEditId]=useState(null)

  const addItem = () => {
    if (!input) {
      alert('Please input field')
    }else if(input && !toggleChange){
      setData(
        data.map((elem)=>{
          if(isEditId===elem.id){
            return {...elem,Name:input}
          }
          return elem
        })
      )
      setToggleChange(true)
    setInput("")
    setIsEditId(null)
    }
     else {
      const localStorage = { id: new Date().getTime().toString(), Name: input };
      setData([...data, localStorage]);
      setInput("");
    }
  };

  const editItem=((id)=>{
    let newEditItem=data.find((ele)=>{
      return id===ele.id
    })
    // console.log(newEditItem)
    setToggleChange(false)
    setInput(newEditItem.Name)
    setIsEditId(id)
    
  })
  const deleteItem = (id) => {
    const remainItem = data.filter((value) => {
      return value.id !== id;
    });
    setData(remainItem);
  };

  const handleChange = () => {
    setData([]);
  };
  return (
    <div className="body">
      <div className="container">
        <div className="box">
          <div className="top">
            <img id="img" src={img} alt="" />
            <div className="title">
              <p>Add your list here</p>
              <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
            </div>
          </div>
          
          <div className="input">
          
            <input
              className="input-field"
              type="text"
              placeholder="Add Items..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {
            toggleChange?<spam>
            <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={addItem}
            ></i>
          </spam>: <spam>
              <i
                className="fa fa-pencil-square-o"
                aria-hidden="true"
                onClick={addItem}
              ></i>
            </spam>
          }
           
          </div>
          {data.map((ele) => {
            return (
              <div className="output">
                <input className="output-field" type="text" value={ele.Name} />
                <spam>
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => deleteItem(ele.id)}
                  ></i>
                </spam>
                <span>
                  <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={()=>editItem(ele.id)}></i>
                </span>
              </div>
            );
          })}

          <button className="btn" onClick={handleChange}>
            Remove all
          </button>
        </div>
      </div>
      <i class="fa-sharp fa-solid fa-pen-to-square" aria-hidden="true"></i>
    </div>
  );
};

export default Todo;
