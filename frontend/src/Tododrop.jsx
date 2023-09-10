import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useContext } from "react";
import { Context } from "./Context";

const Tododrop = () => {
  const {
    title,
    updateTitle,
    desc,
    updateDesc,
    todoarr,
    deleteTask,
    editTask,
  } = useContext(Context);
  return (
    <Droppable droppableId="todo-drop">
      {(provided) => (
        <div
          className="todo-box"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="todo-head">To-Do</div>
          {todoarr.map((value, key) => {
            return (
              <Draggable key={value._id} draggableId={value._id} index={key}>
                {(provided) => (
                  <div
                    className="cards"
                    key={key}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="card-title">{value.title}</div>
                    <div className="card-desc">{value.desc}</div>
                    <div className="card-options">
                      <Popup
                        trigger={
                          <button className="card-edit-btn" value={value}>
                            Edit
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal">
                            <textarea
                              className="update-title-input"
                              value={title}
                              onChange={(e) => {
                                updateTitle(e.target.value);
                              }}
                              placeholder="Enter Title to update"
                              rows="3"
                            ></textarea>
                            <textarea
                              className="update-desc-input"
                              value={desc}
                              onChange={(e) => {
                                updateDesc(e.target.value);
                              }}
                              placeholder="Enter Description to update"
                              rows="3"
                            ></textarea>
                            <button
                              className="update-btn"
                              onClick={() => {
                                close();
                                editTask(value._id);
                              }}
                            >
                              Update
                            </button>
                          </div>
                        )}
                      </Popup>
                      <button
                        className="card-delete-btn"
                        onClick={() => deleteTask(value)}
                        value={value}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Tododrop;
