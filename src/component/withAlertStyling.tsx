import React from "react";

const withAlertStyling = (Component: any) => (props: any) =>
  <Component sx={{ mb: 2 }} {...props} />;

export default withAlertStyling;
