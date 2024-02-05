import { useDispatch, useSelector } from "react-redux";
import "./AddCommission.css";
import {
  addCommissionToList,
  fetchCommissionList,
} from "../../util/store/commissionSlice";
import { useEffect, useState } from "react";
import PixivIcon from "../../assets/pixiv.svg";
import SkebIcon from "../../assets/skeb.svg";
import MailIcon from "../../assets/mail.svg";
import Radio from "../../components/radio/Radio";
import {
  fetchList,
  generateUniqueID,
  getDate,
} from "../../util/util-functions";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../util/store/userSlice";
import { uploadComObject } from "../../util/firebase/firebase.utils";
// Add Commission Page
const AddCommission = () => {
  const user = useSelector(selectCurrentUser);
  const userId = user ? user.uid : null;
  const nav = useNavigate();
  const date = new Date();
  const defaultDate = date.toLocaleDateString("en-CA");
  const MAXCHARACTERS = 3000;
  const MAXCHARACTERS_NAME = 16;
  const [charCount, setCharCount] = useState(MAXCHARACTERS);
  const [nameCharCount, setNameCharCount] = useState(MAXCHARACTERS_NAME);
  const dispatch = useDispatch();

  const INIT_FORM = {
    price: "",
    description: "",
    date: getDate(0.1),
    status: "",
    source: "",
    name: "",
    added: "",
    refImage: [],
    id: "",
  };
  const DEMO_FORM = {
    price: "120",
    description: "Some description",
    date: getDate(1.5),
    status: "Completed",
    source: "pixiv",
    name: "Meow",
  };
  const [formValues, setFormValues] = useState(INIT_FORM);
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadCommission = async (object) => {
    if (!userId) return;
    try {
      // Upload to firebase
      await uploadComObject(`users/${userId}/commissionList`, object);
      const comList = await fetchList(userId);
      // Re-fetch from firebase
      dispatch(fetchCommissionList(comList));
      console.log("fetched");
    } catch (error) {
      console.log("Uplaod commission error");
      console.log(error);
    }
  };
  // Upon load, generate an ID and date
  useEffect(() => {
    setFormValues({ ...formValues, id: generateUniqueID(), added: getDate(0) });
  }, []);
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadCommission(formValues);
    // clear form
    setFormValues({});
    nav(`/commission/${formValues.id}`);
  };

  const handleNameInput = (e) => {
    setNameCharCount(MAXCHARACTERS_NAME - e.currentTarget.value.length);
  };
  const handleTextAreaInput = (e) => {
    setCharCount(MAXCHARACTERS - e.currentTarget.value.length);
  };
  const handleDemoClick = () => {
    setFormValues({
      ...formValues,
      price: "120",
      description: "Some description",
      date: getDate(2),
      status: "Completed",
      source: "pixiv",
      name: "Meow",
    });
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
      <button className="demo-button" onClick={() => handleDemoClick()}>
        Demo Prefill
      </button>
      <h1>Add Commission</h1>
      <form className="add-commission-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Requester Name</label>
        <div className="name-div">
          <input
            required
            maxLength={MAXCHARACTERS_NAME}
            type="text"
            name="name"
            id="name"
            value={formValues.name}
            onChange={(e) => {
              setFormValues({ ...formValues, name: e.target.value });
              handleNameInput(e);
            }}
          />
          <span className="name-char-count">
            {nameCharCount}/{MAXCHARACTERS_NAME}
          </span>
        </div>

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
          value={formValues.status}
          onChange={(e) => {
            setFormValues({ ...formValues, status: e.target.value });
          }}
        >
          <option value="Accepted/WIP">Accepted/WIP</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="sources-input-container">
          <p className="sources-label">Sources</p>
          <div className="source-container">
            <Radio
              name="source-group"
              value="pixiv"
              labelText=""
              labelIcon={PixivIcon}
              checked={formValues.source === "pixiv"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
            <Radio
              name="source-group"
              value="skeb"
              labelText=""
              labelIcon={SkebIcon}
              checked={formValues.source === "skeb"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
            <Radio
              name="source-group"
              value="mail"
              labelText="Mail"
              checked={formValues.source === "mail"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
            <Radio
              name="source-group"
              value="other"
              labelText="Other"
              checked={formValues.source === "other"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
          </div>
        </div>
        <input
          id="file"
          type="file"
          onChange={(e) => handleImageChange(e)}
          multiple
        />
        <button className="submit-button" type="submit">
          Add Commission
        </button>
      </form>
    </section>
  );
};

export default AddCommission;
