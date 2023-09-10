const { useState } = require("react");

const Addtask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const postTask = async (title, desc) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, desc: desc }),
    };
    const response = await fetch(
      "http://localhost:8000/api/postdata/",
      requestOptions
    );
    const data = await response.text();
    console.log(data);
  };
  const addtask = async (e) => {
    if (title == "" || desc == "") {
      alert("Enter Title and Description");
    } else {
      await postTask(title, desc);
      setTitle("");
      setDesc("");
    }
  };
  return (
    <form className="add-task-box" onSubmit={addtask}>
      <textarea
        className="title-input"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Enter Title"
        rows="3"
      ></textarea>
      <textarea
        className="desc-input"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        placeholder="Enter Description"
        rows="3"
      ></textarea>
      <button className="add-task-btn" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default Addtask;
