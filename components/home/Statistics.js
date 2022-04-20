import { Table } from "reactstrap";
const Statistics = () => {
  return (
    <div>
      <style>
        {`.statistics {
            max-width: 100%;
            height: 205px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            // background:#EEEEEE;
            font-size:14px;
          }

          #stat {
            text-align:center;
            border-bottom:0px;
          }
              
        `}
      </style>
      <h3>STATISTICS</h3>
      <div className="container d-flex statistics">
        <div className="row">
          <Table id="stat">
            <tbody>
              <tr>
                <td>250.000 online</td>
              </tr>
              <tr>
                <td>1.000.000 peak online</td>
              </tr>
              <tr>
                <td>20.000.000 monthly</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
