import React from "react";
import { Redirect } from "react-router-dom";
import { InitialState, reducer } from "../../customHooks/useReducer";

import { NewCategoryForm } from "../../components/NewCategoryForm";
import { DeleteCategoryForm } from "../../components/DeleteCategoryForm";
import { NewItemForm } from "../../components/NewItemForm";
import { ItemDetails } from "../../components/ItemDetails";
import TodoGreetings from "../../components/TodoGreetings";
import TodoSearch from "../../components/TodoSearch";
import TodoList from "../../components/TodoList";
import TodoCategories from "../../components/TodoCategories";
import TodoCategoryItem from "../../components/TodoCategoryItem";
import Modal from "../../components/Modal";
import Column from "../../components/Column";
import { Item } from "../../components/Item";

function Home() {
  const [state, dispatch] = React.useReducer(reducer, InitialState());
  const {
    authName,
    authNickName,
    categories,
    items,
    columns,
    openModal,
    searched
  } = state;

  if (!authName) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <TodoGreetings>
        <h2 className="greetings">
          What´s up, {authNickName ? authNickName : authName}?
        </h2>
      </TodoGreetings>
      <TodoSearch state={state} dispatch={dispatch} />

      {searched ? (
        <React.Fragment>
          {items.map(item => {
            if(item.text.toLowerCase().includes(searched)){
              return (
                <Item 
                  key={item.id}
                  id={item.id}
                  title={item.text}
                  category={item.category}
                  items={items}
                  columnTag={item.columnTag}
                  dispatch={dispatch}
                />
              )
            }
          })}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TodoCategories dispatch={dispatch}>
            {categories.map((item) => (
              <TodoCategoryItem
                key={item.id}
                name={item.label}
                tasks={item.tasks}
                completed={item.completed}
                color={item.color}
                arr={item.arr}
                categories={categories}
                items={items}
                dispatch={dispatch}
              />
            ))}
          </TodoCategories>

          <TodoList>
            <div className="addCta-container">
              <h2 className="subtitle">TODAY'S TASKS</h2>
            </div>

            <section className="todoList__board">
              {columns.map((column) => (
                <Column
                  key={column.id}
                  name={column.name}
                  items={items}
                  categories={categories}
                  dispatch={dispatch}
                />
              ))}
            </section>
          </TodoList>
        </React.Fragment>
      )}

      {openModal && (
        <Modal>
          {openModal === "AddCategory" ? (
            <NewCategoryForm categories={categories} dispatch={dispatch} />
          ) : openModal[0] === "DeleteCategory" ? (
            <DeleteCategoryForm
              name={openModal[1]}
              categories={categories}
              items={items}
              dispatch={dispatch}
            />
          ) : openModal[0] === "addItem" ? (
            <NewItemForm
              columnTag={openModal[1]}
              columns={columns}
              categories={categories}
              items={items}
              dispatch={dispatch}
            />
          ) : openModal[0] === "showItemDetail" ? (
            <ItemDetails
              content={openModal[1]}
              categories={categories}
              items={items}
              columns={columns}
              dispatch={dispatch}
            />
          ) : null}
        </Modal>
      )}
    </main>
  );
}

export default Home;
