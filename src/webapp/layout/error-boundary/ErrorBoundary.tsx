import React, { ErrorInfo } from "react";
import { ErrorView } from "./ErrorView";

type Props = {};
type State = { error?: Error; errorInfo?: ErrorInfo };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  override render() {
    if (this.state.error) {
      return <ErrorView error={this.state.error} />;
    }

    return this.props.children;
  }
}
