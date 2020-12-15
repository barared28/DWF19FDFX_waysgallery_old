import { Link } from "react-router-dom";
import { editStatusTransaction } from "../services/httpServices";

function Table({ data, table }) {
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>{table ? "Client" : "Vendor"}</th>
          <th>Order</th>
          <th>Start Project</th>
          <th>End Project</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0
          ? data.map((tran, index) => (
              <Td data={tran} index={index} key={index} table={table} />
            ))
          : null}
      </tbody>
    </table>
  );
}

const Td = ({ data, index, table }) => {
  const { status } = data;
  const onAction = (status) => {
    editStatusTransaction(data.id, { status }, alert);
  };
  return (
    <>
      <tr>
        <td>{+index + 1}</td>
        <td>{table ? data.client.fullName : data.seller.fullName}</td>
        <td>{data.title}</td>
        <td>{new Date(data.startDate).toUTCString()}</td>
        <td>{new Date(data.endDate).toUTCString()}</td>
        <td>
          {status === "Success" ? (
            <p className="text-succsess">Succsess</p>
          ) : status === "Waiting Approve" ? (
            <p className="text-waiting">Waiting Approve</p>
          ) : status === "On Progress" ? (
            <p className="text-on-the-way">On Progress</p>
          ) : (
            <p className="text-cancel">Cancel</p>
          )}
        </td>
        <td>
          {status === "Success" && !table ?(
            <Link to={`/project/${data.project.id}`}>
            <button className="action-succsess cursor">Cek Project</button>
          </Link>
          ): status === "Success" ? (
            <div className="item-center">
              <i className="fas fa-check status-check"></i>
            </div>
          ) : status === "On Progress" && table ? (
            <Link to={`add-project/${data.id}`}>
              <button className="action-succsess cursor">Sumbit</button>
            </Link>
          ) : status === "Waiting Approve" && table ? (
            <div className="item-center">
              <button
                className="action-cancel cursor"
                onClick={() => onAction("Cancel")}
              >
                Cancel
              </button>
              <button
                className="action-succsess cursor"
                onClick={() => onAction("On Progress")}
              >
                Approve
              </button>
            </div>
          ) : status === "Waiting Approve" ? (
            <div className="item-center">
              <i className="fas fa-check status-check"></i>
            </div>
          ) : (
            <div className="item-center">
              {table ? <i className="fas fa-times status-cancel"></i> : "Wait"}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default Table;
