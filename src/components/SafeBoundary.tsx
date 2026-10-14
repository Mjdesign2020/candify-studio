import { Component, type ReactNode } from 'react'

/** Renders nothing if a decorative child (e.g. the WebGL shader) throws. */
export default class SafeBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.warn('Decorative element failed to render:', error)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}
