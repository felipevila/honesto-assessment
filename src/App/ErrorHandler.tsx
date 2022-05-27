import * as React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  error?: Error
}

export default class ErrorHandler extends React.Component<Props, State> {
  state = {
    error: undefined,
  }

  componentDidCatch(error: Error) {
    this.setState({ error })
  }

  render() {
    return this.state.error ? <div>Error?</div> : this.props.children
  }
}
