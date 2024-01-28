import { useDispatch } from "react-redux";
import "./AddCommission.css";
import { addCommissionToList } from "../../util/store/commissionSlice";
import { useState } from "react";
import PixivIcon from "../../assets/pixiv.svg";
import SkebIcon from "../../assets/skeb.svg";
import MailIcon from "../../assets/mail.svg";
import Radio from "../../components/radio/Radio";
import { getDate } from "../../util/util-functions";
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
    source: "pixiv",
    name: "Meow",

  };
  const [formValues, setFormValues] = useState(INIT_FORM);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleSubmit = (e) => {
    const generateUniqueID = () => {
      // Get the current time in milliseconds
      const currentTime = new Date().getTime();

      // Extract the last 6 digits from the current time
      const last6Digits = currentTime.toString().slice(-6);

      // Return the generated ID
      return last6Digits;
    };

    e.preventDefault();
    const select = e.currentTarget;
    const price = select.price.value;
    const description = select.description.value;
    const date = select.date.value;
    const status = select.status.value;
    const source = select.radio.value;
    const name = select.name.value;

    const commissionObject = {
      price: price,
      description: description,
      date: date,
      status: status,
      source: source,
      name: name,
      id: generateUniqueID(),
      refImage: selectedImages,
      added: getDate(0),
    };
    // add commission to commission store
    dispatch(addCommissionToList(commissionObject));
    // clear form
    setFormValues(INIT_FORM);
  };

  const handleTextAreaInput = (e) => {
    setCharCount(MAXCHARACTERS - e.currentTarget.value.length);
  };

  const handleDemoClick = () => {
    setFormValues(DEMO_FORM);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    // convert FileList object to an array of URLS
    const imageArray = Array.from(files).map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    // Set the selected images once all urls are resolved
    Promise.all(imageArray).then((urls) => {
      setSelectedImages(urls);
    });
  };

  return (
    <section className="commission-section">
      <button onClick={handleDemoClick} className="demo-button">
        Demo Prefill
      </button>
      <h1>Add Commission</h1>
      <form className="add-commission-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Requester Name</label>
        <input
          required
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
            required
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
          required
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
          required
          type="number"
          name="price"
          id="price"
          placeholder="$"
          value={formValues.price}
          onChange={(e) => {
            setFormValues({ ...formValues, price: e.target.value });
          }}
        />

        <label htmlFor="status">Completion Status</label>
        <select
          name="status"
          id="status"
          value={formValues.selected}
          onChange={(e) => {
            setFormValues({ ...formValues, selected: e.target.value });
          }}
        >
          <option value="Accepted/WIP">Accepted/WIP</option>
          <option value="Completed">Completed</option>
          <option value="Declined">Declined</option>
        </select>

        <div className="sources-input-container">
          <p className="sources-label">Sources</p>
          <div className="source-container">
            <Radio
              name="source-group"
              value="pixiv"
              labelText=""
              labelIcon={PixivIcon}
              defaultChecked = {true}
            />
            <Radio
              name="source-group"
              value="skeb"
              labelText=""
              labelIcon={SkebIcon}
            />
            <Radio
              name="source-group"
              value="mail"
              labelText="Mail"
            />
            <Radio name="source-group" value="other" labelText="Other" />
          </div>
        </div>
        <input id="file" type="file" onChange={handleImageChange} multiple />
        <button className="submit-button" type="submit">
          Add
        </button>
      </form>
    </section>
  );
};

export default AddCommission;
