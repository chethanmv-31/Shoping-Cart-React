import React, { SyntheticEvent, Fragment } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import TextBox from "../components/TextBox";
import UserService from "../services/UserService";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import LoadingActions from "../store/actions/LoadingActions";
import formatter from "../utils/formatter";
import { StoreType } from "../types";
import Container from "../components/Container";
import OrderService from "../services/OrderService";
import { NavLink } from "react-router-dom";

type paymentProps = {
  paymentError: (error: string) => void;
  errorMessage: string | null;
  showLoader: () => void;
  hideLoader: () => void;
} & RouteComponentProps;
type paymentState = {
  paymentAmount:any;
  paymentMode:any;
  redirect: boolean;
};
class payment extends React.Component<paymentProps> {
  state: paymentState = {
    paymentAmount:"",
    paymentMode:"",
    redirect: false,
  };
  submitData = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const { paymentAmount, paymentMode } = this.state;
      const { data } = await OrderService.createPayment(
       paymentAmount,
       paymentMode
      );
      console.log("payment", data);
      this.props.showLoader();
      this.props.hideLoader();
      this.props.history.push("/confirmation");
      this.setState({
        redirect: true,
        paymentAmount: this.state.paymentAmount,
        paymentMode: this.state.paymentMode
      });
    } catch (e) {
      this.props.paymentError(formatter.titlecase(e.message.toString()));
      this.props.hideLoader();
      console.log(e);
    }
  };
  render() {
    const redirecting = () => {
      if (this.state.redirect === true) {
        return <Redirect to="/confirmation" />;
      }
    };
    console.log("state data", this.state);
    return (
      <Container>
        <Row>
          <Column size={12}>
            <div className="card col-md-6 mx-auto">
              <h1 className="text-center">Payment</h1>
              <small className="text-danger">{this.props.errorMessage}</small>
              <div className="card-body">
                <form onSubmit={this.submitData}>
                  
                  <select className="form-select" aria-label="Default select example"  onChange={(paymentMode) => this.setState({ paymentMode })}>
                    <option selected>Select The Payment Option</option>
                    <option value="1">Card</option>
                    <option value="2">Cash On Delivery</option>
                    <option value="3">UPI</option>
                  </select>

                  <TextBox
                    placeholder={"Total Amount"}
                    type={"text"}
                    textChange={(paymentAmount) => this.setState({ paymentAmount })}
                  />
                 
                <NavLink to={"/confirmation"}>
                <button className={"btn btn-dark w-100 text-uppercase"}>
                    Proceed Payment
                  </button>
                </NavLink>
                </form>
              </div>
            </div>
          </Column>
        </Row>
      </Container>
    );
  }
}
const mapStoreDataToProps = (storeData: StoreType) => {
  return {
    errorMessage: storeData.userSession.error,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // addressError: (err: string) => dispatch(UserActions.addressError(err)),
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
  };
};
export default connect(mapStoreDataToProps, mapDispatchToProps)(payment);
