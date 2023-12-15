import { useDispatch } from "react-redux";
import "./AddCommission.css";
import { addCommissionToList } from "../../util/store/commissionSlice";
const AddCommission = () => {
    const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    const select = e.currentTarget;
    const price = select.price.value;
    const description = select.description.value;
    const deadline = select.deadline.value;
    const status = select.status.value;
    const source = select.source.value;
    const name = select.name.value;

    const object = {
      price: price,
      description: description,
      deadline: deadline,
      status: status,
      source: source,
      name: name,
    };

    dispatch(addCommissionToList(object))
  };

  return (
    <div className="add-commission-section">
      <h1>Add Commission</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Requester Name</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="description">Commission Content</label>
        <textarea
          className="textarea"
          name="description"
          id="description"
        ></textarea>

        <label htmlFor="deadline">Deadline</label>
        <input type="date" name="deadline" id="deadline" />

        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" />

        <label htmlFor="source">Source</label>
        <input type="text" name="source" id="source" />

        <label htmlFor="status">Completion Status</label>
        <select name="status" id="status">
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
