import React from "react";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";

import "./Login.css";
import { columns, categoryOptions } from "../../utils/data";

function handleFullName(e, setButtonAbled, setName) {
  let name = e.target.value;

  if (name) {
    setButtonAbled(true);
  } else {
    setButtonAbled(false);
  }

  setName(name);
}

function handleNickname(e, setNickname) {
  setNickname(e.target.value);
}

function handleCategories(e, setCategories) {
  setCategories(e);
}

function handleLogin(name, nickname, categories) {
  if (!categories.length) {
    categories = [categoryOptions[0]];
  } else {
    let i = 0;

    categories.forEach((item) => {
      item.id = i;
      i++;
    });
  }

  localStorage.setItem("TODO_NAME", name);
  localStorage.setItem("TODO_NICKNAME", nickname);
  localStorage.setItem("TODO_CATEGORIES", JSON.stringify(categories));
  localStorage.setItem("TODO_COLUMNS", JSON.stringify(columns));
  localStorage.setItem("TODO_ITEMS", JSON.stringify([]));
}

function Login() {
  const [buttonAbled, setButtonAbled] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [categories, setCategories] = React.useState([categoryOptions[0]]);
  const auth = localStorage.getItem("TODO_NAME");

  if (auth) {
    return <Redirect to="/home" />;
  }

  return (
    <main className="login">
      <div>
        <h2 className="login__h2">Welcome!</h2>
        <form className="login__form">
          <div>
            <label htmlFor="name">What's your full name?</label>
            <input
              onChange={(e) => handleFullName(e, setButtonAbled, setName)}
              type="text"
              id="name"
              placeholder="Eg. Ephaestus"
            />
          </div>

          <div>
            <label htmlFor="nickname">Do you have any nickname?</label>
            <input
              onChange={(e) => handleNickname(e, setNickname)}
              type="text"
              id="nickname"
              placeholder="Eg. Fire machine"
            />
          </div>

          <section>
            <label htmlFor="">Choose at least one of the categories</label>
            <span className="login__span">
              Do not worry. You can change them later
            </span>

            <div className="login__select">
              <Select
                onChange={(e) => handleCategories(e, setCategories)}
                closeMenuOnSelect={false}
                defaultValue={categoryOptions.filter((item) => item.isFixed)}
                isMulti
                isClearable={false}
                options={categoryOptions}
              />
            </div>
          </section>

          <button
            onClick={() => handleLogin(name, nickname, categories)}
            type="button"
            className={`login__cta ${buttonAbled ? `active` : ``}`}
          >
            <Link to={buttonAbled ? "/home" : ""}>Continue</Link>
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
