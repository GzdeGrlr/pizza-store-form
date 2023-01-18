import React, { useState, useEffect, useRef } from "react";
import Pizza from "./PizzaOne.jpg";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required().min(2, "isim en az 2 karakter olmalıdır"),
  size: yup
    .mixed()
    .oneOf(["Small", "Medium", "Large"], "You must select one of sizes.")
    .required(),
  sauce: yup
    .mixed()
    .oneOf(
      ["none", "bbq", "ranch", "original", "buffalo"],
      "Choice of sauce is required"
    )
    .required(),
  pepperoni: yup.boolean().oneOf([true, false], ""),
  sausage: yup.boolean().oneOf([true, false], ""),
  bacon: yup.boolean().oneOf([true, false], ""),
  salami: yup.boolean().oneOf([true, false], ""),
  mushrooms: yup.boolean().oneOf([true, false], ""),
  greenPeppers: yup.boolean().oneOf([true, false], ""),
  grilledChicken: yup.boolean().oneOf([true, false], ""),
  extraCheese: yup.boolean().oneOf([true, false], ""),
  special: yup.string(),
});

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    size: "",
    sauce: "none",
    pepperoni: false,
    sausage: false,
    bacon: false,
    salami: false,
    mushrooms: false,
    greenPeppers: false,
    grilledChicken: false,
    extraCheese: false,
    special: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    sauce: "",
    pepperoni: "",
    sausage: "",
    bacon: "",
    salami: "",
    mushrooms: "",
    greenPeppers: "",
    special: "",
    grilledChicken: "",
    extraCheese: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [order, setOrder] = useState("");
  const myRef = useRef(null);

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const type = e.target.type;
    const checked = e.target.checked;
    //const {value,name,type,checked}=event.target

    const valuetoUse = type === "checkbox" ? checked : value;

    checkFormErrors(name, valuetoUse);
    setForm({
      ...form,
      [name]: valuetoUse,
    });
  };

  const checkFormErrors = (name, value) => {
    //en son bu
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      name: form.name.trim(),
      size: form.size,
      sauce: form.sauce,
      special: form.special.trim(),
      pepperoni: form.pepperoni,
      sausage: form.sausage,
      bacon: form.bacon,
      salami: form.salami,
      mushrooms: form.mushrooms,
      greenPeppers: form.greenPeppers,
      grilledChicken: form.grilledChicken,
      extraCheese: form.extraCheese,
    };

    axios
      .post("https://reqres.in/api/orders", newOrder)
      .then((res) => {
        setOrder(res.data);
        executeScroll();
        setForm({
          name: "",
          size: "",
          sauce: "none",
          pepperoni: false,
          sausage: false,
          bacon: false,
          salami: false,
          mushrooms: false,
          greenPeppers: false,
          grilledChicken: false,
          extraCheese: false,
          special: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="home-container">
        <div
          style={{
            backgroundColor: "white",
            height: "620px",
            width: "500px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 20px",
            letterSpacing: "1.2px",
          }}
        >
          <h2>Build Your Own Pizza!</h2>
          <form id="pizza-form" onSubmit={handleSubmit}>
            <p>
              <label htmlFor="name-input">
                {" "}
                <strong>Pizza Name:</strong>{" "}
              </label>
              <input
                type="text"
                id="name-input"
                name="name"
                placeholder="Name your own pizza"
                value={form.name}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="size-dropdown">
                <strong>Choice of Size:</strong>{" "}
              </label>
              <select
                id="size-dropdown"
                name="size"
                value={form.size}
                onChange={handleChange}
              >
                <option value="">
                  --- Please select the size of the pizza ---
                </option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </p>
            <p>
              <span
                style={{
                  float: "left",
                  marginLeft: "65px",
                }}
              >
                <strong>Choice of Sauce:</strong>{" "}
              </span>
              <br />
              <label
                style={{
                  float: "left",
                  marginLeft: "60px",
                }}
              >
                <input
                  type="radio"
                  name="sauce"
                  value="none"
                  checked={form.sauce === "none"}
                  onChange={handleChange}
                />
                None
              </label>
              <br />
              <label
                style={{
                  float: "left",
                  marginLeft: "60px",
                }}
              >
                <input
                  type="radio"
                  name="sauce"
                  value="bbq"
                  checked={form.sauce === "bbq"}
                  onChange={handleChange}
                />
                BBQ
              </label>
              <br />
              <label
                style={{
                  float: "left",
                  marginLeft: "60px",
                }}
              >
                <input
                  type="radio"
                  name="sauce"
                  value="ranch"
                  checked={form.sauce === "ranch"}
                  onChange={handleChange}
                />
                Ranch
              </label>
              <br />
              <label
                style={{
                  float: "left",
                  marginLeft: "60px",
                }}
              >
                <input
                  type="radio"
                  name="sauce"
                  value="original"
                  checked={form.sauce === "original"}
                  onChange={handleChange}
                />
                Original
              </label>
              <br />
              <label
                style={{
                  float: "left",
                  marginLeft: "60px",
                }}
              >
                <input
                  type="radio"
                  name="sauce"
                  value="buffalo"
                  checked={form.sauce === "buffalo"}
                  onChange={handleChange}
                />
                Bufffalo
              </label>
            </p>
            <br />
            <p>
              <span>
                <strong>Add Toppings:</strong>
              </span>
              <br />
              <label htmlFor="pepperoni">Pepperoni</label>
              <input
                type="checkbox"
                id="pepperoni"
                name="pepperoni"
                checked={form.pepperoni}
                onChange={handleChange}
                value="pepperoni"
              />{" "}
              &nbsp;
              <label htmlFor="sausage">Sausage</label>
              <input
                type="checkbox"
                id="sausage"
                name="sausage"
                checked={form.sausage}
                onChange={handleChange}
                value="sausage"
              />
              <br />
              <label htmlFor="bacon">Bacon</label>
              <input
                type="checkbox"
                id="bacon"
                name="bacon"
                checked={form.bacon}
                onChange={handleChange}
                value="bacon"
              />{" "}
              &nbsp;
              <label htmlFor="salami">Salami</label>
              <input
                type="checkbox"
                id="salami"
                name="salami"
                checked={form.salami}
                onChange={handleChange}
                value="salami"
              />
              <br />
              <label htmlFor="mushrooms">Mushrooms</label>
              <input
                type="checkbox"
                id="mushrooms"
                name="mushrooms"
                checked={form.mushrooms}
                onChange={handleChange}
                value="mushrooms"
              />{" "}
              &nbsp;
              <label htmlFor="greenPeppers">Green Peppers</label>
              <input
                type="checkbox"
                id="greenPeppers"
                name="greenPeppers"
                checked={form.greenPeppers}
                onChange={handleChange}
                value="greenPeppers"
              />
              <br />
              <label htmlFor="grilledChicken">Grilled Chicken</label>
              <input
                type="checkbox"
                id="grilledChicken"
                name="grilledChicken"
                checked={form.grilledChicken}
                onChange={handleChange}
                value="grilledChicken"
              />
              &nbsp;
              <label htmlFor="extraCheese">Extra Cheese</label>
              <input
                type="checkbox"
                id="extraCheese"
                name="extraCheese"
                checked={form.extraCheese}
                onChange={handleChange}
                value="extraCheese"
              />
            </p>
            <p>
              <label htmlFor="special-text">
                <strong>Special Instructions </strong>
              </label>{" "}
              <br />
              <input
                type="text"
                id="special-text"
                name="special"
                value={form.special}
                onChange={handleChange}
              />
            </p>
            <p style={{ margin: "0" }}>
              <input
                type="submit"
                id="order-button"
                disabled={disabled}
                className="cy-submit"
                value={"Submit"}
              />
            </p>
          </form>
          <div style={{ color: "red" }}>
            <div className="cy-nameError">
              <strong>{errors.name}</strong>
            </div>
            <div className="cy-sizeError">
              <strong>{errors.size}</strong>
            </div>
            <div>
              <strong>{errors.sauce}</strong>
            </div>
            <div>
              <strong>{errors.special}</strong>
            </div>
            <div>
              <strong>{errors.pepperoni}</strong>
            </div>
            <div>
              <strong>{errors.sausage}</strong>
            </div>
            <div>
              <strong>{errors.greenPeppers}</strong>
            </div>
            <div>
              <strong>{errors.bacon}</strong>
            </div>
            <div>
              <strong>{errors.salami}</strong>
            </div>
            <div>
              <strong>{errors.mushrooms}</strong>
            </div>
            <div>
              <strong>{errors.grilledChicken}</strong>
            </div>
            <div>
              <strong>{errors.extraCheese}</strong>
            </div>
          </div>
        </div>
        <div>
          <img src={Pizza} className="main-img" alt="PizzaPhoto"></img>
        </div>
      </div>
      {order && (
        <div
          className="cy-orderDiv"
          style={{
            backgroundColor: "#a6e0a6",
            maxWidth: "600px",
            margin: "20px auto",
            textAlign: "center",
          }}
        >
          <h3>
            {" "}
            Congrats! Your Order has been created with ID: {order.id}. Please be
            sure that you've collected the right order.
          </h3>
          <pre ref={myRef}>
            <p>Pizza ID: {order.id}</p>
            <p>Pizza Name: {order.name}</p>
            <p>Pizza Size: {order.size}</p>
            <p>Pizza Sauce: {order.sauce}</p>
            <p>Addings:</p>
            <p>
              {order.pepperoni === true ? "Pepperoni" : null}{" "}
              {order.sausage === true ? "Sausage" : null}{" "}
              {order.greenPeppers === true ? "Green Peppers" : null}{" "}
              {order.bacon === true ? "Bacon" : null}{" "}
              {order.salami === true ? "Salami" : null}{" "}
              {order.mushrooms === true ? "Mushrooms" : null}{" "}
              {order.grilledChicken === true ? "Grilled Chicken" : null}{" "}
              {order.extraCheese === true ? "Extra Cheese" : null}
            </p>
            <p>Special Note: {order.special}</p>
          </pre>
        </div>
      )}
    </div>
  );
}

export default OrderForm;
