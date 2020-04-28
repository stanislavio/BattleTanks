import React, { Component } from "react";

import { connect } from "react-redux";

import AdminPanel from "../components/admin";

class AdminPanelWrapper extends Component {
  render() {
    return <AdminPanel />;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelWrapper);
