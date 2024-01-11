import { useDispatch } from "react-redux";
import "./AddCommission.css";
import { addCommissionToList } from "../../util/store/commissionSlice";
import { useState } from "react";

// Add Commission Page
const AddCommission = () => {
  const date = new Date();
  const defaultDate = date.toLocaleDateString("en-CA");
  const MAXCHARACTERS = 3000;
  const [charCount, setCharCount] = useState(MAXCHARACTERS);
  const dispatch = useDispatch();
  const INIT_FORM = {
    price: "",
    description: "",
    date: defaultDate,
    selected: "",
    source: "",
    name: "",
  };

  const DEMO_FORM = {
    price: "120",
    description: "Some description",
    date: defaultDate,
    selected: "Completed",
    source: "www.google.com",
    name: "Meow",
  }
  const [formValues, setFormValues] = useState(INIT_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    const select = e.currentTarget;
    const price = select.price.value;
    const description = select.description.value;
    const date = select.date.value;
    const status = select.status.value;
    const source = select.source.value;
    const name = select.name.value;

    const commissionObject = {
      price: price,
      description: description,
      date: date,
      status: status,
      source: source,
      name: name,
    };
    // add commission to commission store
    dispatch(addCommissionToList(commissionObject));
    // clear form
    setFormValues(INIT_FORM);
  };

  const handleTextAreaInput = (e) => {
    setCharCount(MAXCHARACTERS - e.currentTarget.value.length)
    console.log(charCount);
  };

  const handleDemoClick = () => {
    setFormValues(DEMO_FORM)
  };

  return (
    <div className="add-commission-section">
      <button onClick={handleDemoClick} className="demo-button">
        Demo Prefill
      </button>
      <h1>Add Commission</h1>
      <form className="add-commission-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Requester Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={(e) => {
            setFormValues({ ...formValues, name: e.target.value });
          }}
        />

        <label htmlFor="description">Commission Content</label>
        <div className="textarea-container">
          <textarea
            style={{ resize: "none" }}
            className="textarea"
            name="description"
            id="description"
            maxLength={MAXCHARACTERS}
            value={formValues.description}
            onChange={(e) => {
              setFormValues({ ...formValues, description: e.target.value });
              handleTextAreaInput(e);
            }}
          ></textarea>
          <span className="char-count">
            {charCount}/{MAXCHARACTERS}
          </span>
        </div>

        <label htmlFor="date">Deadline</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formValues.date}
          onChange={(e) => {
            setFormValues({ ...formValues, date: e.target.value });
          }}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={formValues.price}
          onChange={(e) => {
            setFormValues({ ...formValues, price: e.target.value });
          }}
        />

        <label htmlFor="source">Source</label>
        <input
          type="text"
          name="source"
          id="source"
          value={formValues.source}
          onChange={(e) => {
            setFormValues({ ...formValues, source: e.target.value });
          }}
        />

        <label htmlFor="status">Completion Status</label>
        <select name="status" id="status" value={formValues.selected} onChange={(e) => {
            setFormValues({ ...formValues, selected: e.target.value });
          }}>
          <option value="Accepted/WIP">Accepted/WIP</option>
          <option value="Completed">Completed</option>
          <option value="Declined">Declined</option>
        </select>
        <button className="submit-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCommission;
