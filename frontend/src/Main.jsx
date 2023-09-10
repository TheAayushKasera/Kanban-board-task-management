import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Tododrop from "./Tododrop";
import { Context } from "./Context";
import Doingdrop from "./Doingdrop";
import Donedrop from "./Donedrop";
import Addtask from "./Addtask";

const Main = () => {
  // State for task lists and input fields
  const [todoarr, setTodo] = useState([]);
  const [doingarr, setDoing] = useState([]);
  const [donearr, setDone] = useState([]);
  const [title, updateTitle] = useState("");
  const [desc, updateDesc] = useState("");
  const [loading, setLoading] = useState(false);
  // Fetch data from the API when the component mounts
  useEffect(() => {
    getdata();
  }, []);

  // Function to fetch data from the API
  const getdata = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://kanban-board-backend-z6wp.onrender.com/api/getdata/"
      );

      if (response.ok) {
        let todoarr = [];
        let doingarr = [];
        let donearr = [];
        const data = await response.json();

        // Categorize data based on 'progress' field
        for (let i of data) {
          if (i.progress === "to_do") {
            todoarr.push(i);
          } else if (i.progress === "doing") {
            doingarr.push(i);
          } else {
            donearr.push(i);
          }
        }

        // Set the categorized data in state
        setTodo(todoarr);
        setDoing(doingarr);
        setDone(donearr);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Function to update the 'progress' field of a task
  const putprogress = async (_id, progress) => {
    setLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: _id, progress: progress }),
    };

    const response = await fetch(
      "https://kanban-board-backend-z6wp.onrender.com/api/updateprogress/",
      requestOptions
    );

    const data = await response.text();
    console.log(data);
    setLoading(false);
  };

  // Function to delete a task
  const deleteTask = async (task) => {
    setLoading(true);
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: task._id }),
      };

      const response = await fetch(
        `https://kanban-board-backend-z6wp.onrender.com/api/deletedata/`,
        requestOptions
      );

      console.log(await response.text());
      alert("Data Deleted successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Got some Error ❌");
    }
    await getdata();
    setLoading(false);
  };

  // Function to edit a task
  const editTask = async (_id) => {
    setLoading(true);
    if (title === "" || desc === "") {
      alert("Please enter title and description");
    } else {
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: _id, title: title, desc: desc }),
        };

        const response = await fetch(
          `https://kanban-board-backend-z6wp.onrender.com/api/updatetask`,
          requestOptions
        );

        console.log(await response.text());
        await getdata();
        alert("Data Updated Successfully ✅");
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };

  // Function called when a drag-and-drop operation ends
  const onDragEnd = (result) => {
    var dest = result.destination.droppableId;
    var source = result.source.droppableId;
    var srcindex = result.source.index;
    var destindex = result.destination.index;
    let newTodoarr = [...todoarr];
    let newDoingarr = [...doingarr];
    let newDonearr = [...donearr];
    let removed = "";

    // Remove the task from its source list
    if (source === "todo-drop") {
      removed = newTodoarr.splice(srcindex, 1)[0];
    } else if (source === "doing-drop") {
      removed = newDoingarr.splice(srcindex, 1)[0];
    } else {
      removed = newDonearr.splice(srcindex, 1)[0];
    }

    // Insert the task into the destination list
    if (dest === "todo-drop") {
      newTodoarr.splice(destindex, 0, removed);
    } else if (dest === "doing-drop") {
      newDoingarr.splice(destindex, 0, removed);
    } else {
      newDonearr.splice(destindex, 0, removed);
    }

    // Update the state with the new task order
    setTodo(newTodoarr);
    setDoing(newDoingarr);
    setDone(newDonearr);

    // If the task moved to a different progress column, update the progress field
    if (source !== dest) {
      var progress = "";
      if (dest === "todo-drop") {
        progress = "to_do";
      } else if (dest === "doing-drop") {
        progress = "doing";
      } else {
        progress = "done";
      }
      putprogress(removed._id, progress);
    }
  };
  if (loading) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <>
        <Addtask />
        <Context.Provider
          value={{
            title,
            updateTitle,
            desc,
            updateDesc,
            todoarr,
            doingarr,
            donearr,
            putprogress,
            deleteTask,
            editTask,
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="main-container">
              <Tododrop />

              {/* Doing column */}

              <Doingdrop />
              {/* Done column */}
              <Donedrop />
            </div>
          </DragDropContext>
        </Context.Provider>
      </>
    );
  }
};

export default Main;
