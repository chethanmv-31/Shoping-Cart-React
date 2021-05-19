import React, { SyntheticEvent } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import Column from "../components/Column";
import LoadingWrapper from "../components/LoadingWrapper";
import Row from "../components/Row";
import UserService from "../services/UserService";

type fileUploadProps = {
  showLoader: () => void;
  hideLoader: () => void;
  isAuthenticated: boolean;
} & RouteComponentProps;

type fileUploadState = {
  profileImage:string
  errorMessage: string | null;
  returnName: string;
};

class fileUpload extends React.Component<fileUploadProps, fileUploadState> {

    
  state: fileUploadState = {
    profileImage:"",
    errorMessage: "",
    returnName: "",
  };

  fileUpload = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      console.log(e);

      const { profileImage } = this.state;
      const { data } = await UserService.fileUpload(profileImage);
      console.log(data);
      this.props.history.push("/profile");
      this.setState({ returnName: data.name });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };

  
  render() {
    if (this.state.returnName) {
      return <Redirect to={"/profile"} />;
    }

    return (
      <LoadingWrapper>
        <Row>
          <Column
            size={4}
            classes={
              "offset-md-4 shadow-lg border p-4 text-center rounded mt-5 p-4"
            }
          >
            <h2>File Upload</h2>
            <hr />
            <small className="text-danger">{this.state.errorMessage}</small>

            <form onSubmit={this.fileUpload} >
              <input type="file" name="fileUpload" id="" />

              <button className={"btn btn-success w-100" }>REGISTER</button>
            </form>
          </Column>
        </Row>
      </LoadingWrapper>
    );
  }
}

export default fileUpload;
