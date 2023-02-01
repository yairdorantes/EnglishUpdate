import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import mySite from "./Domain";
const PayPal = () => {
  let { user } = useContext(AuthContext);

  //const { product } = props;
  const [error, setError] = useState(null);
  const [paidFor, setPaidFor] = useState(false);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    alert("thanks");
    window.location.reload();
  }
  if (error) {
    alert("error");
    window.location.reload();
  }

  const test = {
    describe: "testing",
    price: 0.05,
  };
  return (
    <div className="paypal-btn">
      <PayPalButtons
        onClick={(data, actions) => {
          const hasAlreadyCourse = false;
          if (hasAlreadyCourse) {
            setError("ya compraste");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: test.describe,
                amount: {
                  value: test.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, action) => {
          const order = await action.order.capture();
          console.log("order", order);
          handleApprove(data.orderID);

          helpHttp()
            .put(`${mySite}makepremium/${user.user_id}`)
            .then((res) => {
              console.log(res);
              if (!res.err) {
                console.log("no error");
                //   setLoading(false);
              } else {
                console.log(res);
                // setError(res);
              }
            });
          //return action.order.capture();
        }}
        onCancel={() => {
          // button.updateProps();
        }}
        onError={(err) => {
          setError(err);
          console.log("paypal error");
        }}
        style={{
          layout: "horizontal",
          color: "gold",
          shape: "rect",
          height: 30,
        }}
      />
    </div>
  );
};

export default PayPal;
