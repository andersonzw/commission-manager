import { useDispatch, useSelector } from "react-redux";
import "../add-commission/AddCommission.css";
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
  fetchCommissionFromList,
  fetchList,
  generateUniqueID,
  getDate,
} from "../../util/util-functions";
import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../util/store/userSlice";
import { uploadComObject } from "../../util/firebase/firebase.utils";
// Add Commission Page
const EditCommission = () => {
  const [formValues, setFormValues] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const { comId } = useParams();
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

  useEffect(() => {
    const fetchUponLoad = async () => {
      const commissionToEdit = await fetchCommissionFromList(userId, comId);
      setFormValues({
        price: commissionToEdit.price,
        description: commissionToEdit.description,
        date: commissionToEdit.date,
        status: commissionToEdit.status,
        source: commissionToEdit.source,
        name: commissionToEdit.name,
      });
    };

    fetchUponLoad();

    console.log(formValues);
  }, []);
  // Initial form

  const uploadCommission = async (object) => {
    if (!userId) return;
    try {
      await uploadComObject(`users/${userId}/commissionList`, object);
      console.log("Added");
      console.log("fetching...");
      const comList = await fetchList(userId);
      dispatch(fetchCommissionList(comList));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    console.log(user.uid);
    const id = generateUniqueID();
    e.preventDefault();
    const select = e.currentTarget;
    const price = select.price.value;
    const description = select.description.value;
    const date = select.date.value;
    const status = select.status.value;
    const source = select["source-group"].value;
    const name = select.name.value;

    const commissionObject = {
      price: price,
      description: description,
      date: date,
      status: status,
      source: source,
      name: name,
      id: id,
      refImage: selectedImages,
      added: getDate(0),
    };
    console.log(commissionObject);
    // todo: add object to firebase databse

    // dispatch(addCommissionToList(commissionObject))

    await uploadCommission(commissionObject);
    // clear form
    setFormValues(INIT_FORM);

    // //redirect
    // nav(`/commission/${id}`)
  };
  const handleNameInput = (e) => {
    setNameCharCount(MAXCHARACTERS_NAME - e.currentTarget.value.length);
  };
  const handleTextAreaInput = (e) => {
    setCharCount(MAXCHARACTERS - e.currentTarget.value.length);
  };

  const handleDemoClick = () => {
    setFormValues(DEMO_FORM);
    console.log([comId, userId]);
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
              console.log(nameCharCount);
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
          <option value="Declined">Declined</option>
        </select>

        <div className="sources-input-container">
          <p className="sources-label">Sources</p>
          <div className="source-container">
            <Radio
              name="source-group"
              value={formValues.source}
              labelText=""
              labelIcon={PixivIcon}
              checked={formValues.source === "pixiv"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
            <Radio
              name="source-group"
              value={formValues.source}
              labelText=""
              labelIcon={SkebIcon}
              checked={formValues.source === "skeb"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
            <Radio
              name="source-group"
              value={formValues.source}
              labelText="Mail"
              checked={formValues.source === "mail"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
            <Radio
              name="source-group"
              value={formValues.source}
              labelText="Other"
              checked={formValues.source === "other"}
              onChange={(e) => {
                setFormValues({ ...formValues, source: e.target.value });
              }}
            />
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

export default EditCommission;
